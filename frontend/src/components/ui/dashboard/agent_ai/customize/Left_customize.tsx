"use client";
import PDF from "@/components/ui/icons/PDF";
import SpinLoading from "@/components/ui/SpinLoading";
import { fetchPdfs } from "@/hooks/api/usePdfs";
import { useQuery } from "@tanstack/react-query";

export default function Left_customize() {
  const { isPending, error, data } = useQuery({
    queryKey: ["pdfs"],
    queryFn: fetchPdfs,
  });

  return (
    <div className="h-full bg-accent rounded-lg border-[1px] p-8">
      {!error && isPending ? (
        <div className="w-full items-center mt-12 justify-center flex">
          <SpinLoading />
        </div>
      ) : (
        <div className="">
          <div className="pb-8">
            <h3>Uploaded documents:</h3>
          </div>
          <div className="text-black space-y-2.5">
            {data &&
              data.existingFiles.map((item) => (
                <div key={item} className="flex gap-1.5">
                  <PDF />
                  <p>{item}</p>
                </div>
              ))}
            {data && data.existingFiles.length === 0 && (
              <p className="p-4 bg-background-gray border-dashed border-2 rounded-lg">
                No documents uploaded yet.
              </p>
            )}
          </div>
        </div>
      )}
      {error && (
        <div className="w-full items-center mt-12 justify-center flex">
          <p className="text-red-500">Error fetching PDFs</p>
        </div>
      )}
    </div>
  );
}
