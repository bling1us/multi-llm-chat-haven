import { useState } from "react";
import ChatWindow from "@/components/chat/ChatWindow";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const Index = () => {
  const [chatWindows, setChatWindows] = useState([{ id: 1 }]);

  const addChatWindow = () => {
    setChatWindows((prev) => [...prev, { id: Date.now() }]);
  };

  const removeChatWindow = (id: number) => {
    setChatWindows((prev) => prev.filter(window => window.id !== id));
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">AI Playground</h1>
        <Button onClick={addChatWindow} variant="outline" size="sm">
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Model
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chatWindows.map((window) => (
          <ChatWindow 
            key={window.id} 
            onDelete={() => removeChatWindow(window.id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Index;