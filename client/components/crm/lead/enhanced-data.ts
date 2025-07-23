// Enhanced CRM data with conversion workflows, assignment queues, and duplicate detection
import {
  TenantCustomer,
  TenantOpportunity,
  LeadConversionWorkflow,
  AssignmentQueue,
  UnassignedLead,
  DuplicateDetectionConfig,
  DuplicateMatch,
  CRMActionAudit,
  EnhancedCRMAnalytics,
  QueueMember,
  AssignmentRule,
  WorkingHours,
  OpportunityStage,
  OpportunityStatus,
} from "./enhanced-types";
import { TenantLead } from "./types";

// Mock Customers (converted from leads)
export const mockCustomers: TenantCustomer[] = [
  {
    id: "cust_001",
    tenantId: "tenant_001",
    customerId: "BC-CUST-2024-001",
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "rajesh.kumar@techcorp.in",
    phone: "+91-9876543210",
    company: "TechCorp Solutions",
    designation: "CTO",
    industry: "technology",
    status: "active",
    tier: "gold",
    lifetimeValue: 2500000,
    currency: "INR",
    convertedFromLeadId: "lead_bc_001",
    conversionDate: "2024-01-15T10:30:00Z",
    conversionStage: "proposal",
    conversionValue: 1500000,
    accountManager: "user_bc_001",
    territory: "Bangalore",
    region: "South",
    totalOrders: 3,
    totalSpent: 2500000,
    averageOrderValue: 833333,
    lastOrderDate: "2024-03-01T00:00:00Z",
    lastContactDate: "2024-03-15T14:30:00Z",
    preferredContactMethod: "email",
    customFields: {
      projectType: "Commercial Complex",
      budgetRange: "2-5 Crores",
      decisionTimeframe: "6 months",
    },
    tags: ["high-value", "technology", "repeat-customer"],
    createdBy: "user_bc_001",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-03-15T14:30:00Z",
    visibility: "team",
    permissions: {
      canView: ["role:admin", "role:sales_manager", "user_bc_001"],
      canEdit: ["role:admin", "role:sales_manager", "user_bc_001"],
      canDelete: ["role:admin"],
      canExport: ["role:admin", "role:sales_manager"],
      canContact: ["role:admin", "role:sales_manager", "user_bc_001"],
      canManageOrders: ["role:admin", "role:sales_manager", "user_bc_001"],
    },
  },
  {
    id: "cust_002",
    tenantId: "tenant_002",
    customerId: "MR-CUST-2024-002",
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@globalinvest.com",
    phone: "+91-9123456789",
    company: "Global Investments Ltd",
    designation: "Investment Manager",
    industry: "finance",
    status: "vip",
    tier: "platinum",
    lifetimeValue: 5200000,
    currency: "INR",
    convertedFromLeadId: "lead_mr_001",
    conversionDate: "2024-02-10T15:45:00Z",
    conversionStage: "negotiation",
    conversionValue: 3200000,
    accountManager: "user_mr_001",
    territory: "Mumbai",
    region: "West",
    totalOrders: 2,
    totalSpent: 5200000,
    averageOrderValue: 2600000,
    lastOrderDate: "2024-03-10T00:00:00Z",
    lastContactDate: "2024-03-18T11:15:00Z",
    preferredContactMethod: "phone",
    customFields: {
      investmentType: "Commercial Real Estate",
      riskProfile: "Conservative",
      portfolioSize: "50+ Crores",
    },
    tags: ["vip", "finance", "high-volume"],
    createdBy: "user_mr_001",
    createdAt: "2024-02-10T15:45:00Z",
    updatedAt: "2024-03-18T11:15:00Z",
    visibility: "team",
    permissions: {
      canView: ["role:admin", "role:sales_manager", "user_mr_001"],
      canEdit: ["role:admin", "role:sales_manager", "user_mr_001"],
      canDelete: ["role:admin"],
      canExport: ["role:admin", "role:sales_manager"],
      canContact: ["role:admin", "role:sales_manager", "user_mr_001"],
      canManageOrders: ["role:admin", "role:sales_manager", "user_mr_001"],
    },
  },
];

