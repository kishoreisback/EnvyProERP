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
  CalendarDays,
  TrendingUp,
  Calculator,
  RefreshCw,
  Eye,
  Download,
  Plus,
  ArrowLeft,
  User,
  Building,
  Clock,
  CheckCircle,
  AlertTriangle,
  Target,
  BarChart3,
  Filter,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";

const balanceStats = [
  {
    label: "Total Available",
    value: 2847,
    change: "Leave days across team",
    icon: CalendarDays,
    color: "text-emerald-600",
  },
  {
    label: "Accrued This Month",
    value: 289,
    change: "8% increase",
    icon: Plus,
    color: "text-blue-600",
  },
  {
    label: "Used This Month",
    value: 156,
    change: "12% of available",
    icon: TrendingUp,
    color: "text-orange-600",
  },
  {
    label: "Expiring Soon",
    value: 42,
    change: "Next 30 days",
    icon: AlertTriangle,
    color: "text-red-600",
  },
];

const employeeBalances = [
  {
    id: 1,
    employee: "Sarah Mitchell",
    employeeId: "EMP001",
    department: "Engineering",
    joinDate: "2022-01-15",
    balances: {
      annual: { total: 25, used: 8, available: 17, accrued: 22, expiring: 0 },
      sick: { total: 12, used: 3, available: 9, accrued: 12, expiring: 0 },
      personal: { total: 5, used: 1, available: 4, accrued: 5, expiring: 0 },
      emergency: { total: 5, used: 0, available: 5, accrued: 5, expiring: 0 },
    },
    lastAccrual: "2024-01-01",
    nextAccrual: "2024-02-01",
  },
  {
    id: 2,
    employee: "David Park",
    employeeId: "EMP002",
    department: "Operations",
    joinDate: "2021-08-20",
    balances: {
      annual: { total: 25, used: 12, available: 13, accrued: 25, expiring: 3 },
      sick: { total: 12, used: 5, available: 7, accrued: 12, expiring: 0 },
      personal: { total: 5, used: 2, available: 3, accrued: 5, expiring: 1 },
      emergency: { total: 5, used: 1, available: 4, accrued: 5, expiring: 0 },
    },
    lastAccrual: "2024-01-01",
    nextAccrual: "2024-02-01",
  },
  {
    id: 3,
    employee: "Maria Rodriguez",
    employeeId: "EMP003",
    department: "Sales",
    joinDate: "2023-03-10",
    balances: {
      annual: { total: 20, used: 6, available: 14, accrued: 18, expiring: 0 },
      sick: { total: 12, used: 2, available: 10, accrued: 9, expiring: 0 },
      personal: { total: 4, used: 0, available: 4, accrued: 3, expiring: 0 },
      emergency: { total: 5, used: 0, available: 5, accrued: 4, expiring: 0 },
    },
    lastAccrual: "2024-01-01",
    nextAccrual: "2024-02-01",
  },
  {
    id: 4,
    employee: "James Wilson",
    employeeId: "EMP004",
    department: "Quality",
    joinDate: "2020-11-05",
    balances: {
      annual: { total: 25, used: 15, available: 10, accrued: 25, expiring: 5 },
      sick: { total: 12, used: 4, available: 8, accrued: 12, expiring: 0 },
      personal: { total: 5, used: 3, available: 2, accrued: 5, expiring: 0 },
      emergency: { total: 5, used: 2, available: 3, accrued: 5, expiring: 0 },
    },
    lastAccrual: "2024-01-01",
    nextAccrual: "2024-02-01",
  },
  {
    id: 5,
    employee: "Lisa Anderson",
    employeeId: "EMP005",
    department: "HR",
    joinDate: "2019-05-18",
    balances: {
      annual: { total: 28, used: 18, available: 10, accrued: 28, expiring: 8 },
      sick: { total: 12, used: 6, available: 6, accrued: 12, expiring: 0 },
      personal: { total: 6, used: 4, available: 2, accrued: 6, expiring: 1 },
      emergency: { total: 5, used: 1, available: 4, accrued: 5, expiring: 0 },
    },
    lastAccrual: "2024-01-01",
    nextAccrual: "2024-02-01",
  },
];

