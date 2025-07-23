import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { ProductCatalogDashboard } from "../components/franchisee";

const ProductCatalog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentTab = searchParams.get("tab") || "dashboard";

  const handleTabChange = (tab: string) => {
    navigate(`/product-catalog?tab=${tab}`, { replace: true });
  };

  return (
    <MainLayout>
      <ProductCatalogDashboard
        currentTab={currentTab}
        onTabChange={handleTabChange}
      />
    </MainLayout>
  );
};

export default ProductCatalog;
