import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeliverySchedulingDashboard } from "@/components/franchisee/DeliverySchedulingDashboard";
import { GRNManagementDashboard } from "@/components/franchisee/GRNManagementDashboard";

export function DeliveryLogistics() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const currentTab = tab || "delivery";

  const setCurrentTab = (newTab: string) => {
    navigate(`/delivery-logistics/${newTab}`, { replace: true });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Delivery & Logistics Management
            </h1>
            <p className="text-muted-foreground">
              Manage delivery scheduling, track shipments, and process goods
              receipt notes
            </p>
          </div>
        </div>

        <Tabs
          value={currentTab}
          onValueChange={setCurrentTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="delivery">
              Delivery Scheduling & Tracking
            </TabsTrigger>
            <TabsTrigger value="grn">GRN Management</TabsTrigger>
          </TabsList>

          <TabsContent value="delivery">
            <DeliverySchedulingDashboard />
          </TabsContent>

          <TabsContent value="grn">
            <GRNManagementDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
