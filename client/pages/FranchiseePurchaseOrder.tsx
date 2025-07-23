import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { FranchiseePurchaseOrderDashboard } from "@/components/franchisee";

export default function FranchiseePurchaseOrder() {
  const { tab } = useParams();
  const navigate = useNavigate();

  const currentTab = tab || "dashboard";

  const setCurrentTab = (newTab: string) => {
    navigate(`/franchisee-purchase-order/${newTab}`, { replace: true });
  };

  return (
    <MainLayout>
      <FranchiseePurchaseOrderDashboard
        activeTab={currentTab}
        onTabChange={setCurrentTab}
      />
    </MainLayout>
  );
}
