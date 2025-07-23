// Corporate Purchase Order Review & Fulfillment Mock Data

import {
  CorporatePOReview,
  CorporatePOAnalytics,
  WarehouseAssignment,
  DeliveryFeasibility,
  FulfillmentPlan,
  CorporateReviewConfiguration,
} from "./corporate-po-review-types";
import { mockPurchaseOrders } from "./purchase-order-data";

// Mock Warehouse Data
export const mockWarehouses = [
  {
    id: "WH001",
    name: "Mumbai Central Warehouse",
    location: {
      address: "Plot 123, Industrial Area, Kurla",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400070",
      coordinates: { latitude: 19.076, longitude: 72.8777 },
      distanceFromDestination: 15.5,
    },
    capacity: {
      currentLoad: 68,
      maxCapacity: 10000,
      availableSlots: 3200,
      peakHours: ["10:00-12:00", "14:00-16:00"],
    },
    specializations: ["Beverages", "FMCG", "Perishables"],
    operationalStatus: "active",
  },
  {
    id: "WH002",
    name: "Pune Distribution Center",
    location: {
      address: "Survey No. 45, Hinjewadi IT Park",
      city: "Pune",
      state: "Maharashtra",
      zipCode: "411057",
      coordinates: { latitude: 18.5204, longitude: 73.8567 },
      distanceFromDestination: 145.2,
    },
    capacity: {
      currentLoad: 45,
      maxCapacity: 8000,
      availableSlots: 4400,
      peakHours: ["09:00-11:00", "15:00-17:00"],
    },
    specializations: ["Beverages", "Snacks", "Electronics"],
    operationalStatus: "active",
  },
  {
    id: "WH003",
    name: "Nashik Regional Hub",
    location: {
      address: "MIDC Area, Ambad",
      city: "Nashik",
      state: "Maharashtra",
      zipCode: "422010",
      coordinates: { latitude: 19.9975, longitude: 73.7898 },
      distanceFromDestination: 167.8,
    },
    capacity: {
      currentLoad: 72,
      maxCapacity: 6000,
      availableSlots: 1680,
      peakHours: ["08:00-10:00", "16:00-18:00"],
    },
    specializations: ["Beverages", "Agricultural Products"],
    operationalStatus: "active",
  },
];

