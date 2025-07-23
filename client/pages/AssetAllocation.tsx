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
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  Monitor,
  Laptop,
  Smartphone,
  Key,
  Building,
  CheckCircle,
  Clock,
  Package,
  Search,
  Plus,
  ArrowLeft,
  TrendingUp,
  Users,
  CreditCard,
  Headphones,
  Car,
} from "lucide-react";
import { Link } from "react-router-dom";

const assetStats = [
  {
    label: "Total Assets",
    value: 245,
    change: "Across all categories",
    icon: Package,
    color: "text-primary",
  },
  {
    label: "Allocated Assets",
    value: 189,
    change: "+12 this month",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
  {
    label: "Available Assets",
    value: 56,
    change: "Ready for assignment",
    icon: Clock,
    color: "text-yellow-500",
  },
  {
    label: "Under Maintenance",
    value: 8,
    change: "Being serviced",
    icon: TrendingUp,
    color: "text-construction-500",
  },
];

const assetCategories = [
  {
    category: "IT Equipment",
    icon: Monitor,
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    total: 120,
    allocated: 95,
    available: 25,
    items: ["Laptops", "Monitors", "Keyboards", "Mice"],
  },
  {
    category: "Mobile Devices",
    icon: Smartphone,
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
    total: 45,
    allocated: 38,
    available: 7,
    items: ["Smartphones", "Tablets", "Mobile Hotspots"],
  },
  {
    category: "Access Control",
    icon: Key,
    color: "text-emerald-600",
    bgColor: "bg-emerald-600/10",
    total: 80,
    allocated: 56,
    available: 24,
    items: ["Key Cards", "Office Keys", "Parking Passes"],
  },
  {
    category: "Office Space",
    icon: Building,
    color: "text-orange-600",
    bgColor: "bg-orange-600/10",
    total: 150,
    allocated: 128,
    available: 22,
    items: ["Workstations", "Parking Spots", "Lockers"],
  },
];

const recentAllocations = [
  {
    id: 1,
    employeeName: "Sarah Mitchell",
    department: "Engineering",
    assetType: "MacBook Pro 16",
    category: "IT Equipment",
    serialNumber: "MBP2024001",
    allocationDate: "2024-01-15",
    status: "allocated",
    condition: "New",
    location: "Office Floor 3",
  },
  {
    id: 2,
    employeeName: "David Park",
    department: "Operations",
    assetType: "iPhone 15 Pro",
    category: "Mobile Device",
    serialNumber: "IPH2024045",
    allocationDate: "2024-01-14",
    status: "allocated",
    condition: "New",
    location: "Remote Employee",
  },
  {
    id: 3,
    employeeName: "Maria Rodriguez",
    department: "Safety",
    assetType: "Office Key Card",
    category: "Access Control",
    serialNumber: "KEY2024078",
    allocationDate: "2024-01-16",
    status: "pending_pickup",
    condition: "New",
    location: "Reception Desk",
  },
  {
    id: 4,
    employeeName: "James Wilson",
    department: "Quality",
    assetType: "Parking Space #45",
    category: "Office Space",
    serialNumber: "PARK045",
    allocationDate: "2024-01-13",
    status: "allocated",
    condition: "Good",
    location: "Building A",
  },
];

export default function AssetAllocation() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAllocations = recentAllocations.filter(
    (allocation) =>
      allocation.employeeName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      allocation.assetType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      allocation.department.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "allocated":
        return "default";
      case "pending_pickup":
        return "secondary";
      case "returned":
        return "outline";
      default:
        return "outline";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "New":
        return "text-emerald-600";
      case "Good":
        return "text-blue-600";
      case "Fair":
        return "text-yellow-600";
      case "Poor":
        return "text-red-600";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <div className="animate-slideInDown">
          <Button variant="ghost" size="sm" asChild className="hover-lift">
            <Link to="/hrms/onboarding">
              <AnimatedIcon
                icon={ArrowLeft}
                animation="bounce"
                className="mr-2"
              />
              Back to Onboarding & Offboarding
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Asset Allocation
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Package}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Company equipment and resource assignment management
              </p>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon
                icon={Package}
                animation="bounce"
                className="mr-2"
              />
              Asset Inventory
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Allocate Asset
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {assetStats.map((stat, index) => (
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
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Asset Categories */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Package}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Asset Categories</CardTitle>
            </div>
            <CardDescription>
              Equipment and resource allocation by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {assetCategories.map((category, index) => (
                <Card
                  key={category.category}
                  className="hover-lift animate-scaleIn cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${category.bgColor}`}>
                          <AnimatedIcon
                            icon={category.icon}
                            animation="float"
                            className={category.color}
                          />
                        </div>
                        <h4 className="font-semibold text-sm">
                          {category.category}
                        </h4>
                      </div>
                      <div className="space-y-1">
                        {category.items.map((item, idx) => (
                          <p
                            key={idx}
                            className="text-xs text-muted-foreground"
                          >
                            • {item}
                          </p>
                        ))}
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <p className="text-muted-foreground">Total</p>
                          <p className="font-semibold">
                            <AnimatedCounter value={category.total} />
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Allocated</p>
                          <p className="font-semibold text-emerald-600">
                            <AnimatedCounter value={category.allocated} />
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Available</p>
                          <p className="font-semibold text-yellow-600">
                            <AnimatedCounter value={category.available} />
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <Card className="animate-slideInUp">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by employee, asset type, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* Recent Allocations */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Users}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Recent Asset Allocations</CardTitle>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <AnimatedCounter value={filteredAllocations.length} />{" "}
                allocations
              </Badge>
            </div>
            <CardDescription>
              Latest equipment and resource assignments to employees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee & Department</TableHead>
                  <TableHead>Asset Details</TableHead>
                  <TableHead>Status & Condition</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Allocation Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAllocations.map((allocation, index) => (
                  <TableRow
                    key={allocation.id}
                    className="animate-fadeInUp hover:bg-muted/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {allocation.employeeName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {allocation.department}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {allocation.assetType}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {allocation.category}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          S/N: {allocation.serialNumber}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge
                          variant={getStatusVariant(allocation.status)}
                          className="flex items-center gap-1 w-fit"
                        >
                          {allocation.status === "pending_pickup" && (
                            <PulsingDot className="scale-50" />
                          )}
                          <CheckCircle className="h-3 w-3" />
                          {allocation.status.replace("_", " ")}
                        </Badge>
                        <p
                          className={`text-xs font-medium ${getConditionColor(
                            allocation.condition,
                          )}`}
                        >
                          {allocation.condition} Condition
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Building className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{allocation.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{allocation.allocationDate}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover-lift"
                        >
                          <AnimatedIcon icon={Monitor} className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover-lift"
                        >
                          <AnimatedIcon icon={CreditCard} className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
