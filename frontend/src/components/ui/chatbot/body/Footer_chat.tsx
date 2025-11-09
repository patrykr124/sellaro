"use client";
import { Send } from "lucide-react";

import Logo_chat from "./Logo_chat";
import { useState } from "react";
import { useAuth } from "@/lib/firebase/AuthProvider";

export default function Footer_chat() {
  const [contentMessage, setContentMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!contentMessage.trim()) return;
    if (!user) {
      console.error("Użytkownik nie jest zalogowany!")
      return;
    }

    try {
      setLoading(true);
      setContentMessage("");
      const LOCAL_HOST = process.env.NEXT_PUBLIC_LOCALHOST;
      await fetch(`${LOCAL_HOST}createmessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: contentMessage, userId: user }),
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
      setContentMessage("");
    }
  }

  return (
    <div className=" shadow-[0_-4px_8px_-6px_rgba(0,0,0,0.4)]">
      <div className="h-[120px] px-4 flex flex-col justify-center ">
        <div className="overflow-hidden flex flex-col items-center justify-between h-full gap-1.5">
          <div className="flex justify-end">{/* <Recommended_chat /> */}</div>
          <form onSubmit={handleSubmit} className="relative w-full flex ">
            <textarea
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              value={contentMessage}
              onChange={(e) => setContentMessage(e.target.value)}
              placeholder="Type your message here..."
              className={`${loading && "bg-background-gray "
                } border-[0.5px] outline-none   pt-3 px-2 rounded-lg w-full max-h-[50px] resize-none  border-black/20  `}
            />
            <button
              type="submit"
              className=" absolute top-3 right-3 cursor-pointer hover:scale-105 transition-all duration-200"
            >
              <Send className={`${loading && " text-black/20   "} `} />
            </button>
          </form>
          <Logo_chat />
        </div>
      </div>
    </div>
  );
}
