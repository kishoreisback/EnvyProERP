export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "milestone" | "delay" | "completion" | "issue" | "inspection";
  status: "completed" | "in-progress" | "planned" | "delayed";
  assignedTo?: string;
  duration?: number;
  dependencies?: string[];
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  phase: string;
  startDate: string;
  endDate: string;
  status: "not-started" | "in-progress" | "completed" | "delayed" | "on-hold";
  progress: number;
  priority: "low" | "medium" | "high" | "critical";
  assignedTeam: string;
  estimatedCost: number;
  actualCost?: number;
  dependencies: string[];
}

export interface ProgressData {
  date: string;
  planned: number;
  actual: number;
  cumulative: number;
}

export interface SitePhoto {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description?: string;
  timestamp: string;
  location?: string;
  category: "progress" | "quality" | "safety" | "materials" | "equipment";
  tags: string[];
  uploadedBy: string;
}

export interface ContractorInfo {
  id: string;
  name: string;
  company: string;
  specialization: string[];
  rating: number;
  status: "active" | "inactive" | "suspended";
  contactPerson: string;
  phone: string;
  email: string;
  contractValue: number;
  assignedTasks: string[];
  performance: {
    onTime: number;
    quality: number;
    safety: number;
  };
}

export interface MaterialUsage {
  materialId: string;
  name: string;
  category: string;
  unit: string;
  planned: number;
  used: number;
  remaining: number;
  cost: number;
  supplier: string;
  deliveryDate?: string;
  quality: "approved" | "pending" | "rejected";
}

export interface QualityCheck {
  id: string;
  type: string;
  description: string;
  inspector: string;
  date: string;
  result: "pass" | "fail" | "pending";
  score?: number;
  remarks: string;
  correctionRequired: boolean;
  followUpDate?: string;
  photos: string[];
}

export interface SafetyMetric {
  id: string;
  metric: string;
  value: number;
  target: number;
  unit: string;
  trend: "improving" | "stable" | "declining";
  lastUpdated: string;
  category: "incidents" | "compliance" | "training" | "equipment";
}
