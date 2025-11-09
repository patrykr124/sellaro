"use client";
import { Input } from "@/components/ui/input";
import SpinLoading from "@/components/ui/SpinLoading";
import { FileSpreadsheetIcon } from "lucide-react";
import { useRef, useState } from "react";

export default function Right_customize() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  function handleClick() {
    inputRef.current?.click();
  }

  function handleFileSend(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    setLoading(true);
    const formatData = new FormData();
    formatData.append("file", file);

    fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}load_files`, {
      method: "POST",
      body: formatData,
    })
      .then((res) => res.json())
      .then((data) => alert(data.message || "Upload zakończony"))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  return (
    <div className="col-span-2 flex flex-col items-center justify-center">
      <div className="h-1/2 w-3/4 flex flex-col items-center justify-center gap-4">
        <h2 className="text-center">Add files to learn your chatbot</h2>
        <p className="text-center">
          Add your own PDF files containing company knowledge or important
          content for your chatbot. After uploading, please wait for the
          processing to complete. Our system will automatically convert PDF
          content into datasets for optimal chatbot training.
        </p>
        <Input
          onChange={handleFileSend}
          accept="application/pdf"
          ref={inputRef}
          type="file"
          className="hidden"
        />
      </div>
      {loading ? (
        <div className="flex bg-accent items-center justify-center px-4 py-2 rounded-lg gap-4 border-dashed border-2">
          <SpinLoading />
          <span className="text-black/60">Loading...</span>
        </div>
      ) : (
        <div className="h-1/2 w-full flex item-end justify-center">
          <div
            onClick={handleClick}
            className="h-1/2 w-1/2 cursor-pointer hover:bg-background-gray bg-accent flex-col gap-1.5 flex items-center justify-center border-2 rounded-lg border-dashed"
          >
            <FileSpreadsheetIcon color="gray" />
            <p className="text-black/50">ADD PDF</p>
          </div>
        </div>
      )}
    </div>
  );
}
