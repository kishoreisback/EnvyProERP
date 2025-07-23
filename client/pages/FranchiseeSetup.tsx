import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { FranchiseeSetupDashboard } from "@/components/franchisee/FranchiseeSetupDashboard";

export default function FranchiseeSetup() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(tab || "dashboard");

  // Sync tab with URL parameter
  useEffect(() => {
    if (tab && tab !== currentTab) {
      setCurrentTab(tab);
    }
  }, [tab]);

  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
    navigate(`/franchisee-setup/${newTab}`, { replace: true });
  };

  return (
    <MainLayout>
      <FranchiseeSetupDashboard
        currentTab={currentTab}
        onTabChange={handleTabChange}
      />
    </MainLayout>
  );
}
