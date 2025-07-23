import {
  TenantEmployee,
  TenantDepartment,
  TenantAttendance,
  TenantLeaveRequest,
  TenantPayroll,
  TenantHRMSAnalytics,
  TenantJobRequisition,
  TenantCandidate,
} from "./types";

// Tenant-specific employee data
export const tenantEmployees: TenantEmployee[] = [
  // BuildCorp Constructions Employees
  {
    id: "emp_bc_001",
    tenantId: "tenant_001",
    employeeId: "BC001",
    firstName: "Arjun",
    lastName: "Singh",
    email: "arjun.singh@buildcorp.com",
    phone: "+91-9876543210",
    dateOfBirth: "1985-03-15",
    gender: "male",
    nationality: "Indian",
    maritalStatus: "married",
    address: {
      street: "45, Sector 15",
      city: "Gurgaon",
      state: "Haryana",
      pincode: "122001",
      country: "India",
    },
    designation: "Project Manager",
    department: "Engineering",
    reportingTo: "emp_bc_002",
    joinDate: "2020-01-15",
    employmentType: "full_time",
    workLocation: "hybrid",
    status: "active",
    salary: {
      basic: 75000,
      allowances: 25000,
      currency: "INR",
      payFrequency: "monthly",
    },
    skills: [
      "Project Management",
      "AutoCAD",
      "Site Supervision",
      "Quality Control",
    ],
    experience: {
      total: 8,
      atCompany: 4,
    },
    rating: 4.2,
    lastAppraisal: "2024-03-15",
    nextAppraisal: "2025-03-15",
    leaveBalances: {
      annual: 18,
      sick: 10,
      casual: 8,
    },
    documents: [],
    createdAt: "2020-01-15T00:00:00Z",
    updatedAt: "2024-12-20T00:00:00Z",
    createdBy: "hr_001",
    permissions: {
      canView: ["role:hr", "role:manager"],
      canEdit: ["role:hr"],
      canViewSalary: ["role:hr", "role:finance"],
      canApproveLeave: ["role:manager"],
      canManageDocuments: ["role:hr"],
    },
  },
  {
    id: "emp_bc_002",
    tenantId: "tenant_001",
    employeeId: "BC002",
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@buildcorp.com",
    phone: "+91-9876543211",
    dateOfBirth: "1982-07-22",
    gender: "female",
    nationality: "Indian",
    maritalStatus: "single",
    address: {
      street: "12, Model Town",
      city: "Delhi",
      state: "Delhi",
      pincode: "110009",
      country: "India",
    },
    designation: "Engineering Manager",
    department: "Engineering",
    joinDate: "2018-03-01",
    employmentType: "full_time",
    workLocation: "office",
    status: "active",
    salary: {
      basic: 120000,
      allowances: 40000,
      currency: "INR",
      payFrequency: "monthly",
    },
    skills: [
      "Team Leadership",
      "Structural Design",
      "Project Planning",
      "Quality Management",
    ],
    experience: {
      total: 12,
      atCompany: 6,
    },
    rating: 4.8,
    lastAppraisal: "2024-03-01",
    nextAppraisal: "2025-03-01",
    leaveBalances: {
      annual: 21,
      sick: 12,
      casual: 12,
    },
    documents: [],
    createdAt: "2018-03-01T00:00:00Z",
    updatedAt: "2024-12-20T00:00:00Z",
    createdBy: "hr_001",
    permissions: {
      canView: ["role:hr", "role:senior_management"],
      canEdit: ["role:hr"],
      canViewSalary: ["role:hr", "role:finance"],
      canApproveLeave: ["role:senior_management"],
      canManageDocuments: ["role:hr"],
    },
  },
  {
    id: "emp_bc_003",
    tenantId: "tenant_001",
    employeeId: "BC003",
    firstName: "Ramesh",
    lastName: "Patel",
    email: "ramesh.patel@buildcorp.com",
    phone: "+91-9876543212",
    dateOfBirth: "1990-11-10",
    gender: "male",
    nationality: "Indian",
    maritalStatus: "married",
    address: {
      street: "67, Civil Lines",
      city: "Gurgaon",
      state: "Haryana",
      pincode: "122002",
      country: "India",
    },
    designation: "Site Engineer",
    department: "Operations",
    reportingTo: "emp_bc_001",
    joinDate: "2022-06-15",
    employmentType: "full_time",
    workLocation: "field",
    status: "active",
    salary: {
      basic: 45000,
      allowances: 15000,
      currency: "INR",
      payFrequency: "monthly",
    },
    skills: [
      "Site Supervision",
      "Quality Control",
      "Safety Management",
      "Material Management",
    ],
    experience: {
      total: 4,
      atCompany: 2,
    },
    rating: 3.8,
    lastAppraisal: "2024-06-15",
    nextAppraisal: "2025-06-15",
    leaveBalances: {
      annual: 15,
      sick: 8,
      casual: 6,
    },
    documents: [],
    createdAt: "2022-06-15T00:00:00Z",
    updatedAt: "2024-12-20T00:00:00Z",
    createdBy: "hr_001",
    permissions: {
      canView: ["role:hr", "role:manager"],
      canEdit: ["role:hr"],
      canViewSalary: ["role:hr", "role:finance"],
      canApproveLeave: ["role:manager"],
      canManageDocuments: ["role:hr"],
    },
  },

  // Metro Realty Group Employees
  {
    id: "emp_mr_001",
    tenantId: "tenant_002",
    employeeId: "MR001",
    firstName: "Suresh",
    lastName: "Kumar",
    email: "suresh.kumar@metrorealty.com",
    phone: "+91-9876543213",
    dateOfBirth: "1987-05-18",
    gender: "male",
    nationality: "Indian",
    maritalStatus: "married",
    address: {
      street: "23, Jubilee Hills",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500033",
      country: "India",
    },
    designation: "Sales Manager",
    department: "Marketing & Sales",
    joinDate: "2019-08-01",
    employmentType: "full_time",
    workLocation: "hybrid",
    status: "active",
    salary: {
      basic: 85000,
      allowances: 30000,
      currency: "INR",
      payFrequency: "monthly",
    },
    skills: [
      "Property Valuation",
      "Client Relationship",
      "Sales & Marketing",
      "Negotiation Skills",
    ],
    experience: {
      total: 9,
      atCompany: 5,
    },
    rating: 4.5,
    lastAppraisal: "2024-08-01",
    nextAppraisal: "2025-08-01",
    leaveBalances: {
      annual: 19,
      sick: 9,
      casual: 10,
    },
    documents: [],
    createdAt: "2019-08-01T00:00:00Z",
    updatedAt: "2024-12-20T00:00:00Z",
    createdBy: "hr_002",
    permissions: {
      canView: ["role:hr", "role:manager"],
      canEdit: ["role:hr"],
      canViewSalary: ["role:hr", "role:finance"],
      canApproveLeave: ["role:manager"],
      canManageDocuments: ["role:hr"],
    },
  },
  {
    id: "emp_mr_002",
    tenantId: "tenant_002",
    employeeId: "MR002",
    firstName: "Kavita",
    lastName: "Reddy",
    email: "kavita.reddy@metrorealty.com",
    phone: "+91-9876543214",
    dateOfBirth: "1989-12-03",
    gender: "female",
    nationality: "Indian",
    maritalStatus: "single",
    address: {
      street: "156, Banjara Hills",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500034",
      country: "India",
    },
    designation: "Property Consultant",
    department: "Marketing & Sales",
    reportingTo: "emp_mr_001",
    joinDate: "2021-02-15",
    employmentType: "full_time",
    workLocation: "office",
    status: "active",
    salary: {
      basic: 55000,
      allowances: 20000,
      currency: "INR",
      payFrequency: "monthly",
    },
    skills: [
      "Market Analysis",
      "Digital Marketing",
      "CRM Software",
      "Investment Analysis",
    ],
    experience: {
      total: 5,
      atCompany: 3,
    },
    rating: 4.1,
    lastAppraisal: "2024-02-15",
    nextAppraisal: "2025-02-15",
    leaveBalances: {
      annual: 16,
      sick: 11,
      casual: 9,
    },
    documents: [],
    createdAt: "2021-02-15T00:00:00Z",
    updatedAt: "2024-12-20T00:00:00Z",
    createdBy: "hr_002",
    permissions: {
      canView: ["role:hr", "role:manager"],
      canEdit: ["role:hr"],
      canViewSalary: ["role:hr", "role:finance"],
      canApproveLeave: ["role:manager"],
      canManageDocuments: ["role:hr"],
    },
  },

  // Skyline Developers Employees
  {
    id: "emp_sd_001",
    tenantId: "tenant_003",
    employeeId: "SD001",
    firstName: "Rakesh",
    lastName: "Aggarwal",
    email: "rakesh.aggarwal@skylinedev.com",
    phone: "+91-9876543215",
    dateOfBirth: "1978-09-25",
    gender: "male",
    nationality: "Indian",
    maritalStatus: "married",
    address: {
      street: "89, Golf Course Road",
      city: "Gurgaon",
      state: "Haryana",
      pincode: "122002",
      country: "India",
    },
    designation: "CEO",
    department: "Executive",
    joinDate: "2015-01-01",
    employmentType: "full_time",
    workLocation: "office",
    status: "active",
    salary: {
      basic: 250000,
      allowances: 100000,
      currency: "INR",
      payFrequency: "monthly",
    },
    skills: [
      "Strategic Planning",
      "Business Development",
      "Leadership",
      "Financial Modeling",
    ],
    experience: {
      total: 20,
      atCompany: 9,
    },
    rating: 5.0,
    lastAppraisal: "2024-01-01",
    nextAppraisal: "2025-01-01",
    leaveBalances: {
      annual: 21,
      sick: 12,
      casual: 12,
    },
    documents: [],
    createdAt: "2015-01-01T00:00:00Z",
    updatedAt: "2024-12-20T00:00:00Z",
    createdBy: "hr_003",
    permissions: {
      canView: ["role:hr", "role:board"],
      canEdit: ["role:hr"],
      canViewSalary: ["role:hr", "role:finance"],
      canApproveLeave: ["role:board"],
      canManageDocuments: ["role:hr"],
    },
  },
];

