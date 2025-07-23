export interface Integration {
  id: string;
  name: string;
  category: IntegrationCategory;
  provider: string;
  status: "connected" | "disconnected" | "error" | "pending";
  description: string;
  icon: string;
  features: string[];
  config: IntegrationConfig;
  lastSync?: string;
  usage?: IntegrationUsage;
  webhookUrl?: string;
  apiVersion?: string;
}

export type IntegrationCategory =
  | "marketing"
  | "sales"
  | "erp"
  | "communication"
  | "maps"
  | "signature"
  | "storage";

export interface IntegrationConfig {
  apiKey?: string;
  apiSecret?: string;
  webhookSecret?: string;
  baseUrl?: string;
  region?: string;
  customFields?: Record<string, any>;
  syncFrequency?: "realtime" | "hourly" | "daily" | "weekly";
  enabledFeatures?: string[];
}

export interface IntegrationUsage {
  apiCalls: number;
  apiLimit: number;
  dataTransferred: number;
  lastActivity: string;
  errors: number;
}

export interface SyncLog {
  id: string;
  integrationId: string;
  timestamp: string;
  status: "success" | "failed" | "partial";
  recordsProcessed: number;
  errors?: string[];
  duration: number;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  type: "email" | "sms" | "whatsapp";
  status: "draft" | "active" | "paused" | "completed";
  integration: string;
  audience: number;
  sent: number;
  opened: number;
  clicked: number;
  createdAt: string;
  scheduledAt?: string;
}

export interface CRMLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: "new" | "qualified" | "contacted" | "converted";
  location?: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  assignedTo?: string;
  lastActivity: string;
  value?: number;
}

export interface Document {
  id: string;
  name: string;
  type: "contract" | "agreement" | "proposal" | "invoice";
  status: "draft" | "sent" | "viewed" | "signed" | "completed";
  signatureProvider?: string;
  storageProvider?: string;
  url?: string;
  recipients: Array<{
    email: string;
    name: string;
    status: "pending" | "signed";
    signedAt?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface ERPSyncData {
  customers: number;
  orders: number;
  products: number;
  lastSync: string;
  errors: string[];
}