const accrualRules = [
  {
    leaveType: "Annual Leave",
    pattern: "Monthly",
    rate: "2.08 days/month",
    proration: "Yes",
    maxCarryover: "5 days",
    expiry: "End of next year",
    eligibility: "All permanent employees",
  },
  {
    leaveType: "Sick Leave",
    pattern: "Monthly",
    rate: "1.0 days/month",
    proration: "Yes",
    maxCarryover: "Not allowed",
    expiry: "End of year",
    eligibility: "All employees",
  },
  {
    leaveType: "Personal Leave",
    pattern: "Annual",
    rate: "5 days/year",
    proration: "Yes",
    maxCarryover: "Not allowed",
    expiry: "End of year",
    eligibility: "All permanent employees",
  },
  {
    leaveType: "Emergency Leave",
    pattern: "Annual",
    rate: "5 days/year",
    proration: "No",
    maxCarryover: "Not allowed",
    expiry: "End of year",
    eligibility: "All employees",
  },
];

const departmentSummary = [
  {
    department: "Engineering",
    employees: 45,
    totalDays: 1260,
    usedDays: 389,
    availableDays: 871,
    utilizationRate: 30.9,
    expiringDays: 12,
  },
  {
    department: "Operations",
    employees: 38,
    totalDays: 1064,
    usedDays: 298,
    availableDays: 766,
    utilizationRate: 28.0,
    expiringDays: 8,
  },
  {
    department: "Sales",
    employees: 32,
    totalDays: 896,
    usedDays: 267,
    availableDays: 629,
    utilizationRate: 29.8,
    expiringDays: 15,
  },
  {
    department: "Quality",
    employees: 28,
    totalDays: 784,
    usedDays: 198,
    availableDays: 586,
    utilizationRate: 25.3,
    expiringDays: 5,
  },
  {
    department: "HR",
    employees: 15,
    totalDays: 420,
    usedDays: 142,
    availableDays: 278,
    utilizationRate: 33.8,
    expiringDays: 2,
  },
];

