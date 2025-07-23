// Organization Structure Types

export interface OrgLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
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
}

export interface OrgUnit {
  id: string;
  name: string;
  type: "company" | "division" | "department" | "team" | "unit";
  code: string;
  description: string;
  parentId: string | null;
  locationId: string;
  managerId: string | null;
  budgetCode: string;
  costCenter: string;
  isActive: boolean;
  establishedDate: string;
  employeeCount: number;
  children?: OrgUnit[];
  level: number;
  path: string[];
}

export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  position: string;
  department: string;
  orgUnitId: string;
  locationId: string;
  managerId: string | null;
  directReports: string[];
  level: number;
  hireDate: string;
  status: "active" | "inactive" | "terminated";
  skills: string[];
  certifications: string[];
  jobGrade: string;
  salary: number;
  workType: "full-time" | "part-time" | "contract" | "intern";
}

export interface ReportingLine {
  id: string;
  managerId: string;
  employeeId: string;
  reportingType: "direct" | "dotted" | "matrix";
  startDate: string;
  endDate?: string;
  isActive: boolean;
}

export interface OrgChartNode {
  id: string;
  name: string;
  position: string;
  avatar: string;
  email: string;
  department: string;
  level: number;
  isManager: boolean;
  directReports: OrgChartNode[];
  managerId: string | null;
  employeeCount: number;
  orgUnit: string;
  location: string;
}

export interface OrgStructureAnalytics {
  totalEmployees: number;
  totalDepartments: number;
  totalLocations: number;
  avgTeamSize: number;
  managementLevels: number;
  spanOfControl: {
    avg: number;
    max: number;
    min: number;
  };
  organizationHealth: {
    score: number;
    factors: {
      hierarchyBalance: number;
      spanControl: number;
      vacantPositions: number;
    };
  };
  growthMetrics: {
    headcountGrowth: number;
    newHires: number;
    departures: number;
  };
}

export interface OrgChartConfig {
  layout: "hierarchical" | "radial" | "tree";
  orientation: "vertical" | "horizontal";
  nodeSize: "small" | "medium" | "large";
  showPhotos: boolean;
  showDetails: boolean;
  expandLevel: number;
  colorScheme: "default" | "department" | "level" | "location";
}

export interface OrgChangeRequest {
  id: string;
  type: "restructure" | "transfer" | "promotion" | "new_position";
  description: string;
  requestedBy: string;
  requestDate: string;
  effectiveDate: string;
  status: "pending" | "approved" | "rejected" | "implemented";
  changes: {
    employeeId?: string;
    fromOrgUnit?: string;
    toOrgUnit?: string;
    fromPosition?: string;
    toPosition?: string;
    newManagerId?: string;
  };
  approvals: {
    managerId: string;
    hrApproval: boolean;
    financeApproval?: boolean;
    approvedDate?: string;
  }[];
  impact: {
    affectedEmployees: number;
    budgetImpact: number;
    implementationEffort: "low" | "medium" | "high";
  };
}
