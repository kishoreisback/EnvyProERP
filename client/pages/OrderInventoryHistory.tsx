import React from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { OrderInventoryHistoryDashboard } from "@/components/history";

export default function OrderInventoryHistory() {
  const { tab } = useParams();

  // Get current user info (in a real app, this would come from auth context)
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const tenantId = currentUser.tenantId || "tenant-1";
  const userType = currentUser.role || "admin";

  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        <OrderInventoryHistoryDashboard
          tenantId={tenantId}
          userType={userType}
        />
      </div>
    </MainLayout>
  );
}