// Mock Opportunities (converted from leads)
export const mockOpportunities: TenantOpportunity[] = [
  {
    id: "opp_001",
    tenantId: "tenant_001",
    opportunityId: "BC-OPP-2024-001",
    name: "TechCorp Office Complex - Phase 2",
    description: "Second phase development for TechCorp's new campus",
    value: 3500000,
    currency: "INR",
    probability: 75,
    weightedValue: 2625000,
    stage: "proposal",
    status: "open",
    leadId: "lead_bc_001",
    customerId: "cust_001",
    salesProcess: "enterprise_b2b",
    nextSteps: "Final proposal presentation scheduled for March 25th",
    keyStakeholders: [
      {
        id: "stake_001",
        name: "Rajesh Kumar",
        role: "CTO",
        influence: "high",
        attitude: "champion",
        contactInfo: {
          email: "rajesh.kumar@techcorp.in",
          phone: "+91-9876543210",
        },
      },
      {
        id: "stake_002",
        name: "Amit Verma",
        role: "CFO",
        influence: "high",
        attitude: "supporter",
        contactInfo: {
          email: "amit.verma@techcorp.in",
          phone: "+91-9876543211",
        },
      },
    ],
    competitorInfo: [
      {
        name: "RivalCorp Constructions",
        strengths: ["Lower pricing", "Local presence"],
        weaknesses: ["Limited portfolio", "Quality concerns"],
        pricing: 3200000,
        probability: 25,
      },
    ],
    expectedCloseDate: "2024-04-15T00:00:00Z",
    createdDate: "2024-01-15T10:30:00Z",
    lastActivityDate: "2024-03-18T16:45:00Z",
    salesCycleStage: 45,
    totalSalesCycleDays: 90,
    ownerId: "user_bc_001",
    territory: "Bangalore",
    region: "South",
    products: [
      {
        id: "prod_001",
        name: "Office Space Construction",
        quantity: 50000, // sq ft
        unitPrice: 60,
        totalPrice: 3000000,
        category: "construction",
      },
      {
        id: "prod_002",
        name: "Interior Design Package",
        quantity: 1,
        unitPrice: 500000,
        totalPrice: 500000,
        category: "design",
      },
    ],
    services: [
      {
        id: "serv_001",
        name: "Project Management",
        description: "End-to-end project management services",
        duration: 12,
        monthlyValue: 25000,
        totalValue: 300000,
        category: "management",
      },
    ],
    sourceChannel: "website",
    campaignId: "office_construction_2024",
    leadScore: 85,
    conversionMetrics: {
      leadToOpportunityDays: 5,
      touchpointsToConversion: 8,
      activitiesCount: 12,
    },
    customFields: {
      projectTimeline: "8-10 months",
      specialRequirements: "LEED certified building",
      decisionCommittee: "CTO, CFO, Head of Operations",
    },
    tags: ["high-value", "technology", "phase-2"],
    createdBy: "user_bc_001",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-03-18T16:45:00Z",
    visibility: "team",
    permissions: {
      canView: ["role:admin", "role:sales_manager", "user_bc_001"],
      canEdit: ["role:admin", "role:sales_manager", "user_bc_001"],
      canDelete: ["role:admin"],
      canExport: ["role:admin", "role:sales_manager"],
      canManageProducts: ["role:admin", "role:sales_manager", "user_bc_001"],
      canManageStakeholders: [
        "role:admin",
        "role:sales_manager",
        "user_bc_001",
      ],
      canUpdateStage: ["role:admin", "role:sales_manager", "user_bc_001"],
    },
  },
  {
    id: "opp_002",
    tenantId: "tenant_002",
    opportunityId: "MR-OPP-2024-002",
    name: "Luxury Residential Tower - Investment",
    description: "Investment opportunity in 40-floor luxury residential tower",
    value: 8500000,
    currency: "INR",
    probability: 60,
    weightedValue: 5100000,
    stage: "needs_analysis",
    status: "open",
    leadId: "lead_mr_001",
    customerId: "cust_002",
    salesProcess: "investment_b2b",
    nextSteps: "Site visit and financial projections review",
    keyStakeholders: [
      {
        id: "stake_003",
        name: "Priya Sharma",
        role: "Investment Manager",
        influence: "high",
        attitude: "supporter",
        contactInfo: {
          email: "priya.sharma@globalinvest.com",
          phone: "+91-9123456789",
        },
      },
    ],
    competitorInfo: [],
    expectedCloseDate: "2024-05-30T00:00:00Z",
    createdDate: "2024-02-10T15:45:00Z",
    lastActivityDate: "2024-03-19T10:30:00Z",
    salesCycleStage: 37,
    totalSalesCycleDays: 110,
    ownerId: "user_mr_001",
    territory: "Mumbai",
    region: "West",
    products: [
      {
        id: "prod_003",
        name: "Luxury Apartments",
        quantity: 120,
        unitPrice: 65000,
        totalPrice: 7800000,
        category: "residential",
      },
    ],
    services: [
      {
        id: "serv_002",
        name: "Investment Advisory",
        description: "Complete investment advisory and management",
        duration: 24,
        monthlyValue: 50000,
        totalValue: 1200000,
        category: "advisory",
      },
    ],
    sourceChannel: "referral",
    leadScore: 78,
    conversionMetrics: {
      leadToOpportunityDays: 7,
      touchpointsToConversion: 6,
      activitiesCount: 9,
    },
    customFields: {
      investmentHorizon: "5-7 years",
      expectedROI: "12-15%",
      riskTolerance: "Medium",
    },
    tags: ["investment", "luxury", "high-value"],
    createdBy: "user_mr_001",
    createdAt: "2024-02-10T15:45:00Z",
    updatedAt: "2024-03-19T10:30:00Z",
    visibility: "team",
    permissions: {
      canView: ["role:admin", "role:sales_manager", "user_mr_001"],
      canEdit: ["role:admin", "role:sales_manager", "user_mr_001"],
      canDelete: ["role:admin"],
      canExport: ["role:admin", "role:sales_manager"],
      canManageProducts: ["role:admin", "role:sales_manager", "user_mr_001"],
      canManageStakeholders: [
        "role:admin",
        "role:sales_manager",
        "user_mr_001",
      ],
      canUpdateStage: ["role:admin", "role:sales_manager", "user_mr_001"],
    },
  },
];