// Tenant-specific departments
export const tenantDepartments: TenantDepartment[] = [
  // BuildCorp Constructions Departments
  {
    id: "dept_bc_001",
    tenantId: "tenant_001",
    name: "Engineering",
    description: "Construction engineering and project management",
    headOfDepartment: "emp_bc_002",
    budget: 500000,
    location: "Gurgaon Office",
    isActive: true,
    employeeCount: 45,
    createdAt: "2020-01-01T00:00:00Z",
  },
  {
    id: "dept_bc_002",
    tenantId: "tenant_001",
    name: "Operations",
    description: "Site operations and field management",
    headOfDepartment: "emp_bc_001",
    budget: 300000,
    location: "Multiple Sites",
    isActive: true,
    employeeCount: 38,
    createdAt: "2020-01-01T00:00:00Z",
  },
  {
    id: "dept_bc_003",
    tenantId: "tenant_001",
    name: "Safety & Quality",
    description: "Safety compliance and quality assurance",
    budget: 150000,
    location: "All Sites",
    isActive: true,
    employeeCount: 28,
    createdAt: "2020-01-01T00:00:00Z",
  },

  // Metro Realty Group Departments
  {
    id: "dept_mr_001",
    tenantId: "tenant_002",
    name: "Marketing & Sales",
    description: "Property sales and marketing operations",
    headOfDepartment: "emp_mr_001",
    budget: 400000,
    location: "Hyderabad Office",
    isActive: true,
    employeeCount: 35,
    createdAt: "2019-01-01T00:00:00Z",
  },
  {
    id: "dept_mr_002",
    tenantId: "tenant_002",
    name: "Property Management",
    description: "Property maintenance and customer service",
    budget: 200000,
    location: "Multiple Locations",
    isActive: true,
    employeeCount: 25,
    createdAt: "2019-01-01T00:00:00Z",
  },

  // Skyline Developers Departments
  {
    id: "dept_sd_001",
    tenantId: "tenant_003",
    name: "Project Development",
    description: "New project planning and development",
    budget: 800000,
    location: "Gurgaon Office",
    isActive: true,
    employeeCount: 42,
    createdAt: "2015-01-01T00:00:00Z",
  },
  {
    id: "dept_sd_002",
    tenantId: "tenant_003",
    name: "Finance & Accounts",
    description: "Financial planning and accounting operations",
    budget: 250000,
    location: "Gurgaon Office",
    isActive: true,
    employeeCount: 18,
    createdAt: "2015-01-01T00:00:00Z",
  },
];

