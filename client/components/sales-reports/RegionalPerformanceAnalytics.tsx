import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/DataTable";
import {
  MapPin,
  TrendingUp,
  TrendingDown,
  Users,
  Building,
  Target,
  Award,
  AlertTriangle,
  Search,
  Eye,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  generateSalesPerformanceMetrics,
  generateFranchiseePerformance,
} from "./data";
import { RegionalPerformance, FranchiseePerformance } from "./types";

interface RegionalPerformanceAnalyticsProps {
  tenantId: string;
  userType: "corporate" | "regional_manager";
}

export function RegionalPerformanceAnalytics({
  tenantId,
  userType,
}: RegionalPerformanceAnalyticsProps) {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [searchTerm, setSearchTerm] = useState("");

  // Generate performance data
  const salesData = useMemo(
    () => generateSalesPerformanceMetrics(tenantId, userType),
    [tenantId, userType],
  );
  const franchiseeData = useMemo(
    () => generateFranchiseePerformance(tenantId, userType),
    [tenantId, userType],
  );

  // Filter data based on selected region
  const filteredFranchisees = useMemo(() => {
    let filtered = franchiseeData;

    if (selectedRegion !== "all") {
      filtered = filtered.filter((f) => f.regionId === selectedRegion);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (f) =>
          f.franchiseeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.state.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filtered;
  }, [franchiseeData, selectedRegion, searchTerm]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getPerformanceColor = (rating: string) => {
    switch (rating) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-200";
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "average":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "poor":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTrendIcon = (growth: number) => {
    if (growth > 0) return <ArrowUpRight className="h-4 w-4 text-green-500" />;
    if (growth < 0) return <ArrowDownRight className="h-4 w-4 text-red-500" />;
    return <div className="h-4 w-4" />;
  };

  const getTargetAchievementBadge = (achievement: number) => {
    if (achievement >= 110)
      return <Badge className="bg-green-500">Exceeded</Badge>;
    if (achievement >= 100)
      return <Badge className="bg-blue-500">Achieved</Badge>;
    if (achievement >= 90) return <Badge variant="outline">On Track</Badge>;
    if (achievement >= 80)
      return <Badge className="bg-yellow-500">At Risk</Badge>;
    return <Badge className="bg-red-500">Behind</Badge>;
  };

  const regionalTableColumns = [
    {
      key: "rank",
      label: "Rank",
      render: (record: RegionalPerformance, index: number) => (
        <div className="text-center font-bold text-lg text-blue-600">
          #{index + 1}
        </div>
      ),
    },
    {
      key: "region",
      label: "Region",
      render: (record: RegionalPerformance) => (
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-blue-500" />
          <div>
            <div className="font-medium">{record.regionName}</div>
            <div className="text-sm text-gray-500">{record.state}</div>
          </div>
        </div>
      ),
    },
    {
      key: "franchisees",
      label: "Franchisees",
      render: (record: RegionalPerformance) => (
        <div className="text-center">
          <div className="font-medium">{record.franchiseeCount}</div>
          <div className="text-xs text-gray-500">Active</div>
        </div>
      ),
    },
    {
      key: "revenue",
      label: "Revenue",
      render: (record: RegionalPerformance) => (
        <div>
          <div className="font-medium">
            {formatCurrency(record.totalRevenue)}
          </div>
          <div className="flex items-center gap-1">
            {getTrendIcon(record.growth)}
            <span
              className={`text-xs ${record.growth > 0 ? "text-green-600" : record.growth < 0 ? "text-red-600" : "text-gray-600"}`}
            >
              {formatPercentage(record.growth)}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "target",
      label: "Target Achievement",
      render: (record: RegionalPerformance) => (
        <div>
          <div className="text-sm text-gray-500">
            Target: {formatCurrency(record.target)}
          </div>
          {getTargetAchievementBadge(record.achievement)}
          <div className="text-xs text-gray-500 mt-1">
            {formatPercentage(record.achievement)}
          </div>
        </div>
      ),
    },
    {
      key: "avgRevenue",
      label: "Avg per Franchisee",
      render: (record: RegionalPerformance) => (
        <div className="text-right">
          <div className="font-medium">
            {formatCurrency(record.averageRevenuePerFranchisee)}
          </div>
          <div className="text-xs text-gray-500">per franchisee</div>
        </div>
      ),
    },
    {
      key: "topPerformer",
      label: "Top Performer",
      render: (record: RegionalPerformance) => (
        <div>
          <div className="font-medium text-sm">{record.topFranchisee.name}</div>
          <div className="text-xs text-gray-500">
            {formatCurrency(record.topFranchisee.revenue)}
          </div>
        </div>
      ),
    },
    {
      key: "penetration",
      label: "Market Penetration",
      render: (record: RegionalPerformance) => (
        <div className="text-center">
          <div className="font-medium">
            {formatPercentage(record.marketPenetration)}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${record.marketPenetration}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (record: RegionalPerformance) => (
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

  const franchiseeTableColumns = [
    {
      key: "rank",
      label: "Rank",
      render: (record: FranchiseePerformance) => (
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">#{record.rank}</div>
          <div className="text-xs text-gray-500">
            of {record.totalFranchisees}
          </div>
        </div>
      ),
    },
    {
      key: "franchisee",
      label: "Franchisee",
      render: (record: FranchiseePerformance) => (
        <div className="flex items-center gap-3">
          <Building className="h-5 w-5 text-blue-500" />
          <div>
            <div className="font-medium">{record.franchiseeName}</div>
            <div className="text-sm text-gray-500">
              {record.city}, {record.state}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "performance",
      label: "Performance",
      render: (record: FranchiseePerformance) => (
        <div className="flex items-center gap-2">
          <Badge className={getPerformanceColor(record.performanceRating)}>
            {record.performanceRating}
          </Badge>
          {record.hasLowPerformanceAlert && (
            <AlertTriangle className="h-4 w-4 text-red-500" />
          )}
        </div>
      ),
    },
    {
      key: "revenue",
      label: "Revenue",
      render: (record: FranchiseePerformance) => (
        <div>
          <div className="font-medium">{formatCurrency(record.revenue)}</div>
          <div className="flex items-center gap-1">
            {getTrendIcon(record.revenueGrowth)}
            <span
              className={`text-xs ${record.revenueGrowth > 0 ? "text-green-600" : record.revenueGrowth < 0 ? "text-red-600" : "text-gray-600"}`}
            >
              {formatPercentage(record.revenueGrowth)}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "target",
      label: "Target Achievement",
      render: (record: FranchiseePerformance) => (
        <div>
          {getTargetAchievementBadge(record.revenueAchievement)}
          <div className="text-xs text-gray-500 mt-1">
            {formatPercentage(record.revenueAchievement)}
          </div>
        </div>
      ),
    },
    {
      key: "orders",
      label: "Orders",
      render: (record: FranchiseePerformance) => (
        <div>
          <div className="font-medium">{record.totalOrders}</div>
          <div className="text-xs text-gray-500">
            AOV: {formatCurrency(record.averageOrderValue)}
          </div>
        </div>
      ),
    },
    {
      key: "customers",
      label: "Customers",
      render: (record: FranchiseePerformance) => (
        <div>
          <div className="font-medium">{record.totalCustomers}</div>
          <div className="text-xs text-gray-500">
            Retention: {formatPercentage(record.customerRetention)}
          </div>
        </div>
      ),
    },
    {
      key: "operational",
      label: "Operational Metrics",
      render: (record: FranchiseePerformance) => (
        <div className="text-xs">
          <div>Turnover: {record.inventoryTurnover}x</div>
          <div>Compliance: {record.complianceScore}%</div>
          <div
            className={
              record.paymentDelays > 5 ? "text-red-600" : "text-green-600"
            }
          >
            Payment delays: {record.paymentDelays}
          </div>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (record: FranchiseePerformance) => (
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Regional Performance Analytics
          </h2>
          <p className="text-muted-foreground">
            Territory-wise sales performance and franchisee analytics
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Region</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {salesData.regional.map((region) => (
                    <SelectItem key={region.regionId} value={region.regionId}>
                      {region.regionName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Primary Metric</label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="growth">Growth Rate</SelectItem>
                  <SelectItem value="target">Target Achievement</SelectItem>
                  <SelectItem value="penetration">
                    Market Penetration
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Search Franchisees</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {salesData.regional.map((region, index) => (
          <Card
            key={region.regionId}
            className={
              selectedRegion === region.regionId ? "ring-2 ring-blue-500" : ""
            }
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{region.regionName}</CardTitle>
                <Badge variant="outline">#{index + 1}</Badge>
              </div>
              <CardDescription>{region.state}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Revenue</span>
                  <span className="font-medium">
                    {formatCurrency(region.totalRevenue)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Growth</span>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(region.growth)}
                    <span
                      className={`text-sm ${region.growth > 0 ? "text-green-600" : region.growth < 0 ? "text-red-600" : "text-gray-600"}`}
                    >
                      {formatPercentage(region.growth)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Franchisees</span>
                  <span className="font-medium">{region.franchiseeCount}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Target Achievement</span>
                    <span className="font-medium">
                      {formatPercentage(region.achievement)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${region.achievement >= 100 ? "bg-green-500" : region.achievement >= 90 ? "bg-blue-500" : region.achievement >= 80 ? "bg-yellow-500" : "bg-red-500"}`}
                      style={{ width: `${Math.min(region.achievement, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="text-xs text-gray-500">Top Performer</div>
                  <div className="font-medium text-sm">
                    {region.topFranchisee.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatCurrency(region.topFranchisee.revenue)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Regional Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Performance Comparison</CardTitle>
          <CardDescription>Detailed comparison of all regions</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={salesData.regional}
            columns={regionalTableColumns}
            searchable={false}
            pagination={{
              pageSize: 10,
              showSizeSelector: false,
            }}
          />
        </CardContent>
      </Card>

      {/* Franchisee Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Franchisee Performance</CardTitle>
          <CardDescription>
            {selectedRegion === "all"
              ? `All franchisees (${filteredFranchisees.length} total)`
              : `Franchisees in ${salesData.regional.find((r) => r.regionId === selectedRegion)?.regionName} (${filteredFranchisees.length} total)`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredFranchisees}
            columns={franchiseeTableColumns}
            searchable={true}
            pagination={{
              pageSize: 15,
              showSizeSelector: true,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
