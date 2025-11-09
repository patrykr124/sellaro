import db from "../db/config.js";

export async function saveUserMessage(content, userId) {
  try {
    await db.collection("messages").add({
      role: "user",
      content,
      userId,
      createdAt: new Date(),
    });
  } catch (error) {
    throw new Error(`Bład zapisywania wiadomości ${error}`);
  }
}

export async function responseAi(aiReply, productsForAI = [], userId) {
  try {
    const aiMessage = {
      role: "ai",
      content: aiReply,
      userId,
      createdAt: new Date(),
      products: productsForAI.map((p) => ({
        id: String(p.id ?? Date.now()),
        name: p.name ?? "Nazwa produktu",
        description: p.description ?? "",
        image: p.image,
      })),
    };

    console.log("AI message to save:", JSON.stringify(aiMessage, null, 2));
    const docRef = await db.collection("messages").add(aiMessage);

    // opcjonalnie echo
    const snap = await docRef.get();
    console.log(
      "Firestore echo:",
      docRef.id,
      JSON.stringify(snap.data(), null, 2)
    );
    return { docRef, aiMessage };
  } catch (error) {
    throw new Error(`Bład zapisywania odpowiedzi AI: ${error}`);
  }
}
