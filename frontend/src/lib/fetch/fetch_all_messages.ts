import { message_chat_type } from "@/app/type/message_chat_type";

export async function fetchMessages(): Promise<message_chat_type[]> {
  const res = await fetch("/api/chat");
  return res.json();
}
