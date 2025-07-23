import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { InvoiceGenerationDashboard } from "@/components/finance/InvoiceGenerationDashboard";

export function InvoiceManagement() {
  const { tab, userType } = useParams();
  const navigate = useNavigate();
  const currentTab = tab || "overview";
  const currentUserType =
    (userType as "corporate" | "franchisee") || "corporate";

  const handleTabChange = (newTab: string) => {
    navigate(`/invoice-management/${currentUserType}/${newTab}`, {
      replace: true,
    });
  };

  // Get user context - in real app, this would come from auth context
  const tenantId = "tenant_001";

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <InvoiceGenerationDashboard
          userType={currentUserType}
          tenantId={tenantId}
          currentTab={currentTab}
          onTabChange={handleTabChange}
        />
      </div>
    </MainLayout>
  );
}

export default InvoiceManagement;
