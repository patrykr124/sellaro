import Image from "next/image";
import { Button } from "../button";

export default function Header_main() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <div className=" wrapper flex rounded-3xl relative h-[86vh] w-full z-10 justify-between">
        <div className="flex items-center">
          <div className=" space-y-6 ">
            <h1 className="bg-opacity-50 md:mt-20 text-6xl md:text-[7rem] xl:text-[10rem] 2xl:text-[12rem] uppercase  text-black   font-bold ">
              <span className="animate-spotlight">Your</span>
              <br></br>
              <span className="animate-spotlight">Smart</span>
              <br></br>
              <span className="animate-spotlight">Chatbot</span>
            </h1>
            <p className="text-neutral-600  max-w-xl font-semibold ">
              Smart AI chatbot that answers, recommends, and supports — in real
              time.
            </p>
            <div className="space-x-4 ">
              <Button className="" variant="secondary">
                Start free trial
              </Button>
              <Button className="" variant="outline">
                Start free trial
              </Button>
            </div>
          </div>
        </div>
        <div className=" items-center  flex justify-center mr-0 2xl:mr-30 translate-y-10">
          <Image
            className=""
            alt="iphone"
            src={"/iphone.png"}
            width={350}
            height={350}
          />
        </div>
      </div>
      <div className=""></div>
    </div>
  );
}
