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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Users,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Edit,
  Eye,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Star,
  ArrowLeft,
  Award,
  Briefcase,
  Clock,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";

const employees = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@buildpro.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    position: "Senior Project Manager",
    status: "active",
    joinDate: "2022-01-15",
    location: "New York, NY",
    avatar: "/placeholder.svg",
    rating: 4.8,
    projects: 12,
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@buildpro.com",
    phone: "+1 (555) 234-5678",
    department: "Operations",
    position: "Site Supervisor",
    status: "active",
    joinDate: "2021-06-20",
    location: "Los Angeles, CA",
    avatar: "/placeholder.svg",
    rating: 4.6,
    projects: 8,
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma.wilson@buildpro.com",
    phone: "+1 (555) 345-6789",
    department: "Safety",
    position: "Safety Coordinator",
    status: "active",
    joinDate: "2023-03-10",
    location: "Chicago, IL",
    avatar: "/placeholder.svg",
    rating: 4.9,
    projects: 15,
  },
  {
    id: 4,
    name: "David Kumar",
    email: "david.kumar@buildpro.com",
    phone: "+1 (555) 456-7890",
    department: "Quality",
    position: "QA Inspector",
    status: "on_leave",
    joinDate: "2022-09-05",
    location: "Houston, TX",
    avatar: "/placeholder.svg",
    rating: 4.7,
    projects: 6,
  },
  {
    id: 5,
    name: "Lisa Chang",
    email: "lisa.chang@buildpro.com",
    phone: "+1 (555) 567-8901",
    department: "Admin",
    position: "HR Specialist",
    status: "active",
    joinDate: "2020-11-12",
    location: "Miami, FL",
    avatar: "/placeholder.svg",
    rating: 4.5,
    projects: 3,
  },
];

const departmentStats = [
  { name: "Engineering", count: 45, active: 42, onLeave: 3 },
  { name: "Operations", count: 38, active: 35, onLeave: 3 },
  { name: "Safety", count: 28, active: 27, onLeave: 1 },
  { name: "Quality", count: 25, active: 23, onLeave: 2 },
  { name: "Admin", count: 20, active: 19, onLeave: 1 },
];

export default function EmployeeManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" ||
      employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <div className="flex items-center gap-4 animate-slideInLeft">
          <Button variant="outline" className="hover-lift" asChild>
            <Link to="/hrms">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to HRMS
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Employee Management
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Users}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Manage employee information, records, and organizational
                structure
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
              Export Data
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Add Employee
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Department Stats */}
        <div className="grid gap-4 md:grid-cols-5">
          {departmentStats.map((dept, index) => (
            <Card
              key={dept.name}
              className="hover-lift animate-fadeInUp relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{dept.name}</p>
                    <AnimatedIcon
                      icon={Building}
                      animation="float"
                      className="text-primary"
                      size="sm"
                    />
                  </div>
                  <div className="text-2xl font-bold">
                    <AnimatedCounter value={dept.count} />
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-emerald-600 font-medium">
                      {dept.active} Active
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-amber-600 font-medium">
                      {dept.onLeave} On Leave
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="animate-fadeInUp">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <AnimatedIcon
                  icon={Search}
                  animation="pulse"
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  placeholder="Search employees by name, email, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="hover-lift">
                    <AnimatedIcon
                      icon={Filter}
                      animation="bounce"
                      className="mr-2"
                    />
                    Department
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => setSelectedDepartment("all")}
                  >
                    All Departments
                  </DropdownMenuItem>
                  {departmentStats.map((dept) => (
                    <DropdownMenuItem
                      key={dept.name}
                      onClick={() => setSelectedDepartment(dept.name)}
                    >
                      {dept.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Employee Table */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={UserCheck}
                  animation="float"
                  className="text-primary"
                />
                <CardTitle>Employee Directory</CardTitle>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <AnimatedCounter value={filteredEmployees.length} /> employees
              </Badge>
            </div>
            <CardDescription>
              Complete employee information and contact details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee, index) => (
                    <TableRow
                      key={employee.id}
                      className="hover:bg-muted/50 transition-colors animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 animate-pulse">
                            <AvatarImage
                              src={employee.avatar}
                              alt={employee.name}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-construction-500 text-white">
                              {employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <AnimatedIcon
                                icon={Calendar}
                                size="sm"
                                className="opacity-70"
                              />
                              Joined {employee.joinDate}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm flex items-center gap-1">
                            <AnimatedIcon
                              icon={Mail}
                              size="sm"
                              className="text-primary opacity-70"
                            />
                            {employee.email}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <AnimatedIcon
                              icon={Phone}
                              size="sm"
                              className="opacity-70"
                            />
                            {employee.phone}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <AnimatedIcon
                              icon={MapPin}
                              size="sm"
                              className="opacity-70"
                            />
                            {employee.location}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="animate-pulse">
                          {employee.department}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <AnimatedIcon
                            icon={Briefcase}
                            size="sm"
                            className="text-construction-500"
                          />
                          {employee.position}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            employee.status === "active"
                              ? "default"
                              : "secondary"
                          }
                          className="capitalize"
                        >
                          {employee.status === "active" && (
                            <PulsingDot className="mr-1 scale-50" />
                          )}
                          {employee.status === "on_leave" && (
                            <Clock className="mr-1 h-3 w-3" />
                          )}
                          {employee.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <AnimatedIcon
                              icon={Star}
                              animation="glow"
                              className="text-yellow-500"
                              size="sm"
                            />
                            <span className="text-sm font-medium">
                              {employee.rating}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <AnimatedIcon
                              icon={Award}
                              animation="pulse"
                              className="text-construction-500"
                              size="sm"
                            />
                            <span className="text-sm text-muted-foreground">
                              {employee.projects} projects
                            </span>
                          </div>
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
                                animation="bounce"
                              />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <AnimatedIcon
                                icon={Eye}
                                size="sm"
                                className="mr-2"
                              />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <AnimatedIcon
                                icon={Edit}
                                size="sm"
                                className="mr-2"
                              />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <AnimatedIcon
                                icon={UserCheck}
                                size="sm"
                                className="mr-2"
                              />
                              Performance
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