// Mock Corporate PO Reviews
export const mockCorporatePOReviews: CorporatePOReview[] = [
  {
    id: "CPR001",
    poId: "PO001",
    purchaseOrder: mockPurchaseOrders[0],
    reviewStatus: "pending_review",
    fulfillmentPlan: {
      canFulfill: true,
      fulfillmentPercentage: 95,
      estimatedProcessingTime: 18,
      priorityLevel: "medium",
      resourceRequirements: [
        {
          type: "warehouse_space",
          description: "Storage space for 115 cases",
          quantity: 2.3,
          availability: true,
          allocationTime: "2024-02-02T09:00:00Z",
        },
        {
          type: "vehicle",
          description: "Medium truck for delivery",
          quantity: 1,
          availability: true,
          allocationTime: "2024-02-14T08:00:00Z",
        },
        {
          type: "personnel",
          description: "Picking and packing staff",
          quantity: 3,
          availability: true,
          allocationTime: "2024-02-02T09:00:00Z",
        },
      ],
      constraints: [
        {
          type: "inventory",
          description: "Coca-Cola 250ml slightly below optimal stock",
          severity: "low",
          impact: "May require partial shipment from secondary location",
          suggestedResolution: "Source 10 cases from Pune warehouse",
        },
      ],
      alternatives: [
        {
          option: "Partial Fulfillment + Rush Order",
          description: "Fulfill 85% immediately, rush remaining 15%",
          estimatedTime: 36,
          additionalCost: 2500,
          feasibilityScore: 88,
        },
      ],
    },
    deliveryFeasibility: {
      isDeliverable: true,
      feasibilityScore: 92,
      estimatedDeliveryDate: "2024-02-15T11:30:00Z",
      deliveryMethod: {
        type: "standard",
        vehicleType: "truck",
        carrierId: "CARRIER001",
        carrierName: "Express Logistics",
        estimatedDuration: 3.5,
        trackingEnabled: true,
      },
      logisticsConstraints: [
        {
          type: "time",
          description: "Preferred delivery window 10:00-12:00",
          impact: "low",
          resolution: "Schedule within preferred window",
        },
      ],
      routeOptimization: {
        optimalRoute: [
          {
            location: "Mumbai Central Warehouse",
            coordinates: { latitude: 19.076, longitude: 72.8777 },
            stopType: "pickup",
            estimatedArrival: "2024-02-15T08:30:00Z",
          },
          {
            location: "Mumbai Central Beverages Store",
            coordinates: { latitude: 18.9688, longitude: 72.8205 },
            stopType: "delivery",
            estimatedArrival: "2024-02-15T11:30:00Z",
          },
        ],
        distance: 28.5,
        estimatedTime: 210,
        fuelCost: 845,
        alternativeRoutes: [],
      },
      deliveryCost: {
        baseCost: 1500,
        fuelSurcharge: 845,
        distanceCost: 570,
        urgencyPremium: 0,
        specialHandlingCost: 200,
        totalCost: 3115,
        currency: "INR",
      },
    },
    warehouseAssignment: {
      assignedWarehouseId: "WH001",
      warehouseName: "Mumbai Central Warehouse",
      warehouseLocation: mockWarehouses[0].location,
      availabilityStatus: "available",
      inventoryStatus: [
        {
          productId: "PROD001",
          productName: "Coca-Cola 250ml (Case of 24)",
          requestedQuantity: 50,
          availableQuantity: 45,
          reservedQuantity: 5,
          shortfall: 5,
          alternativeProducts: [
            {
              productId: "PROD001A",
              productName: "Coca-Cola 250ml (Case of 24) - Alternate Batch",
              similarity: 100,
              priceDifference: 0,
              availableQuantity: 20,
              substitutionReason: "Same product, different batch",
            },
          ],
          replenishmentDate: "2024-02-12T10:00:00Z",
        },
        {
          productId: "PROD002",
          productName: "Pepsi 500ml (Case of 24)",
          requestedQuantity: 30,
          availableQuantity: 35,
          reservedQuantity: 0,
          shortfall: 0,
          alternativeProducts: [],
        },
        {
          productId: "PROD003",
          productName: "Premium Chips 50g (Pack of 20)",
          requestedQuantity: 25,
          availableQuantity: 28,
          reservedQuantity: 0,
          shortfall: 0,
          alternativeProducts: [],
        },
      ],
      operationalCapacity: {
        currentLoad: 68,
        maxCapacity: 10000,
        availableSlots: 3200,
        peakHours: ["10:00-12:00", "14:00-16:00"],
        staffAvailability: {
          totalStaff: 45,
          availableStaff: 38,
          shiftPattern: "3 shifts",
          specializedStaff: [
            {
              role: "Forklift Operator",
              count: 8,
              availability: "available",
              nextAvailable: "2024-02-02T09:00:00Z",
            },
            {
              role: "Quality Inspector",
              count: 3,
              availability: "available",
              nextAvailable: "2024-02-02T09:30:00Z",
            },
          ],
        },
        equipmentStatus: [
          {
            equipment: "Forklift",
            status: "operational",
            capacity: 2000,
          },
          {
            equipment: "Conveyor Belt",
            status: "operational",
            capacity: 1000,
          },
        ],
      },
      assignmentReason:
        "Closest warehouse with adequate inventory and capacity",
      alternativeWarehouses: [
        {
          warehouseId: "WH002",
          warehouseName: "Pune Distribution Center",
          distance: 145.2,
          availabilityScore: 85,
          additionalTime: 4,
          additionalCost: 2500,
          reason: "Alternative location with full inventory",
        },
      ],
    },
    modifications: [],
    reviewComments: "",
    internalNotes:
      "High-priority customer. Ensure quality check on Coca-Cola batch.",
    corporateDecision: {
      decision: "approve",
      decisionMaker: "",
      decisionDate: "",
      reasoning: "",
      financialImpact: {
        revenue: 50850,
        cost: 38142,
        margin: 12708,
        profitability: 25.0,
        paymentTerms: "Net 30",
        riskAdjustment: 2,
      },
      strategicAlignment: {
        customerTier: "gold",
        relationshipValue: "high",
        marketImportance: "strategic",
        futureOpportunity: 85,
      },
    },
    workflowSteps: [
      {
        stepNumber: 1,
        stepName: "Initial Review",
        description: "Basic order validation and feasibility check",
        status: "pending",
      },
      {
        stepNumber: 2,
        stepName: "Inventory Check",
        description: "Verify product availability across warehouses",
        status: "pending",
      },
      {
        stepNumber: 3,
        stepName: "Warehouse Assignment",
        description: "Assign optimal warehouse for fulfillment",
        status: "pending",
      },
      {
        stepNumber: 4,
        stepName: "Delivery Planning",
        description: "Plan logistics and delivery schedule",
        status: "pending",
      },
      {
        stepNumber: 5,
        stepName: "Final Approval",
        description: "Corporate decision and approval",
        status: "pending",
      },
    ],
    currentStep: 1,
    profitability: {
      grossMargin: 25.0,
      netMargin: 22.8,
      contributionMargin: 28.5,
      breakEvenPoint: 35600,
      roiProjection: 18.5,
      competitiveAnalysis: {
        marketPosition: "leader",
        pricingAdvantage: 12.5,
        valueProposition: [
          "Fast delivery",
          "Quality assurance",
          "Flexible payment terms",
        ],
        threats: ["Price competition"],
        opportunities: ["Volume increase", "Cross-selling"],
      },
      recommendations: [
        {
          type: "volume",
          recommendation: "Offer volume discount for orders above ₹75,000",
          expectedImpact: 15,
          implementationEffort: "low",
          timeline: "Immediate",
        },
      ],
    },
    riskAssessment: {
      overallRisk: "low",
      riskFactors: [
        {
          category: "operational",
          description: "Minor inventory shortfall on one product",
          probability: "medium",
          impact: "low",
          riskScore: 25,
          trend: "stable",
        },
      ],
      mitigation: [
        {
          riskId: "risk_001",
          strategy: "Source shortage from alternative warehouse",
          cost: 500,
          effectiveness: 95,
          timeline: "24 hours",
          responsible: "Warehouse Manager",
        },
      ],
      contingencyPlans: [
        {
          scenario: "Complete inventory unavailability",
          triggerConditions: ["Inventory < 50%", "No alternative source"],
          actions: [
            "Notify customer",
            "Offer substitutes",
            "Expedite restocking",
          ],
          resources: ["Customer service", "Procurement team"],
          timeline: "2 hours",
          responsible: "Operations Manager",
        },
      ],
      monitoringPlan: {
        kpis: [
          {
            name: "Inventory Availability",
            metric: "Percentage",
            target: 95,
            current: 90,
            trend: "stable",
          },
        ],
        reviewFrequency: "Daily",
        escalationThresholds: [
          {
            metric: "Inventory Availability",
            threshold: 85,
            escalationLevel: "management",
            responseTime: "2 hours",
          },
        ],
        reportingSchedule: "Daily at 9 AM",
      },
    },
    createdAt: "2024-02-01T15:00:00Z",
    lastUpdated: "2024-02-01T15:00:00Z",
  },

  {
    id: "CPR002",
    poId: "PO002",
    purchaseOrder: mockPurchaseOrders[1],
    reviewStatus: "approved_for_fulfillment",
    reviewedBy: "corporate.reviewer@corp.com",
    reviewedAt: "2024-02-05T09:15:00Z",
    fulfillmentPlan: {
      canFulfill: true,
      fulfillmentPercentage: 100,
      estimatedProcessingTime: 12,
      priorityLevel: "urgent",
      resourceRequirements: [
        {
          type: "warehouse_space",
          description: "Express processing area",
          quantity: 1.5,
          availability: true,
          allocationTime: "2024-02-05T09:30:00Z",
        },
        {
          type: "vehicle",
          description: "Express delivery van",
          quantity: 1,
          availability: true,
          allocationTime: "2024-02-06T14:00:00Z",
        },
      ],
      constraints: [],
    },
    deliveryFeasibility: {
      isDeliverable: true,
      feasibilityScore: 98,
      estimatedDeliveryDate: "2024-02-08T09:00:00Z",
      deliveryMethod: {
        type: "express",
        vehicleType: "van",
        carrierId: "CARRIER001",
        carrierName: "Express Logistics",
        estimatedDuration: 2,
        trackingEnabled: true,
      },
      logisticsConstraints: [],
      routeOptimization: {
        optimalRoute: [
          {
            location: "Mumbai Central Warehouse",
            coordinates: { latitude: 19.076, longitude: 72.8777 },
            stopType: "pickup",
            estimatedArrival: "2024-02-08T07:00:00Z",
          },
          {
            location: "Mumbai Central Beverages Store",
            coordinates: { latitude: 18.9688, longitude: 72.8205 },
            stopType: "delivery",
            estimatedArrival: "2024-02-08T09:00:00Z",
          },
        ],
        distance: 28.5,
        estimatedTime: 120,
        fuelCost: 845,
        alternativeRoutes: [],
      },
      deliveryCost: {
        baseCost: 2000,
        fuelSurcharge: 845,
        distanceCost: 570,
        urgencyPremium: 1000,
        specialHandlingCost: 0,
        totalCost: 4415,
        currency: "INR",
      },
    },
    warehouseAssignment: {
      assignedWarehouseId: "WH001",
      warehouseName: "Mumbai Central Warehouse",
      warehouseLocation: mockWarehouses[0].location,
      availabilityStatus: "available",
      inventoryStatus: [
        {
          productId: "PROD004",
          productName: "Mineral Water 1L (Pack of 12)",
          requestedQuantity: 100,
          availableQuantity: 120,
          reservedQuantity: 0,
          shortfall: 0,
          alternativeProducts: [],
        },
        {
          productId: "PROD005",
          productName: "Orange Juice 200ml (Case of 24)",
          requestedQuantity: 40,
          availableQuantity: 45,
          reservedQuantity: 0,
          shortfall: 0,
          alternativeProducts: [],
        },
      ],
      operationalCapacity: mockWarehouses[0].capacity,
      assignmentReason: "Emergency fulfillment from primary warehouse",
      alternativeWarehouses: [],
    },
    modifications: [],
    challanInfo: {
      challanNumber: "CH-2024-002",
      generatedAt: "2024-02-05T10:00:00Z",
      generatedBy: "warehouse@corp.com",
      items: [
        {
          itemId: "POI004",
          productName: "Mineral Water 1L (Pack of 12)",
          sku: "WATER-1L-12",
          orderedQuantity: 100,
          dispatchedQuantity: 100,
          batchNumber: "AQ240205",
          expiryDate: "2025-02-05",
          qualityGrade: "A",
          packingType: "Pallet",
          weight: 1200,
          dimensions: { length: 120, width: 80, height: 140, unit: "cm" },
        },
        {
          itemId: "POI005",
          productName: "Orange Juice 200ml (Case of 24)",
          sku: "JUICE-200ML-24",
          orderedQuantity: 40,
          dispatchedQuantity: 40,
          batchNumber: "FC240204",
          expiryDate: "2024-08-15",
          qualityGrade: "A+",
          packingType: "Box",
          weight: 320,
          dimensions: { length: 60, width: 40, height: 30, unit: "cm" },
        },
      ],
      totalQuantity: 140,
      totalWeight: 1520,
      totalVolume: 1.62,
      packingDetails: [
        {
          packageId: "PKG001",
          packageType: "pallet",
          items: ["POI004"],
          weight: 1200,
          dimensions: { length: 120, width: 80, height: 140, unit: "cm" },
          fragile: false,
        },
        {
          packageId: "PKG002",
          packageType: "box",
          items: ["POI005"],
          weight: 320,
          dimensions: { length: 60, width: 40, height: 30, unit: "cm" },
          fragile: false,
        },
      ],
      qualityChecks: [
        {
          checkType: "expiry",
          result: "pass",
          checkedBy: "quality@corp.com",
          checkedAt: "2024-02-05T09:45:00Z",
          notes: "All products within expiry guidelines",
        },
        {
          checkType: "weight",
          result: "pass",
          checkedBy: "quality@corp.com",
          checkedAt: "2024-02-05T09:50:00Z",
          notes: "Weight verification completed",
        },
      ],
      transportDetails: {
        vehicleNumber: "MH-01-AB-1234",
        driverName: "Arun Patel",
        driverPhone: "+91 98765 12345",
        estimatedDeparture: "2024-02-06T14:00:00Z",
        estimatedArrival: "2024-02-08T09:00:00Z",
        routePlan: [
          {
            location: "Mumbai Central Warehouse",
            coordinates: { latitude: 19.076, longitude: 72.8777 },
            stopType: "pickup",
            estimatedArrival: "2024-02-06T14:00:00Z",
          },
          {
            location: "Mumbai Central Beverages Store",
            coordinates: { latitude: 18.9688, longitude: 72.8205 },
            stopType: "delivery",
            estimatedArrival: "2024-02-08T09:00:00Z",
          },
        ],
        trackingEnabled: true,
        insuranceCoverage: {
          policyNumber: "INS-2024-789",
          coverage: 50000,
          provider: "Express Insurance",
          validUntil: "2024-12-31",
        },
      },
      specialInstructions: [
        "Handle with care - fragile items",
        "Verify expiry dates during delivery",
        "Emergency delivery - priority handling",
      ],
      documentPath: "/documents/challans/CH-2024-002.pdf",
    },
    reviewComments:
      "Emergency order approved for immediate processing. All inventory available.",
    internalNotes:
      "Fast-track processing due to stock-out situation. Monitor delivery closely.",
    corporateDecision: {
      decision: "approve",
      decisionMaker: "corporate.reviewer@corp.com",
      decisionDate: "2024-02-05T09:15:00Z",
      reasoning: "Emergency approval for critical stock replenishment",
      conditions: [
        {
          condition: "Priority handling required",
          deadline: "2024-02-08T09:00:00Z",
          responsible: "Operations Team",
          priority: "high",
        },
      ],
      financialImpact: {
        revenue: 32205,
        cost: 24154,
        margin: 8051,
        profitability: 25.0,
        paymentTerms: "Net 15",
        riskAdjustment: 1,
      },
      strategicAlignment: {
        customerTier: "gold",
        relationshipValue: "high",
        marketImportance: "strategic",
        futureOpportunity: 90,
      },
    },
    workflowSteps: [
      {
        stepNumber: 1,
        stepName: "Emergency Review",
        description: "Expedited order validation",
        status: "completed",
        assignedTo: "corporate.reviewer@corp.com",
        startedAt: "2024-02-05T09:00:00Z",
        completedAt: "2024-02-05T09:15:00Z",
        duration: 15,
      },
      {
        stepNumber: 2,
        stepName: "Express Processing",
        description: "Priority warehouse processing",
        status: "completed",
        assignedTo: "warehouse@corp.com",
        startedAt: "2024-02-05T09:30:00Z",
        completedAt: "2024-02-05T10:00:00Z",
        duration: 30,
      },
      {
        stepNumber: 3,
        stepName: "Challan Generation",
        description: "Generate delivery documentation",
        status: "completed",
        assignedTo: "logistics@corp.com",
        startedAt: "2024-02-05T10:00:00Z",
        completedAt: "2024-02-05T10:15:00Z",
        duration: 15,
      },
    ],
    currentStep: 3,
    profitability: {
      grossMargin: 25.0,
      netMargin: 23.2,
      contributionMargin: 27.8,
      breakEvenPoint: 25764,
      roiProjection: 21.2,
      competitiveAnalysis: {
        marketPosition: "leader",
        pricingAdvantage: 15.2,
        valueProposition: [
          "Emergency response capability",
          "Same-day processing",
          "Quality guarantee",
        ],
        threats: ["Express delivery costs"],
        opportunities: ["Emergency service premium"],
      },
      recommendations: [
        {
          type: "pricing",
          recommendation: "Implement emergency service surcharge",
          expectedImpact: 8,
          implementationEffort: "low",
          timeline: "Next quarter",
        },
      ],
    },
    riskAssessment: {
      overallRisk: "low",
      riskFactors: [
        {
          category: "operational",
          description: "Tight delivery timeline",
          probability: "low",
          impact: "medium",
          riskScore: 35,
          trend: "decreasing",
        },
      ],
      mitigation: [
        {
          riskId: "risk_002",
          strategy: "Real-time tracking and backup vehicle standby",
          cost: 1000,
          effectiveness: 90,
          timeline: "Immediate",
          responsible: "Logistics Manager",
        },
      ],
      contingencyPlans: [
        {
          scenario: "Vehicle breakdown during delivery",
          triggerConditions: ["Vehicle failure", "Route blockage"],
          actions: [
            "Deploy backup vehicle",
            "Notify customer",
            "Expedite transfer",
          ],
          resources: ["Backup vehicle", "Emergency crew"],
          timeline: "1 hour",
          responsible: "Logistics Manager",
        },
      ],
      monitoringPlan: {
        kpis: [
          {
            name: "On-time Delivery",
            metric: "Percentage",
            target: 99,
            current: 98,
            trend: "stable",
          },
        ],
        reviewFrequency: "Real-time",
        escalationThresholds: [
          {
            metric: "Delivery Delay",
            threshold: 30,
            escalationLevel: "management",
            responseTime: "Immediate",
          },
        ],
        reportingSchedule: "Hourly until delivery",
      },
    },
    createdAt: "2024-02-05T08:30:00Z",
    lastUpdated: "2024-02-05T10:15:00Z",
    processedBy: "corporate.reviewer@corp.com",
    completedAt: "2024-02-05T10:15:00Z",
  },
];

