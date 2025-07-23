// Unified Human Resources Types - Consolidating HRMS + User Management + Organization

// Base HR configuration
export interface HRTenant {
  id: string;
  name: string;
  legalName: string;
  industryType: 'construction' | 'real_estate' | 'technology' | 'manufacturing' | 'retail';
  configuration: HRConfiguration;
}

export interface HRConfiguration {
  id: string;
  tenantId: string;
  companyName: string;
  legalName: string;
  industryType: string;
  hrPolicies: {
    workingHours: {
      standardHours: number;
      flexibleHours: boolean;
      overtimePolicy: boolean;
    };
    leavePolicy: {
      annualLeave: number;
      sickLeave: number;
      maternityLeave: number;
      paternityLeave: number;
    };
    attendancePolicy: {
      graceTime: number;
      lateMarkAfter: number;
      halfDayAfter: number;
    };
  };
  payrollSettings: {
    payFrequency: 'monthly' | 'bi-weekly' | 'weekly';
    currency: string;
    financialYearStart: string;
    providentFund: boolean;
    esi: boolean;
    professionalTax: boolean;
  };
  complianceSettings: {
    pfRegistration: string;
    esiRegistration: string;
    laborLicense: string;
    contractorLicense: string;
  };
}

// Common types
export type EmployeeStatus = 'active' | 'inactive' | 'terminated' | 'suspended' | 'on_leave';
export type EmploymentType = 'full_time' | 'part_time' | 'contract' | 'intern' | 'consultant';
export type WorkLocation = 'office' | 'remote' | 'hybrid';
export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed';

// Employee Management (Consolidated from HRMS)
export interface Employee {
  id: string;
  tenantId: string;
  employeeId: string;
  
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
  nationality: string;
  maritalStatus: MaritalStatus;
  address: Address;
  
  // Employment Information
  designation: string;
  departmentId: string;
  department: string;
  reportingTo?: string;
  joinDate: string;
  employmentType: EmploymentType;
  workLocation: WorkLocation;
  status: EmployeeStatus;
  
  // Compensation
  salary: SalaryDetails;
  
  // Skills and Performance
  skills: string[];
  certifications: Certification[];
  performanceRating?: number;
  
  // System Information
  userId?: string; // Links to User Management
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
  
  // Extended Information
  emergencyContact?: EmergencyContact;
  documents?: EmployeeDocument[];
  bankDetails?: BankDetails;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface SalaryDetails {
  basic: number;
  allowances: number;
  currency: string;
  payFrequency: 'monthly' | 'bi-weekly' | 'weekly';
  effectiveDate: string;
  ctc?: number;
  pfContribution?: number;
  esiContribution?: number;
}

export interface Certification {
  id: string;
  name: string;
  issuedBy: string;
  issuedDate: string;
  expiryDate?: string;
  credentialId?: string;
  isVerified: boolean;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  address?: string;
}

export interface EmployeeDocument {
  id: string;
  type: DocumentType;
  fileName: string;
  uploadedAt: string;
  uploadedBy: string;
  isVerified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
}

export type DocumentType = 'resume' | 'aadhar' | 'pan' | 'passport' | 'driving_license' | 'qualification' | 'experience' | 'photo' | 'other';

export interface BankDetails {
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  accountHolderName: string;
  accountType: 'savings' | 'current';
}

// User Access Management (Consolidated from User Management)
export interface User {
  id: string;
  tenantId: string;
  employeeId?: string; // Links to Employee
  
  // Authentication
  username: string;
  email: string;
  phone: string;
  password?: string; // Hashed
  
  // Profile
  firstName: string;
  lastName: string;
  avatar?: string;
  
  // Role and Permissions
  roleId: string;
  role: Role;
  permissions: string[];
  customPermissions: PermissionOverride[];
  
  // Status
  status: UserStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  mfaEnabled: boolean;
  
  // Activity
  lastLogin?: string;
  lastPasswordChange: string;
  failedLoginAttempts: number;
  accountLocked: boolean;
  lockoutUntil?: string;
  
  // Security
  sessionTimeout: number;
  ipWhitelist?: string[];
  deviceTrust: boolean;
  