// Tenant-specific HRMS analytics
export const tenantHRMSAnalytics: { [tenantId: string]: TenantHRMSAnalytics } =
  {
    tenant_001: {
      tenantId: "tenant_001",
      period: {
        startDate: "2024-01-01",
        endDate: "2024-12-31",
      },
      employeeStats: {
        total: 156,
        active: 148,
        newHires: 24,
        terminations: 8,
        turnoverRate: 5.1,
      },
      attendanceStats: {
        averageAttendance: 94.2,
        totalPresent: 3520,
        totalAbsent: 216,
        lateComers: 142,
        overtimeHours: 892,
      },
      leaveStats: {
        totalRequests: 248,
        approved: 234,
        pending: 8,
        rejected: 6,
        averageLeaveDays: 12.5,
      },
      departmentStats: [
        {
          departmentId: "dept_bc_001",
          departmentName: "Engineering",
          employeeCount: 45,
          attendanceRate: 95.8,
          avgSalary: 78000,
        },
        {
          departmentId: "dept_bc_002",
          departmentName: "Operations",
          employeeCount: 38,
          attendanceRate: 92.1,
          avgSalary: 52000,
        },
        {
          departmentId: "dept_bc_003",
          departmentName: "Safety & Quality",
          employeeCount: 28,
          attendanceRate: 96.4,
          avgSalary: 65000,
        },
      ],
      performanceStats: {
        avgRating: 4.1,
        topPerformers: 23,
        improvementNeeded: 12,
        pendingAppraisals: 8,
      },
      payrollStats: {
        totalPayroll: 4850000,
        avgSalary: 68500,
        totalOvertimePay: 156000,
        totalDeductions: 892000,
      },
    },
    tenant_002: {
      tenantId: "tenant_002",
      period: {
        startDate: "2024-01-01",
        endDate: "2024-12-31",
      },
      employeeStats: {
        total: 89,
        active: 86,
        newHires: 15,
        terminations: 3,
        turnoverRate: 3.4,
      },
      attendanceStats: {
        averageAttendance: 96.8,
        totalPresent: 2054,
        totalAbsent: 68,
        lateComers: 45,
        overtimeHours: 234,
      },
      leaveStats: {
        totalRequests: 156,
        approved: 148,
        pending: 5,
        rejected: 3,
        averageLeaveDays: 11.2,
      },
      departmentStats: [
        {
          departmentId: "dept_mr_001",
          departmentName: "Marketing & Sales",
          employeeCount: 35,
          attendanceRate: 97.2,
          avgSalary: 72000,
        },
        {
          departmentId: "dept_mr_002",
          departmentName: "Property Management",
          employeeCount: 25,
          attendanceRate: 96.1,
          avgSalary: 58000,
        },
      ],
      performanceStats: {
        avgRating: 4.3,
        topPerformers: 18,
        improvementNeeded: 6,
        pendingAppraisals: 4,
      },
      payrollStats: {
        totalPayroll: 3210000,
        avgSalary: 71200,
        totalOvertimePay: 78000,
        totalDeductions: 567000,
      },
    },
    tenant_003: {
      tenantId: "tenant_003",
      period: {
        startDate: "2024-01-01",
        endDate: "2024-12-31",
      },
      employeeStats: {
        total: 134,
        active: 128,
        newHires: 18,
        terminations: 12,
        turnoverRate: 9.0,
      },
      attendanceStats: {
        averageAttendance: 92.1,
        totalPresent: 2956,
        totalAbsent: 254,
        lateComers: 89,
        overtimeHours: 567,
      },
      leaveStats: {
        totalRequests: 198,
        approved: 186,
        pending: 7,
        rejected: 5,
        averageLeaveDays: 13.8,
      },
      departmentStats: [
        {
          departmentId: "dept_sd_001",
          departmentName: "Project Development",
          employeeCount: 42,
          attendanceRate: 93.5,
          avgSalary: 95000,
        },
        {
          departmentId: "dept_sd_002",
          departmentName: "Finance & Accounts",
          employeeCount: 18,
          attendanceRate: 95.8,
          avgSalary: 78000,
        },
      ],
      performanceStats: {
        avgRating: 3.9,
        topPerformers: 21,
        improvementNeeded: 18,
        pendingAppraisals: 12,
      },
      payrollStats: {
        totalPayroll: 4170000,
        avgSalary: 87500,
        totalOvertimePay: 124000,
        totalDeductions: 734000,
      },
    },
  };

