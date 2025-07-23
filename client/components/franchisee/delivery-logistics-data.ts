// Delivery & Logistics Integration Mock Data

import {
  DeliverySchedule,
  DeliveryAnalytics,
  GRN,
  DeliveryCalendar,
  TimeSlot,
  VehicleAssignment,
  DriverAssignment,
  DeliveryRoute,
  RouteLocation,
  TrackingInfo,
  NotificationEvent,
} from "./delivery-logistics-types";
import { mockCorporatePOReviews } from "./corporate-po-review-data";

// Mock Time Slots for Delivery Scheduling
export const mockTimeSlots: TimeSlot[] = [
  {
    id: "TS001",
    startTime: "08:00",
    endTime: "10:00",
    duration: 120,
    isAvailable: true,
    capacity: 5,
    currentBookings: 2,
  },
  {
    id: "TS002",
    startTime: "10:00",
    endTime: "12:00",
    duration: 120,
    isAvailable: true,
    capacity: 5,
    currentBookings: 3,
  },
  {
    id: "TS003",
    startTime: "12:00",
    endTime: "14:00",
    duration: 120,
    isAvailable: false,
    isBlocked: true,
    blockReason: "Lunch break",
    capacity: 5,
    currentBookings: 0,
  },
  {
    id: "TS004",
    startTime: "14:00",
    endTime: "16:00",
    duration: 120,
    isAvailable: true,
    capacity: 5,
    currentBookings: 1,
  },
  {
    id: "TS005",
    startTime: "16:00",
    endTime: "18:00",
    duration: 120,
    isAvailable: true,
    capacity: 5,
    currentBookings: 4,
  },
  {
    id: "TS006",
    startTime: "18:00",
    endTime: "20:00",
    duration: 120,
    isAvailable: true,
    capacity: 3,
    currentBookings: 1,
  },
];

// Mock Vehicles
export const mockVehicles: VehicleAssignment[] = [
  {
    vehicleId: "VH001",
    vehicleNumber: "MH-01-AB-1234",
    vehicleType: "truck",
    capacity: {
      weight: 3000,
      volume: 15,
      pallets: 12,
    },
    status: "available",
    fuelLevel: 85,
    mileage: 45000,
    healthStatus: "good",
    insurance: {
      policyNumber: "INS-2024-001",
      provider: "Express Insurance",
      coverage: 500000,
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      isActive: true,
    },
    permits: [
      {
        permitType: "Goods Carrier",
        permitNumber: "GC-2024-001",
        issuedBy: "RTO Mumbai",
        validFrom: "2024-01-01",
        validTo: "2024-12-31",
      },
    ],
    equipment: [
      {
        equipment: "GPS Tracker",
        status: "working",
        lastChecked: "2024-02-01",
      },
      {
        equipment: "Temperature Monitor",
        status: "working",
        lastChecked: "2024-02-01",
      },
    ],
  },
  {
    vehicleId: "VH002",
    vehicleNumber: "MH-01-CD-5678",
    vehicleType: "van",
    capacity: {
      weight: 1500,
      volume: 8,
      pallets: 6,
    },
    status: "in_transit",
    fuelLevel: 60,
    mileage: 32000,
    healthStatus: "excellent",
    insurance: {
      policyNumber: "INS-2024-002",
      provider: "Express Insurance",
      coverage: 300000,
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      isActive: true,
    },
    permits: [
      {
        permitType: "Goods Carrier",
        permitNumber: "GC-2024-002",
        issuedBy: "RTO Mumbai",
        validFrom: "2024-01-01",
        validTo: "2024-12-31",
      },
    ],
    equipment: [
      {
        equipment: "GPS Tracker",
        status: "working",
        lastChecked: "2024-02-01",
      },
    ],
  },
];

