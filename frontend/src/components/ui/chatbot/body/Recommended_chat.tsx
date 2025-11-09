import { recommended } from "@/data/recommended_data";

export default function Recommended_chat() {
  return (
    <div className="flex whitespace-nowrap gap-1.5">
      {recommended.map((item) => (
        <p
          key={item.id}
          className="border-[0.5px] border-black/80 font-medium rounded-md py-0.5 px-2 cursor-pointer hover:bg-background-gray-2"
        >
          {item.title}
        </p>
      ))}
    </div>
  );
}
