import {
  TenantLead,
  TenantLeadSource,
  TenantLeadAnalytics,
  TenantLeadActivity,
  TenantLeadNote,
  TenantLeadDocument,
  LeadStatus,
  LeadStage,
  LeadPriority,
} from "./types";

// Available tenants
const availableTenants = [
  {
    id: "tenant_001",
    name: "BuildCorp Constructions",
    type: "Construction",
    industry: "construction",
  },
  {
    id: "tenant_002",
    name: "Metro Realty Group",
    type: "Real Estate",
    industry: "real_estate",
  },
  {
    id: "tenant_003",
    name: "Skyline Developers",
    type: "Development",
    industry: "property_development",
  },
];

// Tenant-specific lead sources
export const tenantLeadSources: TenantLeadSource[] = [
  // BuildCorp Constructions lead sources
  {
    id: "bc_website",
    tenantId: "tenant_001",
    name: "BuildCorp Website",
    type: "digital",
    category: "Organic",
    description: "Leads from construction project inquiry forms",
    isActive: true,
    cost: 0,
    conversionRate: 18.5,
    totalLeads: 145,
    convertedLeads: 27,
    customConfiguration: {
      formId: "construction_inquiry",
      trackingPixel: "BC_WEB_001",
    },
    trackingCode: "BC_WEB",
    utmSource: "website",
    utmMedium: "organic",
    attribution: {
      firstTouch: 45,
      lastTouch: 38,
      multiTouch: 62,
    },
    visibility: "public",
    allowedRoles: ["admin", "sales_manager", "sales_rep"],
    createdBy: "user_001",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "bc_google_ads",
    tenantId: "tenant_001",
    name: "Google Ads - Construction",
    type: "digital",
    category: "Paid",
    description: "Google ads for construction services and projects",
    isActive: true,
    cost: 35000,
    conversionRate: 14.2,
    totalLeads: 98,
    convertedLeads: 14,
    customConfiguration: {
      campaignId: "construction_services_2024",
      adGroupIds: ["residential", "commercial", "industrial"],
    },
    trackingCode: "BC_GOOGLE",
    utmSource: "google",
    utmMedium: "cpc",
    attribution: {
      firstTouch: 32,
      lastTouch: 45,
      multiTouch: 21,
    },
    visibility: "team",
    allowedRoles: ["admin", "marketing_manager", "sales_manager"],
    createdBy: "user_001",
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-25T00:00:00Z",
  },
  {
    id: "bc_trade_shows",
    tenantId: "tenant_001",
    name: "Construction Trade Shows",
    type: "traditional",
    category: "Events",
    description: "Construction industry exhibitions and trade shows",
    isActive: true,
    cost: 75000,
    conversionRate: 25.5,
    totalLeads: 47,
    convertedLeads: 12,
    customConfiguration: {
      events: ["ConstructExpo2024", "BuildTech2024", "InfraShow2024"],
    },
    trackingCode: "BC_TRADE",
    attribution: {
      firstTouch: 67,
      lastTouch: 78,
      multiTouch: 45,
    },
    visibility: "public",
    allowedRoles: ["admin", "sales_manager", "business_dev"],
    createdBy: "user_001",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-22T00:00:00Z",
  },
  {
    id: "bc_referrals",
    tenantId: "tenant_001",
    name: "Client Referrals",
    type: "referral",
    category: "Word of Mouth",
    description: "Referrals from existing construction clients",
    isActive: true,
    cost: 0,
    conversionRate: 52.3,
    totalLeads: 65,
    convertedLeads: 34,
    customConfiguration: {
      referralProgram: true,
      incentive: "5% commission",
    },
    trackingCode: "BC_REF",
    attribution: {
      firstTouch: 89,
      lastTouch: 92,
      multiTouch: 67,
    },
    visibility: "public",
    allowedRoles: ["admin", "sales_manager", "account_manager"],
    createdBy: "user_001",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-18T00:00:00Z",
  },

  // Metro Realty Group lead sources
  {
    id: "mr_website",
    tenantId: "tenant_002",
    name: "Metro Realty Website",
    type: "digital",
    category: "Organic",
    description: "Property inquiry forms from website",
    isActive: true,
    cost: 0,
    conversionRate: 22.8,
    totalLeads: 234,
    convertedLeads: 53,
    customConfiguration: {
      propertyTypes: ["residential", "commercial", "luxury"],
      leadMagnet: "property_valuation_tool",
    },
    trackingCode: "MR_WEB",
    utmSource: "website",
    utmMedium: "organic",
    attribution: {
      firstTouch: 56,
      lastTouch: 48,
      multiTouch: 73,
    },
    visibility: "public",
    allowedRoles: ["admin", "sales_manager", "property_advisor"],
    createdBy: "user_004",
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-15T00:00:00Z",
  },
  {
    id: "mr_facebook_ads",
    tenantId: "tenant_002",
    name: "Facebook Property Ads",
    type: "digital",
    category: "Paid",
    description: "Facebook ads for property listings and services",
    isActive: true,
    cost: 28000,
    conversionRate: 16.7,
    totalLeads: 156,
    convertedLeads: 26,
    customConfiguration: {
      targetAudience: ["home_buyers", "investors", "first_time_buyers"],
      adFormats: ["carousel", "video", "lead_gen"],
    },
    trackingCode: "MR_FB",
    utmSource: "facebook",
    utmMedium: "cpc",
    attribution: {
      firstTouch: 41,
      lastTouch: 38,
      multiTouch: 47,
    },
    visibility: "team",
    allowedRoles: ["admin", "marketing_manager", "digital_marketer"],
    createdBy: "user_004",
    createdAt: "2024-02-03T00:00:00Z",
    updatedAt: "2024-02-20T00:00:00Z",
  },
  {
    id: "mr_property_portals",
    tenantId: "tenant_002",
    name: "Property Portals",
    type: "digital",
    category: "Listing Sites",
    description: "Leads from property listing websites",
    isActive: true,
    cost: 15000,
    conversionRate: 19.3,
    totalLeads: 187,
    convertedLeads: 36,
    customConfiguration: {
      portals: ["99acres", "magicbricks", "housing.com", "nobroker"],
    },
    trackingCode: "MR_PORTALS",
    attribution: {
      firstTouch: 63,
      lastTouch: 52,
      multiTouch: 72,
    },
    visibility: "public",
    allowedRoles: ["admin", "listing_manager", "property_advisor"],
    createdBy: "user_004",
    createdAt: "2024-02-05T00:00:00Z",
    updatedAt: "2024-02-18T00:00:00Z",
  },
  {
    id: "mr_broker_network",
    tenantId: "tenant_002",
    name: "Broker Network",
    type: "referral",
    category: "Partner Network",
    description: "Leads from partner broker network",
    isActive: true,
    cost: 0,
    conversionRate: 31.5,
    totalLeads: 89,
    convertedLeads: 28,
    customConfiguration: {
      brokerCommission: "2.5%",
      networkSize: 45,
    },
    trackingCode: "MR_BROKER",
    attribution: {
      firstTouch: 78,
      lastTouch: 85,
      multiTouch: 56,
    },
    visibility: "team",
    allowedRoles: ["admin", "partner_manager", "sales_manager"],
    createdBy: "user_004",
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-22T00:00:00Z",
  },

  // Skyline Developers lead sources
  {
    id: "sd_website",
    tenantId: "tenant_003",
    name: "Skyline Website",
    type: "digital",
    category: "Organic",
    description: "Development project inquiry forms",
    isActive: true,
    cost: 0,
    conversionRate: 20.1,
    totalLeads: 89,
    convertedLeads: 18,
    customConfiguration: {
      projectTypes: ["residential_towers", "commercial_complexes", "mixed_use"],
    },
    trackingCode: "SD_WEB",
    utmSource: "website",
    utmMedium: "organic",
    attribution: {
      firstTouch: 44,
      lastTouch: 39,
      multiTouch: 56,
    },
    visibility: "public",
    allowedRoles: ["admin", "sales_director", "project_manager"],
    createdBy: "user_006",
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-03-10T00:00:00Z",
  },
  {
    id: "sd_linkedin",
    tenantId: "tenant_003",
    name: "LinkedIn Business Network",
    type: "digital",
    category: "Professional Network",
    description: "B2B leads from LinkedIn networking",
    isActive: true,
    cost: 8000,
    conversionRate: 28.4,
    totalLeads: 67,
    convertedLeads: 19,
    customConfiguration: {
      targetRoles: ["ceo", "cfo", "business_owner", "investor"],
    },
    trackingCode: "SD_LI",
    utmSource: "linkedin",
    utmMedium: "social",
    attribution: {
      firstTouch: 71,
      lastTouch: 68,
      multiTouch: 42,
    },
    visibility: "team",
    allowedRoles: ["admin", "business_dev", "sales_director"],
    createdBy: "user_006",
    createdAt: "2024-03-02T00:00:00Z",
    updatedAt: "2024-03-15T00:00:00Z",
  },
  {
    id: "sd_investor_meets",
    tenantId: "tenant_003",
    name: "Investor Meets",
    type: "traditional",
    category: "Business Events",
    description: "Investor meetups and business networking events",
    isActive: true,
    cost: 25000,
    conversionRate: 35.7,
    totalLeads: 28,
    convertedLeads: 10,
    customConfiguration: {
      eventTypes: ["investor_meetups", "business_summits", "real_estate_confs"],
    },
    trackingCode: "SD_INVESTOR",
    attribution: {
      firstTouch: 82,
      lastTouch: 89,
      multiTouch: 65,
    },
    visibility: "private",
    allowedRoles: ["admin", "founder", "business_dev"],
    createdBy: "user_006",
    createdAt: "2024-03-05T00:00:00Z",
    updatedAt: "2024-03-12T00:00:00Z",
  },
];

