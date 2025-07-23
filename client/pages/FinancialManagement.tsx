import { useState } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { FinancialManagementDashboard } from "@/components/financial-management/FinancialManagementDashboard";

export default function FinancialManagement() {
  const { tab } = useParams();
  const [currentTab, setCurrentTab] = useState(tab || "overview");

  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
  };

  return (
    <MainLayout>
      <FinancialManagementDashboard
        currentTab={currentTab}
        onTabChange={handleTabChange}
      />
    </MainLayout>
  );
}
