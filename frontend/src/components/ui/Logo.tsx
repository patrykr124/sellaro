import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link className="-ml-2.5 -mt-1" href={"/"}>
      <Image
        className=""
        alt="logo"
        width={120}
        height={120}
        src={"/logo.png"}
      />
    </Link>
  );
}
