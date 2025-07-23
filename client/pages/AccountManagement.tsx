import React from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { AccountDashboard } from "../components/account";

export default function AccountManagement() {
  return (
    <MainLayout>
      <AccountDashboard />
    </MainLayout>
  );
}