// Comprehensive tenant-specific lead data
export const tenantLeads: TenantLead[] = [
  // BuildCorp Constructions Leads
  {
    id: "lead_bc_001",
    tenantId: "tenant_001",
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "rajesh.kumar@techsolutions.com",
    phone: "+91-9876543210",
    alternatePhone: "+91-9876543211",
    company: "TechSolutions Pvt Ltd",
    designation: "CEO",
    industry: "Technology",
    leadSource: tenantLeadSources.find((s) => s.id === "bc_website")!,
    status: "proposal",
    stage: "proposal",
    priority: "high",
    assignedTo: "user_bc_001",
    createdBy: "user_bc_002",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-25T14:20:00Z",
    lastContactedAt: "2024-01-24T11:15:00Z",
    expectedValue: 8500000,
    currency: "INR",

    address: {
      street: "Tech Park, Sector 18",
      city: "Gurgaon",
      state: "Haryana",
      pincode: "122001",
      country: "India",
    },

    requirements:
      "Office complex construction - 50,000 sq ft, modern design with sustainable features",
    budget: {
      min: 7500000,
      max: 10000000,
      currency: "INR",
    },
    timeline: "12-18 months",

    activities: [],
    notes: [],
    documents: [],

    score: 85,
    temperature: "hot",
    conversionProbability: 75,
    daysInPipeline: 10,

    campaignId: "construction_b2b_2024",
    utmSource: "website",
    utmMedium: "organic",

    nextFollowUpDate: "2024-01-26T10:00:00Z",
    followUpRequired: true,

    tenantLeadId: "BC-2024-001",
    customFields: {
      projectType: "commercial",
      constructionType: "new",
      plotSize: "2.5 acres",
      approvalStatus: "pending",
      architecturalStyle: "modern",
    },
    tags: ["high-value", "b2b", "commercial", "tech-company"],

    visibility: "team",
    permissions: {
      canView: [
        "role:admin",
        "role:sales_manager",
        "user_bc_001",
        "user_bc_002",
      ],
      canEdit: ["role:admin", "role:sales_manager", "user_bc_001"],
      canDelete: ["role:admin"],
      canAssign: ["role:admin", "role:sales_manager"],
      canExport: ["role:admin", "role:sales_manager"],
      canShare: ["role:admin", "role:sales_manager"],
      canManageActivities: ["role:admin", "role:sales_manager", "user_bc_001"],
      canManageNotes: ["role:admin", "role:sales_manager", "user_bc_001"],
    },

    territory: "North Delhi",
    region: "NCR",

    externalIds: {
      salesforce: "SF_001_BC",
      hubspot: "HS_001_BC",
    },
    syncStatus: "synced",
    lastSyncAt: "2024-01-25T14:20:00Z",
  },

  {
    id: "lead_bc_002",
    tenantId: "tenant_001",
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@residenciales.com",
    phone: "+91-9876543212",
    company: "Sharma Residences",
    designation: "Director",
    industry: "Real Estate",
    leadSource: tenantLeadSources.find((s) => s.id === "bc_referrals")!,
    status: "qualified",
    stage: "opportunity",
    priority: "medium",
    assignedTo: "user_bc_003",
    createdBy: "user_bc_001",
    createdAt: "2024-01-20T09:15:00Z",
    updatedAt: "2024-01-25T16:30:00Z",
    lastContactedAt: "2024-01-25T09:45:00Z",
    expectedValue: 4500000,
    currency: "INR",

    address: {
      street: "MG Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      country: "India",
    },

    requirements: "Residential villa construction - 3 BHK, luxury finishes",
    budget: {
      min: 4000000,
      max: 5500000,
      currency: "INR",
    },
    timeline: "8-10 months",

    activities: [],
    notes: [],
    documents: [],

    score: 72,
    temperature: "warm",
    conversionProbability: 65,
    daysInPipeline: 5,

    nextFollowUpDate: "2024-01-27T14:00:00Z",
    followUpRequired: true,

    tenantLeadId: "BC-2024-002",
    customFields: {
      projectType: "residential",
      constructionType: "new",
      plotSize: "8000 sq ft",
      approvalStatus: "approved",
      architecturalStyle: "contemporary",
    },
    tags: ["residential", "luxury", "referral", "high-priority"],

    visibility: "public",
    permissions: {
      canView: ["all"],
      canEdit: ["role:admin", "role:sales_manager", "user_bc_003"],
      canDelete: ["role:admin"],
      canAssign: ["role:admin", "role:sales_manager"],
      canExport: ["role:admin", "role:sales_manager"],
      canShare: ["role:admin", "role:sales_manager", "user_bc_003"],
      canManageActivities: ["role:admin", "role:sales_manager", "user_bc_003"],
      canManageNotes: ["role:admin", "role:sales_manager", "user_bc_003"],
    },

    territory: "South Bangalore",
    region: "Karnataka",

    externalIds: {},
    syncStatus: "pending",
  },

  // Metro Realty Group Leads
  {
    id: "lead_mr_001",
    tenantId: "tenant_002",
    firstName: "Amit",
    lastName: "Patel",
    email: "amit.patel@investments.com",
    phone: "+91-9876543213",
    company: "Patel Investments",
    designation: "Managing Director",
    industry: "Investment",
    leadSource: tenantLeadSources.find((s) => s.id === "mr_property_portals")!,
    status: "negotiation",
    stage: "negotiation",
    priority: "urgent",
    assignedTo: "user_mr_001",
    createdBy: "user_mr_002",
    createdAt: "2024-02-10T11:20:00Z",
    updatedAt: "2024-02-25T13:45:00Z",
    lastContactedAt: "2024-02-25T10:30:00Z",
    expectedValue: 12500000,
    currency: "INR",

    address: {
      street: "Business District",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      country: "India",
    },

    requirements: "Commercial office space - 15,000 sq ft in prime location",
    budget: {
      min: 11000000,
      max: 15000000,
      currency: "INR",
    },
    timeline: "3-6 months",

    activities: [],
    notes: [],
    documents: [],

    score: 92,
    temperature: "hot",
    conversionProbability: 85,
    daysInPipeline: 15,

    campaignId: "commercial_property_2024",
    utmSource: "99acres",
    utmMedium: "listing",

    nextFollowUpDate: "2024-02-26T11:00:00Z",
    followUpRequired: true,

    tenantLeadId: "MR-2024-001",
    customFields: {
      propertyType: "commercial",
      lookingFor: "purchase",
      occupancy: "immediate",
      parking: "required",
      amenities: ["gym", "cafeteria", "conference_rooms"],
    },
    tags: ["commercial", "high-value", "investor", "urgent"],

    visibility: "team",
    permissions: {
      canView: ["role:admin", "role:sales_manager", "role:property_advisor"],
      canEdit: ["role:admin", "role:sales_manager", "user_mr_001"],
      canDelete: ["role:admin"],
      canAssign: ["role:admin", "role:sales_manager"],
      canExport: ["role:admin", "role:sales_manager"],
      canShare: ["role:admin", "role:sales_manager"],
      canManageActivities: ["role:admin", "role:sales_manager", "user_mr_001"],
      canManageNotes: ["role:admin", "role:sales_manager", "user_mr_001"],
    },

    territory: "Mumbai Central",
    region: "Western India",

    externalIds: {
      crm: "CRM_MR_001",
      portal: "99ACRES_001",
    },
    syncStatus: "synced",
    lastSyncAt: "2024-02-25T13:45:00Z",
  },

  {
    id: "lead_mr_002",
    tenantId: "tenant_002",
    firstName: "Sneha",
    lastName: "Reddy",
    email: "sneha.reddy@gmail.com",
    phone: "+91-9876543214",
    company: "Reddy Family",
    designation: "Home Buyer",
    industry: "Personal",
    leadSource: tenantLeadSources.find((s) => s.id === "mr_facebook_ads")!,
    status: "contacted",
    stage: "lead",
    priority: "medium",
    assignedTo: "user_mr_003",
    createdBy: "user_mr_002",
    createdAt: "2024-02-18T14:30:00Z",
    updatedAt: "2024-02-25T10:15:00Z",
    lastContactedAt: "2024-02-23T16:20:00Z",
    expectedValue: 6500000,
    currency: "INR",

    address: {
      street: "Jubilee Hills",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500033",
      country: "India",
    },

    requirements: "3 BHK apartment in gated community with amenities",
    budget: {
      min: 5500000,
      max: 7500000,
      currency: "INR",
    },
    timeline: "6-9 months",

    activities: [],
    notes: [],
    documents: [],

    score: 68,
    temperature: "warm",
    conversionProbability: 55,
    daysInPipeline: 7,

    campaignId: "residential_facebook_2024",
    utmSource: "facebook",
    utmMedium: "cpc",
    utmCampaign: "hyderabad_homes",

    nextFollowUpDate: "2024-02-26T15:00:00Z",
    followUpRequired: true,

    tenantLeadId: "MR-2024-002",
    customFields: {
      propertyType: "residential",
      lookingFor: "purchase",
      bedrooms: "3",
      bathrooms: "3",
      preferredLocation: ["Jubilee Hills", "Banjara Hills", "Gachibowli"],
      familySize: 4,
    },
    tags: ["residential", "first-time-buyer", "family", "facebook-lead"],

    visibility: "public",
    permissions: {
      canView: ["all"],
      canEdit: ["role:admin", "role:sales_manager", "user_mr_003"],
      canDelete: ["role:admin"],
      canAssign: ["role:admin", "role:sales_manager"],
      canExport: ["role:admin", "role:sales_manager"],
      canShare: ["role:admin", "role:sales_manager", "user_mr_003"],
      canManageActivities: ["role:admin", "role:sales_manager", "user_mr_003"],
      canManageNotes: ["role:admin", "role:sales_manager", "user_mr_003"],
    },

    territory: "Hyderabad West",
    region: "South India",

    externalIds: {
      facebook: "FB_LEAD_002",
    },
    syncStatus: "pending",
  },

  // Skyline Developers Leads
  {
    id: "lead_sd_001",
    tenantId: "tenant_003",
    firstName: "Vikram",
    lastName: "Singh",
    email: "vikram.singh@corporategroup.com",
    phone: "+91-9876543215",
    company: "Singh Corporate Group",
    designation: "Chairman",
    industry: "Diversified Business",
    leadSource: tenantLeadSources.find((s) => s.id === "sd_investor_meets")!,
    status: "qualified",
    stage: "opportunity",
    priority: "urgent",
    assignedTo: "user_sd_001",
    createdBy: "user_006",
    createdAt: "2024-03-08T16:45:00Z",
    updatedAt: "2024-03-15T12:30:00Z",
    lastContactedAt: "2024-03-14T14:00:00Z",
    expectedValue: 25000000,
    currency: "INR",

    address: {
      street: "Connaught Place",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110001",
      country: "India",
    },

    requirements:
      "Mixed-use development project - residential + commercial tower",
    budget: {
      min: 20000000,
      max: 30000000,
      currency: "INR",
    },
    timeline: "24-36 months",

    activities: [],
    notes: [],
    documents: [],

    score: 95,
    temperature: "hot",
    conversionProbability: 80,
    daysInPipeline: 7,

    nextFollowUpDate: "2024-03-16T10:00:00Z",
    followUpRequired: true,

    tenantLeadId: "SD-2024-001",
    customFields: {
      projectType: "mixed_use",
      developmentType: "joint_venture",
      landArea: "5 acres",
      proposedFSI: "4.0",
      targetCompletion: "Q4 2027",
      investmentType: "equity_partner",
    },
    tags: ["mega-project", "investor", "joint-venture", "high-priority"],

    visibility: "private",
    permissions: {
      canView: ["role:admin", "role:founder", "user_006", "user_sd_001"],
      canEdit: ["role:admin", "role:founder", "user_sd_001"],
      canDelete: ["role:admin"],
      canAssign: ["role:admin", "role:founder"],
      canExport: ["role:admin", "role:founder"],
      canShare: ["role:admin", "role:founder"],
      canManageActivities: ["role:admin", "role:founder", "user_sd_001"],
      canManageNotes: ["role:admin", "role:founder", "user_sd_001"],
    },

    territory: "Delhi NCR",
    region: "North India",

    externalIds: {
      investor_db: "INV_001_SD",
    },
    syncStatus: "synced",
    lastSyncAt: "2024-03-15T12:30:00Z",
  },

  {
    id: "lead_sd_002",
    tenantId: "tenant_003",
    firstName: "Meera",
    lastName: "Joshi",
    email: "meera.joshi@techpark.com",
    phone: "+91-9876543216",
    company: "TechPark Solutions",
    designation: "COO",
    industry: "Technology",
    leadSource: tenantLeadSources.find((s) => s.id === "sd_linkedin")!,
    status: "new",
    stage: "prospect",
    priority: "medium",
    assignedTo: "user_sd_002",
    createdBy: "user_sd_001",
    createdAt: "2024-03-12T09:30:00Z",
    updatedAt: "2024-03-15T11:45:00Z",
    expectedValue: 15000000,
    currency: "INR",

    address: {
      street: "Electronic City",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560100",
      country: "India",
    },

    requirements:
      "IT campus development - modern office spaces with tech infrastructure",
    budget: {
      min: 12000000,
      max: 18000000,
      currency: "INR",
    },
    timeline: "18-24 months",

    activities: [],
    notes: [],
    documents: [],

    score: 73,
    temperature: "warm",
    conversionProbability: 60,
    daysInPipeline: 3,

    campaignId: "tech_infrastructure_2024",
    utmSource: "linkedin",
    utmMedium: "social",

    nextFollowUpDate: "2024-03-17T11:00:00Z",
    followUpRequired: true,

    tenantLeadId: "SD-2024-002",
    customFields: {
      projectType: "commercial",
      developmentType: "build_to_suit",
      techRequirements: [
        "fiber_connectivity",
        "data_centers",
        "smart_building",
      ],
      sustainabilityGoals: "LEED_platinum",
      employeeCapacity: 5000,
    },
    tags: ["tech-campus", "sustainability", "build-to-suit", "linkedin"],

    visibility: "team",
    permissions: {
      canView: ["role:admin", "role:business_dev", "role:project_manager"],
      canEdit: ["role:admin", "role:business_dev", "user_sd_002"],
      canDelete: ["role:admin"],
      canAssign: ["role:admin", "role:business_dev"],
      canExport: ["role:admin", "role:business_dev"],
      canShare: ["role:admin", "role:business_dev"],
      canManageActivities: ["role:admin", "role:business_dev", "user_sd_002"],
      canManageNotes: ["role:admin", "role:business_dev", "user_sd_002"],
    },

    territory: "Bangalore South",
    region: "South India",

    externalIds: {
      linkedin: "LI_LEAD_002",
    },
    syncStatus: "not_synced",
  },
];

