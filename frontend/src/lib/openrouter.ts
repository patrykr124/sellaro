import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API,
});
export async function getAiResponse(messages: ChatCompletionMessageParam[]) {
  const completion = await openai.chat.completions.create({
    model: "z-ai/glm-4.5-air:free",
    messages,
  });

  if (
    !completion.choices ||
    !Array.isArray(completion.choices) ||
    !completion.choices[0]?.message?.content
  ) {
    console.error("Brak prawidłowej odpowiedzi AI:", completion);
    return "Przepraszam, nie udało się uzyskać odpowiedzi AI.";
  }
  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
}
