import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  MapPin,
  Globe,
  Smartphone,
  CheckCircle,
  AlertTriangle,
  Users,
  Building,
  Clock,
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  ArrowLeft,
  TrendingUp,
  Eye,
  Edit,
  Settings,
  Download,
  X,
  Navigation,
  Crosshair,
  Shield,
  Radio,
  Home,
  Car,
} from "lucide-react";
import { Link } from "react-router-dom";

const geoStats = [
  {
    label: "Active Geo-Fences",
    value: 8,
    change: "Across all locations",
    icon: MapPin,
    color: "text-primary",
  },
  {
    label: "Remote Workers",
    value: 45,
    change: "GPS tracked today",
    icon: Globe,
    color: "text-emerald-600",
  },
  {
    label: "Location Violations",
    value: 3,
    change: "This week",
    icon: AlertTriangle,
    color: "text-yellow-500",
  },
  {
    label: "Accuracy Rate",
    value: 96,
    change: "% GPS precision",
    icon: Crosshair,
    color: "text-construction-500",
  },
];

const geoFences = [
  {
    id: 1,
    name: "Main Office Building",
    type: "Office",
    address: "123 Business District, New York, NY",
    coordinates: "40.7128° N, 74.0060° W",
    radius: 50,
    activeEmployees: 145,
    totalEmployees: 150,
    status: "active",
    accuracy: 98,
    violations: 0,
    createdDate: "2024-01-01",
    description: "Primary office location with biometric backup",
  },
  {
    id: 2,
    name: "Construction Site A",
    type: "Construction",
    address: "456 Industrial Ave, Brooklyn, NY",
    coordinates: "40.6782° N, 73.9442° W",
    radius: 100,
    activeEmployees: 23,
    totalEmployees: 25,
    status: "active",
    accuracy: 95,
    violations: 1,
    createdDate: "2024-01-08",
    description: "Main construction project site",
  },
  {
    id: 3,
    name: "Warehouse Facility",
    type: "Warehouse",
    address: "789 Storage Lane, Queens, NY",
    coordinates: "40.7282° N, 73.7949° W",
    radius: 75,
    activeEmployees: 18,
    totalEmployees: 20,
    status: "active",
    accuracy: 97,
    violations: 0,
    createdDate: "2024-01-05",
    description: "Storage and logistics facility",
  },
  {
    id: 4,
    name: "Client Site - ABC Corp",
    type: "Client",
    address: "321 Corporate Plaza, Manhattan, NY",
    coordinates: "40.7589° N, 73.9851° W",
    radius: 30,
    activeEmployees: 8,
    totalEmployees: 10,
    status: "active",
    accuracy: 94,
    violations: 2,
    createdDate: "2024-01-12",
    description: "Temporary client project location",
  },
];

const locationTrackingData = [
  {
    id: 1,
    employee: "Sarah Mitchell",
    empId: "EMP001",
    department: "Engineering",
    currentLocation: "Main Office Building",
    checkInTime: "08:30:15",
    checkOutTime: "In Progress",
    gpsAccuracy: 98,
    locationStatus: "inside_fence",
    deviceType: "Mobile App",
    lastUpdate: "2 minutes ago",
    workHours: "7h 30m",
    violations: 0,
    batteryLevel: 85,
  },
  {
    id: 2,
    employee: "David Park",
    empId: "EMP002",
    department: "Operations",
    currentLocation: "Construction Site A",
    checkInTime: "07:00:45",
    checkOutTime: "In Progress",
    gpsAccuracy: 95,
    locationStatus: "inside_fence",
    deviceType: "Mobile App",
    lastUpdate: "5 minutes ago",
    workHours: "9h 45m",
    violations: 0,
    batteryLevel: 67,
  },
  {
    id: 3,
    employee: "Maria Rodriguez",
    empId: "EMP003",
    department: "Sales",
    currentLocation: "Client Site - ABC Corp",
    checkInTime: "09:15:30",
    checkOutTime: "In Progress",
    gpsAccuracy: 92,
    locationStatus: "outside_fence",
    deviceType: "Mobile App",
    lastUpdate: "1 minute ago",
    workHours: "7h 15m",
    violations: 1,
    batteryLevel: 45,
  },
  {
    id: 4,
    employee: "James Wilson",
    empId: "EMP004",
    department: "Quality",
    currentLocation: "Warehouse Facility",
    checkInTime: "08:45:20",
    checkOutTime: "In Progress",
    gpsAccuracy: 97,
    locationStatus: "inside_fence",
    deviceType: "Mobile App",
    lastUpdate: "3 minutes ago",
    workHours: "7h 45m",
    violations: 0,
    batteryLevel: 78,
  },
  {
    id: 5,
    employee: "Emma Thompson",
    empId: "EMP005",
    department: "HR",
    currentLocation: "Remote Work",
    checkInTime: "09:00:00",
    checkOutTime: "In Progress",
    gpsAccuracy: 89,
    locationStatus: "remote_verified",
    deviceType: "Web Portal",
    lastUpdate: "10 minutes ago",
    workHours: "7h 30m",
    violations: 0,
    batteryLevel: null,
  },
];