  // Audit
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
  invitedBy?: string;
  invitationAcceptedAt?: string;
}

export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended' | 'terminated';

export interface Role {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  permissions: Permission[];
  isSystem: boolean;
  isActive: boolean;
  userCount: number;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  module: string;
  action: string;
  resource: string;
  description: string;
  isSystem: boolean;
}

export interface PermissionOverride {
  permissionId: string;
  granted: boolean;
  reason: string;
  grantedBy: string;
  grantedAt: string;
  expiresAt?: string;
}

// Organization Structure (Consolidated from Organization)
export interface Department {
  id: string;
  tenantId: string;
  name: string;
  code: string;
  description: string;
  parentDepartmentId?: string;
  level: number;
  headOfDepartment?: string;
  location?: string;
  budget?: number;
  employeeCount: number;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
}

export interface Location {
  id: string;
  tenantId: string;
  name: string;
  code: string;
  address: Address;
  timezone: string;
  isHeadOffice: boolean;
  capacity: number;
  employeeCount: number;
  facilities: string[];
  contactPerson: string;
  phone: string;
  email: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
}

export interface ReportingStructure {
  employeeId: string;
  managerId: string;
  reportingType: 'direct' | 'dotted' | 'functional';
  effectiveFrom: string;
  effectiveTo?: string;
}

// Workforce Operations (HRMS Operations)
export interface Attendance {
  id: string;
  tenantId: string;
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  totalHours?: number;
  status: AttendanceStatus;
  location?: string;
  notes?: string;
  approvedBy?: string;
  approvedAt?: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'half_day' | 'late' | 'early_departure' | 'work_from_home';

export interface LeaveRequest {
  id: string;
  tenantId: string;
  employeeId: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: LeaveStatus;
  appliedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectedReason?: string;
  documents?: string[];
}

export type LeaveType = 'annual' | 'sick' | 'maternity' | 'paternity' | 'casual' | 'emergency' | 'compensatory' | 'sabbatical';
export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled' | 'taken';

export interface PayrollEntry {
  id: string;
  tenantId: string;
  employeeId: string;
  payPeriod: string; // YYYY-MM format
  basicSalary: number;
  allowances: PayrollAllowance[];
  deductions: PayrollDeduction[];
  grossSalary: number;
  taxDeductions: number;
  netSalary: number;
  currency: string;
  status: PayrollStatus;
  processedAt?: string;
  processedBy?: string;
  paidAt?: string;
}

export type PayrollStatus = 'draft' | 'calculated' | 'approved' | 'paid' | 'on_hold';

export interface PayrollAllowance {
  type: string;
  amount: number;
  isTaxable: boolean;
}

export interface PayrollDeduction {
  type: string;
  amount: number;
  isStatutory: boolean;
}

export interface PerformanceReview {
  id: string;
  tenantId: string;
  employeeId: string;
  reviewPeriod: string;
  reviewType: 'annual' | 'quarterly' | 'probation' | 'project_based';
  reviewer: string;
  goals: PerformanceGoal[];
  overallRating: number;
  comments: string;
  status: PerformanceStatus;
  submittedAt?: string;
  acknowledgedAt?: string;
}

export type PerformanceStatus = 'draft' | 'submitted' | 'under_review' | 'completed' | 'acknowledged';

export interface PerformanceGoal {
  id: string;
  title: string;
  description: string;
  weightage: number;
  selfRating?: number;
  managerRating?: number;
  comments?: string;
}

export interface Training {
  id: string;
  tenantId: string;
  title: string;
  description: string;
  category: TrainingCategory;
  duration: number; // in hours
  instructor: string;
  capacity: number;
  startDate: string;
  endDate: string;
  location: string;
  cost: number;
  currency: string;
  status: TrainingStatus;
  participants: TrainingParticipant[];
}

export type TrainingCategory = 'technical' | 'soft_skills' | 'compliance' | 'safety' | 'leadership' | 'orientation';
export type TrainingStatus = 'planned' | 'ongoing' | 'completed' | 'cancelled';

export interface TrainingParticipant {
  employeeId: string;
  enrolledAt: string;
  attendanceStatus: 'enrolled' | 'attended' | 'completed' | 'no_show';
  completionScore?: number;
  feedback?: string;
  certificateIssued?: boolean;
}

// Analytics and Reporting
export interface HRAnalytics {
  tenantId: string;
  period: string;
  employeeMetrics: EmployeeMetrics;
  attendanceMetrics: AttendanceMetrics;
  leaveMetrics: LeaveMetrics;
  performanceMetrics: PerformanceMetrics;
  recruitmentMetrics: RecruitmentMetrics;
  turnoverMetrics: TurnoverMetrics;
}

export interface EmployeeMetrics {
  totalEmployees: number;
  activeEmployees: number;
  newJoinees: number;
  departures: number;
  departmentWiseCount: { [department: string]: number };
  locationWiseCount: { [location: string]: number };
  averageAge: number;
  genderDistribution: { [gender: string]: number };
}

export interface AttendanceMetrics {
  averageAttendance: number;
  punctualityRate: number;
  absenteeismRate: number;
  overtimeHours: number;
  workFromHomeUtilization: number;
}

export interface LeaveMetrics {
  totalLeavesTaken: number;
  averageLeavesPerEmployee: number;
  leaveTypeDistribution: { [type: string]: number };
  pendingLeaveRequests: number;
  leaveUtilizationRate: number;
}

export interface PerformanceMetrics {
  averageRating: number;
  ratingDistribution: { [rating: string]: number };
  completedReviews: number;
  pendingReviews: number;
  topPerformers: string[];
}

export interface RecruitmentMetrics {
  totalOpenings: number;
  totalApplications: number;
  conversionRate: number;
  averageTimeToHire: number;
  sourceWiseApplications: { [source: string]: number };
}

export interface TurnoverMetrics {
  turnoverRate: number;
  voluntaryTurnover: number;
  involuntaryTurnover: number;
  retentionRate: number;
  averageTenure: number;
  exitReasons: { [reason: string]: number };
}

// Audit and Compliance
export interface HRAuditTrail {
  id: string;
  tenantId: string;
  entityType: string;
  entityId: string;
  action: 'create' | 'update' | 'delete' | 'approve' | 'reject' | 'view';
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  performedBy: string;
  performedAt: string;
  ipAddress: string;
  userAgent: string;
  reason?: string;
  module: string;
}

export interface ComplianceRecord {
  id: string;
  tenantId: string;
  complianceType: ComplianceType;
  status: ComplianceStatus;
  dueDate: string;
  completedDate?: string;
  assignedTo: string;
  documents: string[];
  notes: string;
  penalties?: number;
  nextDueDate?: string;
}

export type ComplianceType = 'pf_filing' | 'esi_filing' | 'tax_deduction' | 'labor_compliance' | 'statutory_audit' | 'safety_audit';
export type ComplianceStatus = 'pending' | 'in_progress' | 'completed' | 'overdue' | 'exempted';
