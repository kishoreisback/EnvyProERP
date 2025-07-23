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
  TrendingUp,
  TrendingDown,
  DollarSign,
  Percent,
  AlertTriangle,
  CheckCircle,
  Minus,
  BarChart3,
  PieChart,
  Search,
  Eye,
  Download,
  RefreshCw,
} from "lucide-react";
import { generateSalesPerformanceMetrics } from "./data";
import {
  ProductMarginAnalysis,
  TopSellingProduct,
  SlowMovingProduct,
} from "./types";

interface MarginPricingAnalysisProps {
  tenantId: string;
  userType: string;
}

export function MarginPricingAnalysis({
  tenantId,
  userType,
}: MarginPricingAnalysisProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAnalysisType, setSelectedAnalysisType] = useState("margin");
  const [selectedTab, setSelectedTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  // Generate sales and margin data
  const salesData = useMemo(
    () => generateSalesPerformanceMetrics(tenantId, userType),
    [tenantId, userType],
  );

  // Additional margin analysis data
  const marginAnalysisData = useMemo(
    () => [
      ...salesData.products.marginAnalysis,
      {
        productId: "PROD-003",
        productCode: "BRK-RED-STD",
        productName: "Red Bricks Standard",
        category: "Bricks",
        sellingPrice: 5,
        costPrice: 4,
        margin: 1,
        marginPercentage: 20.0,
        volume: 450000,
        totalMargin: 450000,
        benchmarkMargin: 0.9,
        marginTrend: "stable",
        recommendation: "Pricing is optimal for current market conditions",
      },
      {
        productId: "PROD-004",
        productCode: "TIL-CER-60",
        productName: "Ceramic Tiles 60x60",
        category: "Tiles",
        sellingPrice: 800,
        costPrice: 600,
        margin: 200,
        marginPercentage: 25.0,
        volume: 15000,
        totalMargin: 3000000,
        benchmarkMargin: 180,
        marginTrend: "improving",
        recommendation: "Consider premium pricing for high-end variants",
      },
      {
        productId: "PROD-005",
        productCode: "SAN-PVC-4",
        productName: "PVC Pipes 4 inch",
        category: "Pipes",
        sellingPrice: 120,
        costPrice: 95,
        margin: 25,
        marginPercentage: 20.8,
        volume: 85000,
        totalMargin: 2125000,
        benchmarkMargin: 28,
        marginTrend: "declining",
        recommendation:
          "Review supplier pricing, consider alternative suppliers",
      },
    ],
    [salesData],
  );

  // Filter products based on category and search
  const filteredMarginData = useMemo(() => {
    let filtered = marginAnalysisData;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === selectedCategory,
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.productName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.productCode
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filtered;
  }, [marginAnalysisData, selectedCategory, searchTerm]);

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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getMarginStatusBadge = (
    marginPercentage: number,
    benchmarkMargin: number,
  ) => {
    const benchmarkPercentage =
      (benchmarkMargin / (marginPercentage + benchmarkMargin)) * 100;

    if (marginPercentage >= benchmarkPercentage * 1.1) {
      return <Badge className="bg-green-500">Above Benchmark</Badge>;
    } else if (marginPercentage >= benchmarkPercentage * 0.9) {
      return <Badge className="bg-blue-500">On Target</Badge>;
    } else {
      return <Badge className="bg-red-500">Below Benchmark</Badge>;
    }
  };

  const getRecommendationIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "declining":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-blue-500" />;
    }
  };

  // Calculate summary metrics
  const summaryMetrics = useMemo(() => {
    const totalRevenue = filteredMarginData.reduce(
      (sum, product) => sum + product.sellingPrice * product.volume,
      0,
    );
    const totalMargin = filteredMarginData.reduce(
      (sum, product) => sum + product.totalMargin,
      0,
    );
    const averageMargin = (totalMargin / totalRevenue) * 100;
    const highMarginProducts = filteredMarginData.filter(
      (p) => p.marginPercentage >= 25,
    ).length;
    const lowMarginProducts = filteredMarginData.filter(
      (p) => p.marginPercentage < 15,
    ).length;

    return {
      totalRevenue,
      totalMargin,
      averageMargin,
      highMarginProducts,
      lowMarginProducts,
      totalProducts: filteredMarginData.length,
    };
  }, [filteredMarginData]);

  const marginAnalysisColumns = [
    {
      key: "product",
      label: "Product",
      render: (record: ProductMarginAnalysis) => (
        <div>
          <div className="font-medium">{record.productName}</div>
          <div className="text-sm text-gray-500">{record.productCode}</div>
          <Badge variant="outline" className="mt-1">
            {record.category}
          </Badge>
        </div>
      ),
    },
    {
      key: "pricing",
      label: "Pricing",
      render: (record: ProductMarginAnalysis) => (
        <div>
          <div className="font-medium">
            Selling: {formatCurrency(record.sellingPrice)}
          </div>
          <div className="text-sm text-gray-500">
            Cost: {formatCurrency(record.costPrice)}
          </div>
        </div>
      ),
    },
    {
      key: "margin",
      label: "Margin",
      render: (record: ProductMarginAnalysis) => (
        <div>
          <div className="font-medium">{formatCurrency(record.margin)}</div>
          <div className="text-sm font-bold text-blue-600">
            {formatPercentage(record.marginPercentage)}
          </div>
        </div>
      ),
    },
    {
      key: "benchmark",
      label: "vs Benchmark",
      render: (record: ProductMarginAnalysis) => (
        <div>
          <div className="text-sm text-gray-500">
            Target: {formatCurrency(record.benchmarkMargin)}
          </div>
          {getMarginStatusBadge(
            record.marginPercentage,
            record.benchmarkMargin,
          )}
        </div>
      ),
    },
    {
      key: "volume",
      label: "Volume & Total Margin",
      render: (record: ProductMarginAnalysis) => (
        <div>
          <div className="font-medium">
            {record.volume.toLocaleString()} units
          </div>
          <div className="text-sm text-green-600 font-medium">
            {formatCurrency(record.totalMargin)}
          </div>
        </div>
      ),
    },
    {
      key: "trend",
      label: "Trend",
      render: (record: ProductMarginAnalysis) => (
        <div className="flex items-center gap-2">
          {getTrendIcon(record.marginTrend)}
          <span className="text-sm capitalize">{record.marginTrend}</span>
        </div>
      ),
    },
    {
      key: "recommendation",
      label: "Recommendation",
      render: (record: ProductMarginAnalysis) => (
        <div className="flex items-start gap-2">
          {getRecommendationIcon(record.marginTrend)}
          <span className="text-sm">{record.recommendation}</span>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (record: ProductMarginAnalysis) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const topSellingColumns = [
    {
      key: "rank",
      label: "Rank",
      render: (record: TopSellingProduct, index: number) => (
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">
            #{record.salesRank}
          </div>
          {record.previousRank !== record.salesRank && (
            <div className="text-xs text-gray-500">
              {record.previousRank > record.salesRank ? "↑" : "↓"} from #
              {record.previousRank}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "product",
      label: "Product",
      render: (record: TopSellingProduct) => (
        <div>
          <div className="font-medium">{record.productName}</div>
          <div className="text-sm text-gray-500">{record.productCode}</div>
          <Badge variant="outline">{record.category}</Badge>
        </div>
      ),
    },
    {
      key: "sales",
      label: "Sales Performance",
      render: (record: TopSellingProduct) => (
        <div>
          <div className="font-medium">{formatCurrency(record.revenue)}</div>
          <div className="text-sm text-gray-500">
            {record.quantitySold.toLocaleString()} units
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-xs text-green-600">
              {formatPercentage(record.growth)}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "margin",
      label: "Margin Analysis",
      render: (record: TopSellingProduct) => (
        <div>
          <div className="font-medium">{formatCurrency(record.margin)}</div>
          <div className="text-sm font-bold text-blue-600">
            {formatPercentage(record.marginPercentage)}
          </div>
        </div>
      ),
    },
    {
      key: "customers",
      label: "Customer Metrics",
      render: (record: TopSellingProduct) => (
        <div>
          <div className="font-medium">{record.customers} customers</div>
          <div className="text-sm text-gray-500">
            Avg: {record.avgOrderQuantity} units/order
          </div>
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
            Margin & Pricing Analysis
          </h2>
          <p className="text-muted-foreground">
            Product profitability analysis and pricing optimization insights
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
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summaryMetrics.totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across {summaryMetrics.totalProducts} products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Margin</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summaryMetrics.totalMargin)}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatPercentage(summaryMetrics.averageMargin)} average margin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              High Margin Products
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {summaryMetrics.highMarginProducts}
            </div>
            <p className="text-xs text-muted-foreground">
              ≥25% margin products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Low Margin Products
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {summaryMetrics.lowMarginProducts}
            </div>
            <p className="text-xs text-muted-foreground">
              &lt;15% margin products
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Analysis Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="cement">Cement</SelectItem>
                  <SelectItem value="steel">Steel</SelectItem>
                  <SelectItem value="bricks">Bricks</SelectItem>
                  <SelectItem value="tiles">Tiles</SelectItem>
                  <SelectItem value="pipes">Pipes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Analysis Type</label>
              <Select
                value={selectedAnalysisType}
                onValueChange={setSelectedAnalysisType}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="margin">Margin Analysis</SelectItem>
                  <SelectItem value="pricing">Pricing Strategy</SelectItem>
                  <SelectItem value="benchmark">
                    Benchmark Comparison
                  </SelectItem>
                  <SelectItem value="trend">Trend Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Search Products</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Margin Range</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All margins" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Margins</SelectItem>
                  <SelectItem value="high">High (≥25%)</SelectItem>
                  <SelectItem value="medium">Medium (15-25%)</SelectItem>
                  <SelectItem value="low">Low (&lt;15%)</SelectItem>
                </SelectContent>
              </Select>
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="top-products">Top Products</TabsTrigger>
          <TabsTrigger value="slow-movers">Slow Movers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Margin Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Margin Distribution</CardTitle>
                <CardDescription>
                  Products by margin percentage ranges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      range: "25%+",
                      count: summaryMetrics.highMarginProducts,
                      color: "bg-green-500",
                    },
                    {
                      range: "20-25%",
                      count: filteredMarginData.filter(
                        (p) =>
                          p.marginPercentage >= 20 && p.marginPercentage < 25,
                      ).length,
                      color: "bg-blue-500",
                    },
                    {
                      range: "15-20%",
                      count: filteredMarginData.filter(
                        (p) =>
                          p.marginPercentage >= 15 && p.marginPercentage < 20,
                      ).length,
                      color: "bg-yellow-500",
                    },
                    {
                      range: "<15%",
                      count: summaryMetrics.lowMarginProducts,
                      color: "bg-red-500",
                    },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">{item.range}</span>
                        <span className="font-medium">
                          {item.count} products
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${item.color}`}
                          style={{
                            width: `${(item.count / summaryMetrics.totalProducts) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Category Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Category Margin Performance</CardTitle>
                <CardDescription>
                  Average margins by product category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Cement", "Steel", "Bricks", "Tiles", "Pipes"].map(
                    (category) => {
                      const categoryProducts = filteredMarginData.filter(
                        (p) => p.category === category,
                      );
                      const avgMargin =
                        categoryProducts.length > 0
                          ? categoryProducts.reduce(
                              (sum, p) => sum + p.marginPercentage,
                              0,
                            ) / categoryProducts.length
                          : 0;

                      return (
                        <div
                          key={category}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm">{category}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {formatPercentage(avgMargin)}
                            </span>
                            <Badge variant="outline">
                              {categoryProducts.length} products
                            </Badge>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Key Insights & Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-medium text-green-700">Opportunities</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>
                        Tiles category showing strong 25% average margin
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Cement volume allows for price optimization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>
                        Premium product lines can support higher margins
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-red-700">Action Items</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <span>Review Steel category pricing strategy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <span>Negotiate better supplier terms for Pipes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <span>Consider bundling low-margin products</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Margin Analysis</CardTitle>
              <CardDescription>
                Complete product margin analysis with recommendations (
                {filteredMarginData.length} products)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredMarginData}
                columns={marginAnalysisColumns}
                searchable={true}
                pagination={{
                  pageSize: 15,
                  showSizeSelector: true,
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="top-products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>
                Best performing products by sales volume and margin contribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={salesData.products.topSelling}
                columns={topSellingColumns}
                searchable={false}
                pagination={{
                  pageSize: 10,
                  showSizeSelector: false,
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="slow-movers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Slow Moving Inventory</CardTitle>
              <CardDescription>
                Products with low turnover requiring pricing action
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesData.products.slowMoving.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <AlertTriangle className="h-8 w-8 text-red-500" />
                      <div>
                        <div className="font-medium">{product.productName}</div>
                        <div className="text-sm text-gray-500">
                          {product.productCode} • {product.category}
                        </div>
                        <div className="text-xs text-red-600 mt-1">
                          {product.daysSinceLastSale} days since last sale
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">
                        {product.currentStock} units
                      </div>
                      <div className="text-sm text-gray-500">
                        Stock Value: {formatCurrency(product.stockValue)}
                      </div>
                      <div className="text-xs text-red-600">
                        Potential Loss: {formatCurrency(product.potentialLoss)}
                      </div>
                    </div>
                    <div className="text-center">
                      <Badge
                        className={
                          product.recommendedAction === "discount"
                            ? "bg-yellow-500"
                            : product.recommendedAction === "bundle"
                              ? "bg-blue-500"
                              : product.recommendedAction === "discontinue"
                                ? "bg-red-500"
                                : "bg-green-500"
                        }
                      >
                        {product.recommendedAction}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      Take Action
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