// Tenant-specific analytics data
export const tenantLeadAnalytics: { [tenantId: string]: TenantLeadAnalytics } =
  {
    tenant_001: {
      tenantId: "tenant_001",
      period: {
        startDate: "2024-01-01",
        endDate: "2024-01-31",
      },
      totalLeads: 145,
      convertedLeads: 27,
      conversionRate: 18.6,
      averageDealValue: 6200000,
      totalPipelineValue: 89700000,
      averageSalescycle: 85,

      tenantKPIs: {
        leadVelocity: 4.7,
        salesVelocity: 2900000,
        customerAcquisitionCost: 45000,
        leadToCustomerTime: 75,
        pipelineCoverage: 2.3,
        winRate: 18.6,
      },

      thisMonth: {
        leads: 45,
        converted: 8,
        value: 24500000,
        activities: 189,
        meetings: 67,
        proposals: 12,
      },

      lastMonth: {
        leads: 38,
        converted: 6,
        value: 18900000,
        activities: 156,
        meetings: 52,
        proposals: 9,
      },

      thisQuarter: {
        leads: 145,
        converted: 27,
        value: 89700000,
        activities: 578,
        meetings: 201,
        proposals: 38,
      },

      lastQuarter: {
        leads: 132,
        converted: 22,
        value: 76800000,
        activities: 523,
        meetings: 178,
        proposals: 31,
      },

      sourceBreakdown: [
        {
          sourceId: "bc_referrals",
          sourceName: "Client Referrals",
          leads: 65,
          converted: 34,
          value: 45600000,
          cost: 0,
          roi: Infinity,
          conversionRate: 52.3,
          averageDealSize: 1341176,
          salesCycle: 45,
        },
        {
          sourceId: "bc_website",
          sourceName: "BuildCorp Website",
          leads: 45,
          converted: 12,
          value: 28900000,
          cost: 0,
          roi: Infinity,
          conversionRate: 26.7,
          averageDealSize: 2408333,
          salesCycle: 68,
        },
      ],

      territoryBreakdown: [
        {
          territory: "North Delhi",
          region: "NCR",
          leads: 67,
          converted: 15,
          value: 34500000,
          conversionRate: 22.4,
          marketPenetration: 12.5,
        },
        {
          territory: "South Bangalore",
          region: "Karnataka",
          leads: 45,
          converted: 8,
          value: 28900000,
          conversionRate: 17.8,
          marketPenetration: 8.9,
        },
      ],

      funnel: [
        {
          stage: "prospect",
          count: 89,
          percentage: 61.4,
          value: 45600000,
          averageDays: 7,
          conversionRate: 68.5,
          dropOffRate: 31.5,
        },
        {
          stage: "lead",
          count: 61,
          percentage: 42.1,
          value: 34500000,
          averageDays: 15,
          conversionRate: 52.5,
          dropOffRate: 47.5,
        },
        {
          stage: "opportunity",
          count: 32,
          percentage: 22.1,
          value: 28900000,
          averageDays: 28,
          conversionRate: 43.8,
          dropOffRate: 56.2,
        },
        {
          stage: "proposal",
          count: 14,
          percentage: 9.7,
          value: 19800000,
          averageDays: 45,
          conversionRate: 64.3,
          dropOffRate: 35.7,
        },
        {
          stage: "negotiation",
          count: 9,
          percentage: 6.2,
          value: 15600000,
          averageDays: 21,
          conversionRate: 77.8,
          dropOffRate: 22.2,
        },
        {
          stage: "closed_won",
          count: 7,
          percentage: 4.8,
          value: 12300000,
          averageDays: 5,
          conversionRate: 100,
          dropOffRate: 0,
        },
      ],

      teamPerformance: [
        {
          userId: "user_bc_001",
          userName: "Ravi Kumar",
          role: "Senior Sales Manager",
          territory: "North Delhi",
          leads: 45,
          converted: 12,
          value: 28900000,
          activities: 234,
          conversionRate: 26.7,
          averageDealSize: 2408333,
          salesCycle: 68,
          quota: 35000000,
          achievement: 82.6,
        },
        {
          userId: "user_bc_003",
          userName: "Priya Sharma",
          role: "Sales Executive",
          territory: "South Bangalore",
          leads: 32,
          converted: 6,
          value: 18900000,
          activities: 156,
          conversionRate: 18.8,
          averageDealSize: 3150000,
          salesCycle: 75,
          quota: 25000000,
          achievement: 75.6,
        },
      ],

      industryBreakdown: [
        {
          industry: "Technology",
          leads: 67,
          converted: 15,
          value: 45600000,
          conversionRate: 22.4,
          averageDealSize: 3040000,
          marketShare: 18.5,
        },
        {
          industry: "Manufacturing",
          leads: 45,
          converted: 8,
          value: 28900000,
          conversionRate: 17.8,
          averageDealSize: 3612500,
          marketShare: 12.3,
        },
      ],

      qualityMetrics: {
        averageLeadScore: 76.8,
        hotLeadsPercentage: 23.4,
        qualifiedLeadsPercentage: 45.6,
        unqualifiedLeadsPercentage: 31.0,
      },

      trends: {
        leadGrowth: 18.4,
        conversionTrend: 12.7,
        valueGrowth: 29.5,
        forecast: {
          nextMonth: {
            leads: 52,
            value: 32000000,
            probability: 0.78,
            confidence: "high",
          },
          nextQuarter: {
            leads: 165,
            value: 102000000,
            probability: 0.72,
            confidence: "medium",
          },
        },
      },
    },

    tenant_002: {
      tenantId: "tenant_002",
      period: {
        startDate: "2024-02-01",
        endDate: "2024-02-29",
      },
      totalLeads: 234,
      convertedLeads: 53,
      conversionRate: 22.6,
      averageDealValue: 8900000,
      totalPipelineValue: 208260000,
      averageSalescycle: 68,

      tenantKPIs: {
        leadVelocity: 8.1,
        salesVelocity: 7200000,
        customerAcquisitionCost: 28000,
        leadToCustomerTime: 58,
        pipelineCoverage: 2.8,
        winRate: 22.6,
      },

      thisMonth: {
        leads: 89,
        converted: 18,
        value: 160200000,
        activities: 345,
        meetings: 125,
        proposals: 24,
      },

      lastMonth: {
        leads: 76,
        converted: 15,
        value: 133500000,
        activities: 298,
        meetings: 102,
        proposals: 19,
      },

      thisQuarter: {
        leads: 234,
        converted: 53,
        value: 208260000,
        activities: 945,
        meetings: 342,
        proposals: 68,
      },

      lastQuarter: {
        leads: 198,
        converted: 41,
        value: 183420000,
        activities: 823,
        meetings: 289,
        proposals: 56,
      },

      sourceBreakdown: [
        {
          sourceId: "mr_website",
          sourceName: "Metro Realty Website",
          leads: 156,
          converted: 35,
          value: 126000000,
          cost: 0,
          roi: Infinity,
          conversionRate: 22.4,
          averageDealSize: 3600000,
          salesCycle: 52,
        },
        {
          sourceId: "mr_property_portals",
          sourceName: "Property Portals",
          leads: 78,
          converted: 18,
          value: 82260000,
          cost: 15000,
          roi: 548.4,
          conversionRate: 23.1,
          averageDealSize: 4570000,
          salesCycle: 45,
        },
      ],

      territoryBreakdown: [
        {
          territory: "Mumbai Central",
          region: "Western India",
          leads: 89,
          converted: 22,
          value: 98000000,
          conversionRate: 24.7,
          marketPenetration: 15.8,
        },
        {
          territory: "Hyderabad West",
          region: "South India",
          leads: 67,
          converted: 14,
          value: 65800000,
          conversionRate: 20.9,
          marketPenetration: 11.2,
        },
      ],

      funnel: [
        {
          stage: "prospect",
          count: 145,
          percentage: 62.0,
          value: 89000000,
          averageDays: 5,
          conversionRate: 72.4,
          dropOffRate: 27.6,
        },
        {
          stage: "lead",
          count: 105,
          percentage: 44.9,
          value: 78600000,
          averageDays: 12,
          conversionRate: 58.1,
          dropOffRate: 41.9,
        },
        {
          stage: "opportunity",
          count: 61,
          percentage: 26.1,
          value: 65200000,
          averageDays: 25,
          conversionRate: 47.5,
          dropOffRate: 52.5,
        },
        {
          stage: "proposal",
          count: 29,
          percentage: 12.4,
          value: 45800000,
          averageDays: 35,
          conversionRate: 69.0,
          dropOffRate: 31.0,
        },
        {
          stage: "negotiation",
          count: 20,
          percentage: 8.5,
          value: 35600000,
          averageDays: 18,
          conversionRate: 80.0,
          dropOffRate: 20.0,
        },
        {
          stage: "closed_won",
          count: 16,
          percentage: 6.8,
          value: 28800000,
          averageDays: 3,
          conversionRate: 100,
          dropOffRate: 0,
        },
      ],

      teamPerformance: [
        {
          userId: "user_mr_001",
          userName: "Suresh Patel",
          role: "Senior Property Advisor",
          territory: "Mumbai Central",
          leads: 67,
          converted: 18,
          value: 98000000,
          activities: 289,
          conversionRate: 26.9,
          averageDealSize: 5444444,
          salesCycle: 58,
          quota: 120000000,
          achievement: 81.7,
        },
        {
          userId: "user_mr_003",
          userName: "Anita Reddy",
          role: "Property Consultant",
          territory: "Hyderabad West",
          leads: 45,
          converted: 12,
          value: 65800000,
          activities: 198,
          conversionRate: 26.7,
          averageDealSize: 5483333,
          salesCycle: 62,
          quota: 80000000,
          achievement: 82.3,
        },
      ],

      industryBreakdown: [
        {
          industry: "Investment",
          leads: 89,
          converted: 23,
          value: 125000000,
          conversionRate: 25.8,
          averageDealSize: 5434782,
          marketShare: 22.4,
        },
        {
          industry: "Personal",
          leads: 98,
          converted: 21,
          value: 83260000,
          conversionRate: 21.4,
          averageDealSize: 3965714,
          marketShare: 18.9,
        },
      ],

      qualityMetrics: {
        averageLeadScore: 72.3,
        hotLeadsPercentage: 28.6,
        qualifiedLeadsPercentage: 52.1,
        unqualifiedLeadsPercentage: 19.3,
      },

      trends: {
        leadGrowth: 17.1,
        conversionTrend: 20.0,
        valueGrowth: 13.5,
        forecast: {
          nextMonth: {
            leads: 95,
            value: 185000000,
            probability: 0.83,
            confidence: "high",
          },
          nextQuarter: {
            leads: 275,
            value: 245000000,
            probability: 0.76,
            confidence: "high",
          },
        },
      },
    },

    tenant_003: {
      tenantId: "tenant_003",
      period: {
        startDate: "2024-03-01",
        endDate: "2024-03-31",
      },
      totalLeads: 89,
      convertedLeads: 18,
      conversionRate: 20.2,
      averageDealValue: 18500000,
      totalPipelineValue: 164650000,
      averageSalescycle: 125,

      tenantKPIs: {
        leadVelocity: 2.9,
        salesVelocity: 5400000,
        customerAcquisitionCost: 35000,
        leadToCustomerTime: 95,
        pipelineCoverage: 3.2,
        winRate: 20.2,
      },

      thisMonth: {
        leads: 28,
        converted: 5,
        value: 92500000,
        activities: 89,
        meetings: 34,
        proposals: 8,
      },

      lastMonth: {
        leads: 25,
        converted: 4,
        value: 72150000,
        activities: 76,
        meetings: 28,
        proposals: 6,
      },

      thisQuarter: {
        leads: 89,
        converted: 18,
        value: 164650000,
        activities: 234,
        meetings: 89,
        proposals: 21,
      },

      lastQuarter: {
        leads: 76,
        converted: 14,
        value: 142800000,
        activities: 198,
        meetings: 67,
        proposals: 16,
      },

      sourceBreakdown: [
        {
          sourceId: "sd_investor_meets",
          sourceName: "Investor Meets",
          leads: 28,
          converted: 10,
          value: 92500000,
          cost: 25000,
          roi: 370.0,
          conversionRate: 35.7,
          averageDealSize: 9250000,
          salesCycle: 98,
        },
        {
          sourceId: "sd_linkedin",
          sourceName: "LinkedIn Business Network",
          leads: 35,
          converted: 6,
          value: 54000000,
          cost: 8000,
          roi: 675.0,
          conversionRate: 17.1,
          averageDealSize: 9000000,
          salesCycle: 135,
        },
      ],

      territoryBreakdown: [
        {
          territory: "Delhi NCR",
          region: "North India",
          leads: 45,
          converted: 11,
          value: 98500000,
          conversionRate: 24.4,
          marketPenetration: 8.9,
        },
        {
          territory: "Bangalore South",
          region: "South India",
          leads: 32,
          converted: 5,
          value: 66150000,
          conversionRate: 15.6,
          marketPenetration: 6.2,
        },
      ],

      funnel: [
        {
          stage: "prospect",
          count: 56,
          percentage: 62.9,
          value: 78000000,
          averageDays: 10,
          conversionRate: 64.3,
          dropOffRate: 35.7,
        },
        {
          stage: "lead",
          count: 36,
          percentage: 40.4,
          value: 58900000,
          averageDays: 18,
          conversionRate: 50.0,
          dropOffRate: 50.0,
        },
        {
          stage: "opportunity",
          count: 18,
          percentage: 20.2,
          value: 42600000,
          averageDays: 35,
          conversionRate: 38.9,
          dropOffRate: 61.1,
        },
        {
          stage: "proposal",
          count: 7,
          percentage: 7.9,
          value: 28900000,
          averageDays: 45,
          conversionRate: 71.4,
          dropOffRate: 28.6,
        },
        {
          stage: "negotiation",
          count: 5,
          percentage: 5.6,
          value: 21500000,
          averageDays: 28,
          conversionRate: 80.0,
          dropOffRate: 20.0,
        },
        {
          stage: "closed_won",
          count: 4,
          percentage: 4.5,
          value: 18000000,
          averageDays: 7,
          conversionRate: 100,
          dropOffRate: 0,
        },
      ],

      teamPerformance: [
        {
          userId: "user_sd_001",
          userName: "Rakesh Aggarwal",
          role: "Business Development Director",
          territory: "Delhi NCR",
          leads: 34,
          converted: 8,
          value: 78500000,
          activities: 145,
          conversionRate: 23.5,
          averageDealSize: 9812500,
          salesCycle: 118,
          quota: 150000000,
          achievement: 52.3,
        },
        {
          userId: "user_sd_002",
          userName: "Kavitha Nair",
          role: "Senior Project Manager",
          territory: "Bangalore South",
          leads: 23,
          converted: 4,
          value: 52000000,
          activities: 89,
          conversionRate: 17.4,
          averageDealSize: 13000000,
          salesCycle: 142,
          quota: 120000000,
          achievement: 43.3,
        },
      ],

      industryBreakdown: [
        {
          industry: "Diversified Business",
          leads: 45,
          converted: 11,
          value: 98500000,
          conversionRate: 24.4,
          averageDealSize: 8954545,
          marketShare: 15.6,
        },
        {
          industry: "Technology",
          leads: 32,
          converted: 5,
          value: 48900000,
          conversionRate: 15.6,
          averageDealSize: 9780000,
          marketShare: 8.9,
        },
      ],

      qualityMetrics: {
        averageLeadScore: 81.2,
        hotLeadsPercentage: 32.6,
        qualifiedLeadsPercentage: 48.3,
        unqualifiedLeadsPercentage: 19.1,
      },

      trends: {
        leadGrowth: 17.1,
        conversionTrend: 28.6,
        valueGrowth: 15.3,
        forecast: {
          nextMonth: {
            leads: 35,
            value: 175000000,
            probability: 0.71,
            confidence: "medium",
          },
          nextQuarter: {
            leads: 105,
            value: 195000000,
            probability: 0.68,
            confidence: "medium",
          },
        },
      },
    },
  };

