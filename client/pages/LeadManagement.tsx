import React from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { LeadManagement as LeadManagementComponent } from "../components/crm/lead";

export default function LeadManagement() {
  return (
    <MainLayout>
      <LeadManagementComponent />
    </MainLayout>
  );
}
