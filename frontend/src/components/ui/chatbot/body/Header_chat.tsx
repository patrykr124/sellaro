"use client";
import { Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Header_chat() {
  const [clickSound, setClickSound] = useState(false);
  function handleSound() {
    setClickSound((prev) => !prev);
  }
  return (
    <header className="border-b-[0.5px] justify-between items-center flex p-4 gap-2 border-black/20 ">
      <div className="flex gap-2 ">
        <Image src={"/logo.2.png"} alt="logo" width={30} height={30} />
        <div className="">
          <p className="font-semibold">Sellaro</p>
          <p className="text-xs">I am to help you!</p>
        </div>
      </div>
      <button onClick={handleSound} className="cursor-pointer">
        {!clickSound ? <Volume2 size={24} strokeWidth={1.5} /> : <VolumeX  size={24} strokeWidth={1.5}  />}
      </button>
    </header>
  );
}