// Mock Drivers
export const mockDrivers: DriverAssignment[] = [
  {
    driverId: "DR001",
    name: "Arun Patel",
    phone: "+91 98765 12345",
    alternatePhone: "+91 98765 12346",
    email: "arun.patel@logistics.com",
    licenseNumber: "DL123456789",
    licenseType: "Heavy Vehicle",
    licenseExpiry: "2026-05-15",
    experience: 8,
    status: "available",
    shift: {
      shiftType: "morning",
      startTime: "07:00",
      endTime: "19:00",
      breakTimes: [
        {
          start: "12:00",
          end: "13:00",
          reason: "Lunch break",
        },
      ],
      overtimeAllowed: true,
      maxHours: 12,
    },
    rating: 4.5,
    completedDeliveries: 234,
    onTimeDeliveryRate: 94.5,
    customerRating: 4.3,
    emergencyContact: {
      name: "Priya Patel",
      phone: "+91 98765 12347",
      email: "priya.patel@gmail.com",
    },
    certifications: [
      {
        certification: "Safe Driving Certificate",
        issuedBy: "Transport Authority",
        issuedDate: "2023-01-15",
        expiryDate: "2025-01-15",
        isValid: true,
      },
    ],
    trainingRecords: [
      {
        training: "Defensive Driving",
        completedDate: "2023-06-15",
        score: 92,
        instructor: "Safety Institute",
        certificateNumber: "DEF-2023-001",
      },
    ],
  },
  {
    driverId: "DR002",
    name: "Rajesh Kumar",
    phone: "+91 98765 23456",
    email: "rajesh.kumar@logistics.com",
    licenseNumber: "DL234567890",
    licenseType: "Light Vehicle",
    licenseExpiry: "2025-12-20",
    experience: 5,
    status: "on_delivery",
    shift: {
      shiftType: "afternoon",
      startTime: "13:00",
      endTime: "01:00",
      breakTimes: [
        {
          start: "18:00",
          end: "19:00",
          reason: "Dinner break",
        },
      ],
      overtimeAllowed: false,
      maxHours: 10,
    },
    rating: 4.2,
    completedDeliveries: 156,
    onTimeDeliveryRate: 89.2,
    customerRating: 4.1,
    emergencyContact: {
      name: "Sunita Kumar",
      phone: "+91 98765 23457",
    },
    certifications: [],
    trainingRecords: [],
  },
];

// Mock Routes
export const mockRoutes: DeliveryRoute[] = [
  {
    id: "RT001",
    routeName: "Mumbai Central to Andheri",
    startLocation: {
      id: "LOC001",
      name: "Mumbai Central Warehouse",
      type: "warehouse",
      address: {
        street: "Plot 123, Industrial Area",
        area: "Kurla",
        city: "Mumbai",
        state: "Maharashtra",
        zipCode: "400070",
        country: "India",
      },
      coordinates: { latitude: 19.076, longitude: 72.8777 },
      availableServices: [
        { service: "loading_dock", available: true },
        { service: "forklift", available: true },
      ],
      restrictions: [],
      operatingHours: {
        monday: { open: "08:00", close: "20:00", isOpen: true },
        tuesday: { open: "08:00", close: "20:00", isOpen: true },
        wednesday: { open: "08:00", close: "20:00", isOpen: true },
        thursday: { open: "08:00", close: "20:00", isOpen: true },
        friday: { open: "08:00", close: "20:00", isOpen: true },
        saturday: { open: "08:00", close: "18:00", isOpen: true },
        sunday: { open: "10:00", close: "16:00", isOpen: true },
      },
    },
    endLocation: {
      id: "LOC002",
      name: "Mumbai Central Beverages Store",
      type: "store",
      address: {
        street: "123 Main Street",
        area: "Andheri West",
        city: "Mumbai",
        state: "Maharashtra",
        zipCode: "400053",
        country: "India",
        landmark: "Near Metro Station",
      },
      coordinates: { latitude: 19.1136, longitude: 72.8697 },
      availableServices: [
        { service: "parking", available: true },
        { service: "security", available: true },
      ],
      restrictions: [
        {
          type: "time",
          description: "No delivery during peak hours (12-2 PM)",
          severity: "warning",
        },
      ],
      contactInfo: {
        name: "Rajesh Kumar",
        phone: "+91 98765 43210",
        email: "rajesh.kumar@store.com",
      },
    },
    waypoints: [],
    totalDistance: 28.5,
    estimatedDuration: 90,
    fuelCost: 425,
    tollCost: 50,
    isOptimized: true,
    optimizationScore: 92,
    alternativeRoutes: [
      {
        id: "RT001-ALT1",
        description: "Via Western Express Highway",
        totalDistance: 32.1,
        estimatedDuration: 75,
        additionalCost: 150,
        advantages: ["Faster during peak hours", "Better road conditions"],
        disadvantages: ["Higher toll cost", "More fuel consumption"],
        recommendationScore: 85,
      },
    ],
    trafficConditions: [
      {
        location: "Bandra-Kurla Complex",
        severity: "moderate",
        description: "Regular traffic during office hours",
        estimatedDelay: 15,
      },
    ],
    roadConditions: [
      {
        location: "Andheri Flyover",
        condition: "good",
        description: "Recently maintained road",
        impact: "none",
        recommendations: [],
      },
    ],
    weatherConditions: {
      temperature: 28,
      humidity: 65,
      precipitation: 0,
      windSpeed: 12,
      visibility: 10,
      conditions: "Clear",
      impact: "none",
      recommendations: [],
    },
  },
];

