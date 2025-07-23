import {
  SalesCustomer,
  SalesQuotation,
  SalesOrder,
  SalesInvoice,
  Product,
  SalesAnalytics,
  BusinessRule,
  ApprovalWorkflow,
  DiscountRule,
  ExchangeRate,
  SalesTarget,
  SalesDashboardSummary,
  QuotationItem,
  OrderItem,
  InvoiceItem,
  StockReservation,
  CreditCheckResult,
} from "./types";

// Mock Sales Customers
export const salesCustomers: SalesCustomer[] = [
  {
    id: "cust_001",
    tenantId: "tenant_buildcorp",
    customerCode: "BC001",
    companyName: "Suntech Infrastructure Pvt Ltd",
    contactPerson: "Rajesh Kumar",
    email: "rajesh@suntech.com",
    phone: "+91-9876543210",
    address: {
      street: "123 Business Park",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      zipCode: "400001",
    },
    status: "active",
    approvalStatus: "approved",
    approvedBy: "admin_001",
    approvedAt: "2024-01-10T10:00:00Z",
    creditLimit: 50000000, // 5 Cr
    availableCredit: 35000000, // 3.5 Cr
    paymentTerms: 30,
    currency: "INR",
    creditRating: "excellent",
    industry: "Construction",
    customerType: "company",
    taxId: "AAACS1234A",
    gstNumber: "27AAACS1234A1ZG",
    accountManager: "sales_manager_001",
    customerSince: "2023-06-15T00:00:00Z",
    lastOrderDate: "2024-01-15T00:00:00Z",
    totalOrderValue: 150000000,
    created_at: "2023-06-15T09:30:00Z",
    updated_at: "2024-01-15T14:20:00Z",
  },
  {
    id: "cust_002",
    tenantId: "tenant_buildcorp",
    customerCode: "BC002",
    companyName: "Metro Real Estate Ltd",
    contactPerson: "Priya Sharma",
    email: "priya@metrorealty.com",
    phone: "+91-9876543211",
    address: {
      street: "456 Commercial Complex",
      city: "Delhi",
      state: "Delhi",
      country: "India",
      zipCode: "110001",
    },
    status: "active",
    approvalStatus: "approved",
    approvedBy: "admin_001",
    approvedAt: "2023-12-05T11:00:00Z",
    creditLimit: 25000000, // 2.5 Cr
    availableCredit: 20000000, // 2 Cr
    paymentTerms: 45,
    currency: "INR",
    creditRating: "good",
    industry: "Real Estate",
    customerType: "company",
    taxId: "BBMRE5678B",
    gstNumber: "07BBMRE5678B1ZH",
    accountManager: "sales_manager_002",
    customerSince: "2023-12-01T00:00:00Z",
    lastOrderDate: "2024-01-10T00:00:00Z",
    totalOrderValue: 75000000,
    created_at: "2023-12-01T10:15:00Z",
    updated_at: "2024-01-10T16:45:00Z",
  },
  {
    id: "cust_003",
    tenantId: "tenant_buildcorp",
    customerCode: "BC003",
    companyName: "Government Housing Board",
    contactPerson: "Amit Singh",
    email: "amit.singh@gov.in",
    phone: "+91-9876543212",
    address: {
      street: "Secretariat Complex",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      zipCode: "560001",
    },
    status: "active",
    approvalStatus: "pending",
    creditLimit: 100000000, // 10 Cr
    availableCredit: 100000000, // 10 Cr
    paymentTerms: 60,
    currency: "INR",
    creditRating: "excellent",
    industry: "Government",
    customerType: "government",
    accountManager: "sales_manager_001",
    customerSince: "2024-01-01T00:00:00Z",
    totalOrderValue: 0,
    created_at: "2024-01-01T09:00:00Z",
    updated_at: "2024-01-05T11:30:00Z",
  },
];

