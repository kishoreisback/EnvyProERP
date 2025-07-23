import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { AnimatedIcon, GlowingOrb } from "@/components/ui/animated-icons";
import {
  Users,
  UserCheck,
  Building2,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Clock,
  Award,
  DollarSign,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  getHRAnalyticsByTenant, 
  getHRTenants,
  formatCurrency,
  formatPercentage 
} from "./data";

interface TenantHRDashboardProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function TenantHRDashboard({
  currentTab = "overview",
  onTabChange,
}: TenantHRDashboardProps) {
  const { tab } = useParams();
  const [selectedTenant, setSelectedTenant] = useState<string>("tenant_buildcorp");
  const [selectedTimeRange, setSelectedTimeRange] = useState("current_month");

  // Get HR data
  const hrTenants = useMemo(() => getHRTenants(), []);
  const currentTenant = useMemo(
    () => hrTenants.find(t => t.id === selectedTenant),
    [hrTenants, selectedTenant]
  );
  const analytics = useMemo(
    () => getHRAnalyticsByTenant(selectedTenant, selectedTimeRange),
    [selectedTenant, selectedTimeRange]
  );

  const getTrendIcon = (trend: number) => {
    if (trend > 0) {
      return <ArrowUpRight className="h-4 w-4 text-green-600" />;
    } else if (trend < 0) {
      return <ArrowDownRight className="h-4 w-4 text-red-600" />;
    }
    return <Activity className="h-4 w-4 text-gray-600" />;
  };

  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Loading HR data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden group">
            <AnimatedIcon
              icon={Users}
              animation="float"
              className="text-white"
            />
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">HR Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              {currentTenant?.name} • {currentTenant?.industryType}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Select value={selectedTenant} onValueChange={setSelectedTenant}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select organization" />
            </SelectTrigger>
            <SelectContent>
              {hrTenants.map((tenant) => (
                <SelectItem key={tenant.id} value={tenant.id}>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>{tenant.name}</span>
                    <Badge variant="outline" className="ml-2">
                      {tenant.industryType}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current_month">This Month</SelectItem>
              <SelectItem value="current_quarter">This Quarter</SelectItem>
              <SelectItem value="current_year">This Year</SelectItem>
              <SelectItem value="last_month">Last Month</SelectItem>
              <SelectItem value="last_quarter">Last Quarter</SelectItem>
              <SelectItem value="last_year">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Button size="sm" className="gap-2 hover-lift">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover-lift transition-all duration-300 border-l-4 border-l-blue-500 animate-fadeInUp">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              <AnimatedCounter value={analytics.employeeMetrics.totalEmployees} />
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="text-green-600">+{analytics.employeeMetrics.newJoinees}</span>
              <span className="ml-1">new hires this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift transition-all duration-300 border-l-4 border-l-green-500 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {analytics.attendanceMetrics.averageAttendance.toFixed(1)}%
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="text-green-600">+2.3%</span>
              <span className="ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift transition-all duration-300 border-l-4 border-l-purple-500 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance Rating</CardTitle>
            <Award className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {analytics.performanceMetrics.averageRating.toFixed(1)}
            </div>
            <div className="text-xs text-muted-foreground">
              Out of 5.0 scale
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift transition-all duration-300 border-l-4 border-l-orange-500 animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Turnover Rate</CardTitle>
            <TrendingDown className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {analytics.turnoverMetrics.turnoverRate.toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">
              Retention: {analytics.turnoverMetrics.retentionRate.toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Analysis */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Department Overview
            </CardTitle>
            <CardDescription>Employee distribution by department</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(analytics.employeeMetrics.departmentWiseCount).map(([dept, count]) => (
              <div key={dept} className="flex items-center justify-between">
                <span className="text-sm font-medium">{dept}</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{count}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ 
                        width: `${(count / analytics.employeeMetrics.totalEmployees) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Performance Analysis */}
        <Card className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Performance Analysis
            </CardTitle>
            <CardDescription>Employee performance distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(analytics.performanceMetrics.ratingDistribution).map(([rating, count]) => (
              <div key={rating} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{rating} Star</span>
                  {parseInt(rating) >= 4 && <span className="text-xs text-green-600">(Excellent)</span>}
                  {parseInt(rating) === 3 && <span className="text-xs text-yellow-600">(Good)</span>}
                  {parseInt(rating) <= 2 && <span className="text-xs text-red-600">(Needs Improvement)</span>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{count}</span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className={cn(
                        "h-2 rounded-full",
                        parseInt(rating) >= 4 ? "bg-green-600" :
                        parseInt(rating) === 3 ? "bg-yellow-600" :
                        "bg-red-600"
                      )}
                      style={{ 
                        width: `${(count / analytics.employeeMetrics.totalEmployees) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <Card className="animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            HR Metrics Summary
          </CardTitle>
          <CardDescription>Comprehensive HR performance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Leave Utilization</p>
              <p className="text-2xl font-bold">{analytics.leaveMetrics.leaveUtilizationRate.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground">
                {analytics.leaveMetrics.pendingLeaveRequests} pending requests
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Recruitment Rate</p>
              <p className="text-2xl font-bold">{analytics.recruitmentMetrics.conversionRate.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground">
                Avg. time to hire: {analytics.recruitmentMetrics.averageTimeToHire} days
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Avg. Tenure</p>
              <p className="text-2xl font-bold">{analytics.turnoverMetrics.averageTenure.toFixed(1)} yrs</p>
              <p className="text-xs text-muted-foreground">
                Employee retention
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Punctuality</p>
              <p className="text-2xl font-bold">{analytics.attendanceMetrics.punctualityRate.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground">
                On-time attendance
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
