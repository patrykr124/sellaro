"use client";
import { message_chat_type } from "@/app/type/message_chat_type";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import Loading from "./Loading";
import LoadingMessage from "./LoadingMessage";
import { db } from "@/lib/firebase/firebase";
import { BotIcon } from "lucide-react";
import Recommendation_products from "./recommendation_product/Recommendation_products";
import { useAuth } from "@/lib/firebase/AuthProvider";

export default function Middle_chat() {
  const [conntent, setConntent] = useState<message_chat_type[]>([]);
  const [loadingAiConntent, setLoadingAiConntent] = useState(false);
  const [loadingAllContent, setLoadingAllContent] = useState(false);
  const [error, setError] = useState(false);
  const { user: userId } = useAuth();
  const autoScroll = useRef<HTMLDivElement>(null);

  const formatTimestamp = (time: Timestamp) => {
    if (!time) return "";
    const date = time.toDate();
    const day = date.getDay().toString().padStart(2, "0");
    const month = date.getMonth().toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString();
    const min = date.getMinutes().toString();
    return `${hours}:${min} | ${day}.${month}.${year}`;
  };

  useEffect(() => {
    if (!userId) {
      console.log("Użytkownik nie jest zalogowany")
      setLoadingAllContent(true);
      setError(true)
      return;
    }
    setLoadingAllContent(true);
    const q = query(collection(db, "messages"), where("userId", "==", userId?.uid), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const newMessages: message_chat_type[] = [];
        querySnapshot.forEach((doc) => {
          newMessages.push({ id: doc.id, ...doc.data() } as message_chat_type);
        });
        setConntent(newMessages);
        setLoadingAllContent(false);
        setError(false);
      },
      (error) => {
        console.log(error);
        setLoadingAllContent(false);
        setError(true);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [userId]);

  useEffect(() => {
    if (autoScroll.current) {
      autoScroll.current.scrollTop = autoScroll.current.scrollHeight;
    }
  }, [conntent, loadingAiConntent]);

  useEffect(() => {
    const lastContent = conntent[conntent.length - 1];
    const aiConntent = lastContent && lastContent.role !== "ai";
    if (aiConntent) {
      setLoadingAiConntent(true);
    } else {
      setLoadingAiConntent(false);
    }
  }, [conntent]);

  return (
    <div
      ref={autoScroll}
      className="h-[550px] p-4 overflow-x-hidden overflow-y-auto  space-y-2.5"
    >
      {loadingAllContent ? (
        <LoadingMessage />
      ) : (
        conntent.map((item: message_chat_type) => {
          return (
            <div
              className={`${item.role === "user" ? " items-end " : "items-start"
                } flex flex-col w-full`}
              key={item.id}
            >
              <div
                className={`w-full ${item.role === "ai" ? "" : "items-end"
                  } flex flex-col`}
              >
                <div className="flex items-end justify-end gap-2">
                  {item.role === "ai" && (
                    <div className="p-1.5 items-center justify-center bg-background-gray min-w-9 max-w-9 flex h-9 rounded-full">
                      <BotIcon size={18} />
                    </div>
                  )}
                  <div className="w-full">
                    {item.role === "ai" ? (
                      <p className="font-light text-sm mb-0.5">Sellaro</p>
                    ) : (
                      <p className="font-light text-sm mb-0.5 text-end">User</p>
                    )}
                    <p
                      className={`${item.role === "ai"
                        ? ` bg-background-gray p-2.5 rounded-tl-md  whitespace-pre-line ${item.products && item.products?.length > 0
                          ? "w-full rounded-t-md"
                          : "w-fit rounded-r-md"
                        } `
                        : " border-[0.1px]  w-fit p-2.5 rounded-tl-md rounded-l-md rounded-t-md bg-purple text-white   "
                        }`}
                    >
                      {item.content}
                    </p>

                    {item.role === "ai" &&
                      item.products &&
                      item.products.length > 0 && (
                        <Recommendation_products products={item.products} />
                      )}
                  </div>
                </div>
                <p className="text-[10px] mt-0.5 text-end text-black/50">
                  {formatTimestamp(item.createdAt)}
                </p>
              </div>
            </div>
          );
        })
      )}
      {!error && loadingAiConntent && <Loading />}
      {error && <div className="error_message">Błąd pobierania wiadomości, odśwież!</div>}
    </div>
  );
}
