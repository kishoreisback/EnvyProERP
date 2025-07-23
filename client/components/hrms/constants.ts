// HRMS Constants and Tenant Data

export interface HRMSTenantInfo {
  id: string;
  name: string;
  type: string;
  industry: string;
  color?: string;
  stats?: {
    totalEmployees: number;
    activeProjects: number;
    monthlyPayroll: string;
    attendanceRate: string;
  };
  hrAdmin?: {
    id: string;
    tenantId: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    tenantRole: "admin" | "owner";
  };
}

export const hrmsAvailableTenants: HRMSTenantInfo[] = [
  {
    id: "tenant_001",
    name: "BuildCorp Constructions",
    type: "Construction",
    industry: "construction",
    color: "bg-orange-500",
    stats: {
      totalEmployees: 156,
      activeProjects: 24,
      monthlyPayroll: "₹48.5L",
      attendanceRate: "94.2%",
    },
    hrAdmin: {
      id: "hr_001",
      tenantId: "tenant_001",
      username: "priya.hr",
      email: "priya.hr@buildcorp.com",
      firstName: "Priya",
      lastName: "Sharma",
      tenantRole: "admin",
    },
  },
  {
    id: "tenant_002",
    name: "Metro Realty Group",
    type: "Real Estate",
    industry: "real_estate",
    color: "bg-blue-500",
    stats: {
      totalEmployees: 89,
      activeProjects: 18,
      monthlyPayroll: "₹32.1L",
      attendanceRate: "96.8%",
    },
    hrAdmin: {
      id: "hr_002",
      tenantId: "tenant_002",
      username: "rajesh.hr",
      email: "rajesh.hr@metrorealty.com",
      firstName: "Rajesh",
      lastName: "Kumar",
      tenantRole: "admin",
    },
  },
  {
    id: "tenant_003",
    name: "Skyline Developers",
    type: "Development",
    industry: "property_development",
    color: "bg-purple-500",
    stats: {
      totalEmployees: 134,
      activeProjects: 12,
      monthlyPayroll: "₹41.7L",
      attendanceRate: "92.1%",
    },
    hrAdmin: {
      id: "hr_003",
      tenantId: "tenant_003",
      username: "anjali.hr",
      email: "anjali.hr@skylinedev.com",
      firstName: "Anjali",
      lastName: "Patel",
      tenantRole: "owner",
    },
  },
];

// Department constants
export const departments = [
  "Engineering",
  "Operations",
  "Safety & Quality",
  "Human Resources",
  "Finance & Accounts",
  "Administration",
  "Marketing & Sales",
  "Project Management",
  "Information Technology",
  "Legal & Compliance",
];

// Designation hierarchy
export const designations = {
  entry: ["Trainee", "Junior Engineer", "Assistant", "Intern"],
  intermediate: ["Engineer", "Executive", "Coordinator", "Specialist"],
  senior: ["Senior Engineer", "Senior Executive", "Team Lead", "Supervisor"],
  leadership: ["Manager", "Assistant Manager", "Deputy Manager"],
  senior_management: ["General Manager", "AGM", "DGM", "Vice President"],
  executive: ["Director", "CEO", "COO", "CTO", "CFO"],
};

// Employment types
export const employmentTypes = [
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "intern", label: "Intern" },
  { value: "consultant", label: "Consultant" },
];

// Work locations
export const workLocations = [
  { value: "office", label: "Office" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "field", label: "Field Work" },
];

// Leave types
export const leaveTypes = [
  { value: "annual", label: "Annual Leave", maxDays: 21 },
  { value: "sick", label: "Sick Leave", maxDays: 12 },
  { value: "casual", label: "Casual Leave", maxDays: 12 },
  { value: "maternity", label: "Maternity Leave", maxDays: 180 },
  { value: "paternity", label: "Paternity Leave", maxDays: 15 },
  { value: "emergency", label: "Emergency Leave", maxDays: 5 },
  { value: "unpaid", label: "Unpaid Leave", maxDays: 30 },
];

// Attendance status options
export const attendanceStatus = [
  { value: "present", label: "Present", color: "bg-green-500" },
  { value: "absent", label: "Absent", color: "bg-red-500" },
  { value: "late", label: "Late", color: "bg-yellow-500" },
  { value: "half_day", label: "Half Day", color: "bg-blue-500" },
  { value: "work_from_home", label: "Work From Home", color: "bg-purple-500" },
];

// Performance rating scale
export const performanceRatings = [
  { value: 5, label: "Outstanding", color: "text-green-600" },
  { value: 4, label: "Exceeds Expectations", color: "text-blue-600" },
  { value: 3, label: "Meets Expectations", color: "text-yellow-600" },
  { value: 2, label: "Needs Improvement", color: "text-orange-600" },
  { value: 1, label: "Unsatisfactory", color: "text-red-600" },
];

// Skills categories for different industries
export const skillCategories = {
  construction: [
    "Project Management",
    "AutoCAD",
    "Site Supervision",
    "Quality Control",
    "Safety Management",
    "Cost Estimation",
    "Structural Design",
    "Construction Planning",
    "Material Management",
    "Regulatory Compliance",
  ],
  real_estate: [
    "Property Valuation",
    "Market Analysis",
    "Client Relationship",
    "Sales & Marketing",
    "Legal Documentation",
    "Investment Analysis",
    "Property Management",
    "Negotiation Skills",
    "Digital Marketing",
    "CRM Software",
  ],
  property_development: [
    "Land Acquisition",
    "Urban Planning",
    "Financial Modeling",
    "Regulatory Approvals",
    "Project Feasibility",
    "Stakeholder Management",
    "Risk Assessment",
    "Market Research",
    "Design Coordination",
    "Construction Management",
  ],
};

// Default leave balances for new employees
export const defaultLeaveBalances = {
  annual: 21,
  sick: 12,
  casual: 12,
  maternity: 180,
  paternity: 15,
};

// Payroll components
export const payrollComponents = {
  allowances: [
    "House Rent Allowance",
    "Transport Allowance",
    "Medical Allowance",
    "Food Allowance",
    "Mobile Allowance",
    "Special Allowance",
  ],
  deductions: [
    "Provident Fund",
    "Professional Tax",
    "Income Tax",
    "ESI",
    "Insurance Premium",
    "Loan EMI",
  ],
};

// Common benefits offered
export const commonBenefits = [
  "Health Insurance",
  "Life Insurance",
  "Provident Fund",
  "Gratuity",
  "Bonus",
  "Performance Incentives",
  "Flexible Working Hours",
  "Work From Home",
  "Professional Development",
  "Training & Certification",
];