// Helper functions for tenant-specific data retrieval
export const getTenantLeads = (tenantId: string): TenantLead[] => {
  return tenantLeads.filter((lead) => lead.tenantId === tenantId);
};

export const getTenantLeadSources = (tenantId: string): TenantLeadSource[] => {
  return tenantLeadSources.filter((source) => source.tenantId === tenantId);
};

export const getTenantLeadAnalytics = (
  tenantId: string,
): TenantLeadAnalytics | undefined => {
  return tenantLeadAnalytics[tenantId];
};

export const getLeadById = (leadId: string): TenantLead | undefined => {
  return tenantLeads.find((lead) => lead.id === leadId);
};

export const getLeadsByStatus = (
  tenantId: string,
  status: LeadStatus,
): TenantLead[] => {
  return tenantLeads.filter(
    (lead) => lead.tenantId === tenantId && lead.status === status,
  );
};

export const getLeadsByStage = (
  tenantId: string,
  stage: LeadStage,
): TenantLead[] => {
  return tenantLeads.filter(
    (lead) => lead.tenantId === tenantId && lead.stage === stage,
  );
};

export const getLeadsByAssignee = (
  tenantId: string,
  assigneeId: string,
): TenantLead[] => {
  return tenantLeads.filter(
    (lead) => lead.tenantId === tenantId && lead.assignedTo === assigneeId,
  );
};

