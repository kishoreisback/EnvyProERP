import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { PermissionProvider } from "../components/user-management/PermissionProvider";
import { UserManagementDashboard } from "../components/user-management/UserManagementDashboard";
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

export default function UserManagement() {
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
      location.pathname === "/user-management" ||
      location.pathname === "/user-management/"
    ) {
      navigate("/user-management/overview", { replace: true });
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
      skills: ["Administration", "Security", "User Management"],
      certifications: ["Admin Certification"],
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
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                  {currentTenant.name} - User Management
                </h2>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  Managing users and roles for {currentTenant.type} organization
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-blue-600 dark:text-blue-400">
                  Logged in as: {currentUser.firstName} {currentUser.lastName}
                </span>
                <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                  {currentUser.avatar}
                </div>
              </div>
            </div>
          </div>

          {/* Main User Management Dashboard */}
          <UserManagementDashboard
            currentTab={currentTab}
            onTabChange={(tab) => navigate(`/user-management/${tab}`)}
          />
        </div>
      </PermissionProvider>
    </MainLayout>
  );
}