// Mock Conversion Workflows
export const mockConversionWorkflows: LeadConversionWorkflow[] = [
  {
    id: "conv_001",
    tenantId: "tenant_001",
    leadId: "lead_bc_001",
    convertTo: ["customer", "opportunity"],
    autoConversion: false,
    conversionCriteria: {
      minimumLeadScore: 70,
      requiredStage: "proposal",
      minimumActivities: 5,
      hasQualificationCall: true,
      minimumValue: 1000000,
    },
    steps: [
      {
        id: "step_001",
        name: "Validate Lead Quality",
        description: "Check if lead meets conversion criteria",
        type: "validation",
        status: "completed",
        order: 1,
        config: {
          criteria: ["leadScore", "stage", "activities"],
        },
        output: {
          leadScore: 85,
          stage: "proposal",
          activitiesCount: 12,
          passed: true,
        },
      },
      {
        id: "step_002",
        name: "Create Customer Record",
        description: "Convert lead to customer",
        type: "creation",
        status: "completed",
        order: 2,
        config: {
          entityType: "customer",
          mapping: {
            firstName: "firstName",
            lastName: "lastName",
            email: "email",
            phone: "phone",
            company: "company",
          },
        },
        output: {
          customerId: "cust_001",
          customerNumber: "BC-CUST-2024-001",
        },
      },
      {
        id: "step_003",
        name: "Create Opportunity",
        description: "Convert lead to opportunity",
        type: "creation",
        status: "completed",
        order: 3,
        config: {
          entityType: "opportunity",
          mapping: {
            name: "company + ' - ' + requirements",
            value: "expectedValue",
            stage: "needs_analysis",
          },
        },
        output: {
          opportunityId: "opp_001",
          opportunityNumber: "BC-OPP-2024-001",
        },
      },
      {
        id: "step_004",
        name: "Send Notifications",
        description: "Notify relevant stakeholders",
        type: "notification",
        status: "completed",
        order: 4,
        config: {
          recipients: ["assignedTo", "salesManager"],
          template: "lead_converted",
        },
        output: {
          notificationsSent: 2,
          recipients: ["user_bc_001", "user_bc_manager"],
        },
      },
    ],
    currentStep: 4,
    status: "completed",
    createdContactId: undefined,
    createdCustomerId: "cust_001",
    createdOpportunityId: "opp_001",
    initiatedBy: "user_bc_001",
    initiatedAt: "2024-01-15T09:30:00Z",
    completedAt: "2024-01-15T10:30:00Z",
    requiresApproval: false,
  },
];