const geoSettings = [
  {
    category: "Location Accuracy",
    setting: "GPS Precision",
    value: "High (±5 meters)",
    status: "enabled",
    description: "Enhanced GPS accuracy for precise location tracking",
  },
  {
    category: "Geofence Alerts",
    setting: "Boundary Violations",
    value: "Real-time",
    status: "enabled",
    description: "Instant notifications for fence boundary violations",
  },
  {
    category: "Battery Optimization",
    setting: "Low Power Mode",
    value: "Auto-enable at 20%",
    status: "enabled",
    description: "Optimize tracking when device battery is low",
  },
  {
    category: "Privacy Controls",
    setting: "Location History",
    value: "30 days retention",
    status: "enabled",
    description: "How long location data is stored",
  },
];

export default function GeoFencingTracking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const filteredTracking = locationTrackingData.filter((data) => {
    const matchesSearch =
      data.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.currentLocation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || data.locationStatus === selectedStatus;
    const matchesLocation =
      selectedLocation === "all" || data.currentLocation === selectedLocation;
    return matchesSearch && matchesStatus && matchesLocation;
  });

  const getLocationStatusVariant = (status: string) => {
    switch (status) {
      case "inside_fence":
        return "default";
      case "outside_fence":
        return "destructive";
      case "remote_verified":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getLocationStatusIcon = (status: string) => {
    switch (status) {
      case "inside_fence":
        return CheckCircle;
      case "outside_fence":
        return AlertTriangle;
      case "remote_verified":
        return Globe;
      default:
        return MapPin;
    }
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 95) return "text-emerald-600";
    if (accuracy >= 90) return "text-yellow-600";
    return "text-red-600";
  };

  const getBatteryColor = (battery: number | null) => {
    if (battery === null) return "text-muted-foreground";
    if (battery >= 50) return "text-emerald-600";
    if (battery >= 20) return "text-yellow-600";
    return "text-red-600";
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case "Mobile App":
        return Smartphone;
      case "Web Portal":
        return Globe;
      case "GPS Device":
        return Navigation;
      default:
        return MapPin;
    }
  };

  const getFenceTypeIcon = (type: string) => {
    switch (type) {
      case "Office":
        return Building;
      case "Construction":
        return Settings;
      case "Warehouse":
        return Building;
      case "Client":
        return Users;
      case "Remote":
        return Home;
      default:
        return MapPin;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <div className="animate-slideInDown">
          <Button variant="ghost" size="sm" asChild className="hover-lift">
            <Link to="/hrms/attendance">
              <AnimatedIcon
                icon={ArrowLeft}
                animation="bounce"
                className="mr-2"
              />
              Back to Time & Attendance
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Geo-Fencing & Location Tracking
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={MapPin}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Location-based attendance tracking for remote and field workers
              </p>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon
                icon={Download}
                animation="bounce"
                className="mr-2"
              />
              Location Report
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Create Geo-Fence
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {geoStats.map((stat, index) => (
            <Card
              key={index}
              className="hover-lift animate-fadeInUp relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <AnimatedIcon
                    icon={stat.icon}
                    animation="float"
                    className={stat.color}
                  />
                </div>
                <div className="text-2xl font-bold">
                  <AnimatedCounter value={stat.value} />
                  {stat.label.includes("Rate") && (
                    <span className="text-sm font-normal">%</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Geo-Fences Overview */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={MapPin}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Active Geo-Fences</CardTitle>
            </div>
            <CardDescription>
              Configured location boundaries for attendance tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {geoFences.map((fence, index) => (
                <Card
                  key={fence.id}
                  className="hover-lift animate-scaleIn cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AnimatedIcon
                            icon={getFenceTypeIcon(fence.type)}
                            animation="float"
                            className="text-primary"
                          />
                          <div>
                            <h4 className="font-semibold text-sm">
                              {fence.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {fence.type}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {fence.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-1 text-xs">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="truncate">{fence.address}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Radius:</span>
                          <span className="font-medium">{fence.radius}m</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            Accuracy:
                          </span>
                          <span
                            className={`font-medium ${getAccuracyColor(
                              fence.accuracy,
                            )}`}
                          >
                            {fence.accuracy}%
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Active:</span>
                          <span className="font-medium">
                            {fence.activeEmployees}/{fence.totalEmployees}
                          </span>
                        </div>
                        {fence.violations > 0 && (
                          <div className="flex items-center gap-1 text-xs text-red-600">
                            <AlertTriangle className="h-3 w-3" />
                            <span>{fence.violations} violations</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover-lift flex-1"
                        >
                          <AnimatedIcon icon={Eye} size="sm" className="mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover-lift flex-1"
                        >
                          <AnimatedIcon
                            icon={Edit}
                            size="sm"
                            className="mr-1"
                          />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters & Search */}
        <Card className="animate-slideInUp">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by employee, ID, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Location status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="inside_fence">Inside Fence</SelectItem>
                  <SelectItem value="outside_fence">Outside Fence</SelectItem>
                  <SelectItem value="remote_verified">
                    Remote Verified
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger className="w-full md:w-48">
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Main Office Building">
                    Main Office
                  </SelectItem>
                  <SelectItem value="Construction Site A">
                    Construction Site A
                  </SelectItem>
                  <SelectItem value="Warehouse Facility">Warehouse</SelectItem>
                  <SelectItem value="Client Site - ABC Corp">
                    Client Site
                  </SelectItem>
                  <SelectItem value="Remote Work">Remote Work</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Location Tracking */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Users}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Real-time Location Tracking</CardTitle>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <AnimatedCounter value={filteredTracking.length} /> employees
              </Badge>
            </div>
            <CardDescription>
              Live GPS tracking and geo-fence compliance monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Current Location</TableHead>
                  <TableHead>Time & Status</TableHead>
                  <TableHead>GPS Details</TableHead>
                  <TableHead>Device Info</TableHead>
                  <TableHead>Compliance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTracking.map((tracking, index) => (
                  <TableRow
                    key={tracking.id}
                    className="animate-fadeInUp hover:bg-muted/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {tracking.employee}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ID: {tracking.empId}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Building className="h-3 w-3" />
                          {tracking.department}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-primary" />
                          <span className="font-medium text-sm">
                            {tracking.currentLocation}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Updated: {tracking.lastUpdate}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3 text-emerald-600" />
                          <span>In: {tracking.checkInTime}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3 text-red-500" />
                          <span>Out: {tracking.checkOutTime}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Total: {tracking.workHours}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Crosshair className="h-3 w-3 text-muted-foreground" />
                          <span
                            className={`text-sm font-medium ${getAccuracyColor(
                              tracking.gpsAccuracy,
                            )}`}
                          >
                            {tracking.gpsAccuracy}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          GPS Accuracy
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <AnimatedIcon
                            icon={getDeviceIcon(tracking.deviceType)}
                            className="h-3 w-3 text-muted-foreground"
                          />
                          <span className="text-sm">{tracking.deviceType}</span>
                        </div>
                        {tracking.batteryLevel && (
                          <div className="flex items-center gap-1">
                            <Radio className="h-3 w-3 text-muted-foreground" />
                            <span
                              className={`text-xs ${getBatteryColor(
                                tracking.batteryLevel,
                              )}`}
                            >
                              {tracking.batteryLevel}% battery
                            </span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge
                          variant={getLocationStatusVariant(
                            tracking.locationStatus,
                          )}
                          className="flex items-center gap-1 w-fit"
                        >
                          {tracking.locationStatus === "outside_fence" && (
                            <PulsingDot className="scale-50" />
                          )}
                          <AnimatedIcon
                            icon={getLocationStatusIcon(
                              tracking.locationStatus,
                            )}
                            className="h-3 w-3"
                          />
                          {tracking.locationStatus.replace("_", " ")}
                        </Badge>
                        {tracking.violations > 0 && (
                          <div className="flex items-center gap-1 text-xs text-red-600">
                            <AlertTriangle className="h-3 w-3" />
                            <span>{tracking.violations} violations</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover-lift"
                          >
                            <AnimatedIcon
                              icon={MoreHorizontal}
                              className="h-4 w-4"
                            />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <AnimatedIcon icon={Eye} className="mr-2 h-4 w-4" />
                            View Location History
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AnimatedIcon
                              icon={MapPin}
                              className="mr-2 h-4 w-4"
                            />
                            Show on Map
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AnimatedIcon
                              icon={Settings}
                              className="mr-2 h-4 w-4"
                            />
                            Location Settings
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AnimatedIcon
                              icon={Download}
                              className="mr-2 h-4 w-4"
                            />
                            Export Track Log
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Location Settings */}
        <Card className="animate-bounceIn">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Settings}
                animation="glow"
                className="text-construction-500"
              />
              <CardTitle>Location Tracking Settings</CardTitle>
            </div>
            <CardDescription>
              Configuration options for geo-fencing and location tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {geoSettings.map((setting, index) => (
                <Card
                  key={setting.category}
                  className="hover-lift animate-scaleIn cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">
                          {setting.setting}
                        </h4>
                        <Badge
                          variant={
                            setting.status === "enabled" ? "default" : "outline"
                          }
                          className="text-xs"
                        >
                          {setting.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {setting.category}
                        </p>
                        <p className="text-sm font-medium">{setting.value}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {setting.description}
                      </p>
                      <Button
                        size="sm"
                        className="w-full hover-lift"
                        variant="outline"
                      >
                        <AnimatedIcon
                          icon={Settings}
                          size="sm"
                          className="mr-2"
                        />
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
