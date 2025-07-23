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
  FileText,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
  Calendar,
  DollarSign,
  Users,
  Building,
  ArrowLeft,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

const requisitionStats = [
  { label: "Total Requisitions", value: 24, color: "text-primary" },
  { label: "Pending Approval", value: 6, color: "text-safety-600" },
  { label: "Active Postings", value: 12, color: "text-emerald-600" },
  { label: "On Hold", value: 6, color: "text-yellow-600" },
];

const jobRequisitions = [
  {
    id: "REQ-001",
    position: "Senior Project Manager",
    department: "Engineering",
    hiringManager: "John Smith",
    requestDate: "2024-12-15",
    urgency: "high",
    status: "pending_approval",
    budget: 120000,
    headcount: 1,
    description: "Lead large-scale construction projects",
  },
  {
    id: "REQ-002",
    position: "Site Supervisor",
    department: "Operations",
    hiringManager: "Sarah Johnson",
    requestDate: "2024-12-18",
    urgency: "medium",
    status: "approved",
    budget: 75000,
    headcount: 2,
    description: "Supervise daily site operations",
  },
  {
    id: "REQ-003",
    position: "Safety Coordinator",
    department: "Safety",
    hiringManager: "Mike Wilson",
    requestDate: "2024-12-20",
    urgency: "high",
    status: "posted",
    budget: 65000,
    headcount: 1,
    description: "Ensure site safety compliance",
  },
  {
    id: "REQ-004",
    position: "QA Inspector",
    department: "Quality",
    hiringManager: "Lisa Chen",
    requestDate: "2024-12-22",
    urgency: "low",
    status: "on_hold",
    budget: 55000,
    headcount: 3,
    description: "Quality control and inspections",
  },
  {
    id: "REQ-005",
    position: "Equipment Operator",
    department: "Operations",
    hiringManager: "David Park",
    requestDate: "2024-12-23",
    urgency: "medium",
    status: "draft",
    budget: 48000,
    headcount: 2,
    description: "Operate heavy machinery and equipment",
  },
];

export default function JobRequisitions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredRequisitions = jobRequisitions.filter((req) => {
    const matchesSearch =
      req.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.hiringManager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || req.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "posted":
        return "default";
      case "pending_approval":
        return "secondary";
      case "on_hold":
        return "outline";
      case "draft":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="mr-1 h-3 w-3" />;
      case "posted":
        return <CheckCircle className="mr-1 h-3 w-3" />;
      case "pending_approval":
        return <Clock className="mr-1 h-3 w-3" />;
      case "on_hold":
        return <AlertTriangle className="mr-1 h-3 w-3" />;
      case "draft":
        return <Edit className="mr-1 h-3 w-3" />;
      default:
        return null;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
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
            <Link to="/hrms/recruitment">
              <AnimatedIcon
                icon={ArrowLeft}
                animation="bounce"
                className="mr-2"
              />
              Back to Recruitment Modules
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Job Requisition Management
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={FileText}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Create, approve, and manage job requisitions workflow
              </p>
            </div>
          </div>
          <Button
            className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden animate-slideInRight"
            asChild
          >
            <Link to="/hrms/recruitment/requisitions/create">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              New Requisition
              <ShimmerEffect className="absolute inset-0" />
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {requisitionStats.map((stat, index) => (
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
                    icon={FileText}
                    animation="float"
                    className={stat.color}
                    size="sm"
                  />
                </div>
                <div className="text-2xl font-bold">
                  <AnimatedCounter value={stat.value} />
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
                  placeholder="Search requisitions by position, department, or hiring manager..."
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
                    Status
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedStatus("all")}>
                    All Status
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedStatus("pending_approval")}
                  >
                    Pending Approval
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedStatus("approved")}
                  >
                    Approved
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus("posted")}>
                    Posted
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedStatus("on_hold")}
                  >
                    On Hold
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus("draft")}>
                    Draft
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Requisitions Table */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Target}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Job Requisitions</CardTitle>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <AnimatedCounter value={filteredRequisitions.length} />{" "}
                requisitions
              </Badge>
            </div>
            <CardDescription>
              Manage job requisition lifecycle from creation to posting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Requisition</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Hiring Manager</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequisitions.map((requisition, index) => (
                    <TableRow
                      key={requisition.id}
                      className="hover:bg-muted/50 transition-colors animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">
                              {requisition.position}
                            </p>
                            {requisition.urgency === "high" && (
                              <PulsingDot className="scale-75" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {requisition.id}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {requisition.requestDate}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {requisition.headcount} positions
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <AnimatedIcon
                            icon={Building}
                            size="sm"
                            className="text-construction-500"
                          />
                          <Badge variant="outline">
                            {requisition.department}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">
                          {requisition.hiringManager}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <AnimatedIcon
                            icon={DollarSign}
                            size="sm"
                            className="text-emerald-600"
                          />
                          <span className="font-medium">
                            ${requisition.budget.toLocaleString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`capitalize ${getUrgencyColor(
                            requisition.urgency,
                          )}`}
                        >
                          {requisition.urgency}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getStatusVariant(requisition.status)}
                          className="capitalize animate-pulse"
                        >
                          {getStatusIcon(requisition.status)}
                          {requisition.status.replace("_", " ")}
                        </Badge>
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
                            <DropdownMenuItem asChild>
                              <Link
                                to={`/hrms/recruitment/requisitions/${requisition.id}`}
                              >
                                <AnimatedIcon
                                  icon={Eye}
                                  size="sm"
                                  className="mr-2"
                                />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                to={`/hrms/recruitment/requisitions/${requisition.id}/edit`}
                              >
                                <AnimatedIcon
                                  icon={Edit}
                                  size="sm"
                                  className="mr-2"
                                />
                                Edit Requisition
                              </Link>
                            </DropdownMenuItem>
                            {requisition.status === "pending_approval" && (
                              <>
                                <DropdownMenuItem>
                                  <AnimatedIcon
                                    icon={CheckCircle}
                                    size="sm"
                                    className="mr-2"
                                  />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <AnimatedIcon
                                    icon={X}
                                    size="sm"
                                    className="mr-2"
                                  />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
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