export const getLeadsByTerritory = (
  tenantId: string,
  territory: string,
): TenantLead[] => {
  return tenantLeads.filter(
    (lead) => lead.tenantId === tenantId && lead.territory === territory,
  );
};

export const filterTenantLeads = (
  tenantId: string,
  filters: any,
): TenantLead[] => {
  let filtered = getTenantLeads(tenantId);

  if (filters.query) {
    const query = filters.query.toLowerCase();
    filtered = filtered.filter(
      (lead) =>
        lead.firstName.toLowerCase().includes(query) ||
        lead.lastName.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.company?.toLowerCase().includes(query) ||
        lead.requirements?.toLowerCase().includes(query),
    );
  }

  if (filters.status) {
    filtered = filtered.filter((lead) => filters.status.includes(lead.status));
  }

  if (filters.stage) {
    filtered = filtered.filter((lead) => filters.stage.includes(lead.stage));
  }

  if (filters.priority) {
    filtered = filtered.filter((lead) =>
      filters.priority.includes(lead.priority),
    );
  }

  if (filters.leadSource) {
    filtered = filtered.filter((lead) =>
      filters.leadSource.includes(lead.leadSource.id),
    );
  }

  if (filters.assignedTo) {
    filtered = filtered.filter(
      (lead) => lead.assignedTo && filters.assignedTo.includes(lead.assignedTo),
    );
  }

  if (filters.territory) {
    filtered = filtered.filter(
      (lead) => lead.territory && filters.territory.includes(lead.territory),
    );
  }

  if (filters.tags) {
    filtered = filtered.filter((lead) =>
      filters.tags.some((tag: string) => lead.tags.includes(tag)),
    );
  }

  if (filters.valueRange) {
    filtered = filtered.filter(
      (lead) =>
        lead.expectedValue &&
        lead.expectedValue >= filters.valueRange.min &&
        lead.expectedValue <= filters.valueRange.max,
    );
  }

  if (filters.dateRange) {
    filtered = filtered.filter((lead) => {
      const createdDate = new Date(lead.createdAt);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      return createdDate >= startDate && createdDate <= endDate;
    });
  }

  if (filters.followUpOverdue) {
    const now = new Date();
    filtered = filtered.filter(
      (lead) => lead.nextFollowUpDate && new Date(lead.nextFollowUpDate) < now,
    );
  }

  return filtered;
};

