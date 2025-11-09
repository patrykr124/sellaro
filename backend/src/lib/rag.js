import { Ollama, OllamaEmbeddings } from "@langchain/ollama";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  createStuffDocumentsChain,
} from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";

const DATA_PATH = "./src/lib/rag";
const RAG_SAVE_FILE = "./src/lib/rag/vector_db";

// nasz chat do rozmowy
const ollama = new Ollama({
  model: "gemma2:2b",
  baseUrl: `${process.env.OLLAMA_HOST}`,

});

// embeddings

const embeddings = new OllamaEmbeddings({
  baseUrl: `${process.env.OLLAMA_HOST}`,
  model: "nomic-embed-text",
});

export const createVectorStore = async () => {
  const loader = new DirectoryLoader(DATA_PATH, {
    ".txt": (path) => new TextLoader(path),
  });

  const docs = await loader.load();
  console.log("Załadowano", docs.length, "dokumentów");

  // chunki - cięcie dokumentów na fragmenty
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const splitsDoc = await textSplitter.splitDocuments(docs);
  console.log("Podzielono na:", splitsDoc.length, "Fragmentów");

  // tworzenie vektorowej bazy danych
  console.log("Tworzenie wektorowej db");
  const vectorStore = await FaissStore.fromDocuments(splitsDoc, embeddings);

  // zapisz bazę na dysku
  await vectorStore.save(RAG_SAVE_FILE);
  console.log("Baza danych zapisana w", RAG_SAVE_FILE);
};

export const createRagChain = async () => {
  // załadowanie istniejącej bazy wektorowej
  const vectorStore = await FaissStore.load(RAG_SAVE_FILE, embeddings);

  // wyszukiwanie w bazie
  const vectorStoreRetriever = vectorStore.asRetriever();

  // Create a system & human prompt for the chat model

  const prompt = ChatPromptTemplate.fromTemplate(`
    Odpowiedz na pytanie użytkownika, bazując wyłącznie na poniższym kontekście.
    Jeśli informacja nie znajduje się w kontekście, odpowiedz: "Nie wiem".
    

    Kontekst:
    {context}

    Pytanie:
    {input}
`);

  // 4. Stwórz łańcuch, który wstawi znalezione dokumenty do promptu

  const combineDocsChain = await createStuffDocumentsChain({
    llm: ollama,
    prompt,
  });
  // 5. Stwórz główny łańcuch, który najpierw szuka, a potem generuje odpowiedź

  return await createRetrievalChain({
    retriever: vectorStoreRetriever,
    combineDocsChain: combineDocsChain,
  });
};