// Analytics Data
export const mockCorporatePOAnalytics: CorporatePOAnalytics = {
  totalPendingReviews: 12,
  totalApprovedOrders: 145,
  totalRejectedOrders: 8,
  totalValue: 2845600,
  approvalRate: 94.8,
  averageReviewTime: 4.2,
  fulfillmentRate: 96.5,
  warehouseUtilization: [
    {
      warehouseId: "WH001",
      warehouseName: "Mumbai Central Warehouse",
      currentUtilization: 68,
      maxCapacity: 10000,
      pendingOrders: 8,
      efficiency: 92,
      location: "Mumbai",
    },
    {
      warehouseId: "WH002",
      warehouseName: "Pune Distribution Center",
      currentUtilization: 45,
      maxCapacity: 8000,
      pendingOrders: 3,
      efficiency: 88,
      location: "Pune",
    },
    {
      warehouseId: "WH003",
      warehouseName: "Nashik Regional Hub",
      currentUtilization: 72,
      maxCapacity: 6000,
      pendingOrders: 5,
      efficiency: 85,
      location: "Nashik",
    },
  ],
  reviewMetrics: {
    averageReviewTime: 4.2,
    fastestReview: 0.5,
    slowestReview: 18.5,
    reviewBacklog: 12,
    reviewerWorkload: [
      {
        reviewerId: "REV001",
        reviewerName: "Amit Kumar",
        pendingReviews: 5,
        completedToday: 8,
        averageReviewTime: 3.8,
        workloadRating: "moderate",
      },
      {
        reviewerId: "REV002",
        reviewerName: "Priya Singh",
        pendingReviews: 4,
        completedToday: 6,
        averageReviewTime: 4.5,
        workloadRating: "light",
      },
      {
        reviewerId: "REV003",
        reviewerName: "Rajesh Mehta",
        pendingReviews: 3,
        completedToday: 7,
        averageReviewTime: 4.1,
        workloadRating: "light",
      },
    ],
  },
  performanceTrends: [
    {
      metric: "Approval Rate",
      currentValue: 94.8,
      previousValue: 92.3,
      change: 2.5,
      trend: "up",
      period: "This Month",
    },
    {
      metric: "Average Review Time",
      currentValue: 4.2,
      previousValue: 5.1,
      change: -0.9,
      trend: "down",
      period: "This Month",
    },
    {
      metric: "Fulfillment Rate",
      currentValue: 96.5,
      previousValue: 95.8,
      change: 0.7,
      trend: "up",
      period: "This Month",
    },
  ],
  topFranchisees: [
    {
      franchiseeId: "FRAN001",
      franchiseeName: "Mumbai Central Beverages",
      totalOrders: 28,
      totalValue: 567800,
      approvalRate: 96.4,
      onTimeDeliveryRate: 94.6,
      rating: "excellent",
    },
    {
      franchiseeId: "FRAN002",
      franchiseeName: "Pune Premium Stores",
      totalOrders: 22,
      totalValue: 445200,
      approvalRate: 95.5,
      onTimeDeliveryRate: 91.2,
      rating: "good",
    },
    {
      franchiseeId: "FRAN003",
      franchiseeName: "Nashik Distribution Network",
      totalOrders: 18,
      totalValue: 356400,
      approvalRate: 94.4,
      onTimeDeliveryRate: 89.8,
      rating: "good",
    },
  ],
};

