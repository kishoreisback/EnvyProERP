import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { PermissionProvider } from "../components/user-management/PermissionProvider";
import { TenantHRMSDashboard } from "../components/hrms/TenantHRMSDashboard";
import { TenantUser } from "../components/user-management/types";
import { hrmsAvailableTenants } from "../components/hrms/constants";

export default function TenantHRMS() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tab } = useParams<{ tab: string }>();

  // Get tenant ID from URL search params or default to first tenant
  const searchParams = new URLSearchParams(location.search);
  const tenantIdFromUrl = searchParams.get("tenant");
  const initialTenant =
    tenantIdFromUrl &&
    hrmsAvailableTenants.find((t) => t.id === tenantIdFromUrl)
      ? tenantIdFromUrl
      : hrmsAvailableTenants[0].id;

  // State for current tenant (can be changed for demo purposes)
  const [currentTenantId] = useState(initialTenant);

  // Use tab from params or default to overview
  const currentTab = tab || "overview";

  // Redirect to default tab if no tab is specified
  useEffect(() => {
    if (
      location.pathname === "/hrms/tenant" ||
      location.pathname === "/hrms/tenant/"
    ) {
      navigate("/hrms/tenant/overview", { replace: true });
    }
  }, [location.pathname, navigate]);

  // Get current tenant info
  const currentTenant = hrmsAvailableTenants.find(
    (t) => t.id === currentTenantId,
  );

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
    id: currentTenant.hrAdmin?.id || "hr_admin_001",
    tenantId: currentTenant.hrAdmin?.tenantId || currentTenantId,
    username: currentTenant.hrAdmin?.username || "hr.admin",
    email: currentTenant.hrAdmin?.email || "hr@company.com",
    firstName: currentTenant.hrAdmin?.firstName || "HR",
    lastName: currentTenant.hrAdmin?.lastName || "Admin",
    phone: "+91-9876543210",
    avatar: `${currentTenant.hrAdmin?.firstName?.[0] || "H"}${currentTenant.hrAdmin?.lastName?.[0] || "A"}`,
    employeeId: "HR001",
    designation: "HR Administrator",
    department: "Human Resources",
    location: "Head Office",
    roleId: "role_hr_admin",
    permissions: [
      "employees.*",
      "attendance.*",
      "leave.*",
      "payroll.*",
      "recruitment.*",
      "performance.*",
      "analytics.*",
    ], // Full HRMS access for demo
    customPermissions: [],
    status: "active",
    emailVerified: true,
    phoneVerified: true,
    mfaEnabled: true,
    lastLogin: new Date().toISOString(),
    tenantRole: currentTenant.hrAdmin?.tenantRole || "admin",
    joinedAt: "2024-01-01T00:00:00Z",
    invitedBy: "system",
    profile: {
      bio: "HRMS System Administrator",
      skills: [
        "HR Management",
        "Payroll Processing",
        "Employee Relations",
        "Performance Management",
      ],
      certifications: ["HRMS Certification", "Payroll Management"],
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
                  {currentTenant.name} - HRMS Dashboard
                </h2>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  Tenant-driven human resource management for{" "}
                  {currentTenant.type} business
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

          {/* Main Tenant HRMS Dashboard */}
          <TenantHRMSDashboard
            currentTab={currentTab}
            onTabChange={(tab) => navigate(`/hrms/tenant/${tab}`)}
          />
        </div>
      </PermissionProvider>
    </MainLayout>
  );
}