// Working Hours Configuration
const standardWorkingHours: WorkingHours = {
  monday: { start: "09:00", end: "18:00", isWorking: true },
  tuesday: { start: "09:00", end: "18:00", isWorking: true },
  wednesday: { start: "09:00", end: "18:00", isWorking: true },
  thursday: { start: "09:00", end: "18:00", isWorking: true },
  friday: { start: "09:00", end: "18:00", isWorking: true },
  saturday: { start: "09:00", end: "13:00", isWorking: true },
  sunday: { start: "00:00", end: "00:00", isWorking: false },
  timezone: "Asia/Kolkata",
};

// Mock Assignment Queues
export const mockAssignmentQueues: AssignmentQueue[] = [
  {
    id: "queue_001",
    tenantId: "tenant_001",
    name: "High-Value Leads Queue",
    description: "Queue for leads with value > 10 Lakhs",
    type: "skill_based",
    autoAssignment: true,
    assignmentTimeout: 4, // 4 hours
    escalationTimeout: 24, // 24 hours
    assignmentRules: [
      {
        id: "rule_001",
        name: "High Value Assignment",
        priority: 1,
        conditions: [
          {
            field: "expectedValue",
            operator: "greater_than",
            value: 1000000,
          },
          {
            field: "territory",
            operator: "equals",
            value: "Bangalore",
            logicalOperator: "AND",
          },
        ],
        actions: [
          {
            type: "assign_to_user",
            config: {
              userId: "user_bc_001",
              priority: "high",
            },
          },
        ],
        isActive: true,
      },
    ],
    workingHours: standardWorkingHours,
    holidays: ["2024-01-26", "2024-03-29", "2024-08-15"],
    members: [
      {
        userId: "user_bc_001",
        userName: "Amit Sharma",
        role: "Senior Sales Manager",
        skills: ["enterprise", "construction", "high-value"],
        territories: ["Bangalore", "Chennai"],
        maxConcurrentLeads: 15,
        currentLeadCount: 8,
        isAvailable: true,
        priority: 10,
        averageResponseTime: 2.5,
        conversionRate: 28.5,
        averageHandlingTime: 48,
        satisfaction: 4.7,
      },
      {
        userId: "user_bc_002",
        userName: "Priya Reddy",
        role: "Sales Manager",
        skills: ["construction", "residential"],
        territories: ["Bangalore", "Hyderabad"],
        maxConcurrentLeads: 12,
        currentLeadCount: 10,
        isAvailable: true,
        priority: 8,
        averageResponseTime: 3.2,
        conversionRate: 24.8,
        averageHandlingTime: 52,
        satisfaction: 4.5,
      },
    ],
    stats: {
      totalLeads: 145,
      unassignedLeads: 3,
      assignedLeads: 142,
      overdueLeads: 1,
      escalatedLeads: 2,
      averageAssignmentTime: 35, // minutes
      averageResponseTime: 125, // minutes
      totalAssignments: 89,
      todayAssigned: 8,
      todayEscalated: 0,
      todayResolved: 12,
    },
    isActive: true,
    createdBy: "user_bc_admin",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-03-19T14:30:00Z",
  },
  {
    id: "queue_002",
    tenantId: "tenant_002",
    name: "Investment Leads Queue",
    description: "Queue for investment and commercial property leads",
    type: "territory_based",
    autoAssignment: true,
    assignmentTimeout: 2, // 2 hours
    escalationTimeout: 12, // 12 hours
    assignmentRules: [
      {
        id: "rule_002",
        name: "Investment Territory Assignment",
        priority: 1,
        conditions: [
          {
            field: "industry",
            operator: "in",
            value: ["finance", "investment", "commercial"],
          },
        ],
        actions: [
          {
            type: "assign_to_queue",
            config: {
              queueId: "queue_002",
              priority: "medium",
            },
          },
        ],
        isActive: true,
      },
    ],
    workingHours: standardWorkingHours,
    holidays: ["2024-01-26", "2024-03-29", "2024-08-15"],
    members: [
      {
        userId: "user_mr_001",
        userName: "Vikram Patel",
        role: "Investment Specialist",
        skills: ["investment", "commercial", "finance"],
        territories: ["Mumbai", "Pune"],
        maxConcurrentLeads: 10,
        currentLeadCount: 6,
        isAvailable: true,
        priority: 9,
        averageResponseTime: 1.8,
        conversionRate: 32.1,
        averageHandlingTime: 36,
        satisfaction: 4.8,
      },
      {
        userId: "user_mr_002",
        userName: "Sneha Shah",
        role: "Senior Sales Executive",
        skills: ["commercial", "residential"],
        territories: ["Mumbai", "Nashik"],
        maxConcurrentLeads: 8,
        currentLeadCount: 7,
        isAvailable: true,
        priority: 7,
        averageResponseTime: 2.1,
        conversionRate: 29.5,
        averageHandlingTime: 42,
        satisfaction: 4.6,
      },
    ],
    stats: {
      totalLeads: 89,
      unassignedLeads: 2,
      assignedLeads: 87,
      overdueLeads: 0,
      escalatedLeads: 1,
      averageAssignmentTime: 28,
      averageResponseTime: 95,
      totalAssignments: 67,
      todayAssigned: 5,
      todayEscalated: 0,
      todayResolved: 8,
    },
    isActive: true,
    createdBy: "user_mr_admin",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-03-19T16:15:00Z",
  },
];

