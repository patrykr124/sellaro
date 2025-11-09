import Left_customize from "@/components/ui/dashboard/agent_ai/customize/Left_customize";
import Right_customize from "@/components/ui/dashboard/agent_ai/customize/Right_customize";

export default function page() {
  return (
    <section className="p-8 grid grid-cols-3 h-full text-black gap-4">
      <Left_customize />
      <Right_customize />
    </section>
  );
}