// Configuration Data
export const mockCorporateReviewConfiguration: CorporateReviewConfiguration = {
  autoAssignmentRules: [
    {
      id: "AAR001",
      name: "Regional Assignment",
      conditions: [
        {
          field: "delivery_location.state",
          operator: "equals",
          value: "Maharashtra",
          weight: 10,
        },
      ],
      assignTo: "regional.reviewer@corp.com",
      priority: 1,
      isActive: true,
    },
    {
      id: "AAR002",
      name: "High Value Orders",
      conditions: [
        {
          field: "grand_total",
          operator: "greater_than",
          value: 100000,
          weight: 15,
        },
      ],
      assignTo: "senior.reviewer@corp.com",
      priority: 2,
      isActive: true,
    },
  ],
  approvalThresholds: [
    {
      orderValue: 25000,
      requiredApprovers: 1,
      timeLimit: 4,
      escalationLevel: "supervisor",
    },
    {
      orderValue: 100000,
      requiredApprovers: 2,
      timeLimit: 8,
      escalationLevel: "manager",
    },
    {
      orderValue: 500000,
      requiredApprovers: 3,
      timeLimit: 24,
      escalationLevel: "director",
    },
  ],
  warehousePriorities: [
    {
      warehouseId: "WH001",
      priority: 1,
      region: "Mumbai Metropolitan",
      specializations: ["Beverages", "FMCG"],
      maxOrderValue: 500000,
    },
    {
      warehouseId: "WH002",
      priority: 2,
      region: "Pune District",
      specializations: ["Beverages", "Electronics"],
      maxOrderValue: 300000,
    },
    {
      warehouseId: "WH003",
      priority: 3,
      region: "North Maharashtra",
      specializations: ["Agricultural Products"],
      maxOrderValue: 200000,
    },
  ],
  escalationRules: [
    {
      condition: "time_exceeded",
      threshold: 8,
      escalateTo: "manager@corp.com",
      notificationMethod: "email",
      urgency: "medium",
    },
    {
      condition: "high_value",
      threshold: 250000,
      escalateTo: "director@corp.com",
      notificationMethod: "call",
      urgency: "high",
    },
  ],
  notificationSettings: [
    {
      event: "review_assigned",
      enabled: true,
      recipients: ["assigned_reviewer"],
      template: "review_assignment",
      delay: 0,
      channels: ["email", "in_app"],
    },
    {
      event: "review_completed",
      enabled: true,
      recipients: ["franchisee", "operations_team"],
      template: "review_completion",
      delay: 0,
      channels: ["email"],
    },
  ],
};