// Mock Delivery Schedules
export const mockDeliverySchedules: DeliverySchedule[] = [
  {
    id: "DS001",
    poId: "PO001",
    challanId: "CH-2024-001",
    scheduleStatus: "scheduled",
    scheduledDate: "2024-02-15",
    scheduledTimeSlot: mockTimeSlots[1],
    deliveryType: "standard",
    priority: "medium",
    specialInstructions: [
      "Call 30 minutes before arrival",
      "Use rear entrance for delivery",
      "Check expiry dates before delivery",
    ],
    route: mockRoutes[0],
    vehicle: mockVehicles[0],
    driver: mockDrivers[0],
    currentStatus: "preparing",
    statusHistory: [
      {
        status: "preparing",
        timestamp: "2024-02-14T10:00:00Z",
        locationName: "Mumbai Central Warehouse",
        notes: "Order preparation started",
        updatedBy: "warehouse@corp.com",
        updateMethod: "manual",
      },
    ],
    trackingInfo: {
      trackingNumber: "TRK123456789",
      trackingUrl: "https://tracking.logistics.com/TRK123456789",
      lastKnownLocationName: "Mumbai Central Warehouse",
      lastUpdated: "2024-02-14T10:00:00Z",
      milestones: [
        {
          milestone: "Preparation Complete",
          expectedTime: "2024-02-15T08:00:00Z",
          status: "pending",
        },
        {
          milestone: "Vehicle Loaded",
          expectedTime: "2024-02-15T09:00:00Z",
          status: "pending",
        },
        {
          milestone: "Out for Delivery",
          expectedTime: "2024-02-15T10:00:00Z",
          status: "pending",
        },
        {
          milestone: "Delivered",
          expectedTime: "2024-02-15T11:30:00Z",
          status: "pending",
        },
      ],
      alerts: [],
    },
    notifications: [
      {
        id: "NOT001",
        type: "schedule_confirmation",
        recipient: {
          type: "franchisee",
          userId: "FRAN001",
          name: "Mumbai Central Beverages",
          email: "manager@franchise.com",
          phone: "+91 98765 43210",
          preferences: {
            email: true,
            sms: true,
            whatsapp: false,
            push: true,
            inApp: true,
          },
        },
        channel: "email",
        message:
          "Your delivery has been scheduled for Feb 15, 2024 between 10:00-12:00 AM",
        sentAt: "2024-02-14T10:30:00Z",
        retryCount: 0,
        maxRetries: 3,
      },
    ],
    documents: [
      {
        id: "DOC001",
        type: "delivery_challan",
        fileName: "delivery_challan_PO001.pdf",
        filePath: "/documents/challans/delivery_challan_PO001.pdf",
        fileSize: 245760,
        mimeType: "application/pdf",
        generatedAt: "2024-02-14T09:00:00Z",
        generatedBy: "system",
        version: 1,
        isLatest: true,
        signed: false,
        visibility: "franchisee",
        downloadCount: 0,
      },
    ],
    createdAt: "2024-02-14T09:00:00Z",
    createdBy: "system",
    lastUpdated: "2024-02-14T10:00:00Z",
  },
  {
    id: "DS002",
    poId: "PO002",
    challanId: "CH-2024-002",
    scheduleStatus: "in_progress",
    scheduledDate: "2024-02-08",
    scheduledTimeSlot: mockTimeSlots[0],
    actualDeliveryDate: "2024-02-08T09:15:00Z",
    deliveryType: "express",
    priority: "urgent",
    specialInstructions: [
      "Emergency delivery - handle with priority",
      "Notify immediately upon arrival",
    ],
    route: mockRoutes[0],
    vehicle: mockVehicles[1],
    driver: mockDrivers[1],
    currentStatus: "delivered",
    statusHistory: [
      {
        status: "preparing",
        timestamp: "2024-02-07T14:00:00Z",
        locationName: "Mumbai Central Warehouse",
        notes: "Emergency order preparation",
        updatedBy: "warehouse@corp.com",
        updateMethod: "manual",
      },
      {
        status: "picked_up",
        timestamp: "2024-02-08T07:30:00Z",
        locationName: "Mumbai Central Warehouse",
        notes: "Vehicle loaded and departed",
        updatedBy: "driver",
        updateMethod: "app",
      },
      {
        status: "in_transit",
        timestamp: "2024-02-08T08:00:00Z",
        locationName: "En route",
        notes: "On the way to destination",
        updatedBy: "system",
        updateMethod: "gps",
      },
      {
        status: "delivered",
        timestamp: "2024-02-08T09:15:00Z",
        locationName: "Mumbai Central Beverages Store",
        notes: "Successfully delivered. Received by Rajesh Kumar",
        updatedBy: "driver",
        updateMethod: "app",
        signature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
      },
    ],
    trackingInfo: {
      trackingNumber: "TRK234567890",
      trackingUrl: "https://tracking.logistics.com/TRK234567890",
      lastKnownLocationName: "Mumbai Central Beverages Store",
      lastUpdated: "2024-02-08T09:15:00Z",
      milestones: [
        {
          milestone: "Preparation Complete",
          expectedTime: "2024-02-08T07:00:00Z",
          actualTime: "2024-02-07T16:00:00Z",
          status: "reached",
        },
        {
          milestone: "Vehicle Loaded",
          expectedTime: "2024-02-08T07:30:00Z",
          actualTime: "2024-02-08T07:30:00Z",
          status: "reached",
        },
        {
          milestone: "Out for Delivery",
          expectedTime: "2024-02-08T08:00:00Z",
          actualTime: "2024-02-08T08:00:00Z",
          status: "reached",
        },
        {
          milestone: "Delivered",
          expectedTime: "2024-02-08T09:00:00Z",
          actualTime: "2024-02-08T09:15:00Z",
          status: "reached",
          delay: 15,
          reason: "Minor traffic delay",
        },
      ],
      alerts: [],
    },
    notifications: [
      {
        id: "NOT002",
        type: "delivery_completed",
        recipient: {
          type: "franchisee",
          userId: "FRAN001",
          name: "Mumbai Central Beverages",
          email: "manager@franchise.com",
          phone: "+91 98765 43210",
          preferences: {
            email: true,
            sms: true,
            whatsapp: false,
            push: true,
            inApp: true,
          },
        },
        channel: "email",
        message: "Your emergency order has been successfully delivered",
        sentAt: "2024-02-08T09:20:00Z",
        deliveredAt: "2024-02-08T09:20:00Z",
        retryCount: 0,
        maxRetries: 3,
      },
    ],
    documents: [
      {
        id: "DOC002",
        type: "proof_of_delivery",
        fileName: "pod_PO002.pdf",
        filePath: "/documents/pod/pod_PO002.pdf",
        fileSize: 156789,
        mimeType: "application/pdf",
        generatedAt: "2024-02-08T09:20:00Z",
        generatedBy: "system",
        version: 1,
        isLatest: true,
        signed: true,
        signedBy: "Rajesh Kumar",
        signedAt: "2024-02-08T09:15:00Z",
        visibility: "public",
        downloadCount: 2,
      },
    ],
    createdAt: "2024-02-07T14:00:00Z",
    createdBy: "system",
    lastUpdated: "2024-02-08T09:20:00Z",
    completedAt: "2024-02-08T09:15:00Z",
  },
];

