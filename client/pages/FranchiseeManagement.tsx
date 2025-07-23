import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { FranchiseeDashboard } from "@/components/franchisee/FranchiseeDashboard";

export default function FranchiseeManagement() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(tab || "overview");

  // Sync tab with URL parameter
  useEffect(() => {
    if (tab && tab !== currentTab) {
      setCurrentTab(tab);
    }
  }, [tab]);

  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
    navigate(`/franchisee-management/${newTab}`, { replace: true });
  };

  return (
    <MainLayout>
      <FranchiseeDashboard
        currentTab={currentTab}
        onTabChange={handleTabChange}
      />
    </MainLayout>
  );
}
