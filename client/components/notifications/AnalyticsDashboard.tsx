import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Target,
  Users,
  Bell,
  BellRing,
  Mail,
  MessageSquare,
  Smartphone,
  Calendar,
  Download,
  Eye,
  MousePointer,
  CheckCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";

import { NotificationAnalytics, UserType } from "./types";

interface AnalyticsDashboardProps {
  analytics: NotificationAnalytics | null;
  userType: UserType;
  timeRange?: string;
  showAdvancedMetrics?: boolean;
}

export function AnalyticsDashboard({
  analytics,
  userType,
  timeRange = "30d",
  showAdvancedMetrics = true,
}: AnalyticsDashboardProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);
  const [selectedMetric, setSelectedMetric] = useState("overview");

  if (!analytics) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Loading Analytics
          </h3>
          <p className="text-gray-500">
            Please wait while we gather your notification data...
          </p>
        </div>
      </div>
    );
  }

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Notification Analytics
          </h2>
          <p className="text-gray-600">
            Insights into notification performance and engagement
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Select
            value={selectedTimeRange}
            onValueChange={setSelectedTimeRange}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-blue-50 border-blue-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-blue-200/40 rounded-bl-[16px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-blue-700">
                Total Sent
              </CardTitle>
              <div className="text-3xl font-bold text-blue-900">
                <AnimatedCounter value={analytics.totalSent} />
              </div>
              <div className="flex items-center space-x-1">
                {getTrendIcon("up")}
                <span className="text-xs text-green-600">+12.5%</span>
              </div>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Bell className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-green-50 border-green-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-green-200/40 rounded-bl-[16px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-green-700">
                Delivery Rate
              </CardTitle>
              <div className="text-3xl font-bold text-green-900">
                <AnimatedCounter value={Math.round(analytics.deliveryRate)} />%
              </div>
              <div className="flex items-center space-x-1">
                {getTrendIcon("up")}
                <span className="text-xs text-green-600">+2.1%</span>
              </div>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-purple-50 border-purple-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-purple-200/40 rounded-bl-[16px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-purple-700">
                Engagement Score
              </CardTitle>
              <div className="text-3xl font-bold text-purple-900">
                <AnimatedCounter
                  value={Math.round(analytics.engagementScore)}
                />
              </div>
              <div className="flex items-center space-x-1">
                {getTrendIcon("up")}
                <span className="text-xs text-green-600">+5.3%</span>
              </div>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-orange-50 border-orange-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-orange-200/40 rounded-bl-[16px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-orange-700">
                Avg Response Time
              </CardTitle>
              <div className="text-3xl font-bold text-orange-900">
                <AnimatedCounter
                  value={Math.round(analytics.averageResponseTime)}
                />
                m
              </div>
              <div className="flex items-center space-x-1">
                {getTrendIcon("down")}
                <span className="text-xs text-green-600">-8.2%</span>
              </div>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Tabs
        value={selectedMetric}
        onValueChange={setSelectedMetric}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Delivery Funnel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Delivery Funnel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Sent</span>
                    <span className="text-sm text-gray-600">
                      {analytics.totalSent.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={100} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Delivered</span>
                    <span className="text-sm text-gray-600">
                      {analytics.totalDelivered.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={analytics.deliveryRate} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Read</span>
                    <span className="text-sm text-gray-600">
                      {analytics.totalRead.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={analytics.readRate} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Clicked</span>
                    <span className="text-sm text-gray-600">
                      {analytics.totalClicked.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={analytics.clickRate} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Acknowledged</span>
                    <span className="text-sm text-gray-600">
                      {analytics.totalAcknowledged.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={analytics.acknowledgmentRate}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Key Performance Indicators
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Read Rate</span>
                      <Badge variant="outline">
                        {analytics.readRate.toFixed(1)}%
                      </Badge>
                    </div>
                    <Progress value={analytics.readRate} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Click Rate</span>
                      <Badge variant="outline">
                        {analytics.clickRate.toFixed(1)}%
                      </Badge>
                    </div>
                    <Progress value={analytics.clickRate} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Response Rate
                      </span>
                      <Badge variant="outline">
                        {analytics.responseRate.toFixed(1)}%
                      </Badge>
                    </div>
                    <Progress value={analytics.responseRate} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Acknowledgment Rate
                      </span>
                      <Badge variant="outline">
                        {analytics.acknowledgmentRate.toFixed(1)}%
                      </Badge>
                    </div>
                    <Progress
                      value={analytics.acknowledgmentRate}
                      className="h-2"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Avg Delivery Time
                    </span>
                    <span className="text-sm text-gray-600">
                      {analytics.averageDeliveryTime.toFixed(1)}s
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Peak Hours</span>
                    <div className="flex space-x-1">
                      {analytics.peakEngagementHours.slice(0, 3).map((hour) => (
                        <Badge key={hour} variant="outline" className="text-xs">
                          {hour}:00
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Channels Tab */}
        <TabsContent value="channels" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Bell className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">In-App</p>
                  <p className="text-2xl font-bold">98.5%</p>
                  <p className="text-xs text-green-600">+2.1%</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-2xl font-bold">94.2%</p>
                  <p className="text-xs text-red-600">-1.3%</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">SMS</p>
                  <p className="text-2xl font-bold">91.8%</p>
                  <p className="text-xs text-green-600">+0.8%</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Push</p>
                  <p className="text-2xl font-bold">89.6%</p>
                  <p className="text-xs text-green-600">+3.2%</p>
                </div>
              </div>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Channel Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                  <p>Channel performance chart would be displayed here</p>
                  <p className="text-sm">
                    Interactive chart with time-series data
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Engagement Tab */}
        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  User Engagement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Active Users (7d)
                    </span>
                    <span className="text-sm text-gray-600">1,234</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Avg Session Duration
                    </span>
                    <span className="text-sm text-gray-600">3m 42s</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Return Rate</span>
                    <span className="text-sm text-gray-600">68.5%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Bounce Rate</span>
                    <span className="text-sm text-gray-600">12.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MousePointer className="h-5 w-5" />
                  Interaction Patterns
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Most Active Hour
                    </span>
                    <Badge variant="outline">2:00 PM</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Peak Day</span>
                    <Badge variant="outline">Tuesday</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Preferred Channel
                    </span>
                    <Badge variant="outline">In-App</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Avg Actions per Session
                    </span>
                    <span className="text-sm text-gray-600">4.2</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Engagement Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2" />
                  <p>Weekly engagement heatmap would be displayed here</p>
                  <p className="text-sm">
                    Shows peak engagement times by day and hour
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Speed Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Delivery Speed</span>
                      <span className="text-sm font-medium">Fast</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Processing Time</span>
                      <span className="text-sm font-medium">1.2s</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Queue Wait</span>
                      <span className="text-sm font-medium">0.3s</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reliability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Success Rate</span>
                      <span className="text-sm font-medium">99.2%</span>
                    </div>
                    <Progress value={99.2} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Retry Rate</span>
                      <span className="text-sm font-medium">2.1%</span>
                    </div>
                    <Progress value={21} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Error Rate</span>
                      <span className="text-sm font-medium">0.8%</span>
                    </div>
                    <Progress value={8} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Status</span>
                    <Badge className="bg-green-100 text-green-700">
                      Healthy
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Queue Depth</span>
                    <span className="text-sm font-medium">23</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Workers</span>
                    <span className="text-sm font-medium">8/10</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Memory Usage</span>
                    <span className="text-sm font-medium">68%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          Engagement Improving
                        </p>
                        <p className="text-xs text-green-600">
                          Click-through rates increased by 12% this week
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Clock className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">
                          Optimal Send Time
                        </p>
                        <p className="text-xs text-blue-600">
                          2-3 PM shows highest engagement rates
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-orange-800">
                          Channel Performance
                        </p>
                        <p className="text-xs text-orange-600">
                          SMS delivery rates dropped 3% - investigate carriers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm font-medium">Optimize Send Times</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Schedule more notifications during peak engagement hours
                      (2-3 PM) for better results.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Apply Optimization
                    </Button>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <p className="text-sm font-medium">
                      A/B Test Subject Lines
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Test different subject line formats to improve open rates
                      by an estimated 8-15%.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Start Test
                    </Button>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <p className="text-sm font-medium">Review SMS Provider</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Consider switching SMS providers to improve delivery rates
                      and reduce costs.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      View Options
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