// Mock GRN Data
export const mockGRNs: GRN[] = [
  {
    id: "GRN001",
    grnNumber: "GRN-2024-001",
    poId: "PO002",
    challanId: "CH-2024-002",
    deliveryScheduleId: "DS002",
    receivedDate: "2024-02-08T09:15:00Z",
    receivedBy: "Rajesh Kumar",
    receivedLocation: mockRoutes[0].endLocation,
    receivedItems: [
      {
        itemId: "POI004",
        productId: "PROD004",
        productName: "Mineral Water 1L (Pack of 12)",
        sku: "WATER-1L-12",
        orderedQuantity: 100,
        deliveredQuantity: 100,
        receivedQuantity: 100,
        acceptedQuantity: 98,
        rejectedQuantity: 2,
        condition: "good",
        qualityGrade: "A",
        defects: [
          {
            defectType: "Packaging Damage",
            severity: "minor",
            description: "2 packs have slight dents in packaging",
            affectedQuantity: 2,
            action: "reject",
          },
        ],
        batchNumber: "AQ240205",
        expiryDate: "2025-02-05",
        manufacturingDate: "2024-02-05",
        unitPrice: 180,
        totalValue: 18000,
        notes: "Overall good quality, minor packaging issues",
      },
      {
        itemId: "POI005",
        productId: "PROD005",
        productName: "Orange Juice 200ml (Case of 24)",
        sku: "JUICE-200ML-24",
        orderedQuantity: 40,
        deliveredQuantity: 40,
        receivedQuantity: 40,
        acceptedQuantity: 40,
        rejectedQuantity: 0,
        condition: "excellent",
        qualityGrade: "A+",
        defects: [],
        batchNumber: "FC240204",
        expiryDate: "2024-08-15",
        manufacturingDate: "2024-02-04",
        unitPrice: 320,
        totalValue: 12800,
        notes: "Excellent condition, all items accepted",
      },
    ],
    status: "completed",
    statusHistory: [
      {
        status: "pending",
        timestamp: "2024-02-08T09:15:00Z",
        changedBy: "system",
        reason: "GRN initiated upon delivery",
      },
      {
        status: "in_progress",
        timestamp: "2024-02-08T09:20:00Z",
        changedBy: "rajesh@franchise.com",
        reason: "Started item verification",
      },
      {
        status: "quality_check",
        timestamp: "2024-02-08T09:45:00Z",
        changedBy: "rajesh@franchise.com",
        reason: "Quality inspection in progress",
      },
      {
        status: "completed",
        timestamp: "2024-02-08T10:15:00Z",
        changedBy: "rajesh@franchise.com",
        reason: "GRN completed with minor discrepancies",
      },
    ],
    qualityInspection: {
      inspectionId: "QI001",
      inspectedBy: "Rajesh Kumar",
      inspectionDate: "2024-02-08T09:45:00Z",
      inspectionMethod: "visual",
      overallRating: "A",
      passed: true,
      checks: [
        {
          checkType: "Physical Condition",
          parameter: "Package Integrity",
          expectedValue: "No damage",
          actualValue: "Minor dents on 2 packs",
          status: "warning",
          notes: "Acceptable damage within tolerance",
        },
        {
          checkType: "Expiry Date",
          parameter: "Date Check",
          expectedValue: "Valid dates",
          actualValue: "All dates valid",
          status: "pass",
        },
        {
          checkType: "Quantity",
          parameter: "Count Verification",
          expectedValue: "140 total items",
          actualValue: "140 items received",
          status: "pass",
        },
      ],
      certified: true,
      certifiedBy: "Rajesh Kumar",
      certificateNumber: "QC-2024-001",
    },
    discrepancies: [
      {
        id: "DISC001",
        type: "quality_issue",
        description: "Minor packaging damage on 2 water packs",
        severity: "low",
        expectedValue: "Perfect packaging",
        actualValue: "2 packs with dents",
        variance: 2,
        status: "resolved",
        resolution: {
          resolutionType: "reject",
          description: "Rejected damaged items, accepted rest",
          agreedValue: 98,
          timeline: "Immediate",
          responsibleParty: "logistics",
        },
        financialImpact: -360,
        requiresApproval: false,
        evidencePhotos: ["/photos/damage_001.jpg", "/photos/damage_002.jpg"],
        supportingDocuments: [],
        reportedBy: "rajesh@franchise.com",
        reportedAt: "2024-02-08T09:45:00Z",
        resolvedBy: "rajesh@franchise.com",
        resolvedAt: "2024-02-08T10:00:00Z",
      },
    ],
    approvalRequired: false,
    photos: [
      "/photos/grn_001_overview.jpg",
      "/photos/grn_001_items.jpg",
      "/photos/grn_001_damage.jpg",
    ],
    documents: [
      {
        documentType: "grn",
        fileName: "GRN-2024-001.pdf",
        filePath: "/documents/grn/GRN-2024-001.pdf",
        uploadedBy: "rajesh@franchise.com",
        uploadedAt: "2024-02-08T10:15:00Z",
      },
    ],
    financialImpact: {
      totalOrderValue: 30800,
      receivedValue: 30800,
      acceptedValue: 30440,
      rejectedValue: 360,
      discrepancyValue: 360,
      adjustmentAmount: -360,
      finalPayableAmount: 30440,
      itemWiseImpact: [
        {
          itemId: "POI004",
          orderedValue: 18000,
          receivedValue: 18000,
          acceptedValue: 17640,
          adjustmentAmount: -360,
          finalValue: 17640,
          variance: -360,
          variancePercentage: -2.0,
        },
        {
          itemId: "POI005",
          orderedValue: 12800,
          receivedValue: 12800,
          acceptedValue: 12800,
          adjustmentAmount: 0,
          finalValue: 12800,
          variance: 0,
          variancePercentage: 0,
        },
      ],
      requiresFinancialApproval: false,
    },
    createdAt: "2024-02-08T09:15:00Z",
    lastUpdated: "2024-02-08T10:15:00Z",
    completedAt: "2024-02-08T10:15:00Z",
  },
];

