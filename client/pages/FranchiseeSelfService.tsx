import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { FranchiseeSelfServicePortal } from "@/components/franchisee/FranchiseeSelfServicePortal";

export default function FranchiseeSelfService() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(tab || "dashboard");

  // Get current user info from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const franchiseeId =
    currentUser?.franchiseeId || currentUser?.tenantId || "fr_001";

  // Sync tab with URL parameter
  useEffect(() => {
    if (tab && tab !== currentTab) {
      setCurrentTab(tab);
    }
  }, [tab]);

  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
    navigate(`/franchisee-self-service/${newTab}`, { replace: true });
  };

  return (
    <MainLayout>
      <FranchiseeSelfServicePortal
        franchiseeId={franchiseeId}
        currentTab={currentTab}
        onTabChange={handleTabChange}
      />
    </MainLayout>
  );
}
