import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DataTable } from "@/components/shared/DataTable";
import {
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
  Filter,
  Download,
  RefreshCw,
  Package,
  TrendingUp,
  TrendingDown,
  Activity,
  Warehouse,
  Search,
  Eye,
  MoreHorizontal,
  ArrowRightLeft,
  Settings,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { generateInventoryMovements } from "./data";
import { InventoryMovementRecord, InventoryMovementType } from "./types";

interface InventoryMovementTrackerProps {
  tenantId: string;
  userType: string;
}

export function InventoryMovementTracker({
  tenantId,
  userType,
}: InventoryMovementTrackerProps) {
  const [filters, setFilters] = useState({
    dateRange: {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
    },
    movementType: "",
    transactionType: "",
    category: "",
    warehouseId: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");

  // Generate mock data
  const movements = useMemo(
    () => generateInventoryMovements(tenantId, userType),
    [tenantId, userType],
  );

  // Filter movements based on current filters and search
  const filteredMovements = useMemo(() => {
    return movements.filter((movement) => {
      // Date range filter
      const movementDate = new Date(movement.performedAt);
      const startDate = new Date(filters.dateRange.startDate);
      const endDate = new Date(filters.dateRange.endDate);

      if (movementDate < startDate || movementDate > endDate) return false;

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          movement.itemCode.toLowerCase().includes(searchLower) ||
          movement.itemName.toLowerCase().includes(searchLower) ||
          movement.category.toLowerCase().includes(searchLower) ||
          movement.warehouseName.toLowerCase().includes(searchLower) ||
          movement.referenceNumber?.toLowerCase().includes(searchLower)
        );
      }

      // Movement type filter
      if (
        filters.movementType &&
        filters.movementType !== "all" &&
        movement.movementType !== filters.movementType
      ) {
        return false;
      }

      // Transaction type filter
      if (
        filters.transactionType &&
        filters.transactionType !== "all" &&
        movement.transactionType !== filters.transactionType
      ) {
        return false;
      }

      // Category filter
      if (
        filters.category &&
        filters.category !== "all" &&
        movement.category !== filters.category
      ) {
        return false;
      }

      // Warehouse filter
      if (
        filters.warehouseId &&
        filters.warehouseId !== "all" &&
        movement.warehouseId !== filters.warehouseId
      ) {
        return false;
      }

      return true;
    });
  }, [movements, filters, searchTerm]);

  // Calculate summary metrics
  const summaryMetrics = useMemo(() => {
    const total = filteredMovements.length;
    const totalValue = filteredMovements.reduce(
      (sum, movement) => sum + Math.abs(movement.totalCost),
      0,
    );
    const inMovements = filteredMovements.filter(
      (m) => m.transactionType === "in",
    ).length;
    const outMovements = filteredMovements.filter(
      (m) => m.transactionType === "out",
    ).length;
    const adjustments = filteredMovements.filter(
      (m) => m.transactionType === "adjustment",
    ).length;

    const inValue = filteredMovements
      .filter((m) => m.transactionType === "in")
      .reduce((sum, m) => sum + m.totalCost, 0);
    const outValue = filteredMovements
      .filter((m) => m.transactionType === "out")
      .reduce((sum, m) => sum + Math.abs(m.totalCost), 0);

    return {
      total,
      totalValue,
      inMovements,
      outMovements,
      adjustments,
      inValue,
      outValue,
      netValue: inValue - outValue,
    };
  }, [filteredMovements]);

  const getMovementIcon = (transactionType: string, movementType: string) => {
    if (transactionType === "in") {
      return <ArrowDown className="h-4 w-4 text-green-500" />;
    } else if (transactionType === "out") {
      return <ArrowUp className="h-4 w-4 text-red-500" />;
    } else {
      return <Settings className="h-4 w-4 text-blue-500" />;
    }
  };

  const getMovementBadgeColor = (movementType: InventoryMovementType) => {
    const typeColors: Record<string, string> = {
      purchase_receipt: "bg-green-100 text-green-800 border-green-200",
      sales_shipment: "bg-blue-100 text-blue-800 border-blue-200",
      transfer_in: "bg-purple-100 text-purple-800 border-purple-200",
      transfer_out: "bg-purple-100 text-purple-800 border-purple-200",
      adjustment_in: "bg-yellow-100 text-yellow-800 border-yellow-200",
      adjustment_out: "bg-red-100 text-red-800 border-red-200",
      production_in: "bg-indigo-100 text-indigo-800 border-indigo-200",
      production_out: "bg-indigo-100 text-indigo-800 border-indigo-200",
      return_in: "bg-orange-100 text-orange-800 border-orange-200",
      return_out: "bg-orange-100 text-orange-800 border-orange-200",
      damage: "bg-red-100 text-red-800 border-red-200",
      cycle_count: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return (
      typeColors[movementType] || "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const movementTableColumns = [
    {
      key: "itemCode",
      label: "Item Code",
      sortable: true,
      render: (record: InventoryMovementRecord) => (
        <div>
          <div className="font-medium text-blue-600">{record.itemCode}</div>
          <div className="text-xs text-gray-500">{record.sku}</div>
        </div>
      ),
    },
    {
      key: "itemName",
      label: "Item Name",
      sortable: true,
      render: (record: InventoryMovementRecord) => (
        <div>
          <div className="font-medium">{record.itemName}</div>
          <div className="text-xs text-gray-500">{record.category}</div>
        </div>
      ),
    },
    {
      key: "movementType",
      label: "Movement Type",
      sortable: true,
      render: (record: InventoryMovementRecord) => (
        <div className="flex items-center gap-2">
          {getMovementIcon(record.transactionType, record.movementType)}
          <Badge className={getMovementBadgeColor(record.movementType)}>
            {record.movementType.replace("_", " ")}
          </Badge>
        </div>
      ),
    },
    {
      key: "quantity",
      label: "Quantity",
      sortable: true,
      render: (record: InventoryMovementRecord) => (
        <div className="text-right">
          <div
            className={`font-medium ${
              record.transactionType === "in"
                ? "text-green-600"
                : record.transactionType === "out"
                  ? "text-red-600"
                  : "text-blue-600"
            }`}
          >
            {record.transactionType === "out"
              ? "-"
              : record.transactionType === "in"
                ? "+"
                : "±"}
            {record.quantity} {record.unit}
          </div>
        </div>
      ),
    },
    {
      key: "location",
      label: "Location",
      render: (record: InventoryMovementRecord) => (
        <div>
          <div className="font-medium">{record.warehouseName}</div>
          {record.fromLocationName && record.toLocationName ? (
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <span>{record.fromLocationName}</span>
              <ArrowRightLeft className="h-3 w-3" />
              <span>{record.toLocationName}</span>
            </div>
          ) : (
            <div className="text-xs text-gray-500">
              {record.fromLocationName || record.toLocationName || "N/A"}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "cost",
      label: "Cost",
      sortable: true,
      render: (record: InventoryMovementRecord) => (
        <div className="text-right">
          <div className="font-medium">
            {formatCurrency(Math.abs(record.totalCost))}
          </div>
          <div className="text-xs text-gray-500">
            {formatCurrency(record.unitCost)}/unit
          </div>
        </div>
      ),
    },
    {
      key: "stock",
      label: "Stock Level",
      render: (record: InventoryMovementRecord) => (
        <div className="text-center">
          <div className="text-xs text-gray-500">
            Before: {record.stockBefore}
          </div>
          <div className="font-medium">After: {record.stockAfter}</div>
          <div className="text-xs text-green-600">
            Available: {record.availableStock}
          </div>
        </div>
      ),
    },
    {
      key: "reference",
      label: "Reference",
      render: (record: InventoryMovementRecord) => (
        <div>
          {record.referenceNumber ? (
            <div>
              <div className="font-medium text-blue-600">
                {record.referenceNumber}
              </div>
              <div className="text-xs text-gray-500 capitalize">
                {record.referenceType?.replace("_", " ")}
              </div>
            </div>
          ) : (
            <span className="text-gray-400">Manual</span>
          )}
        </div>
      ),
    },
    {
      key: "timestamp",
      label: "Date & Time",
      sortable: true,
      render: (record: InventoryMovementRecord) => (
        <div>
          <div className="font-medium">
            {new Date(record.performedAt).toLocaleDateString("en-IN")}
          </div>
          <div className="text-xs text-gray-500">
            {new Date(record.performedAt).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (record: InventoryMovementRecord) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  // Group movements by category for category view
  const movementsByCategory = useMemo(() => {
    const grouped = filteredMovements.reduce(
      (acc, movement) => {
        if (!acc[movement.category]) {
          acc[movement.category] = [];
        }
        acc[movement.category].push(movement);
        return acc;
      },
      {} as Record<string, InventoryMovementRecord[]>,
    );

    return Object.entries(grouped).map(([category, movements]) => ({
      category,
      movements,
      totalMovements: movements.length,
      totalValue: movements.reduce((sum, m) => sum + Math.abs(m.totalCost), 0),
      inMovements: movements.filter((m) => m.transactionType === "in").length,
      outMovements: movements.filter((m) => m.transactionType === "out").length,
    }));
  }, [filteredMovements]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Inventory Movement Tracker
          </h2>
          <p className="text-muted-foreground">
            Track all inventory movements and stock changes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Movements
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryMetrics.total}</div>
            <p className="text-xs text-muted-foreground">
              {summaryMetrics.inMovements} in, {summaryMetrics.outMovements} out
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Movement Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summaryMetrics.totalValue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Net: {formatCurrency(summaryMetrics.netValue)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock In</CardTitle>
            <ArrowDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {summaryMetrics.inMovements}
            </div>
            <p className="text-xs text-muted-foreground">
              Value: {formatCurrency(summaryMetrics.inValue)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Out</CardTitle>
            <ArrowUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {summaryMetrics.outMovements}
            </div>
            <p className="text-xs text-muted-foreground">
              Value: {formatCurrency(summaryMetrics.outValue)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Movement Type</label>
              <Select
                value={filters.movementType}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, movementType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All movements" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Movements</SelectItem>
                  <SelectItem value="purchase_receipt">
                    Purchase Receipt
                  </SelectItem>
                  <SelectItem value="sales_shipment">Sales Shipment</SelectItem>
                  <SelectItem value="transfer_in">Transfer In</SelectItem>
                  <SelectItem value="transfer_out">Transfer Out</SelectItem>
                  <SelectItem value="adjustment_in">Adjustment In</SelectItem>
                  <SelectItem value="adjustment_out">Adjustment Out</SelectItem>
                  <SelectItem value="cycle_count">Cycle Count</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Transaction Type</label>
              <Select
                value={filters.transactionType}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, transactionType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All transactions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="in">Stock In</SelectItem>
                  <SelectItem value="out">Stock Out</SelectItem>
                  <SelectItem value="adjustment">Adjustments</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <DateRangePicker
                value={{
                  from: new Date(filters.dateRange.startDate),
                  to: new Date(filters.dateRange.endDate),
                }}
                onChange={(range) => {
                  if (range?.from && range?.to) {
                    setFilters((prev) => ({
                      ...prev,
                      dateRange: {
                        startDate: range.from.toISOString().split("T")[0],
                        endDate: range.to.toISOString().split("T")[0],
                      },
                    }));
                  }
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed View</TabsTrigger>
          <TabsTrigger value="category">By Category</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Movements</CardTitle>
              <CardDescription>
                Latest inventory movements (
                {filteredMovements.slice(0, 10).length} of{" "}
                {filteredMovements.length})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredMovements.slice(0, 10)}
                columns={movementTableColumns.slice(0, 7)} // Show fewer columns in overview
                searchable={false}
                pagination={{
                  pageSize: 10,
                  showSizeSelector: false,
                }}
              />
              {filteredMovements.length > 10 && (
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedTab("detailed")}
                  >
                    View All {filteredMovements.length} Movements
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Inventory Movements</CardTitle>
              <CardDescription>
                Complete view of all inventory movements (
                {filteredMovements.length} movements)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredMovements}
                columns={movementTableColumns}
                searchable={true}
                pagination={{
                  pageSize: 20,
                  showSizeSelector: true,
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="category" className="space-y-4">
          <div className="grid gap-4">
            {movementsByCategory.map((categoryData) => (
              <Card key={categoryData.category}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      {categoryData.category}
                    </CardTitle>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">
                        {categoryData.totalMovements} movements
                      </Badge>
                      <Badge variant="outline">
                        {formatCurrency(categoryData.totalValue)}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>
                    {categoryData.inMovements} in, {categoryData.outMovements}{" "}
                    out
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    data={categoryData.movements.slice(0, 5)}
                    columns={movementTableColumns.slice(0, 6)}
                    searchable={false}
                    pagination={{
                      pageSize: 5,
                      showSizeSelector: false,
                    }}
                  />
                  {categoryData.movements.length > 5 && (
                    <div className="mt-4 text-center">
                      <Button variant="outline" size="sm">
                        View All {categoryData.movements.length} Movements
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