// Mock Delivery Calendar
export const mockDeliveryCalendar: DeliveryCalendar = {
  id: "CAL001",
  calendarName: "Mumbai Central Hub Calendar",
  calendarType: "warehouse",
  resourceId: "WH001",
  workingDays: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  workingHours: {
    open: "08:00",
    close: "20:00",
    isOpen: true,
  },
  timeSlotDuration: 120,
  advanceBookingLimit: 7,
  availableSlots: [],
  blockedSlots: [],
  recurringEvents: [
    {
      eventId: "RE001",
      eventName: "Daily Lunch Break",
      eventType: "maintenance",
      recurrencePattern: {
        frequency: "daily",
        interval: 1,
      },
      duration: 120,
      impact: "block_all",
      startDate: "2024-02-01",
    },
  ],
  createdAt: "2024-02-01T00:00:00Z",
  lastUpdated: "2024-02-14T10:00:00Z",
};

// Mock Analytics
export const mockDeliveryAnalytics: DeliveryAnalytics = {
  totalDeliveries: 284,
  completedDeliveries: 267,
  pendingDeliveries: 12,
  failedDeliveries: 5,
  onTimeDeliveryRate: 94.2,
  averageDeliveryTime: 3.8,
  firstAttemptSuccessRate: 89.4,
  customerSatisfactionScore: 4.3,
  fleetUtilization: 78.5,
  driverEfficiency: 85.2,
  fuelEfficiency: 12.5,
  costPerDelivery: 425,
  dailyMetrics: [
    {
      date: "2024-02-01",
      deliveries: 15,
      onTimeRate: 93.3,
      averageTime: 3.9,
      cost: 6375,
      revenue: 12750,
      customerRating: 4.2,
    },
    {
      date: "2024-02-02",
      deliveries: 18,
      onTimeRate: 94.4,
      averageTime: 3.7,
      cost: 7650,
      revenue: 15300,
      customerRating: 4.4,
    },
    {
      date: "2024-02-03",
      deliveries: 12,
      onTimeRate: 91.7,
      averageTime: 4.1,
      cost: 5100,
      revenue: 10200,
      customerRating: 4.1,
    },
  ],
  weeklyTrends: [
    {
      week: "Week 5",
      deliveryVolume: 89,
      performanceScore: 93.2,
      costEfficiency: 82.1,
      growthRate: 5.8,
    },
    {
      week: "Week 6",
      deliveryVolume: 95,
      performanceScore: 94.6,
      costEfficiency: 84.3,
      growthRate: 6.7,
    },
  ],
  monthlyComparison: [
    {
      month: "January 2024",
      currentYear: {
        deliveries: 245,
        revenue: 490000,
        costs: 104125,
        profit: 385875,
        efficiency: 92.1,
      },
      previousYear: {
        deliveries: 198,
        revenue: 396000,
        costs: 89100,
        profit: 306900,
        efficiency: 88.4,
      },
      variance: 23.7,
      trend: "up",
    },
  ],
  routePerformance: [
    {
      routeId: "RT001",
      routeName: "Mumbai Central to Andheri",
      frequency: 45,
      averageTime: 90,
      onTimeRate: 94.2,
      fuelEfficiency: 13.2,
      customerRating: 4.4,
      profitability: 78.5,
    },
  ],
  vehiclePerformance: [
    {
      vehicleId: "VH001",
      vehicleNumber: "MH-01-AB-1234",
      utilizationRate: 82.3,
      fuelEfficiency: 12.8,
      maintenanceCost: 15000,
      deliveryCount: 156,
      averageRating: 4.2,
      profitability: 89.4,
    },
    {
      vehicleId: "VH002",
      vehicleNumber: "MH-01-CD-5678",
      utilizationRate: 74.6,
      fuelEfficiency: 14.1,
      maintenanceCost: 8500,
      deliveryCount: 128,
      averageRating: 4.5,
      profitability: 91.2,
    },
  ],
  driverPerformance: [
    {
      driverId: "DR001",
      driverName: "Arun Patel",
      deliveryCount: 156,
      onTimeRate: 96.2,
      customerRating: 4.5,
      safetyScore: 98.5,
      efficiency: 89.3,
      revenue: 312000,
    },
    {
      driverId: "DR002",
      driverName: "Rajesh Kumar",
      deliveryCount: 128,
      onTimeRate: 92.2,
      customerRating: 4.1,
      safetyScore: 94.8,
      efficiency: 85.7,
      revenue: 256000,
    },
  ],
  grnMetrics: {
    totalGRNs: 267,
    completedGRNs: 258,
    pendingGRNs: 9,
    averageProcessingTime: 2.3,
    qualityAcceptanceRate: 96.8,
    averageQualityGrade: "A",
    defectRate: 3.2,
    totalReceivedValue: 5340000,
    totalAcceptedValue: 5168000,
    totalAdjustments: 172000,
    adjustmentRate: 3.2,
  },
  discrepancyMetrics: {
    totalDiscrepancies: 23,
    resolvedDiscrepancies: 20,
    pendingDiscrepancies: 3,
    averageResolutionTime: 4.8,
    discrepancyByType: [
      {
        type: "quantity_shortage",
        count: 8,
        percentage: 34.8,
        averageImpact: 2500,
        resolutionRate: 87.5,
      },
      {
        type: "quality_issue",
        count: 7,
        percentage: 30.4,
        averageImpact: 1800,
        resolutionRate: 100,
      },
      {
        type: "damage",
        count: 5,
        percentage: 21.7,
        averageImpact: 3200,
        resolutionRate: 80,
      },
      {
        type: "wrong_item",
        count: 3,
        percentage: 13.0,
        averageImpact: 4500,
        resolutionRate: 66.7,
      },
    ],
    totalFinancialImpact: 65400,
    averageImpactPerDiscrepancy: 2843,
    discrepancyTrend: "improving",
    resolutionTrend: "stable",
  },
};