// Mock Products
export const products: Product[] = [
  {
    id: "prod_001",
    tenantId: "tenant_buildcorp",
    productCode: "STL001",
    name: "Steel TMT Bars 16mm",
    description: "High quality TMT steel bars for construction",
    category: "Steel",
    subcategory: "TMT Bars",
    stockQuantity: 5000,
    reservedQuantity: 500,
    availableQuantity: 4500,
    reorderLevel: 1000,
    maxStockLevel: 10000,
    basePrice: 65000,
    sellingPrice: 70000,
    currency: "INR",
    taxRate: 18,
    maxDiscountPercent: 10,
    unit: "MT",
    weight: 1000,
    dimensions: {
      length: 12,
      width: 0.016,
      height: 0.016,
      unit: "meters",
    },
    leadTime: 7,
    isActive: true,
    requiresApproval: false,
    created_at: "2023-06-01T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "prod_002",
    tenantId: "tenant_buildcorp",
    productCode: "CMT001",
    name: "Portland Cement 53 Grade",
    description: "Premium quality cement for construction",
    category: "Cement",
    subcategory: "OPC",
    stockQuantity: 2000,
    reservedQuantity: 200,
    availableQuantity: 1800,
    reorderLevel: 500,
    maxStockLevel: 5000,
    basePrice: 400,
    sellingPrice: 450,
    currency: "INR",
    taxRate: 18,
    maxDiscountPercent: 5,
    unit: "Bags",
    weight: 50,
    leadTime: 3,
    isActive: true,
    requiresApproval: false,
    created_at: "2023-06-01T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "prod_003",
    tenantId: "tenant_buildcorp",
    productCode: "BRK001",
    name: "Red Clay Bricks",
    description: "Standard red clay bricks for masonry",
    category: "Bricks",
    subcategory: "Clay Bricks",
    stockQuantity: 100000,
    reservedQuantity: 10000,
    availableQuantity: 90000,
    reorderLevel: 20000,
    maxStockLevel: 200000,
    basePrice: 8,
    sellingPrice: 10,
    currency: "INR",
    taxRate: 5,
    maxDiscountPercent: 15,
    unit: "Pieces",
    weight: 3,
    dimensions: {
      length: 0.23,
      width: 0.11,
      height: 0.075,
      unit: "meters",
    },
    leadTime: 5,
    isActive: true,
    requiresApproval: false,
    created_at: "2023-06-01T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  },
];

// Mock Quotations
export const salesQuotations: SalesQuotation[] = [
  {
    id: "quot_001",
    tenantId: "tenant_buildcorp",
    quotationNumber: "Q-2024-001",
    customerId: "cust_001",
    customer: salesCustomers[0],
    title: "Supply of Construction Materials - Phase 1",
    description: "Steel, cement and bricks for residential complex",
    status: "sent",
    version: 1,
    quotationDate: "2024-01-10T00:00:00Z",
    validUntil: "2024-02-10T00:00:00Z",
    items: [
      {
        id: "qi_001",
        productId: "prod_001",
        productCode: "STL001",
        productName: "Steel TMT Bars 16mm",
        description: "High quality TMT steel bars",
        category: "Steel",
        quantity: 100,
        unit: "MT",
        unitPrice: 70000,
        discountType: "percentage",
        discountValue: 5,
        discountAmount: 350000,
        taxRate: 18,
        taxAmount: 1197000,
        lineTotal: 7847000,
        availableStock: 4500,
        deliveryDays: 7,
      },
      {
        id: "qi_002",
        productId: "prod_002",
        productCode: "CMT001",
        productName: "Portland Cement 53 Grade",
        description: "Premium quality cement",
        category: "Cement",
        quantity: 1000,
        unit: "Bags",
        unitPrice: 450,
        discountType: "percentage",
        discountValue: 2,
        discountAmount: 9000,
        taxRate: 18,
        taxAmount: 79380,
        lineTotal: 520380,
        availableStock: 1800,
        deliveryDays: 3,
      },
    ],
    subtotal: 7650000,
    discountAmount: 359000,
    discountPercentage: 4.69,
    taxAmount: 1276380,
    totalAmount: 8367380,
    currency: "INR",
    exchangeRate: 1,
    paymentTerms: "30 days from delivery",
    deliveryTerms: "Ex-warehouse",
    validity: 30,
    notes: "Prices subject to market fluctuation",
    termsAndConditions: "Standard terms and conditions apply",
    createdBy: "sales_rep_001",
    assignedTo: "sales_manager_001",
    approvalRequired: false,
    convertedToOrder: false,
    created_at: "2024-01-10T09:00:00Z",
    updated_at: "2024-01-10T09:00:00Z",
  },
  {
    id: "quot_002",
    tenantId: "tenant_buildcorp",
    quotationNumber: "Q-2024-002",
    customerId: "cust_002",
    customer: salesCustomers[1],
    title: "Residential Tower Materials Supply",
    status: "accepted",
    version: 2,
    parentQuotationId: "quot_002_v1",
    quotationDate: "2024-01-12T00:00:00Z",
    validUntil: "2024-02-12T00:00:00Z",
    items: [
      {
        id: "qi_003",
        productId: "prod_003",
        productCode: "BRK001",
        productName: "Red Clay Bricks",
        description: "Standard red clay bricks for masonry",
        category: "Bricks",
        quantity: 50000,
        unit: "Pieces",
        unitPrice: 10,
        discountType: "percentage",
        discountValue: 10,
        discountAmount: 50000,
        taxRate: 5,
        taxAmount: 22500,
        lineTotal: 472500,
        availableStock: 90000,
        deliveryDays: 5,
      },
    ],
    subtotal: 500000,
    discountAmount: 50000,
    discountPercentage: 10,
    taxAmount: 22500,
    totalAmount: 472500,
    currency: "INR",
    exchangeRate: 1,
    paymentTerms: "45 days from delivery",
    deliveryTerms: "Door delivery",
    validity: 30,
    termsAndConditions: "Standard terms and conditions apply",
    createdBy: "sales_rep_002",
    assignedTo: "sales_manager_002",
    approvalRequired: true,
    approvedBy: "sales_manager_002",
    approvedAt: "2024-01-13T10:00:00Z",
    convertedToOrder: true,
    orderId: "ord_001",
    created_at: "2024-01-12T11:00:00Z",
    updated_at: "2024-01-13T10:00:00Z",
  },
];

// Mock Sales Orders
export const salesOrders: SalesOrder[] = [
  {
    id: "ord_001",
    tenantId: "tenant_buildcorp",
    orderNumber: "SO-2024-001",
    customerId: "cust_002",
    customer: salesCustomers[1],
    quotationId: "quot_002",
    title: "Residential Tower Materials Supply",
    description: "Converted from quotation Q-2024-002",
    status: "confirmed",
    priority: "medium",
    orderDate: "2024-01-13T00:00:00Z",
    expectedDeliveryDate: "2024-01-20T00:00:00Z",
    items: [
      {
        id: "oi_001",
        productId: "prod_003",
        productCode: "BRK001",
        productName: "Red Clay Bricks",
        description: "Standard red clay bricks for masonry",
        category: "Bricks",
        quantity: 50000,
        unit: "Pieces",
        unitPrice: 10,
        discountType: "percentage",
        discountValue: 10,
        discountAmount: 50000,
        taxRate: 5,
        taxAmount: 22500,
        lineTotal: 472500,
        availableStock: 90000,
        reservedQuantity: 50000,
        allocatedQuantity: 50000,
        shippedQuantity: 0,
        deliveredQuantity: 0,
        productionStatus: "completed",
        qualityCheckRequired: true,
        qualityCheckPassed: true,
        qualityCheckDate: "2024-01-15T00:00:00Z",
        qualityCheckBy: "qc_inspector_001",
      },
    ],
    subtotal: 500000,
    discountAmount: 50000,
    discountPercentage: 10,
    taxAmount: 22500,
    shippingCharges: 5000,
    totalAmount: 477500,
    currency: "INR",
    exchangeRate: 1,
    paymentStatus: "pending",
    paidAmount: 0,
    balanceAmount: 477500,
    shippingAddress: {
      street: "Site Address: Plot 123, Sector 45",
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipCode: "122001",
      contactPerson: "Site Engineer",
      contactPhone: "+91-9876543299",
    },
    createdBy: "sales_rep_002",
    assignedTo: "sales_manager_002",
    approvalRequired: false,
    creditCheckPassed: true,
    stockReserved: true,
    inventoryValidated: true,
    invoiced: false,
    invoiceIds: [],
    totalInvoicedAmount: 0,
    productionStarted: true,
    productionCompletedDate: "2024-01-15T00:00:00Z",
    created_at: "2024-01-13T12:00:00Z",
    updated_at: "2024-01-15T16:00:00Z",
  },
];

// Mock Business Rules
export const businessRules: BusinessRule[] = [
  {
    id: "rule_001",
    name: "Customer Approval Required",
    type: "validation",
    entity: "customer",
    condition: 'status === "pending_approval"',
    action: "block_order_creation",
    isActive: true,
    priority: 1,
    message: "Customer must be approved before creating orders",
  },
  {
    id: "rule_002",
    name: "Credit Limit Check",
    type: "validation",
    entity: "order",
    condition: "orderAmount + outstandingAmount > creditLimit",
    action: "require_approval",
    isActive: true,
    priority: 2,
    message: "Order amount exceeds available credit limit",
  },
  {
    id: "rule_003",
    name: "Invoice Amount Validation",
    type: "validation",
    entity: "invoice",
    condition: "invoiceAmount > orderTotalAmount",
    action: "block_invoice_creation",
    isActive: true,
    priority: 1,
    message: "Invoice amount cannot exceed order total",
  },
  {
    id: "rule_004",
    name: "Stock Reservation",
    type: "automation",
    entity: "order",
    condition: 'status === "confirmed"',
    action: "reserve_stock",
    isActive: true,
    priority: 3,
    message: "Stock automatically reserved upon order confirmation",
  },
  {
    id: "rule_005",
    name: "High Value Discount Approval",
    type: "approval",
    entity: "quotation",
    condition: "discountPercentage > 15",
    action: "require_manager_approval",
    isActive: true,
    priority: 2,
    message: "Discounts above 15% require manager approval",
  },
];

// Mock Exchange Rates
export const exchangeRates: ExchangeRate[] = [
  {
    id: "rate_001",
    fromCurrency: "USD",
    toCurrency: "INR",
    rate: 83.25,
    effectiveDate: "2024-01-15T00:00:00Z",
    source: "api",
    updatedAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "rate_002",
    fromCurrency: "EUR",
    toCurrency: "INR",
    rate: 90.45,
    effectiveDate: "2024-01-15T00:00:00Z",
    source: "api",
    updatedAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "rate_003",
    fromCurrency: "GBP",
    toCurrency: "INR",
    rate: 105.6,
    effectiveDate: "2024-01-15T00:00:00Z",
    source: "api",
    updatedAt: "2024-01-15T09:00:00Z",
  },
];

// Mock Discount Rules
export const discountRules: DiscountRule[] = [
  {
    id: "disc_001",
    tenantId: "tenant_buildcorp",
    name: "Bulk Order Discount",
    type: "percentage",
    applicableTo: "order_value",
    conditions: {
      minOrderValue: 1000000,
      validFrom: "2024-01-01T00:00:00Z",
      validTo: "2024-12-31T23:59:59Z",
    },
    discountValue: 5,
    requiresApproval: false,
    isActive: true,
  },
  {
    id: "disc_002",
    tenantId: "tenant_buildcorp",
    name: "Premium Customer Discount",
    type: "percentage",
    applicableTo: "customer",
    conditions: {
      customerTier: "premium",
      validFrom: "2024-01-01T00:00:00Z",
      validTo: "2024-12-31T23:59:59Z",
    },
    discountValue: 10,
    maxDiscountAmount: 500000,
    requiresApproval: true,
    approvalThreshold: 100000,
    isActive: true,
  },
];

// Mock Dashboard Summary
export const salesDashboardSummary: SalesDashboardSummary = {
  tenantId: "tenant_buildcorp",
  period: "2024-01",
  quotations: {
    total: 25,
    pending: 8,
    sent: 10,
    won: 5,
    lost: 2,
    wonValue: 15000000,
    pipelineValue: 45000000,
    conversionRate: 20,
  },
  orders: {
    total: 15,
    confirmed: 12,
    inProgress: 8,
    delivered: 4,
    cancelled: 1,
    totalValue: 25000000,
    averageValue: 1666667,
  },
  customers: {
    total: 45,
    active: 38,
    new: 3,
    creditExceeded: 2,
    pendingApproval: 5,
  },
  inventory: {
    lowStock: 8,
    reserved: 15000000,
    totalValue: 125000000,
  },
  financial: {
    revenue: 22000000,
    outstanding: 8500000,
    overdue: 1200000,
    collectionEfficiency: 85.9,
  },
};

// Helper Functions
export function getCustomerById(customerId: string): SalesCustomer | undefined {
  return salesCustomers.find((customer) => customer.id === customerId);
}

export function getProductById(productId: string): Product | undefined {
  return products.find((product) => product.id === productId);
}

export function getQuotationsByCustomer(customerId: string): SalesQuotation[] {
  return salesQuotations.filter(
    (quotation) => quotation.customerId === customerId,
  );
}

export function getOrdersByCustomer(customerId: string): SalesOrder[] {
  return salesOrders.filter((order) => order.customerId === customerId);
}

export function calculateCustomerOutstanding(customerId: string): number {
  // This would calculate from actual invoices in a real implementation
  const customer = getCustomerById(customerId);
  if (!customer) return 0;
  return customer.creditLimit - customer.availableCredit;
}

export function checkCreditLimit(
  customerId: string,
  orderAmount: number,
): CreditCheckResult {
  const customer = getCustomerById(customerId);
  if (!customer) {
    return {
      customerId,
      creditLimit: 0,
      currentOutstanding: 0,
      availableCredit: 0,
      requestedAmount: orderAmount,
      approved: false,
      reason: "Customer not found",
      checkedAt: new Date().toISOString(),
      checkedBy: "system",
    };
  }

  const approved = customer.availableCredit >= orderAmount;

  return {
    customerId,
    creditLimit: customer.creditLimit,
    currentOutstanding: customer.creditLimit - customer.availableCredit,
    availableCredit: customer.availableCredit,
    requestedAmount: orderAmount,
    approved,
    reason: approved ? "Credit check passed" : "Insufficient credit limit",
    checkedAt: new Date().toISOString(),
    checkedBy: "system",
  };
}

export function getExchangeRate(
  fromCurrency: string,
  toCurrency: string,
): number {
  const rate = exchangeRates.find(
    (r) => r.fromCurrency === fromCurrency && r.toCurrency === toCurrency,
  );
  return rate?.rate || 1;
}

export function calculateItemTotal(item: QuotationItem | OrderItem): number {
  const subtotal = item.quantity * item.unitPrice;
  const discountAmount =
    item.discountType === "percentage"
      ? (subtotal * item.discountValue) / 100
      : item.discountValue;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = (taxableAmount * item.taxRate) / 100;
  return taxableAmount + taxAmount;
}

export function validateBusinessRule(
  rule: BusinessRule,
  entity: any,
): { valid: boolean; message?: string } {
  // Simplified rule validation - in reality this would be more sophisticated
  switch (rule.id) {
    case "rule_001": // Customer Approval Required
      if (entity.customer && entity.customer.approvalStatus !== "approved") {
        return { valid: false, message: rule.message };
      }
      break;
    case "rule_002": // Credit Limit Check
      const creditCheck = checkCreditLimit(
        entity.customerId,
        entity.totalAmount,
      );
      if (!creditCheck.approved) {
        return { valid: false, message: rule.message };
      }
      break;
    case "rule_003": // Invoice Amount Validation
      if (entity.invoiceAmount > entity.orderTotalAmount) {
        return { valid: false, message: rule.message };
      }
      break;
  }
  return { valid: true };
}
