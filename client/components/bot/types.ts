export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "text" | "quick_reply" | "card";
  metadata?: any;
}

export interface QuickReply {
  text: string;
  value: string;
}

export interface BotResponse {
  text: string;
  quickReplies?: QuickReply[];
  type?: "text" | "card" | "list";
  metadata?: any;
}

export interface KnowledgeItem {
  keywords: string[];
  response: string;
  category: string;
  quickReplies?: QuickReply[];
}

export interface BotContext {
  userLocation?: string;
  userType?: "customer" | "agent" | "admin";
  currentPage?: string;
  previousQuestions?: string[];
}