// Mock Unassigned Leads
export const mockUnassignedLeads: UnassignedLead[] = [
  {
    leadId: "lead_bc_unassigned_001",
    tenantId: "tenant_001",
    queueId: "queue_001",
    priority: "high",
    assignmentAttempts: [
      {
        id: "attempt_001",
        userId: "user_bc_001",
        attemptedAt: "2024-03-19T14:30:00Z",
        result: "timeout",
        reason: "No response within 30 minutes",
        responseTime: 30,
      },
    ],
    escalationLevel: 1,
    queuePosition: 1,
    estimatedAssignmentTime: "2024-03-19T17:00:00Z",
    leadInfo: {
      name: "Rahul Agarwal",
      company: "Innovation Labs",
      value: 2500000,
      source: "LinkedIn Campaign",
      territory: "Bangalore",
      skillsRequired: ["enterprise", "technology"],
    },
    enteredQueueAt: "2024-03-19T14:00:00Z",
    lastAttemptAt: "2024-03-19T14:30:00Z",
    status: "queued",
    escalationReason: "Assignment timeout exceeded",
    escalatedTo: "user_bc_manager",
    escalatedAt: "2024-03-19T15:30:00Z",
  },
  {
    leadId: "lead_mr_unassigned_001",
    tenantId: "tenant_002",
    queueId: "queue_002",
    priority: "medium",
    assignmentAttempts: [],
    escalationLevel: 0,
    queuePosition: 1,
    estimatedAssignmentTime: "2024-03-19T17:30:00Z",
    leadInfo: {
      name: "Kavya Nair",
      company: "Coastal Investments",
      value: 5000000,
      source: "Website Form",
      territory: "Mumbai",
      skillsRequired: ["investment", "commercial"],
    },
    enteredQueueAt: "2024-03-19T16:45:00Z",
    status: "queued",
  },
];

