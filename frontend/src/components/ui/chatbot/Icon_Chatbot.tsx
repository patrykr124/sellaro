
import Image from "next/image";


export default function Icon_Chatbot() {

  return (
    <div
      className="bg-black shadow-md w-16 h-16 flex items-center justify-center rounded-full hover:scale-110 transition-all duration-300 cursor-pointer"
    >
     <Image src={"/logo.2.png"} width={40} height={40} alt="logo2"/>
    </div>
  );
}