// Industries data for lead forms
export const industries = [
  "Technology",
  "Construction",
  "Real Estate",
  "Manufacturing",
  "Healthcare",
  "Education",
  "Finance",
  "Retail",
  "Hospitality",
  "Transportation",
  "Energy",
  "Telecommunications",
  "Agriculture",
  "Entertainment",
  "Government",
  "Non-Profit",
  "Other",
];

// Sales team data for lead assignment
export const salesTeam = [
  {
    id: "user_bc_001",
    name: "Ravi Kumar",
    role: "Senior Sales Manager",
    territory: "North Delhi",
    tenantId: "tenant_001",
  },
  {
    id: "user_bc_002",
    name: "Amit Singh",
    role: "Sales Executive",
    territory: "South Delhi",
    tenantId: "tenant_001",
  },
  {
    id: "user_bc_003",
    name: "Priya Sharma",
    role: "Sales Executive",
    territory: "South Bangalore",
    tenantId: "tenant_001",
  },
  {
    id: "user_mr_001",
    name: "Suresh Patel",
    role: "Senior Property Advisor",
    territory: "Mumbai Central",
    tenantId: "tenant_002",
  },
  {
    id: "user_mr_002",
    name: "Kavita Nair",
    role: "Property Consultant",
    territory: "Mumbai West",
    tenantId: "tenant_002",
  },
  {
    id: "user_mr_003",
    name: "Anita Reddy",
    role: "Property Consultant",
    territory: "Hyderabad West",
    tenantId: "tenant_002",
  },
  {
    id: "user_sd_001",
    name: "Rakesh Aggarwal",
    role: "Business Development Director",
    territory: "Delhi NCR",
    tenantId: "tenant_003",
  },
  {
    id: "user_sd_002",
    name: "Kavitha Nair",
    role: "Senior Project Manager",
    territory: "Bangalore South",
    tenantId: "tenant_003",
  },
];

// Legacy exports for backward compatibility
export const leadSources = tenantLeadSources;
export const mockLeads = tenantLeads;
export const leadAnalytics = tenantLeadAnalytics;

// Export all for easier access
export default {
  tenantLeads,
  tenantLeadSources,
  tenantLeadAnalytics,
  getTenantLeads,
  getTenantLeadSources,
  getTenantLeadAnalytics,
  getLeadById,
  getLeadsByStatus,
  getLeadsByStage,
  getLeadsByAssignee,
  getLeadsByTerritory,
  filterTenantLeads,
  industries,
  salesTeam,
  leadSources,
  mockLeads,
  leadAnalytics,
};
