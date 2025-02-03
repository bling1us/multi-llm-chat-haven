import { Message } from "./ChatWindow";
import { cn } from "@/lib/utils";

interface MessagesProps {
  messages: Message[];
  className?: string;
}

const Messages = ({ messages, className }: MessagesProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      {messages.map((message, i) => (
        <div
          key={i}
          className={cn(
            "flex flex-col space-y-2",
            message.role === "assistant" ? "items-start" : "items-end"
          )}
        >
          <div
            className={cn(
              "rounded-lg px-4 py-2 max-w-[80%]",
              message.role === "assistant"
                ? "bg-secondary text-secondary-foreground"
                : "bg-primary text-primary-foreground"
            )}
          >
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;