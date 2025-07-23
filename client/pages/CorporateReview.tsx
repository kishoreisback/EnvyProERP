import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { CorporateReviewDashboard } from "@/components/franchisee/CorporateReviewDashboard";

export default function CorporateReview() {
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
    navigate(`/corporate-review/${newTab}`, { replace: true });
  };

  return (
    <MainLayout>
      <CorporateReviewDashboard
        currentTab={currentTab}
        onTabChange={handleTabChange}
      />
    </MainLayout>
  );
}
