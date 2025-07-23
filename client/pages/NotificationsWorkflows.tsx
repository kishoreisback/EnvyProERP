import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { PermissionProvider } from "../components/user-management/PermissionProvider";
import { NotificationWorkflowDashboard } from "../components/notifications/NotificationWorkflowDashboard";
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

export default function NotificationsWorkflows() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tab } = useParams<{ tab: string }>();

  // State for current tenant (can be changed for demo purposes)
  const [currentTenantId] = useState("tenant_001");

  // Use tab from params or default to overview
  const currentTab = tab || "overview";

  // Redirect to default tab if no tab is specified
  useEffect(() => {
    if (
      location.pathname === "/notifications-workflows" ||
      location.pathname === "/notifications-workflows/"
    ) {
      navigate("/notifications-workflows/overview", { replace: true });
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
    designation: "System Administrator",
    department: "Administration",
    location: "Head Office",
    roleId: "role_admin",
    permissions: ["*"], // Full admin access for demo
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
      bio: "System Administrator",
      skills: ["Administration", "Security", "Notifications", "Workflows"],
      certifications: ["Admin Certification", "Workflow Management"],
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
          {/* Tenant Context Information - Matching Purchase Order Style */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 rounded-2xl p-6 border shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-purple-900 dark:text-purple-100">
                  {currentTenant.name} - Notifications & Workflows
                </h2>
                <p className="text-purple-700 dark:text-purple-300 text-sm mt-1">
                  Managing notifications and automated workflows for{" "}
                  {currentTenant.type} operations
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="px-3 py-1 bg-purple-100 dark:bg-purple-800 rounded-full text-xs font-medium text-purple-800 dark:text-purple-200">
                    {currentTenant.type} Operations
                  </div>
                  <div className="px-3 py-1 bg-blue-100 dark:bg-blue-800 rounded-full text-xs font-medium text-blue-800 dark:text-blue-200">
                    Multi-Tenant System
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                    Logged in as
                  </p>
                  <p className="text-sm font-semibold text-purple-900 dark:text-purple-100">
                    {currentUser.firstName} {currentUser.lastName}
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400">
                    {currentUser.designation}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                  {currentUser.avatar}
                </div>
              </div>
            </div>
          </div>

          {/* Main Notification & Workflow Dashboard */}
          <NotificationWorkflowDashboard
            currentTab={currentTab}
            onTabChange={(tab) => navigate(`/notifications-workflows/${tab}`)}
          />
        </div>
      </PermissionProvider>
    </MainLayout>
  );
}
