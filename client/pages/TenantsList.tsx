import React from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { TenantsList } from "../components/account/TenantsList";

export default function TenantsListPage() {
  return (
    <MainLayout>
      <TenantsList />
    </MainLayout>
  );
}
