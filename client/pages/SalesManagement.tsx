import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { SalesManagementDashboard } from "@/components/sales/SalesManagementDashboard";

export default function SalesManagement() {
  const { tab } = useParams();
  const [currentTab, setCurrentTab] = useState(tab || "overview");

  // Sync state with URL parameter changes
  useEffect(() => {
    setCurrentTab(tab || "overview");
  }, [tab]);

  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
    // Update URL without navigation
    window.history.replaceState(null, "", `/sales-management/${newTab}`);
  };

  return (
    <MainLayout>
      <SalesManagementDashboard
        currentTab={currentTab}
        onTabChange={handleTabChange}
      />
    </MainLayout>
  );
}