// Helper Functions
export const calculateFulfillmentScore = (order: any, warehouse: any) => {
  let score = 100;

  // Distance penalty
  if (warehouse.location.distanceFromDestination > 100) {
    score -= 20;
  } else if (warehouse.location.distanceFromDestination > 50) {
    score -= 10;
  }

  // Capacity penalty
  if (warehouse.capacity.currentLoad > 80) {
    score -= 15;
  } else if (warehouse.capacity.currentLoad > 60) {
    score -= 5;
  }

  // Specialization bonus
  const orderCategories = order.items.map((item: any) => item.category);
  const hasSpecialization = orderCategories.some((cat: string) =>
    warehouse.specializations.includes(cat),
  );
  if (hasSpecialization) {
    score += 10;
  }

  return Math.max(0, Math.min(100, score));
};

export const estimateDeliveryTime = (
  distance: number,
  vehicleType: string,
  priority: string,
) => {
  const baseSpeed = {
    bike: 25,
    van: 35,
    truck: 30,
    container: 25,
  };

  const speed = baseSpeed[vehicleType as keyof typeof baseSpeed] || 30;
  let travelTime = (distance / speed) * 60; // in minutes

  // Priority adjustments
  if (priority === "urgent") {
    travelTime *= 0.8;
  } else if (priority === "low") {
    travelTime *= 1.2;
  }

  // Add buffer time
  travelTime += 30; // 30 minutes buffer

  return Math.round(travelTime);
};

