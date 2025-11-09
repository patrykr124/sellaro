import { createWriteStream } from "fs";
import fs from "fs/promises";
import path from "path";
import { pipeline } from "stream/promises";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { createRagChain, createVectorStore } from "../lib/rag.js";
import sharp from "sharp";
import { fromPath } from "pdf2pic";
import { responseAi, saveUserMessage } from "../services/message.services.js";
import {
  getRecommendedProducts,
  safeJsonParse,
} from "../services/product.services.js";

// async function getMessage(request, reply) {
//   try {
//     const userId = request.query.userId;
//     const messages = await getAllMessages(userId);
//     reply.code(200).send(messages);
//   } catch (error) {
//     reply
//       .code(500)
//       .send({ error: "Błąd pobierania wiadomości --controller--" });
//   }
// }

const createMessage = async (request, reply) => {
  try {
    const { content, userId } = request.body;
    console.log("Received message:", content);

    // 1) zapisz user msg
    await saveUserMessage(content, userId);

    // 2) odp. AI (RAG)
    const ragChain = await createRagChain();
    const messagesToAi = await ragChain.invoke({ input: content });
    const aiReply = messagesToAi.answer;

    // 3) rekomendacje produktów
    const recommendedProducts = await getRecommendedProducts(content).catch(
      () => []
    );
    const productsForAI = Array.isArray(recommendedProducts)
      ? recommendedProducts
      : [];
    console.log("Recommended products:", productsForAI);

    // 4) zapisz AI msg Z PRAWIDŁOWYMI produktami
    await responseAi(aiReply, productsForAI, userId);

    reply.send({ user: content, ai: aiReply, products: productsForAI });
  } catch (error) {
    console.log("błąd w createMessage", error);
    reply.code(500).send({
      error: " Występił błąd poczas zapisywania wiadomości --controller--",
    });
  }
};

const load_files = async (request, reply) => {
  const { userId } = request.body;
  if (!userId) {
    return reply.code(401).send({ error: "Brak zalogowanego użytkownika" });
  }
  const data = await request.file();
  if (!data) {
    return reply.code(400).send({ error: "No file uploaded" });
  }

  // Krok 1: Zapisz plik PDF tymczasowo na dysku
  const uploadsDir = path.join(process.cwd(), "src", "uploads", userId.email);
  await fs.mkdir(uploadsDir, { recursive: true });
  const tempFilePath = path.join(uploadsDir, data.filename);

  try {
    await pipeline(data.file, createWriteStream(tempFilePath));

    // Krok 2: Użyj PDFLoader z LangChain do wczytania dokumentu
    const loader = new PDFLoader(tempFilePath, {
      splitPages: false, // Wczytaj jako jeden dokument
    });
    const docs = await loader.load();

    // Krok 3: Zapisz treść dokumentu do pliku .txt w folderze RAG
    const text = docs.map((doc) => doc.pageContent).join("\n\n");
    const ragDir = path.join(process.cwd(), "src", "lib", "rag");
    const fileName = `${Date.now()}_${data.filename.replace(
      /\.pdf$/i,
      ""
    )}.txt`;
    const ragFilePath = path.join(ragDir, fileName);
    await fs.writeFile(ragFilePath, text);

    // Krok 4: Ekstraktuj zdjęcie z PDF-a
    const productsDir = path.join(
      process.cwd(),
      "src",
      "products",
      userId.email
    );
    await fs.mkdir(productsDir, { recursive: true });

    const baseFileName = data.filename.replace(/\.pdf$/i, "");
    const imageOutputPath = path.join(productsDir, `${baseFileName}.webp`);

    try {
      await fs.mkdir(productsDir, { recursive: true });

      // Konwertuj pierwszą stronę PDF-a na obraz
      const convert = fromPath(tempFilePath, {
        density: 300,
        saveFilename: baseFileName,
        savePath: productsDir,
        format: "png",
        quality: 95,
        preserveAspectRatio: true,
      });

      const result = await convert(1); // Konwertuj tylko pierwszą stronę

      if (result && result.path) {
        // Konwertuj PNG na WebP używając Sharp
        await sharp(result.path)
          .resize(1200, null, { fit: "inside", withoutEnlargement: true })
          .webp({ quality: 90, effort: 6 })
          .toFile(imageOutputPath);

        // Usuń tymczasowy plik PNG
        await fs.unlink(result.path);

        console.log(`Zdjęcie produktu zapisane: ${imageOutputPath}`);
      }
    } catch (imageError) {
      console.error("Błąd podczas ekstraktowania zdjęcia z PDF:", imageError);
      // Kontynuuj bez zdjęcia - użyje domyślnego obrazka
    }
    const ragChain = await createRagChain();
    const extractionPrompt = `
      Na podstawie poniższego tekstu z PDF-a, wyciągnij informacje o produkcie:
      1. Nazwa produktu (krótka, maksymalnie 50 znaków)
      2. Opis produktu (szczegółowy, 100-200 znaków)
      
      Odpowiedz TYLKO w formacie JSON:
      {
        "name": "nazwa produktu",
        "description": "opis produktu"
      }
      
      Tekst PDF:
      ${text}
    `;

    const existingResults = await ragChain.invoke({ input: extractionPrompt });

    // 1) weź odpowiedź jako string (czasem LangChain zwraca .answer, czasem cały string)
    const rawAnswer =
      typeof existingResults === "string"
        ? existingResults
        : existingResults?.answer ?? "";

    // (opcjonalnie) podejrzyj co przyszło
    console.log(
      "RAG rawAnswer (first 500 chars):",
      String(rawAnswer).slice(0, 500)
    );

    // 2) spróbuj sparsować; jeśli się nie da, użyj fallbacków
    const productData = safeJsonParse(rawAnswer, {
      name: baseFileName,
      description: "Brak opisu – uzupełnij.",
    });

    // 3) zabezpieczenia długości/pustych pól
    const name = (productData?.name || baseFileName).toString().slice(0, 50);
    const description = (
      productData?.description || "Brak opisu – uzupełnij."
    ).toString();

    const productsPath = path.join(
      process.cwd(),
      "src",
      "data",
      "products",
      `${userId.email}.json`
    );
    let products = [];
    try {
      const existingProducts = await fs.readFile(productsPath, "utf-8");
      products = JSON.parse(existingProducts);
      if (!Array.isArray(products)) products = [];
    } catch {
      await fs.mkdir(path.dirname(productsPath), { recursive: true });
    }
    const BASE = process.env.PUBLIC_BASE_URL || "http://localhost:5000";
    const newProduct = {
      id: Date.now(),
      name,
      description,
      image: `${BASE}/api/products/${userId.email}/${baseFileName}.webp`,
      createdAt: new Date().toISOString(),
    };

    products.push(newProduct);
    await fs.writeFile(productsPath, JSON.stringify(products, null, 2));
    console.log("Dodano nowy produkt", newProduct);
  } catch (error) {
    console.log(error);
  }

  // Krok 6: Zaktualizuj bazę wektorową
  await createVectorStore();

  // Krok 7: Usuń tymczasowy plik PDF (opcjonalne)
  // await fs.unlink(tempFilePath);

  reply.code(200).send({
    success: true,
    message: `File processed, product extracted and vector store updated.`,
  });
};

export const message_controller = {
  createMessage,
  load_files,
};