// Mock Duplicate Detection Configurations
export const mockDuplicateConfigs: DuplicateDetectionConfig[] = [
  {
    tenantId: "tenant_001",
    phoneMatching: {
      enabled: true,
      exactMatch: false,
      normalizeFormat: true,
      countryCodeHandling: "flexible",
    },
    emailMatching: {
      enabled: true,
      caseSensitive: false,
      domainMatching: false,
      aliasDetection: true,
    },
    nameMatching: {
      enabled: true,
      threshold: 85,
      includeCompany: true,
      fuzzyMatching: true,
    },
    addressMatching: {
      enabled: false,
      threshold: 70,
      normalizeFormat: true,
    },
    customFieldMatching: {
      enabled: true,
      fields: ["company", "designation"],
      weights: {
        company: 0.3,
        designation: 0.2,
      },
    },
    onDuplicateFound: "warn",
    autoMergeThreshold: 95,
    notifyOnDuplicate: true,
    notificationRecipients: ["user_bc_admin", "user_bc_001"],
    mergeStrategy: "newest_wins",
    fieldPriority: {
      phone: ["newest", "longest"],
      email: ["newest", "verified"],
      company: ["newest", "complete"],
    },
    keepAuditTrail: true,
    auditRetentionDays: 365,
  },
];

// Mock Duplicate Matches
export const mockDuplicateMatches: DuplicateMatch[] = [
  {
    id: "dup_001",
    tenantId: "tenant_001",
    candidateLeadId: "lead_bc_candidate_001",
    existingLeadId: "lead_bc_001",
    matchScore: 92,
    matchedFields: [
      {
        fieldName: "phone",
        candidateValue: "+919876543210",
        existingValue: "+91-9876543210",
        matchScore: 100,
        matchType: "normalized",
        weight: 0.4,
      },
      {
        fieldName: "email",
        candidateValue: "rajesh.kumar+work@techcorp.in",
        existingValue: "rajesh.kumar@techcorp.in",
        matchScore: 95,
        matchType: "fuzzy",
        weight: 0.3,
      },
      {
        fieldName: "company",
        candidateValue: "TechCorp Solutions Pvt Ltd",
        existingValue: "TechCorp Solutions",
        matchScore: 88,
        matchType: "fuzzy",
        weight: 0.3,
      },
    ],
    matchType: "fuzzy",
    detectedAt: "2024-03-19T16:45:00Z",
    detectedBy: "system",
    detectionMethod: "composite",
    status: "pending",
    actionsTaken: [
      {
        type: "notification_sent",
        timestamp: "2024-03-19T16:46:00Z",
        details: {
          recipients: ["user_bc_admin", "user_bc_001"],
          method: "email",
        },
        performedBy: "system",
      },
      {
        type: "warning_shown",
        timestamp: "2024-03-19T16:45:30Z",
        details: {
          userId: "user_bc_002",
          action: "lead_creation",
        },
        performedBy: "system",
      },
    ],
  },
];

// Mock CRM Action Audit Trail
export const mockCRMActionAudit: CRMActionAudit[] = [
  {
    id: "audit_001",
    tenantId: "tenant_001",
    action: "convert",
    entityType: "lead",
    entityId: "lead_bc_001",
    userId: "user_bc_001",
    userName: "Amit Sharma",
    userRole: "Senior Sales Manager",
    userIP: "192.168.1.100",
    previousState: {
      status: "qualified",
      stage: "proposal",
    },
    newState: {
      status: "won",
      stage: "closed_won",
      convertedToCustomer: "cust_001",
      convertedToOpportunity: "opp_001",
    },
    changedFields: [
      "status",
      "stage",
      "convertedToCustomer",
      "convertedToOpportunity",
    ],
    source: "web",
    reason: "Lead conversion after successful proposal acceptance",
    notes:
      "Customer approved the proposal, converted to customer and created opportunity for Phase 2",
    performedAt: "2024-01-15T10:30:00Z",
    affectedEntities: [
      {
        type: "customer",
        id: "cust_001",
        impact: "created",
      },
      {
        type: "opportunity",
        id: "opp_001",
        impact: "created",
      },
    ],
    businessImpact: "Revenue pipeline increased by ₹35 Lakhs",
  },
  {
    id: "audit_002",
    tenantId: "tenant_001",
    action: "assign",
    entityType: "lead",
    entityId: "lead_bc_unassigned_001",
    userId: "system",
    userName: "System Auto-Assignment",
    userRole: "system",
    previousState: {
      assignedTo: null,
      queueId: "queue_001",
      status: "new",
    },
    newState: {
      assignedTo: "user_bc_001",
      assignedAt: "2024-03-19T14:30:00Z",
      status: "contacted",
    },
    changedFields: ["assignedTo", "assignedAt", "status"],
    source: "automation",
    reason: "Auto-assignment based on queue rules",
    performedAt: "2024-03-19T14:30:00Z",
    affectedEntities: [
      {
        type: "user",
        id: "user_bc_001",
        impact: "linked",
      },
      {
        type: "queue",
        id: "queue_001",
        impact: "updated",
      },
    ],
  },
];

