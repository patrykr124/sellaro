export default function Loading() {
  return (
    <div className="flex gap-2 bg-background-gray h-10 items-center w-fit px-4 rounded-md mt-4">
      <span className="w-2 h-2 bg-black rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-black rounded-full animate-bounce delay-75"></span>
      <span className="w-2 h-2 bg-black rounded-full animate-bounce delay-100"></span>
    </div>
  );
}