export const calculateDeliveryCost = (
  distance: number,
  vehicleType: string,
  priority: string,
) => {
  const baseCosts = {
    bike: { base: 500, perKm: 8 },
    van: { base: 1000, perKm: 12 },
    truck: { base: 1500, perKm: 20 },
    container: { base: 2500, perKm: 35 },
  };

  const costs =
    baseCosts[vehicleType as keyof typeof baseCosts] || baseCosts.truck;
  let totalCost = costs.base + distance * costs.perKm;

  // Priority adjustments
  if (priority === "urgent") {
    totalCost *= 1.5;
  } else if (priority === "high") {
    totalCost *= 1.2;
  }

  // Fuel surcharge (15% of base cost)
  const fuelSurcharge = totalCost * 0.15;

  return {
    baseCost: costs.base,
    distanceCost: distance * costs.perKm,
    urgencyPremium: totalCost - (costs.base + distance * costs.perKm),
    fuelSurcharge: fuelSurcharge,
    totalCost: totalCost + fuelSurcharge,
  };
};

export const getOptimalWarehouse = (order: any) => {
  const scores = mockWarehouses.map((warehouse) => ({
    warehouse,
    score: calculateFulfillmentScore(order, warehouse),
  }));

  scores.sort((a, b) => b.score - a.score);
  return scores[0]?.warehouse;
};

