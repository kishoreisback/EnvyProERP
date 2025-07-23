import {
  FranchiseeRequest,
  FranchiseeProfile,
  FranchiseeDashboard,
  FranchiseeAnalytics,
  Document,
  ReviewNote,
  ApprovalStep,
  DeliveryVehicle,
  ProductCategory,
  PerformanceMetrics,
} from "./types";

// Mock Documents
export const mockDocuments: Document[] = [
  {
    id: "doc_001",
    type: "pan",
    fileName: "pan_card.pdf",
    fileUrl: "/documents/pan_card.pdf",
    uploadedAt: "2024-01-15T10:00:00Z",
    verificationStatus: "verified",
  },
  {
    id: "doc_002",
    type: "aadhar",
    fileName: "aadhar_card.pdf",
    fileUrl: "/documents/aadhar_card.pdf",
    uploadedAt: "2024-01-15T10:05:00Z",
    verificationStatus: "verified",
  },
  {
    id: "doc_003",
    type: "gst_certificate",
    fileName: "gst_certificate.pdf",
    fileUrl: "/documents/gst_certificate.pdf",
    uploadedAt: "2024-01-15T10:10:00Z",
    verificationStatus: "pending",
  },
];

// Mock Delivery Vehicles
export const mockDeliveryVehicles: DeliveryVehicle[] = [
  {
    id: "vehicle_001",
    type: "bike",
    capacity: 50,
    hasRefrigeration: false,
    licenseNumber: "MH12AB1234",
    ownershipType: "owned",
  },
  {
    id: "vehicle_002",
    type: "van",
    capacity: 200,
    hasRefrigeration: true,
    licenseNumber: "MH12CD5678",
    ownershipType: "rented",
  },
];

// Mock Product Categories
export const mockProductCategories: ProductCategory[] = [
  {
    id: "cat_001",
    name: "Soft Drinks",
    type: "beverages",
    isActive: true,
    commissionRate: 8,
  },
  {
    id: "cat_002",
    name: "Energy Drinks",
    type: "beverages",
    isActive: true,
    commissionRate: 12,
  },
  {
    id: "cat_003",
    name: "Packaged Snacks",
    type: "snacks",
    isActive: true,
    commissionRate: 10,
  },
  {
    id: "cat_004",
    name: "Ice Cream",
    type: "frozen",
    isActive: true,
    commissionRate: 15,
  },
  {
    id: "cat_005",
    name: "Dairy Products",
    type: "dairy",
    isActive: true,
    commissionRate: 6,
  },
];