// Mock Enhanced CRM Analytics
export const mockEnhancedAnalytics: EnhancedCRMAnalytics[] = [
  {
    tenantId: "tenant_001",
    period: {
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-03-19T23:59:59Z",
    },
    conversionMetrics: {
      totalConversions: 24,
      leadToCustomer: 18,
      leadToOpportunity: 22,
      conversionRate: 16.5,
      averageConversionTime: 12.5,
      conversionValue: 45600000,
      conversionsByStage: {
        prospect: 2,
        lead: 8,
        opportunity: 10,
        proposal: 15,
        negotiation: 12,
        closed_won: 18,
        closed_lost: 6,
      },
      conversionsBySource: {
        website: 12,
        linkedin: 8,
        referral: 4,
      },
    },
    assignmentMetrics: {
      totalAssignments: 145,
      averageAssignmentTime: 32,
      unassignedCount: 3,
      overdueCount: 1,
      escalationRate: 2.8,
      assignmentByUser: {
        user_bc_001: 45,
        user_bc_002: 38,
        user_bc_003: 35,
      },
      responseTimeByUser: {
        user_bc_001: 125,
        user_bc_002: 145,
        user_bc_003: 167,
      },
      queuePerformance: {
        queue_001: {
          queueId: "queue_001",
          queueName: "High-Value Leads Queue",
          averageWaitTime: 35,
          averageAssignmentTime: 32,
          throughput: 8.5,
          escalationRate: 1.2,
          memberUtilization: {
            user_bc_001: 78,
            user_bc_002: 85,
          },
          satisfaction: 4.6,
        },
      },
    },
    duplicateMetrics: {
      duplicatesDetected: 12,
      duplicatesBlocked: 3,
      duplicatesMerged: 7,
      duplicateRate: 8.3,
      detectionAccuracy: 94.2,
      falsePositiveRate: 5.8,
      mergeSuccessRate: 87.5,
      topDuplicateFields: {
        phone: 8,
        email: 6,
        company: 4,
      },
    },
    healthMetrics: {
      leadQuality: 84.5,
      responseTime: 135,
      conversionVelocity: 2.8,
      duplicateHygiene: 91.7,
      automationEfficiency: 88.3,
    },
  },
];

// Utility functions for enhanced CRM operations
export const getConversionWorkflowsByTenant = (
  tenantId: string,
): LeadConversionWorkflow[] => {
  return mockConversionWorkflows.filter(
    (workflow) => workflow.tenantId === tenantId,
  );
};

export const getAssignmentQueuesByTenant = (
  tenantId: string,
): AssignmentQueue[] => {
  return mockAssignmentQueues.filter((queue) => queue.tenantId === tenantId);
};

export const getUnassignedLeadsByTenant = (
  tenantId: string,
): UnassignedLead[] => {
  return mockUnassignedLeads.filter((lead) => lead.tenantId === tenantId);
};

export const getDuplicateMatchesByTenant = (
  tenantId: string,
): DuplicateMatch[] => {
  return mockDuplicateMatches.filter((match) => match.tenantId === tenantId);
};

export const getCustomersByTenant = (tenantId: string): TenantCustomer[] => {
  return mockCustomers.filter((customer) => customer.tenantId === tenantId);
};

export const getOpportunitiesByTenant = (
  tenantId: string,
): TenantOpportunity[] => {
  return mockOpportunities.filter(
    (opportunity) => opportunity.tenantId === tenantId,
  );
};