export const formatReviewStatus = (status: string) => {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getStatusColor = (status: string) => {
  const statusColors: Record<string, string> = {
    pending_review: "bg-yellow-100 text-yellow-800",
    under_evaluation: "bg-blue-100 text-blue-800",
    feasibility_check: "bg-purple-100 text-purple-800",
    warehouse_assignment: "bg-indigo-100 text-indigo-800",
    quantity_modification: "bg-orange-100 text-orange-800",
    approved_for_fulfillment: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    on_hold: "bg-gray-100 text-gray-800",
    fulfillment_in_progress: "bg-cyan-100 text-cyan-800",
    challan_generated: "bg-teal-100 text-teal-800",
    dispatched: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  return statusColors[status] || "bg-gray-100 text-gray-800";
};

export const getPriorityColor = (priority: string) => {
  const priorityColors: Record<string, string> = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-blue-100 text-blue-800",
    high: "bg-orange-100 text-orange-800",
    urgent: "bg-red-100 text-red-800",
  };

  return priorityColors[priority] || "bg-gray-100 text-gray-800";
};

export const generateChallanNumber = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const timestamp = now.getTime().toString().slice(-4);
  return `CH-${year}${month}${day}-${timestamp}`;
};

export const validateReviewForm = (formData: any) => {
  const errors: string[] = [];

  if (!formData.reviewStatus) {
    errors.push("Review status is required");
  }

  if (!formData.corporateDecision) {
    errors.push("Corporate decision is required");
  }

  if (formData.corporateDecision === "reject" && !formData.reviewComments) {
    errors.push("Comments are required for rejection");
  }

  if (
    formData.corporateDecision === "modify" &&
    (!formData.modifications || formData.modifications.length === 0)
  ) {
    errors.push("Modifications are required when modifying an order");
  }

  return errors;
};
