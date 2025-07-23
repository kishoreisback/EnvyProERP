import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { CorporatePOReviewDashboard } from "@/components/franchisee/CorporatePOReviewDashboard";

export function CorporatePOReview() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const currentTab = tab || "pending";

  const setCurrentTab = (newTab: string) => {
    navigate(`/corporate-po-review/${newTab}`, { replace: true });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Corporate PO Review & Fulfillment
            </h1>
            <p className="text-muted-foreground">
              Review, evaluate, and fulfill purchase orders from franchisees
            </p>
          </div>
        </div>

        <CorporatePOReviewDashboard
          activeTab={currentTab}
          onTabChange={setCurrentTab}
        />
      </div>
    </MainLayout>
  );
}
