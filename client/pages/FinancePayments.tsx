import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { PermissionProvider } from "../components/user-management/PermissionProvider";
import { PaymentWorkflowDashboard } from "../components/finance/PaymentWorkflowDashboard";
import { TenantUser } from "../components/user-management/types";

// Available tenants for demonstration
const availableTenants = [
  {
    id: "tenant_001",
    name: "BuildCorp Constructions",
    type: "Construction",
    adminUser: {
      id: "user_001",
      tenantId: "tenant_001",
      username: "john.admin",
      email: "john.admin@buildcorp.com",
      firstName: "John",
      lastName: "Admin",
      tenantRole: "admin" as const,
    },
  },
  {
    id: "tenant_002",
    name: "Metro Realty Group",
    type: "Real Estate",
    adminUser: {
      id: "user_004",
      tenantId: "tenant_002",
      username: "priya.admin",
      email: "priya.admin@metrorealty.com",
      firstName: "Priya",
      lastName: "Sharma",
      tenantRole: "admin" as const,
    },
  },
  {
    id: "tenant_003",
    name: "Skyline Developers",
    type: "Development",
    adminUser: {
      id: "user_006",
      tenantId: "tenant_003",
      username: "amit.owner",
      email: "amit.owner@skylinedev.com",
      firstName: "Amit",
      lastName: "Patel",
      tenantRole: "owner" as const,
    },
  },
];

export default function FinancePayments() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tab } = useParams<{ tab: string }>();

  // State for current tenant (can be changed for demo purposes)
  const [currentTenantId] = useState("tenant_001");
  const [userType] = useState<"corporate" | "franchisee">("franchisee");

  // Use tab from params or default to overview
  const currentTab = tab || "overview";

  // Redirect to default tab if no tab is specified
  useEffect(() => {
    if (
      location.pathname === "/finance/payments" ||
      location.pathname === "/finance/payments/"
    ) {
      navigate("/finance/payments/overview", { replace: true });
    }
  }, [location.pathname, navigate]);

  // Get current tenant info
  const currentTenant = availableTenants.find((t) => t.id === currentTenantId);

  if (!currentTenant) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">
              Tenant Not Found
            </h1>
            <p className="text-muted-foreground">
              The requested tenant could not be found.
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Create current user object for the selected tenant
  const currentUser: TenantUser = {
    id: currentTenant.adminUser.id,
    tenantId: currentTenant.adminUser.tenantId,
    username: currentTenant.adminUser.username,
    email: currentTenant.adminUser.email,
    firstName: currentTenant.adminUser.firstName,
    lastName: currentTenant.adminUser.lastName,
    phone: "+91-9876543210",
    avatar: `${currentTenant.adminUser.firstName[0]}${currentTenant.adminUser.lastName[0]}`,
    employeeId: "ADMIN001",
    designation: "Finance Manager",
    department: "Finance",
    location: "Head Office",
    roleId: "role_finance_admin",
    permissions: [
      "payments:view",
      "payments:create",
      "payments:manage",
      "invoices:view",
      "invoices:pay",
      "credit:view",
      "credit:manage",
      "reconciliation:view",
      "reconciliation:manage",
    ],
    customPermissions: [],
    status: "active",
    emailVerified: true,
    phoneVerified: true,
    mfaEnabled: true,
    lastLogin: new Date().toISOString(),
    tenantRole: currentTenant.adminUser.tenantRole,
    joinedAt: "2024-01-01T00:00:00Z",
    invitedBy: "system",
    profile: {
      bio: "Finance Manager with expertise in payment processing and credit management",
      skills: [
        "Payment Processing",
        "Credit Management",
        "Financial Analysis",
        "Reconciliation",
      ],
      certifications: [
        "Certified Financial Manager",
        "Payment Gateway Specialist",
      ],
    },
    security: {
      sessionTimeout: 480,
      deviceTrust: true,
      failedLoginAttempts: 0,
      accountLocked: false,
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: new Date().toISOString(),
    createdBy: "system",
  };

  return (
    <MainLayout>
      <PermissionProvider user={currentUser} tenantId={currentUser.tenantId}>
        <div className="container mx-auto px-4 py-8 space-y-6">
          {/* Tenant Context Information */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-2xl p-6 border shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-green-900 dark:text-green-100">
                  {currentTenant.name} - Payment Workflow
                </h2>
                <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                  Comprehensive payment processing, gateway integration, and
                  credit management for {currentTenant.type} operations
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="px-3 py-1 bg-green-100 dark:bg-green-800 rounded-full text-xs font-medium text-green-800 dark:text-green-200">
                    {userType === "franchisee"
                      ? "Franchisee Portal"
                      : "Corporate Portal"}
                  </div>
                  <div className="px-3 py-1 bg-blue-100 dark:bg-blue-800 rounded-full text-xs font-medium text-blue-800 dark:text-blue-200">
                    Multi-Gateway Integration
                  </div>
                  <div className="px-3 py-1 bg-purple-100 dark:bg-purple-800 rounded-full text-xs font-medium text-purple-800 dark:text-purple-200">
                    Auto-Reconciliation
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                    Logged in as
                  </p>
                  <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                    {currentUser.firstName} {currentUser.lastName}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    {currentUser.designation}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-green-600 to-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                  {currentUser.avatar}
                </div>
              </div>
            </div>
          </div>

          {/* Feature Overview Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Gateway Integration</h3>
                  <p className="text-xs text-muted-foreground">
                    Razorpay, PayU, UPI, NEFT, RTGS
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg
                    className="h-5 w-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Auto-Reconciliation</h3>
                  <p className="text-xs text-muted-foreground">
                    Intelligent payment matching
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <svg
                    className="h-5 w-5 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Credit Management</h3>
                  <p className="text-xs text-muted-foreground">
                    Dynamic limit tracking
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg
                    className="h-5 w-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h8v-2H4v2zM4 11h10V9H4v2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Late Payment Alerts</h3>
                  <p className="text-xs text-muted-foreground">
                    Automated notifications
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Payment Workflow Dashboard */}
          <PaymentWorkflowDashboard
            currentTab={currentTab}
            onTabChange={(tab) => navigate(`/finance/payments/${tab}`)}
            userType={userType}
            tenantId={currentTenantId}
          />
        </div>
      </PermissionProvider>
    </MainLayout>
  );
}