// Mock Franchisee Requests
export const mockFranchiseeRequests: FranchiseeRequest[] = [
  {
    id: "req_001",
    tenantId: "tenant_beverage_corp",
    requestNumber: "FR-2024-001",
    currentStep: 7,
    totalSteps: 7,
    status: "under_review",
    businessInfo: {
      legalName: "Mumbai Fresh Beverages Pvt Ltd",
      tradeName: "Fresh Zone",
      businessType: "private_limited",
      incorporationDate: "2020-03-15",
      panNumber: "ABCDE1234F",
      gstNumber: "27ABCDE1234F1Z5",
      fssaiLicense: "12345678901234",
      shopEstablishmentLicense: "SE/MUM/2020/001",
      yearsInBusiness: 4,
    },
    owner: {
      id: "owner_001",
      firstName: "Rajesh",
      lastName: "Kumar",
      email: "rajesh.kumar@freshzone.com",
      phone: "+91-9876543210",
      aadharNumber: "1234-5678-9012",
      panNumber: "ABCDE1234F",
      dateOfBirth: "1985-06-15",
      experience: 8,
      education: "MBA - Marketing",
      previousBusinessExperience: "5 years in FMCG distribution",
      backgroundVerificationStatus: "completed",
      kycStatus: "verified",
      kycDocuments: mockDocuments,
    },
    location: {
      id: "loc_001",
      street: "123, Commercial Complex",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      zipCode: "400001",
      latitude: 19.076,
      longitude: 72.8777,
      landmark: "Near Metro Station",
      area: "Andheri West",
      radius: 5,
    },
    inventoryCapability: {
      storageArea: 500,
      refrigeratedStorage: true,
      freezerCapacity: 200,
      dryStorageCapacity: 300,
      deliveryVehicles: mockDeliveryVehicles,
      staffCapacity: 8,
      operatingHours: {
        open: "08:00",
        close: "22:00",
        workingDays: [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ],
      },
    },
    bankDetails: {
      accountHolderName: "Mumbai Fresh Beverages Pvt Ltd",
      accountNumber: "1234567890123456",
      ifscCode: "HDFC0001234",
      bankName: "HDFC Bank",
      branchName: "Andheri West",
      accountType: "current",
      upiId: "freshzone@hdfc",
      digitalWallets: ["Paytm", "PhonePe", "Google Pay"],
    },
    investmentCapacity: 2500000, // 25 Lakhs
    expectedMonthlyRevenue: 800000, // 8 Lakhs
    documents: mockDocuments,
    termsAccepted: true,
    digitalSignature: "data:image/png;base64,signature_data",
    signedAt: "2024-01-15T10:30:00Z",
    reviewNotes: [
      {
        id: "note_001",
        reviewerId: "reviewer_001",
        reviewerName: "Amit Sharma",
        section: "Location Analysis",
        comment:
          "Excellent location with high foot traffic. Market potential is very good.",
        type: "approved",
        createdAt: "2024-01-16T09:00:00Z",
      },
      {
        id: "note_002",
        reviewerId: "reviewer_002",
        reviewerName: "Priya Patel",
        section: "Financial Assessment",
        comment:
          "Investment capacity is adequate. Need clarification on funding source.",
        type: "revision_required",
        createdAt: "2024-01-16T11:00:00Z",
      },
    ],
    approvalWorkflow: [
      {
        id: "step_001",
        stepName: "Document Verification",
        assignedTo: "verifier_001",
        assignedToName: "Document Team",
        status: "approved",
        completedAt: "2024-01-16T08:00:00Z",
        comments: "All documents verified successfully",
        order: 1,
      },
      {
        id: "step_002",
        stepName: "Location Assessment",
        assignedTo: "assessor_001",
        assignedToName: "Regional Manager",
        status: "approved",
        completedAt: "2024-01-16T12:00:00Z",
        comments: "Location approved for franchise setup",
        order: 2,
      },
      {
        id: "step_003",
        stepName: "Financial Review",
        assignedTo: "finance_001",
        assignedToName: "Finance Team",
        status: "in_progress",
        order: 3,
      },
      {
        id: "step_004",
        stepName: "Final Approval",
        assignedTo: "approver_001",
        assignedToName: "Regional Head",
        status: "pending",
        order: 4,
      },
    ],
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-16T14:00:00Z",
    submittedAt: "2024-01-15T10:30:00Z",
    assignedTo: "finance_001",
    reviewDeadline: "2024-01-20T18:00:00Z",
  },
  {
    id: "req_002",
    tenantId: "tenant_beverage_corp",
    requestNumber: "FR-2024-002",
    currentStep: 3,
    totalSteps: 7,
    status: "pending_documents",
    businessInfo: {
      legalName: "Delhi Quick Mart",
      tradeName: "Quick Mart Express",
      businessType: "sole_proprietorship",
      incorporationDate: "2022-08-20",
      panNumber: "FGHIJ5678K",
      gstNumber: "07FGHIJ5678K1Z5",
      fssaiLicense: "56789012345678",
      shopEstablishmentLicense: "SE/DEL/2022/045",
      yearsInBusiness: 2,
    },
    owner: {
      id: "owner_002",
      firstName: "Sonia",
      lastName: "Gupta",
      email: "sonia.gupta@quickmart.com",
      phone: "+91-9876543211",
      aadharNumber: "5678-9012-3456",
      panNumber: "FGHIJ5678K",
      dateOfBirth: "1990-03-22",
      experience: 5,
      education: "B.Com",
      previousBusinessExperience: "3 years in retail business",
      backgroundVerificationStatus: "in_progress",
      kycStatus: "submitted",
      kycDocuments: [],
    },
    location: {
      id: "loc_002",
      street: "456, Market Square",
      city: "Delhi",
      state: "Delhi",
      country: "India",
      zipCode: "110001",
      latitude: 28.7041,
      longitude: 77.1025,
      landmark: "Near Bus Stand",
      area: "Connaught Place",
      radius: 3,
    },
    inventoryCapability: {
      storageArea: 300,
      refrigeratedStorage: true,
      freezerCapacity: 100,
      dryStorageCapacity: 200,
      deliveryVehicles: [mockDeliveryVehicles[0]],
      staffCapacity: 5,
      operatingHours: {
        open: "09:00",
        close: "21:00",
        workingDays: [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ],
      },
    },
    bankDetails: {
      accountHolderName: "Sonia Gupta",
      accountNumber: "9876543210987654",
      ifscCode: "ICIC0001234",
      bankName: "ICICI Bank",
      branchName: "Connaught Place",
      accountType: "current",
      upiId: "soniagupta@icici",
      digitalWallets: ["Paytm", "PhonePe"],
    },
    investmentCapacity: 1500000, // 15 Lakhs
    expectedMonthlyRevenue: 500000, // 5 Lakhs
    documents: [],
    termsAccepted: false,
    reviewNotes: [],
    approvalWorkflow: [
      {
        id: "step_005",
        stepName: "Document Verification",
        assignedTo: "verifier_001",
        assignedToName: "Document Team",
        status: "pending",
        order: 1,
      },
    ],
    createdAt: "2024-01-18T10:00:00Z",
    updatedAt: "2024-01-18T15:30:00Z",
    assignedTo: "verifier_001",
  },
  {
    id: "req_003",
    tenantId: "tenant_beverage_corp",
    requestNumber: "FR-2024-003",
    currentStep: 7,
    totalSteps: 7,
    status: "approved",
    businessInfo: {
      legalName: "Bangalore Beverages Hub LLP",
      tradeName: "Bev Hub",
      businessType: "llp",
      incorporationDate: "2019-11-10",
      panNumber: "KLMNO9012P",
      gstNumber: "29KLMNO9012P1Z5",
      fssaiLicense: "90123456789012",
      shopEstablishmentLicense: "SE/BLR/2019/123",
      yearsInBusiness: 5,
    },
    owner: {
      id: "owner_003",
      firstName: "Arjun",
      lastName: "Reddy",
      email: "arjun.reddy@bevhub.com",
      phone: "+91-9876543212",
      aadharNumber: "9012-3456-7890",
      panNumber: "KLMNO9012P",
      dateOfBirth: "1988-12-05",
      experience: 10,
      education: "B.Tech - Food Technology",
      previousBusinessExperience: "7 years in beverage distribution",
      backgroundVerificationStatus: "completed",
      kycStatus: "verified",
      kycDocuments: mockDocuments,
    },
    location: {
      id: "loc_003",
      street: "789, Tech Park",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      zipCode: "560001",
      latitude: 12.9716,
      longitude: 77.5946,
      landmark: "Near IT Hub",
      area: "Koramangala",
      radius: 8,
    },
    inventoryCapability: {
      storageArea: 800,
      refrigeratedStorage: true,
      freezerCapacity: 400,
      dryStorageCapacity: 400,
      deliveryVehicles: mockDeliveryVehicles,
      staffCapacity: 12,
      operatingHours: {
        open: "07:00",
        close: "23:00",
        workingDays: [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ],
      },
    },
    bankDetails: {
      accountHolderName: "Bangalore Beverages Hub LLP",
      accountNumber: "5432109876543210",
      ifscCode: "SBIN0001234",
      bankName: "State Bank of India",
      branchName: "Koramangala",
      accountType: "current",
      upiId: "bevhub@sbi",
      digitalWallets: ["Paytm", "PhonePe", "Google Pay", "Amazon Pay"],
    },
    investmentCapacity: 3500000, // 35 Lakhs
    expectedMonthlyRevenue: 1200000, // 12 Lakhs
    documents: mockDocuments,
    termsAccepted: true,
    digitalSignature: "data:image/png;base64,signature_data_2",
    signedAt: "2024-01-10T16:00:00Z",
    reviewNotes: [
      {
        id: "note_003",
        reviewerId: "reviewer_001",
        reviewerName: "Amit Sharma",
        section: "Overall Assessment",
        comment:
          "Excellent candidate with strong background. Approved for franchise.",
        type: "approved",
        createdAt: "2024-01-12T14:00:00Z",
      },
    ],
    approvalWorkflow: [
      {
        id: "step_006",
        stepName: "Document Verification",
        assignedTo: "verifier_001",
        assignedToName: "Document Team",
        status: "approved",
        completedAt: "2024-01-11T10:00:00Z",
        order: 1,
      },
      {
        id: "step_007",
        stepName: "Location Assessment",
        assignedTo: "assessor_001",
        assignedToName: "Regional Manager",
        status: "approved",
        completedAt: "2024-01-11T15:00:00Z",
        order: 2,
      },
      {
        id: "step_008",
        stepName: "Financial Review",
        assignedTo: "finance_001",
        assignedToName: "Finance Team",
        status: "approved",
        completedAt: "2024-01-12T11:00:00Z",
        order: 3,
      },
      {
        id: "step_009",
        stepName: "Final Approval",
        assignedTo: "approver_001",
        assignedToName: "Regional Head",
        status: "approved",
        completedAt: "2024-01-12T16:00:00Z",
        order: 4,
      },
    ],
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-12T16:00:00Z",
    submittedAt: "2024-01-10T16:00:00Z",
    approvedAt: "2024-01-12T16:00:00Z",
  },
];