// Helper Functions
export const getDeliveryStatusColor = (status: string) => {
  const statusColors: Record<string, string> = {
    preparing: "bg-blue-100 text-blue-800",
    ready_for_pickup: "bg-cyan-100 text-cyan-800",
    picked_up: "bg-indigo-100 text-indigo-800",
    in_transit: "bg-yellow-100 text-yellow-800",
    out_for_delivery: "bg-orange-100 text-orange-800",
    attempting_delivery: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    partial_delivery: "bg-yellow-100 text-yellow-800",
    failed_delivery: "bg-red-100 text-red-800",
    returned: "bg-gray-100 text-gray-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return statusColors[status] || "bg-gray-100 text-gray-800";
};

export const getScheduleStatusColor = (status: string) => {
  const statusColors: Record<string, string> = {
    pending_schedule: "bg-gray-100 text-gray-800",
    scheduled: "bg-blue-100 text-blue-800",
    confirmed: "bg-green-100 text-green-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    rescheduled: "bg-orange-100 text-orange-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return statusColors[status] || "bg-gray-100 text-gray-800";
};

export const getGRNStatusColor = (status: string) => {
  const statusColors: Record<string, string> = {
    pending: "bg-gray-100 text-gray-800",
    in_progress: "bg-blue-100 text-blue-800",
    quality_check: "bg-purple-100 text-purple-800",
    discrepancy_found: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    completed: "bg-green-100 text-green-800",
  };
  return statusColors[status] || "bg-gray-100 text-gray-800";
};

export const formatDeliveryStatus = (status: string) => {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const calculateDeliveryTime = (startTime: string, endTime: string) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diff = end.getTime() - start.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24 * 10)) / 10; // in days with 1 decimal
};

