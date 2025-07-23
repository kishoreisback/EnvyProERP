import React from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { CommunicationDashboard } from "../components/crm/communication";

export default function CRMCommunication() {
  return (
    <MainLayout>
      <CommunicationDashboard />
    </MainLayout>
  );
}
