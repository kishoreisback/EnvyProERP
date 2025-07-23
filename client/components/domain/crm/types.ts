export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status:
    | "new"
    | "contacted"
    | "qualified"
    | "proposal"
    | "negotiation"
    | "closed"
    | "lost";
  score: number;
  value: number;
  assignedTo: string;
  createdAt: string;
  lastActivity: string;
  nextFollowUp?: string;
  location: string;
  priority: "low" | "medium" | "high" | "urgent";
  tags: string[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "individual" | "family" | "corporate";
  category: "premium" | "standard" | "vip" | "new";
  status: "active" | "inactive" | "prospect" | "lost" | "churned";
  totalValue: number;
  lastPurchase?: string;
  acquisitionDate: string;
  location: string;
  segment: string;
  ltv: number; // Lifetime Value
}

export interface Deal {
  id: string;
  title: string;
  client: string;
  value: number;
  probability: number;
  stage:
    | "prospecting"
    | "qualification"
    | "proposal"
    | "negotiation"
    | "closed-won"
    | "closed-lost";
  assignedTo: string;
  startDate: string;
  expectedCloseDate: string;
  actualCloseDate?: string;
  products: string[];
  notes: string;
}

export interface Property {
  id: string;
  title: string;
  type: "apartment" | "villa" | "plot" | "commercial" | "warehouse";
  status: "available" | "sold" | "reserved" | "under-construction";
  price: number;
  area: number;
  location: string;
  amenities: string[];
  images: string[];
  description: string;
  developer: string;
  completionDate?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  designation: string;
  department: string;
  type: "lead" | "customer" | "partner" | "vendor";
  lastInteraction: string;
  notes: string[];
  tags: string[];
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  value: number;
  probability: number;
  stage: string;
  expectedDate: string;
  contact: string;
  source: string;
  products: string[];
}

export interface SalesData {
  period: string;
  revenue: number;
  deals: number;
  leads: number;
  conversion: number;
  avgDealSize: number;
}

export interface ActivityData {
  id: string;
  type: "call" | "email" | "meeting" | "demo" | "proposal" | "follow-up";
  description: string;
  contact: string;
  date: string;
  duration?: number;
  outcome: "positive" | "neutral" | "negative";
  nextAction?: string;
}
