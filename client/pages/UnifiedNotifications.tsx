import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { UnifiedNotificationDashboard } from "@/components/notifications/UnifiedNotificationDashboard";

export function UnifiedNotifications() {
  const { tab, userType } = useParams();
  const navigate = useNavigate();
  const currentTab = tab || "inbox";
  const currentUserType =
    (userType as "corporate" | "franchisee") || "franchisee";

  const handleTabChange = (newTab: string) => {
    navigate(`/unified-notifications/${currentUserType}/${newTab}`, {
      replace: true,
    });
  };

  // Get user context - in real app, this would come from auth context
  const userId = "current-user";
  const tenantId = "tenant_001";

  // Determine feature availability based on user type
  const showTenantSwitcher = currentUserType === "corporate";
  const showWorkflowFeatures = true;
  const showTemplateManagement = true;
  const showAdvancedAnalytics = currentUserType === "corporate";

  const businessContext = {
    poIntegration: true,
    deliveryIntegration: true,
    grnIntegration: true,
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <UnifiedNotificationDashboard
          userType={currentUserType}
          tenantId={tenantId}
          userId={userId}
          activeTab={currentTab}
          onTabChange={handleTabChange}
          showTenantSwitcher={showTenantSwitcher}
          showWorkflowFeatures={showWorkflowFeatures}
          showTemplateManagement={showTemplateManagement}
          showAdvancedAnalytics={showAdvancedAnalytics}
          businessContext={businessContext}
        />
      </div>
    </MainLayout>
  );
}

export default UnifiedNotifications;
