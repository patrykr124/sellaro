"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../button";

const imageData = [
  {
    id: 1,
    url: "/benefits/benefits1.webp",
  },
  {
    id: 2,
    url: "/benefits/benefits2.webp",
  },
  {
    id: 3,
    url: "/benefits/benefits3.webp",
  },
];

export default function Benefits() {
  const [active, setActive] = useState<number | null>(0);
  const [image, setImage] = useState<string>(imageData[0].url);
  const [imageAnimation, setImageAnimation] = useState(false);

  useEffect(() => {
    setImageAnimation(true);

    const time = setTimeout(() => {
      if (active === 0) {
        setImage(imageData[0].url);
      } else if (active === 1) {
        setImage(imageData[1].url);
      } else if (active === 2) {
        setImage(imageData[2].url);
      }
      setImageAnimation(false);
    }, 200);
    return () => {
      clearTimeout(time);
    };
  }, [active]);

  return (
    <section className="wrapper grid grid-cols-2 gap-20 bg-background-gray rounded-3xl py-24 space-y-20">
      <div className="benefits_info flex h-[700px] w-full relative rounded-md text-black ">
        <Image
          className={`${
            imageAnimation ? "opacity-0" : "opacity-100"
          } transition-all duration-500 rounded-md`}
          src={image}
          fill
          objectFit="cover"
          alt="benefits"
        />
        <div className="absolute bottom-4 -right-10">
             <Button className="" variant="secondary">Start free trial</Button>
        </div>
      </div>
      <div className="text-black space-y-12">
        <h2 className=" text-7xl uppercase text-end font-medium">
          Get Better Results with
          <span className="text-8xl">
            <br></br>AI Support
          </span>
        </h2>
        <div className="text-end flex flex-col gap-8 items-end ">
          <div
            onClick={() => setActive(0)}
            className={`py-4 border-b ${
              active === 0 ? "border-black" : ""
            } flex flex-col items-end cursor-pointer `}
          >
            <h3
              className={`uppercase ${active === 0 ? "" : "text-neutral-500"}`}
            >
              Bot-to-Human
            </h3>
            <p
              className={`${
                active === 0 ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
              } transition-all duration-500 w-2/3`}
            >
              Seamless transition of a conversation from an automated chatbot to
              a human operator or agent
            </p>
          </div>

          <div
            onClick={() => setActive(1)}
            className={`py-4 border-b ${
              active === 1 ? "border-black" : ""
            } flex flex-col items-end cursor-pointer `}
          >
            <h3
              className={` ${active === 1 ? "" : "text-neutral-500"} uppercase`}
            >
              Bot-to-Human
            </h3>
            <p
              className={`${
                active === 1 ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
              } transition-all duration-500 w-2/3 `}
            >
              Seamless transition of a conversation from an automated chatbot to
              a human operator or agent
            </p>
          </div>
          <div
            onClick={() => setActive(2)}
            className={`py-4 border-b ${
              active === 2 ? "border-black" : ""
            } flex flex-col items-end cursor-pointer `}
          >
            <h3
              className={`${active === 2 ? "" : "text-neutral-500"} uppercase`}
            >
              Bot-to-Human
            </h3>
            <p
              className={`${
                active === 2 ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
              } transition-all duration-500 w-2/3 `}
            >
              Seamless transition of a conversation from an automated chatbot to
              a human operator or agent
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
