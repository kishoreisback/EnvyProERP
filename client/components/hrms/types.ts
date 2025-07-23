// HRMS Types for Multi-Tenant Support

export interface TenantEmployee {
  id: string;
  tenantId: string;
  employeeId: string; // Company-specific employee ID

  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other" | "prefer_not_to_say";
  nationality: string;
  maritalStatus: "single" | "married" | "divorced" | "widowed";

  // Address
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };

  // Employment Details
  designation: string;
  department: string;
  reportingTo?: string; // Employee ID of manager
  joinDate: string;
  employmentType: "full_time" | "part_time" | "contract" | "intern";
  workLocation: "office" | "remote" | "hybrid";
  status: "active" | "inactive" | "terminated" | "on_leave";

  // Compensation
  salary: {
    basic: number;
    allowances: number;
    currency: "INR" | "USD" | "EUR";
    payFrequency: "monthly" | "bi_weekly" | "weekly";
  };

  // Skills & Experience
  skills: string[];
  experience: {
    total: number; // in years
    atCompany: number; // in years
  };

  // Performance
  rating: number; // 1-5
  lastAppraisal: string;
  nextAppraisal: string;

  // Leave Balances
  leaveBalances: {
    annual: number;
    sick: number;
    casual: number;
    maternity?: number;
    paternity?: number;
  };

  // Documents
  documents: TenantEmployeeDocument[];

  // Attendance & Time Tracking
  attendanceId?: string;
  shiftPattern?: string;

  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy: string;

  // Tenant-specific custom fields
  customFields?: Record<string, any>;

  // Permissions
  permissions: TenantEmployeePermissions;
}

export interface TenantEmployeeDocument {
  id: string;
  tenantId: string;
  employeeId: string;
  type:
    | "resume"
    | "id_proof"
    | "address_proof"
    | "educational"
    | "experience"
    | "contract"
    | "other";
  name: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  verified: boolean;
  expiryDate?: string;
}

export interface TenantEmployeePermissions {
  canView: string[]; // Role IDs or user IDs
  canEdit: string[];
  canViewSalary: string[];
  canApproveLeave: string[];
  canManageDocuments: string[];
}

export interface TenantDepartment {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  headOfDepartment?: string; // Employee ID
  budget?: number;
  location?: string;
  isActive: boolean;
  employeeCount: number;
  createdAt: string;
}

export interface TenantAttendance {
  id: string;
  tenantId: string;
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: "present" | "absent" | "late" | "half_day" | "work_from_home";
  hoursWorked?: number;
  overtimeHours?: number;
  location?: "office" | "remote" | "field";
  notes?: string;
  approvedBy?: string;
}

export interface TenantLeaveRequest {
  id: string;
  tenantId: string;
  employeeId: string;
  leaveType:
    | "annual"
    | "sick"
    | "casual"
    | "maternity"
    | "paternity"
    | "unpaid";
  startDate: string;
  endDate: string;
  duration: number; // in days
  reason: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectionReason?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface TenantPayroll {
  id: string;
  tenantId: string;
  employeeId: string;
  month: string; // YYYY-MM format
  basic: number;
  allowances: number;
  overtime: number;
  bonus: number;
  deductions: {
    tax: number;
    pf: number;
    insurance: number;
    other: number;
  };
  netPay: number;
  status: "draft" | "processed" | "paid";
  processedDate?: string;
  paidDate?: string;
  payslipUrl?: string;
}

export interface TenantHRMSAnalytics {
  tenantId: string;
  period: {
    startDate: string;
    endDate: string;
  };

  // Employee Metrics
  employeeStats: {
    total: number;
    active: number;
    newHires: number;
    terminations: number;
    turnoverRate: number;
  };

  // Attendance Metrics
  attendanceStats: {
    averageAttendance: number;
    totalPresent: number;
    totalAbsent: number;
    lateComers: number;
    overtimeHours: number;
  };

  // Leave Metrics
  leaveStats: {
    totalRequests: number;
    approved: number;
    pending: number;
    rejected: number;
    averageLeaveDays: number;
  };

  // Department Breakdown
  departmentStats: {
    departmentId: string;
    departmentName: string;
    employeeCount: number;
    attendanceRate: number;
    avgSalary: number;
  }[];

  // Performance Metrics
  performanceStats: {
    avgRating: number;
    topPerformers: number;
    improvementNeeded: number;
    pendingAppraisals: number;
  };

  // Financial Metrics
  payrollStats: {
    totalPayroll: number;
    avgSalary: number;
    totalOvertimePay: number;
    totalDeductions: number;
  };
}

export interface TenantJobRequisition {
  id: string;
  tenantId: string;
  title: string;
  department: string;
  reportingTo: string;
  location: string;
  employmentType: "full_time" | "part_time" | "contract" | "intern";
  experience: {
    min: number;
    max: number;
  };
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  benefits: string[];
  status: "draft" | "open" | "closed" | "on_hold";
  priority: "low" | "medium" | "high" | "urgent";
  createdBy: string;
  createdAt: string;
  deadline?: string;
  applicants: number;
  hired: number;
}

export interface TenantCandidate {
  id: string;
  tenantId: string;
  jobRequisitionId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resumeUrl?: string;
  experience: number;
  skills: string[];
  currentSalary?: number;
  expectedSalary?: number;
  noticePeriod?: number;
  status:
    | "applied"
    | "screening"
    | "interview"
    | "offer"
    | "hired"
    | "rejected";
  appliedDate: string;
  interviewScheduled?: string;
  notes?: string;
  rating?: number;
}

// Form interfaces for various HRMS operations
export interface EmployeeForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  joinDate: string;
  salary: number;
  employmentType: string;
  workLocation: string;
}

export interface LeaveRequestForm {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface AttendanceFilter {
  startDate?: string;
  endDate?: string;
  department?: string;
  status?: string;
  employee?: string;
}

export interface PayrollFilter {
  month?: string;
  department?: string;
  status?: string;
  minSalary?: number;
  maxSalary?: number;
}

// HRMS Dashboard Tab Types
export type HRMSTab =
  | "overview"
  | "employees"
  | "attendance"
  | "leave"
  | "payroll"
  | "recruitment"
  | "performance"
  | "analytics";

// Permission types for HRMS
export type HRMSPermission =
  | "employees.view"
  | "employees.create"
  | "employees.edit"
  | "employees.delete"
  | "attendance.view"
  | "attendance.manage"
  | "attendance.approve"
  | "leave.view"
  | "leave.approve"
  | "leave.manage"
  | "payroll.view"
  | "payroll.process"
  | "payroll.approve"
  | "recruitment.view"
  | "recruitment.manage"
  | "performance.view"
  | "performance.manage"
  | "analytics.view"
  | "analytics.export"
  | "settings.manage";
