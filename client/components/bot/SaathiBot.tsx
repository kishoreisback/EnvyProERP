import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  MessageCircle,
  Send,
  Minimize2,
  Maximize2,
  X,
  Bot,
  User,
  Sparkles,
  Zap,
  Globe,
  TrendingUp,
  Home,
  Building2,
} from "lucide-react";
import { AnimatedIcon } from "../ui/animated-icons";
import { ChatMessage, QuickReply } from "./types";
import { IndianMarketBot } from "./knowledgeBase";

interface SaathiBotProps {
  className?: string;
}

export function SaathiBot({ className }: SaathiBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const bot = useRef(new IndianMarketBot());

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send welcome message
      const welcomeResponse = bot.current.getWelcomeMessage();
      const welcomeMessage: ChatMessage = {
        id: "welcome",
        text: welcomeResponse.text,
        sender: "bot",
        timestamp: new Date(),
        type: "text",
        metadata: { quickReplies: welcomeResponse.quickReplies },
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(
      () => {
        const botResponse = bot.current.generateResponse(text);
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: botResponse.text,
          sender: "bot",
          timestamp: new Date(),
          type: botResponse.type || "text",
          metadata: { quickReplies: botResponse.quickReplies },
        };

        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      },
      1000 + Math.random() * 1000,
    ); // Random delay between 1-2 seconds
  };

  const handleQuickReply = (reply: QuickReply) => {
    handleSendMessage(reply.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (!isOpen) {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="relative">
            <Zap className="h-6 w-6 text-white" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-ping"></div>
          </div>
        </Button>
        <div className="absolute -top-12 right-0 bg-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Ask Saathi - Your Business Companion
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <Card
        className={`w-96 shadow-2xl border-2 border-blue-200 transition-all duration-300 ${
          isMinimized ? "h-16" : "h-[500px]"
        }`}
      >
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Zap className="h-8 w-8" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full"></div>
              </div>
              <div>
                <CardTitle className="text-lg">Saathi</CardTitle>
                <p className="text-xs opacity-90">Your Business Companion</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20"
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4" />
                ) : (
                  <Minimize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[calc(500px-80px)]">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-blue-50/30 to-white">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] ${message.sender === "user" ? "order-1" : ""}`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-blue-600 to-orange-500 text-white"
                          : "bg-white border border-blue-200 shadow-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>

                    {/* Quick Replies */}
                    {message.sender === "bot" &&
                      message.metadata?.quickReplies && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {message.metadata.quickReplies.map(
                            (reply: QuickReply, index: number) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuickReply(reply)}
                                className="text-xs border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                              >
                                {reply.text}
                              </Button>
                            ),
                          )}
                        </div>
                      )}

                    <div
                      className={`flex items-center gap-1 mt-1 ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.sender === "bot" ? (
                        <Zap className="h-3 w-3 text-blue-600" />
                      ) : (
                        <User className="h-3 w-3 text-blue-500" />
                      )}
                      <span className="text-xs text-gray-500">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-blue-200 rounded-lg px-4 py-2 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-600" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        Saathi is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-blue-200 p-4 bg-white">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about Indian markets, real estate, business..."
                  className="flex-1 border-blue-200 focus:ring-blue-500 focus:border-blue-500"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendMessage("property rates")}
                  className="text-xs border-blue-200 hover:bg-blue-50"
                >
                  <Home className="h-3 w-3 mr-1" />
                  Property Rates
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendMessage("market trends")}
                  className="text-xs border-blue-200 hover:bg-blue-50"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Market Trends
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendMessage("business help")}
                  className="text-xs border-blue-200 hover:bg-blue-50"
                >
                  <Building2 className="h-3 w-3 mr-1" />
                  Business
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
