import { MainLayout } from "@/components/layout/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AnimatedIcon,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import {
  UserCheck,
  Plus,
  Users,
  Clock,
  DollarSign,
  TrendingUp,
  Zap,
  Award,
  BarChart3,
  Building,
  FileText,
  CheckCircle,
  BookOpen,
  UserPlus,
  MessageSquare,
  Settings,
  Globe,
  Layers3,
  Building2,
  Eye,
  Edit,
  Target,
  User,
  LogIn,
  Crown,
  Shield,
  Plane,
  Headphones,
  LogOut,
  Folder,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  PermissionProvider,
  usePermissions,
} from "@/components/user-management/PermissionProvider";
import { TenantUser } from "@/components/user-management/types";
import { hrmsAvailableTenants } from "@/components/hrms/constants";

function HRMSContent() {
  const { user: currentUser, hasPermission, isTenantAdmin } = usePermissions();
  const [selectedTenant, setSelectedTenant] = useState<string>(
    hrmsAvailableTenants[0].id,
  );
  const [tenantData, setTenantData] = useState(hrmsAvailableTenants[0]);
  const [modals, setModals] = useState({
    addEmployee: false,
    processPayroll: false,
    leaveApproval: false,
  });

  // Update tenant data when selection changes
  useEffect(() => {
    const tenant = hrmsAvailableTenants.find((t) => t.id === selectedTenant);
    if (tenant) {
      setTenantData(tenant);
    }
  }, [selectedTenant]);

  // Check if user is Super Admin
  const isSuperAdmin =
    currentUser?.role === "super_admin" || currentUser?.tenantRole === "owner";

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Tenant Selection Header - Only for Super Admin */}
        {isSuperAdmin && (
          <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/50 to-transparent animate-fadeInUp">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-900">
                      Super Admin View
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-700 border-blue-300"
                    >
                      Multi-Tenant Access
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      Select Tenant:
                    </span>
                    <Select
                      value={selectedTenant}
                      onValueChange={setSelectedTenant}
                    >
                      <SelectTrigger className="w-64">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {hrmsAvailableTenants.map((tenant) => (
                          <SelectItem key={tenant.id} value={tenant.id}>
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-3 h-3 rounded-full ${tenant.color}`}
                              />
                              <div>
                                <div className="font-medium">{tenant.name}</div>
                                <div className="text-xs text-gray-500">
                                  {tenant.type}
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Link to="/hrms/tenant/overview">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Layers3 className="h-4 w-4 mr-2" />
                    View Tenant HRMS
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tenant Details Card - Only for Super Admin */}
        {isSuperAdmin && (
          <Card className="animate-fadeInUp border-dashed border-2 border-blue-200 bg-blue-50/30">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-4 h-4 rounded-full ${tenantData.color}`}
                    />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {tenantData.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-700"
                    >
                      {tenantData.type}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Industry:</span>
                      <span className="font-medium">
                        {tenantData.industry.replace("_", " ").toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Employees:</span>
                      <span className="font-medium text-blue-600">
                        {tenantData.stats?.totalEmployees}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Payroll:</span>
                      <span className="font-medium text-green-600">
                        {tenantData.stats?.monthlyPayroll}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Attendance Rate:</span>
                      <span className="font-medium text-purple-600">
                        {tenantData.stats?.attendanceRate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-3">
                  <p className="text-sm text-gray-600 mb-2">
                    Access the full tenant-driven HRMS experience with
                    comprehensive employee management, tenant-specific
                    analytics, and advanced HR workflows.
                  </p>
                  <Link to={`/hrms/tenant/overview?tenant=${selectedTenant}`}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Building2 className="h-4 w-4 mr-2" />
                      Open Tenant HRMS Dashboard
                    </Button>
                  </Link>
                  <div className="text-xs text-center text-gray-500">
                    Full tenant isolation • Advanced analytics • Custom
                    workflows
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current Tenant Info */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${tenantData.color}`} />
              <h1 className="text-3xl font-bold gradient-text">
                {isSuperAdmin
                  ? `${tenantData.name} - HRMS`
                  : "Human Resource Management"}
              </h1>
              <GlowingOrb className="animate-pulse" />
              {isSuperAdmin && (
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700"
                >
                  {tenantData.type}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Award}
                animation="glow"
                className="text-construction-500"
              />
              <p className="text-muted-foreground">
                {isSuperAdmin
                  ? `Managing ${tenantData.name} - ${tenantData.type} HR Operations`
                  : "Manage workforce, payroll, and employee relations"}
              </p>
            </div>
          </div>
          <button
            className="px-6 py-3 bg-gradient-to-r from-construction-500 to-primary text-white rounded-md hover:from-construction-600 hover:to-primary/90 transition-all duration-200 font-medium shadow-lg cursor-pointer"
            onClick={() =>
              setModals((prev) => ({ ...prev, addEmployee: true }))
            }
          >
            <Plus className="h-4 w-4 mr-2 inline" />
            Add Employee
          </button>
        </div>

        {/* HRMS Module Overview */}
        <Card className="hover-lift animate-fadeInUp relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-construction-500/5 via-transparent to-primary/5" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AnimatedIcon
                icon={UserCheck}
                animation="float"
                className="text-construction-600"
                size="lg"
              />
              HRMS Modules
            </CardTitle>
            <CardDescription>
              Comprehensive human resource management system with all features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main HRMS Modules */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Link to="/hrms/dashboard" className="block">
                <Card className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={BarChart3}
                        animation="pulse"
                        className="text-primary"
                      />
                      <h3 className="font-semibold">HRMS Dashboard</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Analytics, notifications, and approval workflows
                    </p>
                    <Button
                      size="sm"
                      className="w-full hover-lift pointer-events-none"
                      variant="outline"
                    >
                      <AnimatedIcon icon={Eye} size="sm" className="mr-2" />
                      View Dashboard
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/employees" className="block">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-construction-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={Users}
                        animation="bounce"
                        className="text-construction-600"
                      />
                      <h3 className="font-semibold">Employee Management</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Master data, profiles, and employee information
                    </p>
                    <Button
                      size="sm"
                      className="w-full hover-lift pointer-events-none"
                      variant="outline"
                    >
                      <AnimatedIcon icon={Edit} size="sm" className="mr-2" />
                      Manage Employees
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/structure" className="block">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={Building}
                        animation="float"
                        className="text-emerald-600"
                      />
                      <h3 className="font-semibold">
                        Organizational Structure
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Departments, units, positions, and hierarchy
                    </p>
                    <Button
                      size="sm"
                      className="w-full hover-lift pointer-events-none"
                      variant="outline"
                    >
                      <AnimatedIcon icon={Target} size="sm" className="mr-2" />
                      View Structure
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/employee-portal" className="block">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-safety-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={User}
                        animation="pulse"
                        className="text-safety-600"
                      />
                      <h3 className="font-semibold">Employee Self-Service</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Personal portal for leave, timesheets, and profile
                    </p>
                    <Button
                      size="sm"
                      className="w-full hover-lift pointer-events-none"
                      variant="outline"
                    >
                      <AnimatedIcon icon={LogIn} size="sm" className="mr-2" />
                      Employee Portal
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/manager-portal" className="block">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={Crown}
                        animation="glow"
                        className="text-yellow-600"
                      />
                      <h3 className="font-semibold">Manager Self-Service</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Team management, approvals, and performance
                    </p>
                    <Button
                      size="sm"
                      className="w-full hover-lift pointer-events-none"
                      variant="outline"
                    >
                      <AnimatedIcon icon={Shield} size="sm" className="mr-2" />
                      Manager Portal
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/recruitment" className="block">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={UserPlus}
                        animation="bounce"
                        className="text-green-600"
                      />
                      <h3 className="font-semibold">Recruitment & Talent</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Complete talent acquisition and hiring workflow
                    </p>
                    <Button
                      size="sm"
                      className="w-full hover-lift pointer-events-none"
                      variant="outline"
                    >
                      <AnimatedIcon icon={Target} size="sm" className="mr-2" />
                      Access Recruitment
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/onboarding" className="block">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.6s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={Users}
                        animation="bounce"
                        className="text-orange-600"
                      />
                      <h3 className="font-semibold">
                        Onboarding & Offboarding
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Employee lifecycle from hire to departure
                    </p>
                    <Button
                      size="sm"
                      className="w-full hover-lift pointer-events-none"
                      variant="outline"
                    >
                      <AnimatedIcon
                        icon={UserPlus}
                        size="sm"
                        className="mr-2"
                      />
                      Access Module
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/attendance" className="block">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.7s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={Clock}
                        animation="bounce"
                        className="text-indigo-600"
                      />
                      <h3 className="font-semibold">Time & Attendance</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Comprehensive attendance tracking and workforce management
                    </p>
                    <Button
                      size="sm"
                      className="w-full hover-lift pointer-events-none"
                      variant="outline"
                    >
                      <AnimatedIcon
                        icon={UserCheck}
                        size="sm"
                        className="mr-2"
                      />
                      Access Module
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/leave" className="block">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.8s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={BookOpen}
                        animation="bounce"
                        className="text-emerald-600"
                      />
                      <h3 className="font-semibold">
                        Leave & Absence Management
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Complete leave management with policies and approvals
                    </p>
                    <Button
                      size="sm"
                      className="w-full hover-lift pointer-events-none"
                      variant="outline"
                    >
                      <AnimatedIcon
                        icon={CheckCircle}
                        size="sm"
                        className="mr-2"
                      />
                      Access Module
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/payroll" className="block">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "0.9s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={DollarSign}
                        animation="bounce"
                        className="text-yellow-600"
                      />
                      <h3 className="font-semibold">Payroll Management</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Complete Indian payroll with statutory compliance
                    </p>
                    <Button
                      size="sm"
                      className="w-full hover-lift pointer-events-none"
                      variant="outline"
                    >
                      <AnimatedIcon
                        icon={DollarSign}
                        size="sm"
                        className="mr-2"
                      />
                      Access Module
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/performance" className="block">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "1.0s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={Target}
                        animation="bounce"
                        className="text-purple-600"
                      />
                      <h3 className="font-semibold">Performance Management</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Goal setting, appraisals, and development planning
                    </p>
                    <Button
                      size="sm"
                      className="w-full hover-lift pointer-events-none"
                      variant="outline"
                    >
                      <AnimatedIcon icon={Target} size="sm" className="mr-2" />
                      Access Module
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/learning" className="block">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "1.1s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={BookOpen}
                        animation="bounce"
                        className="text-green-600"
                      />
                      <h3 className="font-semibold">Learning & Development</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Training programs, courses, and skill development
                    </p>
                    <Button
                      size="sm"
                      className="w-full hover-lift pointer-events-none"
                      variant="outline"
                    >
                      <AnimatedIcon
                        icon={BookOpen}
                        size="sm"
                        className="mr-2"
                      />
                      Access Module
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/compensation" className="block">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "1.2s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-construction-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={DollarSign}
                        animation="bounce"
                        className="text-construction-600"
                      />
                      <h3 className="font-semibold">Compensation & Benefits</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Salary planning, benefits, and compensation management
                    </p>
                    <Button
                      size="sm"
                      className="w-full hover-lift pointer-events-none"
                      variant="outline"
                    >
                      <AnimatedIcon
                        icon={DollarSign}
                        size="sm"
                        className="mr-2"
                      />
                      Access Module
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/compliance-audit" className="block">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "1.3s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={Shield}
                        animation="glow"
                        className="text-red-600"
                      />
                      <h3 className="font-semibold">Compliance & Audit</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Statutory compliance, audit logs, and data privacy tools
                    </p>
                    <Button
                      size="sm"
                      className="w-full hover-lift pointer-events-none"
                      variant="outline"
                    >
                      <AnimatedIcon icon={Shield} size="sm" className="mr-2" />
                      Access Module
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/workforce-analytics" className="block">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "1.4s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={BarChart3}
                        animation="glow"
                        className="text-purple-600"
                      />
                      <h3 className="font-semibold">Workforce Analytics</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Analytics, reporting, and workforce insights dashboard
                    </p>
                    <Button
                      size="sm"
                      className="w-full hover-lift pointer-events-none"
                      variant="outline"
                    >
                      <AnimatedIcon
                        icon={BarChart3}
                        size="sm"
                        className="mr-2"
                      />
                      Access Module
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/employee-engagement" className="block">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "1.5s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={MessageSquare}
                        animation="float"
                        className="text-orange-600"
                      />
                      <h3 className="font-semibold">Employee Engagement</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Surveys, rewards, communication, and collaboration tools
                    </p>
                    <Button
                      size="sm"
                      className="w-full hover-lift pointer-events-none"
                      variant="outline"
                    >
                      <AnimatedIcon
                        icon={MessageSquare}
                        size="sm"
                        className="mr-2"
                      />
                      Access Module
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/travel-expense" className="block">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "1.6s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={Plane}
                        animation="float"
                        className="text-blue-600"
                      />
                      <h3 className="font-semibold">Travel & Expense</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Travel requests, expense claims, and reimbursement
                      processing
                    </p>
                    <Button
                      size="sm"
                      className="w-full hover-lift pointer-events-none"
                      variant="outline"
                    >
                      <AnimatedIcon icon={Plane} size="sm" className="mr-2" />
                      Access Module
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/helpdesk" className="block">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "1.7s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={Headphones}
                        animation="pulse"
                        className="text-green-600"
                      />
                      <h3 className="font-semibold">HR Helpdesk</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Ticketing system, knowledge base, and AI-powered support
                    </p>
                    <Button
                      size="sm"
                      className="w-full hover-lift pointer-events-none"
                      variant="outline"
                    >
                      <AnimatedIcon
                        icon={Headphones}
                        size="sm"
                        className="mr-2"
                      />
                      Access Module
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/exit-management" className="block">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "1.8s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={LogOut}
                        animation="float"
                        className="text-slate-600"
                      />
                      <h3 className="font-semibold">Exit Management</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Resignation submission, clearance workflow, and final
                      settlement
                    </p>
                    <Button
                      size="sm"
                      className="w-full hover-lift pointer-events-none"
                      variant="outline"
                    >
                      <AnimatedIcon icon={LogOut} size="sm" className="mr-2" />
                      Access Module
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/hrms/integrations" className="block">
                <Card
                  className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer h-full"
                  style={{ animationDelay: "1.9s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AnimatedIcon
                        icon={Settings}
                        animation="pulse"
                        className="text-indigo-600"
                      />
                      <h3 className="font-semibold">Integrations</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Biometric devices, ERP systems, and third-party platforms
                    </p>
                    <Button
                      size="sm"
                      className="w-full hover-lift pointer-events-none"
                      variant="outline"
                    >
                      <AnimatedIcon
                        icon={Settings}
                        size="sm"
                        className="mr-2"
                      />
                      Access Module
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Card
                className="hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer"
                style={{ animationDelay: "2.0s" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AnimatedIcon
                      icon={FileText}
                      animation="bounce"
                      className="text-indigo-600"
                    />
                    <h3 className="font-semibold">Document Management</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Contracts, IDs, certificates, and file storage
                  </p>
                  <Button
                    size="sm"
                    className="w-full hover-lift"
                    variant="outline"
                    disabled
                  >
                    <AnimatedIcon icon={Folder} size="sm" className="mr-2" />
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Additional Features */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <AnimatedIcon
                  icon={Star}
                  animation="glow"
                  className="text-yellow-500"
                />
                Core HR Features
              </h4>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border p-3 hover-lift animate-fadeInUp group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-2 mb-1">
                    <AnimatedIcon
                      icon={Clock}
                      animation="pulse"
                      className="text-primary"
                      size="sm"
                    />
                    <h5 className="font-medium text-sm">Attendance & Time</h5>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Work hours, overtime, and site attendance tracking
                  </p>
                </div>
                <div
                  className="rounded-lg border p-3 hover-lift animate-fadeInUp group relative overflow-hidden"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-2 mb-1">
                    <AnimatedIcon
                      icon={DollarSign}
                      animation="glow"
                      className="text-emerald-600"
                      size="sm"
                    />
                    <h5 className="font-medium text-sm">Payroll Management</h5>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Automated payroll processing with tax calculations
                  </p>
                </div>
                <div
                  className="rounded-lg border p-3 hover-lift animate-fadeInUp group relative overflow-hidden"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-construction-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-2 mb-1">
                    <AnimatedIcon
                      icon={Award}
                      animation="bounce"
                      className="text-construction-500"
                      size="sm"
                    />
                    <h5 className="font-medium text-sm">Performance Reviews</h5>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Goal setting, evaluations, and career development
                  </p>
                </div>
                <div
                  className="rounded-lg border p-3 hover-lift animate-fadeInUp group relative overflow-hidden"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-safety-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-2 mb-1">
                    <AnimatedIcon
                      icon={BookOpen}
                      animation="float"
                      className="text-safety-600"
                      size="sm"
                    />
                    <h5 className="font-medium text-sm">
                      Training & Development
                    </h5>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Skills training, certifications, and career paths
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-construction-50 to-primary-50 p-4 relative overflow-hidden animate-bounceIn">
              <div className="flex items-center justify-center gap-2">
                <AnimatedIcon
                  icon={CheckCircle}
                  animation="glow"
                  className="text-construction-500"
                />
                <p className="text-center text-muted-foreground">
                  ✨ Full-featured HRMS system for construction industry
                  workforce management
                </p>
                <Star className="h-4 w-4 text-yellow-500 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Employee Modal */}
      <Dialog
        open={modals.addEmployee}
        onOpenChange={(open) =>
          setModals((prev) => ({ ...prev, addEmployee: open }))
        }
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogDescription>
              Add a new employee to{" "}
              {isSuperAdmin ? tenantData.name : "your organization"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emp-first-name">First Name</Label>
                <Input id="emp-first-name" placeholder="Enter first name" />
              </div>
              <div>
                <Label htmlFor="emp-last-name">Last Name</Label>
                <Input id="emp-last-name" placeholder="Enter last name" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emp-email">Email</Label>
                <Input
                  id="emp-email"
                  type="email"
                  placeholder="employee@company.com"
                />
              </div>
              <div>
                <Label htmlFor="emp-phone">Phone</Label>
                <Input id="emp-phone" placeholder="+91-9876543210" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Department</Label>
                <Select defaultValue="engineering">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="emp-designation">Designation</Label>
                <Input id="emp-designation" placeholder="Enter designation" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emp-join-date">Join Date</Label>
                <Input id="emp-join-date" type="date" />
              </div>
              <div>
                <Label htmlFor="emp-salary">Monthly Salary (₹)</Label>
                <Input id="emp-salary" type="number" placeholder="50000" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  setModals((prev) => ({ ...prev, addEmployee: false }))
                }
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // TODO: Implement employee creation
                  setModals((prev) => ({ ...prev, addEmployee: false }));
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Process Payroll Modal */}
      <Dialog
        open={modals.processPayroll}
        onOpenChange={(open) =>
          setModals((prev) => ({ ...prev, processPayroll: open }))
        }
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Process Payroll</DialogTitle>
            <DialogDescription>
              Process monthly payroll for{" "}
              {isSuperAdmin ? tenantData.name : "your organization"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Payroll Month</Label>
                <Select defaultValue="2024-12">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-12">December 2024</SelectItem>
                    <SelectItem value="2024-11">November 2024</SelectItem>
                    <SelectItem value="2024-10">October 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Department</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">Payroll Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Total Employees:</span>
                  <span className="font-medium">
                    {tenantData.stats?.totalEmployees || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Gross Payroll:</span>
                  <span className="font-medium">
                    {tenantData.stats?.monthlyPayroll || "₹0"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Deductions:</span>
                  <span className="font-medium">₹2.1L</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-1">
                  <span>Net Payroll:</span>
                  <span>
                    ₹
                    {(
                      parseFloat(
                        tenantData.stats?.monthlyPayroll
                          ?.replace("₹", "")
                          .replace("L", "") || "0",
                      ) *
                        100000 -
                      210000
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  setModals((prev) => ({ ...prev, processPayroll: false }))
                }
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // TODO: Implement payroll processing
                  setModals((prev) => ({ ...prev, processPayroll: false }));
                }}
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Process Payroll
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Leave Approval Modal */}
      <Dialog
        open={modals.leaveApproval}
        onOpenChange={(open) =>
          setModals((prev) => ({ ...prev, leaveApproval: open }))
        }
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Leave Approvals</DialogTitle>
            <DialogDescription>
              Review and approve leave requests for{" "}
              {isSuperAdmin ? tenantData.name : "your organization"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-3">
              {[
                {
                  employee: "Arjun Singh",
                  type: "Annual Leave",
                  dates: "Dec 25-27, 2024",
                  days: 3,
                  reason: "Family vacation",
                },
                {
                  employee: "Priya Sharma",
                  type: "Sick Leave",
                  dates: "Dec 23, 2024",
                  days: 1,
                  reason: "Medical appointment",
                },
                {
                  employee: "Ramesh Patel",
                  type: "Casual Leave",
                  dates: "Dec 30, 2024",
                  days: 1,
                  reason: "Personal work",
                },
              ].map((request, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{request.employee}</h4>
                      <p className="text-sm text-gray-600">
                        {request.type} - {request.dates} ({request.days} days)
                      </p>
                      <p className="text-sm text-gray-500">
                        Reason: {request.reason}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-300"
                      >
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() =>
                  setModals((prev) => ({ ...prev, leaveApproval: false }))
                }
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}

// Create Super Admin user for demonstration
const createSuperAdminUser = (): TenantUser => ({
  id: "user_super_001",
  tenantId: "system",
  username: "superadmin",
  email: "admin@buildsaathi.com",
  firstName: "Super",
  lastName: "Admin",
  designation: "System Administrator",
  department: "IT",
  roleId: "super_admin",
  permissions: ["*"],
  status: "active",
  emailVerified: true,
  phoneVerified: true,
  mfaEnabled: true,
  tenantRole: "owner",
  joinedAt: "2024-01-01T00:00:00Z",
  profile: {
    bio: "System Super Administrator with access to all tenants",
    skills: ["System Administration", "Multi-tenant Management"],
  },
  security: {
    passwordPolicy: "strong",
    sessionTimeout: 3600,
    ipWhitelist: [],
  },
  preferences: {
    theme: "light",
    language: "en",
    timezone: "Asia/Kolkata",
    notifications: { email: true, push: true, sms: false },
  },
  metadata: {
    source: "system",
    onboardingCompleted: true,
    terms: {
      accepted: true,
      version: "1.0",
      acceptedAt: "2024-01-01T00:00:00Z",
    },
  },
});

export default function HRMS() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const isSuperAdmin =
    currentUser?.role === "super_admin" ||
    currentUser?.email === "admin@buildsaathi.com";

  const userForProvider = isSuperAdmin ? createSuperAdminUser() : currentUser;

  return (
    <PermissionProvider
      user={userForProvider}
      tenantId={userForProvider?.tenantId || "system"}
    >
      <HRMSContent />
    </PermissionProvider>
  );
}
