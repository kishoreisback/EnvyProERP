export interface PossessionUnit {
  id: string;
  projectId: string;
  projectName: string;
  unitNumber: string;
  unitType: "1BHK" | "2BHK" | "3BHK" | "4BHK" | "Villa" | "Penthouse";
  floor: number;
  area: number;
  facing: string;
  customer: CustomerInfo;
  possession: PossessionDetails;
  finalDues: FinalDues;
  inspection: InspectionDetails;
  handover: HandoverDetails;
  defectLiability: DefectLiabilityDetails;
  status: PossessionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  secondaryPhone?: string;
  address: string;
  panNumber: string;
  aadharNumber: string;
  registrationDate: string;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
}

export interface PossessionDetails {
  scheduledDate: string;
  actualDate?: string;
  possessionLetter: {
    generated: boolean;
    sentDate?: string;
    acknowledgedDate?: string;
    documentUrl?: string;
  };
  registrationCompleted: boolean;
  registrationDate?: string;
  loanApproved: boolean;
  loanDetails?: {
    bankName: string;
    loanAmount: number;
    approvalDate: string;
  };
}

export interface FinalDues {
  status: "pending" | "calculated" | "cleared" | "partial";
  totalDues: number;
  breakdown: DuesBreakdown[];
  paymentHistory: PaymentRecord[];
  clearanceDate?: string;
  certificateGenerated: boolean;
  certificateUrl?: string;
}

export interface DuesBreakdown {
  id: string;
  category: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "pending" | "paid" | "waived";
  paidDate?: string;
  paymentMode?: string;
  receiptNumber?: string;
}

export interface PaymentRecord {
  id: string;
  amount: number;
  paymentDate: string;
  paymentMode: "cash" | "cheque" | "online" | "card" | "rtgs";
  transactionId?: string;
  receiptNumber: string;
  collectedBy: string;
}

export interface InspectionDetails {
  status:
    | "not_started"
    | "in_progress"
    | "completed"
    | "re_inspection_required";
  scheduledDate: string;
  actualDate?: string;
  inspector: string;
  checklist: InspectionChecklistItem[];
  customerPresent: boolean;
  customerSignature?: string;
  inspectorNotes: string;
  overallRating: number;
  photosUploaded: string[];
  reportGenerated: boolean;
  reportUrl?: string;
}

export interface InspectionChecklistItem {
  id: string;
  category: string;
  item: string;
  status: "ok" | "defect" | "minor_issue" | "not_applicable";
  remarks?: string;
  photoRequired: boolean;
  photoUrls?: string[];
  priority: "low" | "medium" | "high" | "critical";
}

export interface HandoverDetails {
  status: "pending" | "ready" | "in_progress" | "completed";
  scheduledDate: string;
  actualDate?: string;
  documentsGenerated: boolean;
  documentsHandedOver: boolean;
  keysHandedOver: boolean;
  welcomeKitGiven: boolean;
  handoverChecklist: HandoverChecklistItem[];
  customerFeedback?: CustomerFeedback;
  handoverCertificate: {
    generated: boolean;
    signedByCustomer: boolean;
    signedByCompany: boolean;
    documentUrl?: string;
  };
  communicationSent: {
    welcomeEmail: boolean;
    welcomeSMS: boolean;
    handoverConfirmation: boolean;
  };
}

export interface HandoverChecklistItem {
  id: string;
  item: string;
  category: string;
  completed: boolean;
  handedOverBy: string;
  receivedBy: string;
  timestamp?: string;
  remarks?: string;
}

export interface CustomerFeedback {
  overallSatisfaction: number;
  constructionQuality: number;
  timelyDelivery: number;
  customerService: number;
  documentation: number;
  comments: string;
  recommendToFriends: boolean;
  submittedAt: string;
}

export interface DefectLiabilityDetails {
  period: number; // months
  startDate: string;
  endDate: string;
  defectReports: DefectReport[];
  maintenanceSchedule: MaintenanceSchedule[];
  warrantyItems: WarrantyItem[];
  contactPerson: {
    name: string;
    phone: string;
    email: string;
    designation: string;
  };
}

export interface DefectReport {
  id: string;
  reportedDate: string;
  category: string;
  description: string;
  severity: "low" | "medium" | "high" | "urgent";
  status: "reported" | "acknowledged" | "in_progress" | "resolved" | "closed";
  reportedBy: string;
  assignedTo: string;
  targetResolutionDate: string;
  actualResolutionDate?: string;
  resolutionDetails?: string;
  customerSatisfied: boolean;
  photosUrls: string[];
  cost: number;
}

export interface MaintenanceSchedule {
  id: string;
  type: "routine" | "preventive" | "corrective";
  description: string;
  scheduledDate: string;
  completedDate?: string;
  frequency: "monthly" | "quarterly" | "half_yearly" | "yearly";
  assignedTeam: string;
  status: "scheduled" | "completed" | "overdue" | "cancelled";
  cost: number;
  notes?: string;
}

export interface WarrantyItem {
  id: string;
  itemName: string;
  category: string;
  warrantyPeriod: number; // months
  startDate: string;
  endDate: string;
  vendor: string;
  warrantyTerms: string;
  status: "active" | "expired" | "claimed";
  claimHistory: WarrantyClaim[];
}

export interface WarrantyClaim {
  id: string;
  claimDate: string;
  description: string;
  status: "submitted" | "approved" | "rejected" | "resolved";
  claimAmount: number;
  approvedAmount?: number;
  resolutionDate?: string;
  remarks?: string;
}

export type PossessionStatus =
  | "payment_pending"
  | "dues_clearance"
  | "inspection_scheduled"
  | "inspection_completed"
  | "ready_for_handover"
  | "handover_in_progress"
  | "possession_completed"
  | "defect_liability_active";

export interface PossessionWorkflow {
  currentStage: string;
  stages: WorkflowStage[];
  overallProgress: number;
}

export interface WorkflowStage {
  id: string;
  name: string;
  description: string;
  status: "pending" | "in_progress" | "completed" | "blocked";
  startDate?: string;
  completedDate?: string;
  assignedTo: string;
  dependencies: string[];
  estimatedDuration: number; // days
  actualDuration?: number;
  documents: WorkflowDocument[];
  actions: WorkflowAction[];
}

export interface WorkflowDocument {
  id: string;
  name: string;
  type: string;
  required: boolean;
  uploaded: boolean;
  uploadedDate?: string;
  url?: string;
  version: number;
}

export interface WorkflowAction {
  id: string;
  description: string;
  type: "manual" | "automated" | "approval";
  status: "pending" | "completed";
  completedBy?: string;
  completedDate?: string;
  remarks?: string;
}

export interface PossessionAnalytics {
  totalUnits: number;
  unitsInProcess: number;
  unitsCompleted: number;
  averageCompletionTime: number;
  customerSatisfactionAvg: number;
  pendingDefects: number;
  onTimeDeliveryRate: number;
  revenueCollected: number;
  pendingDues: number;
}
