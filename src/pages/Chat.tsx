import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, Bot, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm your wellness companion. I'm here to listen and support you. How are you feeling today? 💙",
      sender: "ai",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "Thank you for sharing that with me. Your feelings are completely valid. 💙",
      "I hear you, and I want you to know that you're not alone in this journey. 🌟",
      "That sounds challenging. Remember that every small step forward is progress. 🌱",
      "I appreciate you opening up. How would you like to explore this feeling together? 💫",
      "Your awareness of these emotions shows real strength. What usually helps you feel better? 🌈",
      "It's okay to feel this way. Would you like to try a brief mindfulness exercise together? 🧘‍♀️",
    ];
    
    // Simple keyword-based responses for crisis detection
    const concernKeywords = ["suicide", "hurt myself", "end it all", "can't go on", "hopeless"];
    const hasConcern = concernKeywords.some(keyword => 
      userMessage.toLowerCase().includes(keyword)
    );
    
    if (hasConcern) {
      return "I'm concerned about what you're sharing. Please know that you matter and there are people who want to help. Consider reaching out to a crisis helpline: 988 (Suicide & Crisis Lifeline) or text HOME to 741741. You don't have to go through this alone. 💙";
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(input),
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full gradient-wellness flex items-center justify-center">
            <Bot className="w-4 h-4 text-wellness-foreground" />
          </div>
          <div>
            <h1 className="font-semibold">Wellness Companion</h1>
            <p className="text-xs text-muted-foreground">Always here to listen</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full gradient-wellness flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-wellness-foreground" />
              </div>
            )}
            
            <Card className={`max-w-[80%] p-3 shadow-soft ${
              message.sender === 'user' 
                ? 'gradient-primary text-primary-foreground ml-12' 
                : 'bg-card'
            }`}>
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className={`text-xs mt-2 opacity-70 ${
                message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
              }`}>
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </Card>

            {message.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full gradient-wellness flex items-center justify-center flex-shrink-0 mt-1">
              <Bot className="w-4 h-4 text-wellness-foreground" />
            </div>
            <Card className="max-w-[80%] p-3 shadow-soft bg-card">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind..."
            className="flex-1 rounded-xl shadow-soft"
            disabled={isTyping}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="rounded-xl shadow-soft"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          This is a supportive space. For crisis support, call 988 or text HOME to 741741
        </p>
      </div>
    </div>
  );
};

export default Chat;