// Helper functions for tenant-specific data retrieval
export const getTenantEmployees = (tenantId: string): TenantEmployee[] => {
  return tenantEmployees.filter((employee) => employee.tenantId === tenantId);
};

export const getTenantDepartments = (tenantId: string): TenantDepartment[] => {
  return tenantDepartments.filter((dept) => dept.tenantId === tenantId);
};

export const getTenantHRMSAnalytics = (
  tenantId: string,
): TenantHRMSAnalytics | undefined => {
  return tenantHRMSAnalytics[tenantId];
};

export const getEmployeeById = (
  employeeId: string,
): TenantEmployee | undefined => {
  return tenantEmployees.find((employee) => employee.id === employeeId);
};

export const getEmployeesByDepartment = (
  tenantId: string,
  department: string,
): TenantEmployee[] => {
  return tenantEmployees.filter(
    (employee) =>
      employee.tenantId === tenantId && employee.department === department,
  );
};

export const getEmployeesByStatus = (
  tenantId: string,
  status: string,
): TenantEmployee[] => {
  return tenantEmployees.filter(
    (employee) => employee.tenantId === tenantId && employee.status === status,
  );
};

export const filterTenantEmployees = (
  tenantId: string,
  filters: {
    department?: string;
    designation?: string;
    status?: string;
    employmentType?: string;
    workLocation?: string;
    search?: string;
  },
): TenantEmployee[] => {
  let filteredEmployees = getTenantEmployees(tenantId);

  if (filters.department) {
    filteredEmployees = filteredEmployees.filter(
      (emp) => emp.department === filters.department,
    );
  }

  if (filters.designation) {
    filteredEmployees = filteredEmployees.filter(
      (emp) => emp.designation === filters.designation,
    );
  }

  if (filters.status) {
    filteredEmployees = filteredEmployees.filter(
      (emp) => emp.status === filters.status,
    );
  }

  if (filters.employmentType) {
    filteredEmployees = filteredEmployees.filter(
      (emp) => emp.employmentType === filters.employmentType,
    );
  }

  if (filters.workLocation) {
    filteredEmployees = filteredEmployees.filter(
      (emp) => emp.workLocation === filters.workLocation,
    );
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredEmployees = filteredEmployees.filter(
      (emp) =>
        emp.firstName.toLowerCase().includes(searchLower) ||
        emp.lastName.toLowerCase().includes(searchLower) ||
        emp.email.toLowerCase().includes(searchLower) ||
        emp.employeeId.toLowerCase().includes(searchLower) ||
        emp.designation.toLowerCase().includes(searchLower),
    );
  }

  return filteredEmployees;
};

// Export default for easier access
export default {
  tenantEmployees,
  tenantDepartments,
  tenantHRMSAnalytics,
  getTenantEmployees,
  getTenantDepartments,
  getTenantHRMSAnalytics,
  getEmployeeById,
  getEmployeesByDepartment,
  getEmployeesByStatus,
  filterTenantEmployees,
};
