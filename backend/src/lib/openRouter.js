import ollama from "ollama";

async function getAiResponse(messages) {
  try {
    const response = await ollama.chat({
      model: "llama3.1",
      messages: messages,
      stream: false,
    });
    return response.message.content;
  } catch (error) {
    console.log(error);
    throw new Error("Nie udało się uzyskać odpowiedzi od AI");
  }
}

export default getAiResponse;
