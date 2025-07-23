import { useState } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { TenantFinancialDashboard } from "@/components/financial-management/TenantFinancialDashboard";

export default function TenantFinancialManagement() {
  const { tab } = useParams();
  const [currentTab, setCurrentTab] = useState(tab || "overview");

  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
  };

  return (
    <MainLayout>
      <TenantFinancialDashboard
        currentTab={currentTab}
        onTabChange={handleTabChange}
      />
    </MainLayout>
  );
}
