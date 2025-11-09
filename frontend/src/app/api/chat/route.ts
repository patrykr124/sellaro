// import { NextRequest, NextResponse } from "next/server";
// import { getAiResponse } from "@/lib/openrouter";
// import {
//   addDoc,
//   collection,
//   getDocs,
//   orderBy,
//   query,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db } from "@/lib/firebase/firebase";

// export async function POST(req: NextRequest) {
//   const { content } = await req.json();

//   await addDoc(collection(db, "messages"), {
//     role: "user",
//     content: content,
//     createdAt: serverTimestamp(),
//   });

//   void (async () => {
//     // 3. W tle pobierz całą historię i wygeneruj AI
//     const q = query(collection(db, "messages"), orderBy("createdAt"));
//     const querySnapshot = await getDocs(q);
//     const messages = querySnapshot.docs.map(doc => {
//         const data = doc.data();
//         return {
//           role: data.role,
//           content: data.content,
//         };
//       }).filter(msg => msg.role && msg.content);
      
//       if (!messages.length) {
//         console.error("Brak wiadomości do AI!");
//         return;
//       }

//       const mappedMessages = messages.map(msg => ({
//         role: msg.role === "ai" ? "assistant" : msg.role,
//         content: msg.content,
//       }));

//     const aiResponseApi = await getAiResponse(mappedMessages);

//     await addDoc(collection(db, "messages"), {
//       role: "ai",
//       content: aiResponseApi,
//       createdAt: serverTimestamp(),
//     });
//   })();

//   return NextResponse.json({ status: "ok" });
// }
