import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar as CalendarIcon,
  Clock,
  Truck,
  User,
  MapPin,
  Route,
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Package,
  Eye,
  Edit,
  Save,
  Navigation,
  Timer,
  Bell,
  IndianRupee,
  Activity,
  BarChart3,
  Filter,
  Search,
  Plus,
  RefreshCw,
  Zap,
} from "lucide-react";

import {
  mockDeliverySchedules,
  mockDeliveryAnalytics,
  mockTimeSlots,
  mockVehicles,
  mockDrivers,
  getDeliveryStatusColor,
  getScheduleStatusColor,
  formatDeliveryStatus,
  getAvailableTimeSlots,
  generateTrackingNumber,
  validateDeliverySchedule,
} from "./delivery-logistics-data";
import {
  DeliverySchedule,
  DeliveryStatus,
  TimeSlot,
} from "./delivery-logistics-types";
import { formatCurrency } from "./purchase-order-data";

interface DeliverySchedulingDashboardProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function DeliverySchedulingDashboard({
  activeTab = "schedule",
  onTabChange,
}: DeliverySchedulingDashboardProps) {
  const [schedules, setSchedules] = useState(mockDeliverySchedules);
  const [analytics] = useState(mockDeliveryAnalytics);
  const [selectedSchedule, setSelectedSchedule] =
    useState<DeliverySchedule | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [scheduleFormData, setScheduleFormData] = useState({
    poId: "",
    scheduledDate: "",
    timeSlotId: "",
    vehicleId: "",
    driverId: "",
    deliveryType: "standard",
    priority: "medium",
    specialInstructions: "",
  });

  // Filter schedules based on search and status
  const filteredSchedules = schedules.filter((schedule) => {
    const matchesSearch =
      schedule.poId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.vehicle.vehicleNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || schedule.currentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Group schedules by status
  const schedulesByStatus = {
    pending: filteredSchedules.filter((s) =>
      ["preparing", "ready_for_pickup"].includes(s.currentStatus),
    ),
    active: filteredSchedules.filter((s) =>
      ["picked_up", "in_transit", "out_for_delivery"].includes(s.currentStatus),
    ),
    completed: filteredSchedules.filter((s) => s.currentStatus === "delivered"),
    failed: filteredSchedules.filter((s) =>
      ["failed_delivery", "returned", "cancelled"].includes(s.currentStatus),
    ),
  };

  const handleTabChange = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const handleScheduleSubmit = () => {
    const errors = validateDeliverySchedule(scheduleFormData);
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const newSchedule: DeliverySchedule = {
      id: `DS${Date.now()}`,
      poId: scheduleFormData.poId,
      scheduleStatus: "scheduled",
      scheduledDate: scheduleFormData.scheduledDate,
      scheduledTimeSlot: mockTimeSlots.find(
        (slot) => slot.id === scheduleFormData.timeSlotId,
      )!,
      deliveryType: scheduleFormData.deliveryType as any,
      priority: scheduleFormData.priority as any,
      specialInstructions: scheduleFormData.specialInstructions
        .split("\n")
        .filter(Boolean),
      route: {
        id: "RT-NEW",
        routeName: "Auto-generated Route",
        startLocation: {} as any,
        endLocation: {} as any,
        waypoints: [],
        totalDistance: 25.5,
        estimatedDuration: 85,
        fuelCost: 383,
        tollCost: 40,
        isOptimized: true,
        optimizationScore: 88,
        alternativeRoutes: [],
        trafficConditions: [],
        roadConditions: [],
      },
      vehicle: mockVehicles.find(
        (v) => v.vehicleId === scheduleFormData.vehicleId,
      )!,
      driver: mockDrivers.find(
        (d) => d.driverId === scheduleFormData.driverId,
      )!,
      currentStatus: "preparing",
      statusHistory: [
        {
          status: "preparing",
          timestamp: new Date().toISOString(),
          locationName: "Warehouse",
          notes: "Delivery scheduled and preparation started",
          updatedBy: "system",
          updateMethod: "manual",
        },
      ],
      trackingInfo: {
        trackingNumber: generateTrackingNumber(),
        lastKnownLocationName: "Warehouse",
        lastUpdated: new Date().toISOString(),
        milestones: [
          {
            milestone: "Preparation Complete",
            expectedTime: new Date(
              Date.now() + 2 * 60 * 60 * 1000,
            ).toISOString(),
            status: "pending",
          },
          {
            milestone: "Vehicle Loaded",
            expectedTime: new Date(
              Date.now() + 4 * 60 * 60 * 1000,
            ).toISOString(),
            status: "pending",
          },
          {
            milestone: "Out for Delivery",
            expectedTime: new Date(
              scheduleFormData.scheduledDate +
                "T" +
                mockTimeSlots.find(
                  (slot) => slot.id === scheduleFormData.timeSlotId,
                )?.startTime,
            ).toISOString(),
            status: "pending",
          },
        ],
        alerts: [],
      },
      notifications: [],
      documents: [],
      createdAt: new Date().toISOString(),
      createdBy: "current.user@corp.com",
      lastUpdated: new Date().toISOString(),
    };

    setSchedules((prev) => [...prev, newSchedule]);
    setIsScheduleModalOpen(false);
    setScheduleFormData({
      poId: "",
      scheduledDate: "",
      timeSlotId: "",
      vehicleId: "",
      driverId: "",
      deliveryType: "standard",
      priority: "medium",
      specialInstructions: "",
    });
  };

  const updateDeliveryStatus = (
    scheduleId: string,
    newStatus: DeliveryStatus,
    notes: string = "",
  ) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.id === scheduleId
          ? {
              ...schedule,
              currentStatus: newStatus,
              statusHistory: [
                ...schedule.statusHistory,
                {
                  status: newStatus,
                  timestamp: new Date().toISOString(),
                  locationName: "En route",
                  notes:
                    notes ||
                    `Status updated to ${formatDeliveryStatus(newStatus)}`,
                  updatedBy: "current.user@corp.com",
                  updateMethod: "manual",
                },
              ],
              lastUpdated: new Date().toISOString(),
              ...(newStatus === "delivered" && {
                completedAt: new Date().toISOString(),
              }),
            }
          : schedule,
      ),
    );
  };

  const availableSlots = selectedDate
    ? getAvailableTimeSlots(selectedDate.toISOString())
    : [];

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-blue-50 border-blue-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-blue-200/40 rounded-bl-[16px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-blue-700">
                Active Deliveries
              </CardTitle>
              <div className="text-3xl font-bold text-blue-900">
                <AnimatedCounter value={schedulesByStatus.active.length} />
              </div>
              <p className="text-xs text-blue-600">
                In transit & out for delivery
              </p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Truck className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-green-50 border-green-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-green-200/40 rounded-bl-[16px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-green-700">
                On-Time Rate
              </CardTitle>
              <div className="text-3xl font-bold text-green-900">
                <AnimatedCounter
                  value={analytics.onTimeDeliveryRate}
                  decimals={1}
                />
                %
              </div>
              <p className="text-xs text-green-600">Performance this month</p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-orange-50 border-orange-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-orange-200/40 rounded-bl-[16px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-orange-700">
                Avg Delivery Time
              </CardTitle>
              <div className="text-3xl font-bold text-orange-900">
                <AnimatedCounter
                  value={analytics.averageDeliveryTime}
                  decimals={1}
                />
                h
              </div>
              <p className="text-xs text-orange-600">Door to door</p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Timer className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-purple-50 border-purple-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-purple-200/40 rounded-bl-[16px]"></div>
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-sm font-medium text-purple-700">
                Fleet Utilization
              </CardTitle>
              <div className="text-3xl font-bold text-purple-900">
                <AnimatedCounter
                  value={analytics.fleetUtilization}
                  decimals={1}
                />
                %
              </div>
              <p className="text-xs text-purple-600">Vehicle efficiency</p>
            </div>
            <div className="flex-shrink-0 ml-4 relative z-10">
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by PO number, driver, or vehicle..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="in_transit">In Transit</SelectItem>
                  <SelectItem value="out_for_delivery">
                    Out for Delivery
                  </SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="failed_delivery">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() => setIsScheduleModalOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Schedule Delivery
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Schedule ({schedulesByStatus.pending.length})
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Active ({schedulesByStatus.active.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Completed ({schedulesByStatus.completed.length})
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-4">
          <div className="grid gap-4">
            {schedulesByStatus.pending.map((schedule) => (
              <Card
                key={schedule.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">
                          PO {schedule.poId}
                        </h3>
                        <Badge
                          className={getScheduleStatusColor(
                            schedule.scheduleStatus,
                          )}
                        >
                          {schedule.scheduleStatus.replace("_", " ")}
                        </Badge>
                        <Badge
                          className={getDeliveryStatusColor(
                            schedule.currentStatus,
                          )}
                        >
                          {formatDeliveryStatus(schedule.currentStatus)}
                        </Badge>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-blue-500" />
                          <span>
                            {new Date(
                              schedule.scheduledDate,
                            ).toLocaleDateString()}{" "}
                            • {schedule.scheduledTimeSlot.startTime}-
                            {schedule.scheduledTimeSlot.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-green-500" />
                          <span>{schedule.vehicle.vehicleNumber}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-purple-500" />
                          <span>{schedule.driver.name}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Route className="h-4 w-4" />
                          {schedule.route.totalDistance} km •{" "}
                          {schedule.route.estimatedDuration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <IndianRupee className="h-4 w-4" />
                          {schedule.route.fuelCost +
                            schedule.route.tollCost}{" "}
                          cost
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedSchedule(schedule);
                          setIsTrackingModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Track
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          updateDeliveryStatus(
                            schedule.id,
                            "picked_up",
                            "Vehicle loaded and departed from warehouse",
                          )
                        }
                        disabled={schedule.currentStatus !== "preparing"}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Start Delivery
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Active Deliveries Tab */}
        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {schedulesByStatus.active.map((schedule) => (
              <Card
                key={schedule.id}
                className="border-l-4 border-l-orange-500"
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">
                          PO {schedule.poId}
                        </h3>
                        <Badge
                          className={getDeliveryStatusColor(
                            schedule.currentStatus,
                          )}
                        >
                          {formatDeliveryStatus(schedule.currentStatus)}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          Tracking: {schedule.trackingInfo.trackingNumber}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedSchedule(schedule);
                            setIsTrackingModalOpen(true);
                          }}
                        >
                          <Navigation className="h-4 w-4 mr-2" />
                          Live Track
                        </Button>
                        <Button
                          size="sm"
                          onClick={() =>
                            updateDeliveryStatus(
                              schedule.id,
                              "delivered",
                              "Package successfully delivered and received",
                            )
                          }
                          disabled={
                            schedule.currentStatus !== "out_for_delivery"
                          }
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark Delivered
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Current Status</h4>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">
                              {schedule.trackingInfo.lastKnownLocationName ||
                                "Unknown location"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">
                              Last update:{" "}
                              {new Date(
                                schedule.trackingInfo.lastUpdated,
                              ).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Delivery Progress</h4>
                        <div className="space-y-2">
                          {schedule.trackingInfo.milestones.map(
                            (milestone, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <div
                                  className={`w-3 h-3 rounded-full ${
                                    milestone.status === "reached"
                                      ? "bg-green-500"
                                      : milestone.status === "delayed"
                                        ? "bg-orange-500"
                                        : "bg-gray-300"
                                  }`}
                                />
                                <span className="text-sm">
                                  {milestone.milestone}
                                </span>
                                {milestone.status === "reached" &&
                                  milestone.actualTime && (
                                    <span className="text-xs text-green-600">
                                      ✓{" "}
                                      {new Date(
                                        milestone.actualTime,
                                      ).toLocaleTimeString()}
                                    </span>
                                  )}
                                {milestone.delay && (
                                  <span className="text-xs text-orange-600">
                                    (+{milestone.delay}m delay)
                                  </span>
                                )}
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="h-4 w-4 text-blue-500" />
                        <span className="font-medium text-sm">
                          Latest Update
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {
                          schedule.statusHistory[
                            schedule.statusHistory.length - 1
                          ]?.notes
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Completed Tab */}
        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {schedulesByStatus.completed.map((schedule) => (
              <Card key={schedule.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">
                          PO {schedule.poId}
                        </h3>
                        <Badge className="bg-green-100 text-green-800">
                          Delivered
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {schedule.completedAt &&
                            new Date(schedule.completedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {schedule.driver.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Truck className="h-4 w-4" />
                          {schedule.vehicle.vehicleNumber}
                        </span>
                        <span className="flex items-center gap-1">
                          <Timer className="h-4 w-4" />
                          {schedule.route.actualDuration ||
                            schedule.route.estimatedDuration}{" "}
                          min
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedSchedule(schedule);
                          setIsTrackingModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Bell className="h-4 w-4 mr-2" />
                        Generate GRN
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">
                      On-time Delivery Rate
                    </span>
                    <span className="text-sm">
                      {analytics.onTimeDeliveryRate}%
                    </span>
                  </div>
                  <Progress
                    value={analytics.onTimeDeliveryRate}
                    className="h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">
                      First Attempt Success
                    </span>
                    <span className="text-sm">
                      {analytics.firstAttemptSuccessRate}%
                    </span>
                  </div>
                  <Progress
                    value={analytics.firstAttemptSuccessRate}
                    className="h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">
                      Fleet Utilization
                    </span>
                    <span className="text-sm">
                      {analytics.fleetUtilization}%
                    </span>
                  </div>
                  <Progress
                    value={analytics.fleetUtilization}
                    className="h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">
                      Customer Satisfaction
                    </span>
                    <span className="text-sm">
                      {analytics.customerSatisfactionScore}/5.0
                    </span>
                  </div>
                  <Progress
                    value={analytics.customerSatisfactionScore * 20}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vehicle Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.vehiclePerformance.map((vehicle) => (
                    <div
                      key={vehicle.vehicleId}
                      className="p-3 border rounded-lg"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">
                          {vehicle.vehicleNumber}
                        </span>
                        <Badge variant="outline">
                          {vehicle.utilizationRate}% utilization
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div>Deliveries: {vehicle.deliveryCount}</div>
                        <div>Rating: {vehicle.averageRating}/5.0</div>
                        <div>
                          Fuel Efficiency: {vehicle.fuelEfficiency} km/l
                        </div>
                        <div>Profitability: {vehicle.profitability}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Driver Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Driver</TableHead>
                    <TableHead>Deliveries</TableHead>
                    <TableHead>On-time Rate</TableHead>
                    <TableHead>Customer Rating</TableHead>
                    <TableHead>Safety Score</TableHead>
                    <TableHead>Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analytics.driverPerformance.map((driver) => (
                    <TableRow key={driver.driverId}>
                      <TableCell className="font-medium">
                        {driver.driverName}
                      </TableCell>
                      <TableCell>{driver.deliveryCount}</TableCell>
                      <TableCell>{driver.onTimeRate}%</TableCell>
                      <TableCell>{driver.customerRating}/5.0</TableCell>
                      <TableCell>{driver.safetyScore}%</TableCell>
                      <TableCell>{formatCurrency(driver.revenue)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Schedule Delivery Modal */}
      <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Schedule New Delivery</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="poId">Purchase Order ID</Label>
                <Input
                  id="poId"
                  placeholder="Enter PO ID (e.g., PO001)"
                  value={scheduleFormData.poId}
                  onChange={(e) =>
                    setScheduleFormData((prev) => ({
                      ...prev,
                      poId: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="deliveryType">Delivery Type</Label>
                <Select
                  value={scheduleFormData.deliveryType}
                  onValueChange={(value) =>
                    setScheduleFormData((prev) => ({
                      ...prev,
                      deliveryType: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select delivery type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="express">Express</SelectItem>
                    <SelectItem value="same_day">Same Day</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>Select Delivery Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="timeSlot">Available Time Slots</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {availableSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          scheduleFormData.timeSlotId === slot.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() =>
                          setScheduleFormData((prev) => ({
                            ...prev,
                            timeSlotId: slot.id,
                          }))
                        }
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">
                            {slot.startTime} - {slot.endTime}
                          </span>
                          <Badge variant="outline">
                            {slot.available}/{slot.capacity} available
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vehicle">Assign Vehicle</Label>
                <Select
                  value={scheduleFormData.vehicleId}
                  onValueChange={(value) =>
                    setScheduleFormData((prev) => ({
                      ...prev,
                      vehicleId: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockVehicles
                      .filter((v) => v.status === "available")
                      .map((vehicle) => (
                        <SelectItem
                          key={vehicle.vehicleId}
                          value={vehicle.vehicleId}
                        >
                          {vehicle.vehicleNumber} ({vehicle.vehicleType}) -{" "}
                          {vehicle.capacity.weight}kg capacity
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="driver">Assign Driver</Label>
                <Select
                  value={scheduleFormData.driverId}
                  onValueChange={(value) =>
                    setScheduleFormData((prev) => ({
                      ...prev,
                      driverId: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockDrivers
                      .filter((d) => d.status === "available")
                      .map((driver) => (
                        <SelectItem
                          key={driver.driverId}
                          value={driver.driverId}
                        >
                          {driver.name} - {driver.experience}y exp (Rating:{" "}
                          {driver.rating}/5)
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="specialInstructions">Special Instructions</Label>
              <Textarea
                id="specialInstructions"
                placeholder="Enter delivery instructions (one per line)..."
                value={scheduleFormData.specialInstructions}
                onChange={(e) =>
                  setScheduleFormData((prev) => ({
                    ...prev,
                    specialInstructions: e.target.value,
                  }))
                }
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsScheduleModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleScheduleSubmit}
                disabled={
                  !scheduleFormData.poId ||
                  !selectedDate ||
                  !scheduleFormData.timeSlotId ||
                  !scheduleFormData.vehicleId ||
                  !scheduleFormData.driverId
                }
              >
                <Save className="h-4 w-4 mr-2" />
                Schedule Delivery
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tracking Modal */}
      <Dialog open={isTrackingModalOpen} onOpenChange={setIsTrackingModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Delivery Tracking: {selectedSchedule?.trackingInfo.trackingNumber}
            </DialogTitle>
          </DialogHeader>

          {selectedSchedule && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Current Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge
                        className={getDeliveryStatusColor(
                          selectedSchedule.currentStatus,
                        )}
                        size="lg"
                      >
                        {formatDeliveryStatus(selectedSchedule.currentStatus)}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span>
                          {selectedSchedule.trackingInfo.lastKnownLocationName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>
                          Last update:{" "}
                          {new Date(
                            selectedSchedule.trackingInfo.lastUpdated,
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-purple-500" />
                        <span>
                          {selectedSchedule.driver.name} •{" "}
                          {selectedSchedule.driver.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-green-500" />
                        <span>{selectedSchedule.vehicle.vehicleNumber}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Delivery Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedSchedule.trackingInfo.milestones.map(
                        (milestone, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-full ${
                                milestone.status === "reached"
                                  ? "bg-green-500"
                                  : milestone.status === "delayed"
                                    ? "bg-orange-500"
                                    : "bg-gray-300"
                              }`}
                            />
                            <div className="flex-1">
                              <div className="font-medium text-sm">
                                {milestone.milestone}
                              </div>
                              <div className="text-xs text-gray-500">
                                Expected:{" "}
                                {new Date(
                                  milestone.expectedTime,
                                ).toLocaleString()}
                              </div>
                              {milestone.actualTime && (
                                <div className="text-xs text-green-600">
                                  Actual:{" "}
                                  {new Date(
                                    milestone.actualTime,
                                  ).toLocaleString()}
                                </div>
                              )}
                              {milestone.delay && (
                                <div className="text-xs text-orange-600">
                                  Delayed by {milestone.delay} minutes
                                </div>
                              )}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Status History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedSchedule.statusHistory
                      .reverse()
                      .map((status, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 border rounded-lg"
                        >
                          <div
                            className={`w-3 h-3 rounded-full mt-1 ${
                              getDeliveryStatusColor(status.status).includes(
                                "green",
                              )
                                ? "bg-green-500"
                                : getDeliveryStatusColor(
                                      status.status,
                                    ).includes("orange")
                                  ? "bg-orange-500"
                                  : getDeliveryStatusColor(
                                        status.status,
                                      ).includes("blue")
                                    ? "bg-blue-500"
                                    : "bg-gray-500"
                            }`}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">
                                {formatDeliveryStatus(status.status)}
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(status.timestamp).toLocaleString()}
                              </span>
                            </div>
                            {status.locationName && (
                              <div className="text-sm text-gray-600 mb-1">
                                Location: {status.locationName}
                              </div>
                            )}
                            {status.notes && (
                              <div className="text-sm text-gray-700">
                                {status.notes}
                              </div>
                            )}
                            <div className="text-xs text-gray-500 mt-1">
                              Updated by: {status.updatedBy} (
                              {status.updateMethod})
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