// Mock Performance Metrics
export const mockPerformanceMetrics: PerformanceMetrics = {
  monthlyRevenue: 950000,
  orderCount: 1250,
  customerSatisfaction: 4.6,
  deliveryRating: 4.4,
  inventoryTurnover: 8.2,
  outstandingAmount: 125000,
};

// Mock Active Franchisees
export const mockActiveFranchisees: FranchiseeProfile[] = [
  {
    id: "franchise_001",
    tenantId: "tenant_beverage_corp",
    franchiseeCode: "BH-KAR-001",
    requestId: "req_003",
    businessName: "Bev Hub",
    legalName: "Bangalore Beverages Hub LLP",
    status: "active",
    primaryContact: mockFranchiseeRequests[2].owner,
    location: mockFranchiseeRequests[2].location,
    categories: mockProductCategories,
    inventoryCapability: mockFranchiseeRequests[2].inventoryCapability,
    bankDetails: mockFranchiseeRequests[2].bankDetails,
    creditLimit: 500000,
    securityDeposit: 200000,
    commissionStructure: {
      baseCommission: 10,
      tieredCommissions: [
        { minAmount: 0, maxAmount: 100000, commissionRate: 8 },
        { minAmount: 100001, maxAmount: 500000, commissionRate: 10 },
        { minAmount: 500001, maxAmount: 1000000, commissionRate: 12 },
      ],
      bonusStructure: [
        {
          type: "volume",
          condition: "Monthly sales > 10 Lakhs",
          bonusAmount: 25000,
          validFrom: "2024-01-01",
          validTo: "2024-12-31",
        },
      ],
    },
    launchDate: "2024-01-15",
    performanceMetrics: mockPerformanceMetrics,
    posIntegration: true,
    inventorySync: true,
    orderSync: true,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-20T12:00:00Z",
  },
];

