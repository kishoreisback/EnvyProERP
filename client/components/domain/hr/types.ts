export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  manager: string;
  joinDate: string;
  status: "active" | "inactive" | "on-leave" | "terminated";
  avatar?: string;
  location: string;
  employeeId: string;
  salary: number;
  performanceRating: number;
  skills: string[];
}

export interface AttendanceData {
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: "present" | "absent" | "late" | "half-day" | "holiday";
  workingHours: number;
  overtimeHours: number;
  location?: string;
}

export interface PerformanceData {
  employeeId: string;
  period: string;
  rating: number;
  goalsAchieved: number;
  totalGoals: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  nextReviewDate: string;
}

export interface LeaveData {
  id: string;
  employeeId: string;
  type: "annual" | "sick" | "maternity" | "paternity" | "casual" | "emergency";
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  approver?: string;
}

export interface PayrollData {
  employeeId: string;
  period: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  tax: number;
  pf: number;
  bonus?: number;
  overtime?: number;
}

export interface DepartmentData {
  id: string;
  name: string;
  head: string;
  employeeCount: number;
  budget: number;
  utilization: number;
  avgSalary: number;
  avgRating: number;
}

export interface RecruitmentData {
  id: string;
  position: string;
  department: string;
  applicants: number;
  interviewed: number;
  offered: number;
  hired: number;
  status: "open" | "closed" | "on-hold";
  startDate: string;
  targetDate: string;
}