export const getAvailableTimeSlots = (date: string) => {
  // Filter available slots for a specific date
  return mockTimeSlots.filter(
    (slot) => slot.isAvailable && slot.currentBookings < slot.capacity,
  );
};

export const generateTrackingNumber = () => {
  const prefix = "TRK";
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

export const generateGRNNumber = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const sequence = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `GRN-${year}${month}${day}-${sequence}`;
};

export const validateDeliverySchedule = (schedule: any) => {
  const errors: string[] = [];

  if (!schedule.scheduledDate) {
    errors.push("Delivery date is required");
  }

  if (!schedule.scheduledTimeSlot) {
    errors.push("Time slot is required");
  }

  if (!schedule.vehicle) {
    errors.push("Vehicle assignment is required");
  }

  if (!schedule.driver) {
    errors.push("Driver assignment is required");
  }

  const selectedDate = new Date(schedule.scheduledDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    errors.push("Delivery date cannot be in the past");
  }

  return errors;
};

export const optimizeRoute = (
  startLocation: any,
  endLocation: any,
  waypoints: any[] = [],
) => {
  // Simple route optimization logic
  const baseDistance = calculateDistance(
    startLocation.coordinates,
    endLocation.coordinates,
  );
  const estimatedTime = (baseDistance / 30) * 60; // 30 km/h average speed, convert to minutes
  const fuelCost = baseDistance * 15; // ₹15 per km

  return {
    totalDistance: baseDistance,
    estimatedDuration: Math.round(estimatedTime),
    fuelCost: Math.round(fuelCost),
    optimizationScore: 85 + Math.random() * 15, // Random score between 85-100
  };
};

export const calculateDistance = (
  coord1: { latitude: number; longitude: number },
  coord2: { latitude: number; longitude: number },
) => {
  const R = 6371; // Earth's radius in km
  const dLat = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const dLon = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.latitude * Math.PI) / 180) *
      Math.cos((coord2.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
