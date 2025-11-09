import Body from "@/components/ui/chatbot/body/Body";

import Icon_Chatbot from "@/components/ui/chatbot/Icon_Chatbot";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


export default function Chatbot_layout() {
  return (
    <div className="fixed bottom-8 right-8">
    <Popover>
      <PopoverTrigger className="relative">
        <Icon_Chatbot />
      </PopoverTrigger>
      <PopoverContent>
        <Body />
      </PopoverContent>
    </Popover>
  </div>
  )
}