export default function LeaveBalancesAccruals() {
  const getUtilizationColor = (rate: number) => {
    if (rate >= 40) return "text-red-600";
    if (rate >= 30) return "text-orange-600";
    if (rate >= 20) return "text-yellow-600";
    return "text-emerald-600";
  };

  const getBalancePercentage = (used: number, total: number) => {
    return ((used / total) * 100).toFixed(1);
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
                Leave Balances & Accruals
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={CalendarDays}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Track and manage employee leave balances and accrual
                calculations
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
              Export Balances
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon
                icon={RefreshCw}
                animation="bounce"
                className="mr-2"
              />
              Recalculate All
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {balanceStats.map((stat, index) => (
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

        {/* Employee Balances */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={User}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Employee Leave Balances</CardTitle>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="hover-lift">
                  <AnimatedIcon
                    icon={Filter}
                    animation="bounce"
                    className="mr-2"
                  />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="hover-lift">
                  <AnimatedIcon
                    icon={Search}
                    animation="pulse"
                    className="mr-2"
                  />
                  Search
                </Button>
              </div>
            </div>
            <CardDescription>
              Individual employee leave balances and accrual status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Employee
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Annual Leave
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Sick Leave
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Personal Leave
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Emergency Leave
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Next Accrual
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employeeBalances.map((employee, index) => (
                    <tr
                      key={employee.id}
                      className="border-b hover:bg-muted/50 transition-colors animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td className="p-3">
                        <div>
                          <p className="font-medium text-sm">
                            {employee.employee}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {employee.employeeId} • {employee.department}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Joined: {employee.joinDate}
                          </p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-emerald-600">
                              {employee.balances.annual.available}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              / {employee.balances.annual.total}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Used: {employee.balances.annual.used} days (
                            {getBalancePercentage(
                              employee.balances.annual.used,
                              employee.balances.annual.total,
                            )}
                            %)
                          </div>
                          {employee.balances.annual.expiring > 0 && (
                            <Badge
                              variant="outline"
                              className="text-xs text-red-600 bg-red-600/10"
                            >
                              {employee.balances.annual.expiring} expiring
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-blue-600">
                              {employee.balances.sick.available}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              / {employee.balances.sick.total}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Used: {employee.balances.sick.used} days (
                            {getBalancePercentage(
                              employee.balances.sick.used,
                              employee.balances.sick.total,
                            )}
                            %)
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-purple-600">
                              {employee.balances.personal.available}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              / {employee.balances.personal.total}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Used: {employee.balances.personal.used} days (
                            {getBalancePercentage(
                              employee.balances.personal.used,
                              employee.balances.personal.total,
                            )}
                            %)
                          </div>
                          {employee.balances.personal.expiring > 0 && (
                            <Badge
                              variant="outline"
                              className="text-xs text-red-600 bg-red-600/10"
                            >
                              {employee.balances.personal.expiring} expiring
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-orange-600">
                              {employee.balances.emergency.available}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              / {employee.balances.emergency.total}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Used: {employee.balances.emergency.used} days (
                            {getBalancePercentage(
                              employee.balances.emergency.used,
                              employee.balances.emergency.total,
                            )}
                            %)
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-xs">
                          <p className="font-medium">{employee.nextAccrual}</p>
                          <p className="text-muted-foreground">
                            Last: {employee.lastAccrual}
                          </p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="text-xs">
                            <AnimatedIcon icon={Eye} className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="ghost" className="text-xs">
                            <AnimatedIcon
                              icon={Calculator}
                              className="h-3 w-3 mr-1"
                            />
                            Adjust
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

        {/* Accrual Rules & Department Summary */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Calculator}
                  animation="bounce"
                  className="text-primary"
                />
                <CardTitle>Accrual Rules</CardTitle>
              </div>
              <CardDescription>
                Configuration for leave accrual calculations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accrualRules.map((rule, index) => (
                  <div
                    key={rule.leaveType}
                    className="p-3 border rounded-lg animate-scaleIn space-y-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{rule.leaveType}</h4>
                      <Badge variant="outline" className="text-xs">
                        {rule.pattern}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">Accrual Rate</p>
                        <p className="font-medium text-emerald-600">
                          {rule.rate}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Carryover</p>
                        <p className="font-medium">{rule.maxCarryover}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">Proration</p>
                        <p className="font-medium">{rule.proration}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Expiry</p>
                        <p className="font-medium">{rule.expiry}</p>
                      </div>
                    </div>
                    <div className="text-xs">
                      <p className="text-muted-foreground">Eligibility</p>
                      <p className="font-medium">{rule.eligibility}</p>
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
                  icon={Building}
                  animation="pulse"
                  className="text-construction-500"
                />
                <CardTitle>Department Summary</CardTitle>
              </div>
              <CardDescription>
                Leave balance overview by department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentSummary.map((dept, index) => (
                  <div
                    key={dept.department}
                    className="p-3 border rounded-lg animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{dept.department}</h4>
                      <Badge variant="outline" className="text-xs">
                        {dept.employees} employees
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-xs mb-2">
                      <div className="text-center">
                        <p className="text-muted-foreground">Total</p>
                        <p className="font-medium text-blue-600">
                          {dept.totalDays}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Used</p>
                        <p className="font-medium text-orange-600">
                          {dept.usedDays}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Available</p>
                        <p className="font-medium text-emerald-600">
                          {dept.availableDays}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Utilization:
                      </span>
                      <span
                        className={`font-medium ${getUtilizationColor(
                          dept.utilizationRate,
                        )}`}
                      >
                        {dept.utilizationRate}%
                      </span>
                    </div>
                    {dept.expiringDays > 0 && (
                      <div className="flex items-center justify-between text-xs mt-1">
                        <span className="text-muted-foreground">Expiring:</span>
                        <span className="font-medium text-red-600">
                          {dept.expiringDays} days
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="animate-bounceIn">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Target}
                animation="glow"
                className="text-primary"
              />
              <CardTitle>Quick Actions</CardTitle>
            </div>
            <CardDescription>
              Common balance and accrual management tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={RefreshCw}
                  animation="bounce"
                  className="mr-2"
                />
                Recalculate Balances
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Calculator}
                  animation="pulse"
                  className="mr-2"
                />
                Manual Adjustment
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={BarChart3}
                  animation="float"
                  className="mr-2"
                />
                Usage Analytics
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={AlertTriangle}
                  animation="glow"
                  className="mr-2"
                />
                Expiry Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
