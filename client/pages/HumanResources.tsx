import { useState } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { HumanResourcesDashboard } from "@/components/human-resources/HumanResourcesDashboard";

export default function HumanResources() {
  const { tab } = useParams();
  const [currentTab, setCurrentTab] = useState(tab || "overview");

  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
  };

  return (
    <MainLayout>
      <HumanResourcesDashboard 
        currentTab={currentTab}
        onTabChange={handleTabChange}
      />
    </MainLayout>
  );
}
