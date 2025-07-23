import { useState } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { TenantHRDashboard } from "@/components/human-resources/TenantHRDashboard";

export default function TenantHumanResources() {
  const { tab } = useParams();
  const [currentTab, setCurrentTab] = useState(tab || "overview");

  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
  };

  return (
    <MainLayout>
      <TenantHRDashboard 
        currentTab={currentTab}
        onTabChange={handleTabChange}
      />
    </MainLayout>
  );
}
