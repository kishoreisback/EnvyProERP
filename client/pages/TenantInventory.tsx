import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  PermissionProvider,
  usePermissions,
} from "@/components/user-management/PermissionProvider";
import { TenantUser } from "@/components/user-management/types";
import { TenantInventoryDashboard } from "@/components/inventory/TenantInventoryDashboard";
import { inventoryAvailableTenants } from "@/components/inventory/data";
import { BackToHRMS } from "@/components/hrms";

// Create a tenant user for demonstration
const createTenantUser = (tenantId: string): TenantUser => {
  const tenant = inventoryAvailableTenants.find(t => t.id === tenantId);
  
  return {
    id: `user_${tenantId}_001`,
    email: `user@${tenant?.name.toLowerCase().replace(/\s+/g, '')}.com`,
    firstName: "John",
    lastName: "Manager",
    role: "tenant_admin",
    tenantId: tenantId,
    department: "Operations",
    roleId: "tenant_admin",
    permissions: [
      "inventory.view",
      "inventory.create",
      "inventory.edit",
      "inventory.delete",
      "suppliers.manage",
      "warehouses.manage",
      "reports.generate"
    ],
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: "2024-01-01T00:00:00Z",
    profile: {
      bio: `Inventory Manager at ${tenant?.name}`,
      skills: ["Inventory Management", "Supply Chain", "Operations"],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${tenant?.name}`,
      phone: "+91-9876543210",
      location: tenant?.location || "Mumbai, India",
      joinDate: "2024-01-01",
      department: "Operations",
      designation: "Inventory Manager",
      employeeId: `EMP-${tenantId}-001`,
      reportingManager: "Operations Head",
      workLocation: "Office",
      workType: "Full-time"
    }
  };
};

const TenantInventoryContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tab } = useParams();
  const [currentTab, setCurrentTab] = useState(tab || 'overview');
  const [selectedTenant, setSelectedTenant] = useState<string>('tenant_build_001');
  
  // Get tenant from URL or localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tenantFromUrl = urlParams.get('tenant');
    
    if (tenantFromUrl) {
      setSelectedTenant(tenantFromUrl);
    } else {
      const savedTenant = localStorage.getItem('selectedInventoryTenant');
      if (savedTenant) {
        setSelectedTenant(savedTenant);
      }
    }
  }, [location]);

  // Save selected tenant
  useEffect(() => {
    localStorage.setItem('selectedInventoryTenant', selectedTenant);
  }, [selectedTenant]);

  // Handle tab changes
  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
    navigate(`/inventory/tenant/${newTab}?tenant=${selectedTenant}`, { replace: true });
  };

  // Auto-redirect to overview if no tab specified
  useEffect(() => {
    if (
      location.pathname === "/inventory/tenant" ||
      location.pathname === "/inventory/tenant/"
    ) {
      navigate("/inventory/tenant/overview", { replace: true });
    }
  }, [location, navigate]);

  return (
    <TenantInventoryDashboard
      tenantId={selectedTenant}
      currentTab={currentTab}
      onTabChange={handleTabChange}
    />
  );
};

export default function TenantInventory() {
  const [selectedTenant, setSelectedTenant] = useState<string>('tenant_build_001');
  
  // Get current user - in a real app, this would come from auth context
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const userForProvider = currentUser || createTenantUser(selectedTenant);

  return (
    <PermissionProvider
      user={userForProvider}
      tenantId={userForProvider?.tenantId || selectedTenant}
    >
      <MainLayout>
        <div className="space-y-6">
          {/* Back Navigation */}
          <BackToHRMS />

          {/* Main Content */}
          <TenantInventoryContent />
        </div>
      </MainLayout>
    </PermissionProvider>
  );
}
