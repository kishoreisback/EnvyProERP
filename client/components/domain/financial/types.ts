export interface FinancialData {
  revenue: number;
  expenses: number;
  profit: number;
  margin: number;
  period: string;
  growth?: number;
}

export interface CashFlowData {
  date: string;
  inflow: number;
  outflow: number;
  net: number;
  balance: number;
}

export interface RevenueData {
  source: string;
  amount: number;
  percentage: number;
  growth: number;
  period: string;
}

export interface ExpenseData {
  category: string;
  amount: number;
  budget: number;
  variance: number;
  trend: "increasing" | "decreasing" | "stable";
}

export interface BudgetData {
  category: string;
  budgeted: number;
  actual: number;
  variance: number;
  variancePercent: number;
  status: "under" | "over" | "on-track";
}

export interface PaymentInfo {
  id: string;
  type: "receivable" | "payable";
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue" | "partial";
  client: string;
  description: string;
  paymentMethod?: string;
}

export interface TaxInfo {
  type: string;
  rate: number;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  description: string;
}