// Mock Dashboard Data
export const mockFranchiseeDashboard: FranchiseeDashboard = {
  totalRequests: 15,
  pendingApprovals: 4,
  activeFranchisees: 8,
  rejectedRequests: 2,
  recentRequests: mockFranchiseeRequests,
  performanceSummary: {
    totalRevenue: 7600000, // 76 Lakhs
    averagePerformance: 87.5,
    topPerformers: mockActiveFranchisees,
  },
};

// Mock Analytics Data
export const mockFranchiseeAnalytics: FranchiseeAnalytics = {
  registrationTrends: [
    { period: "2024-01", requests: 5, approvals: 3 },
    { period: "2024-02", requests: 8, approvals: 5 },
    { period: "2024-03", requests: 12, approvals: 8 },
    { period: "2024-04", requests: 15, approvals: 10 },
  ],
  locationDistribution: [
    { state: "Maharashtra", count: 3 },
    { state: "Karnataka", count: 2 },
    { state: "Delhi", count: 2 },
    { state: "Tamil Nadu", count: 1 },
  ],
  performanceMetrics: {
    averageRevenue: 850000,
    averageOrderValue: 680,
    customerSatisfaction: 4.5,
  },
  categoryPerformance: [
    { category: "Soft Drinks", revenue: 2800000, growth: 15.2 },
    { category: "Energy Drinks", revenue: 1900000, growth: 22.8 },
    { category: "Packaged Snacks", revenue: 1600000, growth: 8.5 },
    { category: "Ice Cream", revenue: 800000, growth: 35.7 },
    { category: "Dairy Products", revenue: 500000, growth: 12.3 },
  ],
};

