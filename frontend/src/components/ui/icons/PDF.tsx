import Image from "next/image";

export default function PDF() {
  return (
    <div>
        <Image width={20} height={20} objectFit="cover" src={"/icon/pdf.png"} alt="pdf_icon"/>
    </div>
  )
}