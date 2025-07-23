import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  OverviewCards,
  ModuleTabs,
  CRUDModal,
  DataTable,
  StatusBadge,
  SearchFilterToolbar,
  CommonActions,
} from "@/components/shared";
import type { MetricCard, TabConfig, Column } from "@/components/shared";
import { formatCurrency, formatPercentage } from "@/lib/formatters";
import {
  Users,
  DollarSign,
  Target,
  TrendingUp,
  Plus,
  Phone,
  Mail,
  Eye,
  Edit,
} from "lucide-react";

// Sample data interface
interface SampleItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "pending";
  revenue: number;
  progress: number;
}

export default function RefactoredSample() {
  const [items] = useState<SampleItem[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 98765 43210",
      status: "active",
      revenue: 250000,
      progress: 85,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+91 98765 43211",
      status: "pending",
      revenue: 180000,
      progress: 60,
    },
  ]);

  // Overview metrics - now just a simple config array
  const overviewMetrics: MetricCard[] = [
    {
      title: "Total Items",
      value: items.length,
      subtitle: `${items.filter((i) => i.status === "active").length} active`,
      icon: Users,
      color: "primary",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(
        items.reduce((sum, item) => sum + item.revenue, 0),
        { compact: true },
      ),
      subtitle: "This month",
      icon: DollarSign,
      color: "success",
    },
    {
      title: "Average Progress",
      value: formatPercentage(
        items.reduce((sum, item) => sum + item.progress, 0) / items.length,
      ),
      subtitle: "Completion rate",
      icon: Target,
      color: "warning",
    },
    {
      title: "Growth Rate",
      value: formatPercentage(12.5),
      subtitle: "Monthly growth",
      icon: TrendingUp,
      color: "primary",
      trend: { value: "+12.5%", isPositive: true },
    },
  ];

  // Table columns configuration
  const columns: Column<SampleItem>[] = [
    {
      key: "name",
      label: "Name",
      render: (_, item) => (
        <div>
          <div className="font-medium">{item.name}</div>
          <div className="text-sm text-muted-foreground">{item.email}</div>
        </div>
      ),
    },
    {
      key: "phone",
      label: "Contact",
      render: (_, item) => (
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          {item.phone}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (_, item) => <StatusBadge status={item.status} />,
    },
    {
      key: "revenue",
      label: "Revenue",
      render: (_, item) => formatCurrency(item.revenue, { compact: true }),
    },
    {
      key: "progress",
      label: "Progress",
      render: (_, item) => (
        <div className="space-y-1">
          <div className="text-sm font-medium">{item.progress}%</div>
          <Progress value={item.progress} className="w-20" />
        </div>
      ),
    },
    { key: "actions", label: "Actions" },
  ];

  // Tab configuration - much cleaner than before
  const tabs: TabConfig[] = [
    {
      value: "overview",
      label: "Overview",
      icon: Target,
      content: <OverviewCards metrics={overviewMetrics} />,
    },
    {
      value: "items",
      label: "Items",
      icon: Users,
      content: (
        <div className="space-y-6">
          <SearchFilterToolbar
            title="Item Management"
            subtitle="Manage all items and their details"
            searchPlaceholder="Search items..."
            primaryActions={[CommonActions.add(() => {}, "Add Item")]}
            secondaryActions={[CommonActions.export(() => {})]}
          />
          <DataTable
            data={items}
            columns={columns}
            onView={(item) => console.log("View", item)}
            onEdit={(item) => console.log("Edit", item)}
            onDelete={(item) => console.log("Delete", item)}
          />
        </div>
      ),
    },
    {
      value: "analytics",
      label: "Analytics",
      icon: TrendingUp,
      content: (
        <div className="p-8 text-center text-muted-foreground">
          Analytics content would go here
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header - simple and clean */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Refactored Sample Module
            </h2>
            <p className="text-muted-foreground">
              Demonstrating code reduction through shared components
            </p>
          </div>
          <CRUDModal
            trigger={
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            }
            title="Create New Item"
            description="Add a new item to the system"
            onSave={() => console.log("Save")}
          >
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input className="w-full p-2 border rounded" type="email" />
              </div>
            </div>
          </CRUDModal>
        </div>

        {/* Tabs - single component handles everything */}
        <ModuleTabs tabs={tabs} defaultTab="overview" />
      </div>
    </MainLayout>
  );
}