// Helper Functions
export const getFranchiseeRequestById = (
  id: string,
): FranchiseeRequest | undefined => {
  return mockFranchiseeRequests.find((request) => request.id === id);
};

export const getFranchiseeProfileById = (
  id: string,
): FranchiseeProfile | undefined => {
  return mockActiveFranchisees.find((franchise) => franchise.id === id);
};

export const getRequestsByStatus = (status: string): FranchiseeRequest[] => {
  return mockFranchiseeRequests.filter((request) => request.status === status);
};

export const getPendingApprovals = (): FranchiseeRequest[] => {
  return mockFranchiseeRequests.filter(
    (request) =>
      request.status === "under_review" ||
      request.status === "pending_documents",
  );
};

export const getRequestsByLocation = (state: string): FranchiseeRequest[] => {
  return mockFranchiseeRequests.filter(
    (request) => request.location.state.toLowerCase() === state.toLowerCase(),
  );
};

export const getTopPerformingFranchisees = (
  limit: number = 5,
): FranchiseeProfile[] => {
  return mockActiveFranchisees
    .sort(
      (a, b) =>
        b.performanceMetrics.monthlyRevenue -
        a.performanceMetrics.monthlyRevenue,
    )
    .slice(0, limit);
};

export const calculateApprovalRate = (): number => {
  const approvedRequests = mockFranchiseeRequests.filter(
    (req) => req.status === "approved",
  ).length;
  const totalRequests = mockFranchiseeRequests.length;
  return totalRequests > 0 ? (approvedRequests / totalRequests) * 100 : 0;
};

export const getAverageProcessingTime = (): number => {
  const approvedRequests = mockFranchiseeRequests.filter(
    (req) => req.approvedAt,
  );
  if (approvedRequests.length === 0) return 0;

  const totalTime = approvedRequests.reduce((sum, req) => {
    const created = new Date(req.createdAt).getTime();
    const approved = new Date(req.approvedAt!).getTime();
    return sum + (approved - created);
  }, 0);

  return Math.round(
    totalTime / approvedRequests.length / (1000 * 60 * 60 * 24),
  ); // Convert to days
};
