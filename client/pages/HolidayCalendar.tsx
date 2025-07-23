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
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  Calendar,
  MapPin,
  Star,
  Clock,
  TrendingUp,
  Eye,
  Download,
  Plus,
  ArrowLeft,
  Edit,
  Trash2,
  Copy,
  Globe,
  Building,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";

const holidayStats = [
  {
    label: "Total Holidays",
    value: 15,
    change: "This year",
    icon: Calendar,
    color: "text-emerald-600",
  },
  {
    label: "Regional Variations",
    value: 4,
    change: "Different locations",
    icon: MapPin,
    color: "text-blue-600",
  },
  {
    label: "Optional Holidays",
    value: 6,
    change: "Employee choice",
    icon: Star,
    color: "text-orange-600",
  },
  {
    label: "Upcoming",
    value: 3,
    change: "Next 30 days",
    icon: Clock,
    color: "text-construction-500",
  },
];

const holidays2024 = [
  {
    id: 1,
    name: "New Year's Day",
    date: "2024-01-01",
    type: "public",
    regions: ["All"],
    optional: false,
    description: "Start of the new year",
    category: "National",
    workingDay: false,
    compensatory: false,
    status: "past",
  },
  {
    id: 2,
    name: "Republic Day",
    date: "2024-01-26",
    type: "public",
    regions: ["All"],
    optional: false,
    description: "National holiday celebrating the constitution",
    category: "National",
    workingDay: false,
    compensatory: false,
    status: "past",
  },
  {
    id: 3,
    name: "Holi",
    date: "2024-03-25",
    type: "religious",
    regions: ["North", "West"],
    optional: true,
    description: "Festival of colors",
    category: "Religious",
    workingDay: false,
    compensatory: false,
    status: "upcoming",
  },
  {
    id: 4,
    name: "Good Friday",
    date: "2024-03-29",
    type: "religious",
    regions: ["All"],
    optional: true,
    description: "Christian observance",
    category: "Religious",
    workingDay: false,
    compensatory: false,
    status: "upcoming",
  },
  {
    id: 5,
    name: "Independence Day",
    date: "2024-08-15",
    type: "public",
    regions: ["All"],
    optional: false,
    description: "National independence celebration",
    category: "National",
    workingDay: false,
    compensatory: false,
    status: "future",
  },
  {
    id: 6,
    name: "Gandhi Jayanti",
    date: "2024-10-02",
    type: "public",
    regions: ["All"],
    optional: false,
    description: "Birth anniversary of Mahatma Gandhi",
    category: "National",
    workingDay: false,
    compensatory: false,
    status: "future",
  },
  {
    id: 7,
    name: "Diwali",
    date: "2024-11-01",
    type: "religious",
    regions: ["All"],
    optional: false,
    description: "Festival of lights",
    category: "Religious",
    workingDay: false,
    compensatory: false,
    status: "future",
  },
  {
    id: 8,
    name: "Christmas Day",
    date: "2024-12-25",
    type: "religious",
    regions: ["All"],
    optional: false,
    description: "Christian celebration",
    category: "Religious",
    workingDay: false,
    compensatory: false,
    status: "future",
  },
];

const regionalCalendars = [
  {
    region: "Head Office (Mumbai)",
    location: "Maharashtra, India",
    totalHolidays: 15,
    publicHolidays: 10,
    optionalHolidays: 5,
    employees: 156,
    uniqueHolidays: ["Gudi Padwa", "Ganesh Chaturthi"],
  },
  {
    region: "North Branch (Delhi)",
    location: "Delhi, India",
    totalHolidays: 16,
    publicHolidays: 10,
    optionalHolidays: 6,
    employees: 89,
    uniqueHolidays: ["Karva Chauth", "Dussehra"],
  },
  {
    region: "South Branch (Bangalore)",
    location: "Karnataka, India",
    totalHolidays: 14,
    publicHolidays: 9,
    optionalHolidays: 5,
    employees: 124,
    uniqueHolidays: ["Ugadi", "Kannada Rajyotsava"],
  },
  {
    region: "International (Singapore)",
    location: "Singapore",
    totalHolidays: 11,
    publicHolidays: 8,
    optionalHolidays: 3,
    employees: 45,
    uniqueHolidays: ["Vesak Day", "Deepavali"],
  },
];

const upcomingHolidays = [
  {
    name: "Holi",
    date: "2024-03-25",
    daysUntil: 15,
    type: "Religious",
    optional: true,
    affectedEmployees: 245,
    regions: ["North", "West"],
  },
  {
    name: "Good Friday",
    date: "2024-03-29",
    daysUntil: 19,
    type: "Religious",
    optional: true,
    affectedEmployees: 89,
    regions: ["All"],
  },
  {
    name: "Easter Monday",
    date: "2024-04-01",
    daysUntil: 22,
    type: "Religious",
    optional: true,
    affectedEmployees: 156,
    regions: ["International"],
  },
];

const holidayCategories = [
  {
    category: "National",
    count: 5,
    description: "Government declared national holidays",
    mandatory: true,
    color: "text-emerald-600",
    bgColor: "bg-emerald-600/10",
  },
  {
    category: "Religious",
    count: 8,
    description: "Religious festivals and observances",
    mandatory: false,
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
  },
  {
    category: "Regional",
    count: 6,
    description: "State or region specific holidays",
    mandatory: false,
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
  },
  {
    category: "Company",
    count: 2,
    description: "Organization specific holidays",
    mandatory: true,
    color: "text-orange-600",
    bgColor: "bg-orange-600/10",
  },
];