export const getCRMAuditByTenant = (tenantId: string): CRMActionAudit[] => {
  return mockCRMActionAudit.filter((audit) => audit.tenantId === tenantId);
};

export const getEnhancedAnalyticsByTenant = (
  tenantId: string,
): EnhancedCRMAnalytics | undefined => {
  return mockEnhancedAnalytics.find(
    (analytics) => analytics.tenantId === tenantId,
  );
};

// Conversion workflow helper functions
export const canConvertLead = (lead: TenantLead, criteria: any): boolean => {
  const checks = [
    !criteria.minimumLeadScore || lead.score >= criteria.minimumLeadScore,
    !criteria.requiredStage || lead.stage === criteria.requiredStage,
    !criteria.minimumActivities ||
      lead.activities.length >= criteria.minimumActivities,
    !criteria.minimumValue ||
      (lead.expectedValue && lead.expectedValue >= criteria.minimumValue),
  ];

  return checks.every((check) => check);
};

export const detectDuplicates = (
  candidateLead: any,
  existingLeads: TenantLead[],
  config: DuplicateDetectionConfig,
): DuplicateMatch[] => {
  const matches: DuplicateMatch[] = [];

  existingLeads.forEach((existing) => {
    let totalScore = 0;
    const matchedFields: any[] = [];

    // Phone matching
    if (config.phoneMatching.enabled && candidateLead.phone && existing.phone) {
      const phoneScore = calculatePhoneMatch(
        candidateLead.phone,
        existing.phone,
        config.phoneMatching,
      );
      if (phoneScore > 70) {
        matchedFields.push({
          fieldName: "phone",
          candidateValue: candidateLead.phone,
          existingValue: existing.phone,
          matchScore: phoneScore,
          matchType: "normalized",
          weight: 0.4,
        });
        totalScore += phoneScore * 0.4;
      }
    }

    // Email matching
    if (config.emailMatching.enabled && candidateLead.email && existing.email) {
      const emailScore = calculateEmailMatch(
        candidateLead.email,
        existing.email,
        config.emailMatching,
      );
      if (emailScore > 70) {
        matchedFields.push({
          fieldName: "email",
          candidateValue: candidateLead.email,
          existingValue: existing.email,
          matchScore: emailScore,
          matchType: "exact",
          weight: 0.3,
        });
        totalScore += emailScore * 0.3;
      }
    }

    if (totalScore > 70 && matchedFields.length > 0) {
      matches.push({
        id: `dup_${Date.now()}_${existing.id}`,
        tenantId: existing.tenantId,
        candidateLeadId: candidateLead.id || "candidate",
        existingLeadId: existing.id,
        matchScore: Math.round(totalScore),
        matchedFields,
        matchType: totalScore > 95 ? "exact" : "fuzzy",
        detectedAt: new Date().toISOString(),
        detectedBy: "system",
        detectionMethod: "composite",
        status: "pending",
        actionsTaken: [],
      });
    }
  });

  return matches;
};

// Helper functions for duplicate detection
const calculatePhoneMatch = (
  phone1: string,
  phone2: string,
  config: any,
): number => {
  const normalize = (phone: string) => phone.replace(/[^\d]/g, "");
  const norm1 = normalize(phone1);
  const norm2 = normalize(phone2);

  if (norm1 === norm2) return 100;
  if (norm1.endsWith(norm2.slice(-10)) || norm2.endsWith(norm1.slice(-10)))
    return 95;
  return 0;
};

const calculateEmailMatch = (
  email1: string,
  email2: string,
  config: any,
): number => {
  const norm1 = config.caseSensitive ? email1 : email1.toLowerCase();
  const norm2 = config.caseSensitive ? email2 : email2.toLowerCase();

  if (norm1 === norm2) return 100;

  if (config.aliasDetection) {
    const cleanEmail1 = norm1.replace(/\+.*?@/, "@");
    const cleanEmail2 = norm2.replace(/\+.*?@/, "@");
    if (cleanEmail1 === cleanEmail2) return 98;
  }

  return 0;
};