export default function HolidayCalendar() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "past":
        return "text-muted-foreground bg-muted/10";
      case "upcoming":
        return "text-orange-600 bg-orange-600/10";
      case "future":
        return "text-blue-600 bg-blue-600/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "public":
        return Globe;
      case "religious":
        return Star;
      case "regional":
        return MapPin;
      case "company":
        return Building;
      default:
        return Calendar;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <div className="animate-slideInDown">
          <Button variant="ghost" size="sm" asChild className="hover-lift">
            <Link to="/hrms/leave">
              <AnimatedIcon
                icon={ArrowLeft}
                animation="bounce"
                className="mr-2"
              />
              Back to Leave Management
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Holiday Calendar Management
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Calendar}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Manage organizational holidays and regional observances
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
              Export Calendar
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Add Holiday
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {holidayStats.map((stat, index) => (
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

        {/* Holiday Calendar Table */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Calendar}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>2024 Holiday Calendar</CardTitle>
            </div>
            <CardDescription>
              Complete list of holidays and observances for the year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Holiday
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Date
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Type
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Regions
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Properties
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {holidays2024.map((holiday, index) => (
                    <tr
                      key={holiday.id}
                      className="border-b hover:bg-muted/50 transition-colors animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <AnimatedIcon
                            icon={getTypeIcon(holiday.type)}
                            animation="bounce"
                            className="text-construction-500 h-4 w-4"
                          />
                          <div>
                            <p className="font-medium text-sm">
                              {holiday.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {holiday.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="text-sm font-medium">
                          {holiday.date}
                        </span>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline" className="text-xs">
                          {holiday.category}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          {holiday.regions.map((region, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs mr-1"
                            >
                              {region}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            {holiday.optional ? (
                              <Star className="h-3 w-3 text-orange-600" />
                            ) : (
                              <CheckCircle className="h-3 w-3 text-emerald-600" />
                            )}
                            <span className="text-xs">
                              {holiday.optional ? "Optional" : "Mandatory"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {holiday.workingDay ? (
                              <XCircle className="h-3 w-3 text-red-600" />
                            ) : (
                              <CheckCircle className="h-3 w-3 text-emerald-600" />
                            )}
                            <span className="text-xs">
                              {holiday.workingDay ? "Working Day" : "Day Off"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge
                          variant="outline"
                          className={`text-xs ${getStatusColor(holiday.status)}`}
                        >
                          {holiday.status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="text-xs">
                            <AnimatedIcon icon={Eye} className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="ghost" className="text-xs">
                            <AnimatedIcon
                              icon={Edit}
                              className="h-3 w-3 mr-1"
                            />
                            Edit
                          </Button>
                          <Button size="sm" variant="ghost" className="text-xs">
                            <AnimatedIcon
                              icon={Copy}
                              className="h-3 w-3 mr-1"
                            />
                            Clone
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Regional Calendars & Holiday Categories */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={MapPin}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Regional Calendars</CardTitle>
              </div>
              <CardDescription>
                Holiday variations across different locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regionalCalendars.map((region, index) => (
                  <div
                    key={region.region}
                    className="p-3 border rounded-lg animate-scaleIn space-y-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{region.region}</h4>
                      <Badge variant="outline" className="text-xs">
                        {region.employees} employees
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {region.location}
                    </p>
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div className="text-center">
                        <p className="text-muted-foreground">Total</p>
                        <p className="font-medium text-blue-600">
                          {region.totalHolidays}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Public</p>
                        <p className="font-medium text-emerald-600">
                          {region.publicHolidays}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Optional</p>
                        <p className="font-medium text-orange-600">
                          {region.optionalHolidays}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Unique holidays:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {region.uniqueHolidays.map((holiday, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
                            {holiday}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-slideInRight">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Star}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Holiday Categories</CardTitle>
              </div>
              <CardDescription>
                Classification of holidays by type and importance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {holidayCategories.map((category, index) => (
                  <div
                    key={category.category}
                    className="p-3 border rounded-lg animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${category.bgColor}`}
                        >
                          <PulsingDot className={category.color} />
                        </div>
                        <h4 className="font-medium text-sm">
                          {category.category}
                        </h4>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${category.color}`}
                      >
                        {category.count} holidays
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-2">
                      {category.mandatory ? (
                        <CheckCircle className="h-3 w-3 text-emerald-600" />
                      ) : (
                        <Star className="h-3 w-3 text-orange-600" />
                      )}
                      <span className="text-xs">
                        {category.mandatory ? "Mandatory" : "Optional"}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Upcoming Holidays */}
                <div className="mt-6">
                  <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                    <AnimatedIcon
                      icon={Clock}
                      animation="pulse"
                      className="text-orange-600"
                    />
                    Upcoming Holidays
                  </h4>
                  <div className="space-y-2">
                    {upcomingHolidays.map((holiday, index) => (
                      <div
                        key={holiday.name}
                        className="flex items-center justify-between p-2 border rounded animate-scaleIn"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div>
                          <p className="font-medium text-xs">{holiday.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {holiday.date} • {holiday.type}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="outline"
                            className="text-xs text-orange-600"
                          >
                            {holiday.daysUntil} days
                          </Badge>
                          <p className="text-xs text-muted-foreground">
                            {holiday.affectedEmployees} employees
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="animate-bounceIn">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Calendar}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Quick Actions</CardTitle>
            </div>
            <CardDescription>
              Common holiday calendar management tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
                Add Holiday
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Copy} animation="pulse" className="mr-2" />
                Import Calendar
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Download}
                  animation="float"
                  className="mr-2"
                />
                Export iCal
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Users} animation="glow" className="mr-2" />
                Notify Employees
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
