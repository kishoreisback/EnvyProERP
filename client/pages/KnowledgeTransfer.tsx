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
import { Progress } from "@/components/ui/progress";
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
  BookOpen,
  Users,
  FileText,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  ArrowLeft,
  TrendingUp,
  Building,
  Calendar,
  Phone,
  Mail,
  Download,
  Upload,
  Eye,
  Edit,
  Share,
  Database,
  Folder,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const transferStats = [
  {
    label: "Active Transfers",
    value: 8,
    change: "+3 new departures",
    icon: BookOpen,
    color: "text-primary",
  },
  {
    label: "Completed Handovers",
    value: 24,
    change: "This month",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
  {
    label: "Pending Documentation",
    value: 12,
    change: "Awaiting completion",
    icon: Clock,
    color: "text-yellow-500",
  },
  {
    label: "Knowledge Retention",
    value: 87,
    change: "% captured",
    icon: TrendingUp,
    color: "text-construction-500",
  },
];

const transferCategories = [
  {
    category: "Project Documentation",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    description: "Project files, specifications, and deliverables",
    count: 45,
    priority: "high",
  },
  {
    category: "Client Relationships",
    icon: Users,
    color: "text-emerald-600",
    bgColor: "bg-emerald-600/10",
    description: "Client contacts, preferences, and history",
    count: 28,
    priority: "critical",
  },
  {
    category: "Process Knowledge",
    icon: Database,
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
    description: "Workflows, procedures, and best practices",
    count: 18,
    priority: "medium",
  },
  {
    category: "System Access",
    icon: Folder,
    color: "text-orange-600",
    bgColor: "bg-orange-600/10",
    description: "Passwords, accounts, and system documentation",
    count: 22,
    priority: "high",
  },
];

const knowledgeTransfers = [
  {
    id: 1,
    departingEmployee: "Sarah Mitchell",
    department: "Engineering",
    position: "Senior Developer",
    lastWorkingDay: "2024-01-29",
    successor: "John Smith",
    transferProgress: 75,
    documentsHandover: "completed",
    clientHandover: "in_progress",
    systemAccess: "pending",
    knowledgeSession: "scheduled",
    priority: "high",
    completedItems: 12,
    totalItems: 16,
    nextDeadline: "2024-01-25",
  },
  {
    id: 2,
    departingEmployee: "David Park",
    department: "Operations",
    position: "Operations Manager",
    lastWorkingDay: "2024-01-24",
    successor: "Emily Johnson",
    transferProgress: 90,
    documentsHandover: "completed",
    clientHandover: "completed",
    systemAccess: "completed",
    knowledgeSession: "completed",
    priority: "critical",
    completedItems: 18,
    totalItems: 20,
    nextDeadline: "2024-01-22",
  },
  {
    id: 3,
    departingEmployee: "Maria Rodriguez",
    department: "Sales",
    position: "Sales Representative",
    lastWorkingDay: "2024-02-01",
    successor: "Robert Davis",
    transferProgress: 45,
    documentsHandover: "in_progress",
    clientHandover: "pending",
    systemAccess: "pending",
    knowledgeSession: "pending",
    priority: "medium",
    completedItems: 7,
    totalItems: 15,
    nextDeadline: "2024-01-28",
  },
  {
    id: 4,
    departingEmployee: "James Wilson",
    department: "Quality",
    position: "QA Inspector",
    lastWorkingDay: "2024-01-22",
    successor: "Lisa Chen",
    transferProgress: 100,
    documentsHandover: "completed",
    clientHandover: "not_applicable",
    systemAccess: "completed",
    knowledgeSession: "completed",
    priority: "low",
    completedItems: 12,
    totalItems: 12,
    nextDeadline: "Completed",
  },
];

const knowledgeRepository = [
  {
    id: 1,
    title: "Client Management Best Practices",
    category: "Process Documentation",
    department: "Sales",
    author: "David Park",
    lastUpdated: "2024-01-15",
    downloads: 45,
    type: "guide",
  },
  {
    id: 2,
    title: "Quality Control Procedures",
    category: "Standard Operating Procedures",
    department: "Quality",
    author: "James Wilson",
    lastUpdated: "2024-01-14",
    downloads: 23,
    type: "procedure",
  },
  {
    id: 3,
    title: "Project Handover Template",
    category: "Templates",
    department: "Engineering",
    author: "Sarah Mitchell",
    lastUpdated: "2024-01-16",
    downloads: 67,
    type: "template",
  },
  {
    id: 4,
    title: "Vendor Contact Database",
    category: "Contact Information",
    department: "Operations",
    author: "Maria Rodriguez",
    lastUpdated: "2024-01-13",
    downloads: 34,
    type: "database",
  },
];

export default function KnowledgeTransfer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredTransfers = knowledgeTransfers.filter((transfer) => {
    const matchesSearch =
      transfer.departingEmployee
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transfer.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.successor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "in_progress" && transfer.transferProgress < 100) ||
      (selectedStatus === "completed" && transfer.transferProgress === 100);
    return matchesSearch && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-600";
      case "high":
        return "text-orange-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-emerald-600";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-emerald-600";
      case "in_progress":
        return "text-blue-600";
      case "pending":
        return "text-yellow-600";
      case "not_applicable":
        return "text-gray-400";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "in_progress":
        return Clock;
      case "pending":
        return AlertTriangle;
      case "not_applicable":
        return null;
      default:
        return Clock;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "guide":
        return BookOpen;
      case "procedure":
        return FileText;
      case "template":
        return Folder;
      case "database":
        return Database;
      default:
        return FileText;
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
                Knowledge Transfer
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={BookOpen}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Capture and transfer critical knowledge from departing employees
              </p>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon
                icon={Database}
                animation="bounce"
                className="mr-2"
              />
              Knowledge Repository
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Start Transfer
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {transferStats.map((stat, index) => (
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
                  {stat.label.includes("Retention") && (
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

        {/* Transfer Categories */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Folder}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Knowledge Transfer Categories</CardTitle>
            </div>
            <CardDescription>
              Critical knowledge areas requiring handover documentation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {transferCategories.map((category, index) => (
                <Card
                  key={category.category}
                  className="hover-lift animate-scaleIn cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
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
                        <Badge
                          variant="outline"
                          className={`text-xs ${getPriorityColor(
                            category.priority,
                          )}`}
                        >
                          {category.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          <AnimatedCounter value={category.count} /> items
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover-lift"
                        >
                          <AnimatedIcon icon={ArrowRight} className="h-3 w-3" />
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
                    placeholder="Search by departing employee, successor, or department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Knowledge Transfers Table */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Users}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Active Knowledge Transfers</CardTitle>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <AnimatedCounter value={filteredTransfers.length} /> transfers
              </Badge>
            </div>
            <CardDescription>
              Track knowledge handover progress for departing employees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Departing Employee</TableHead>
                  <TableHead>Successor</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Transfer Status</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransfers.map((transfer, index) => (
                  <TableRow
                    key={transfer.id}
                    className="animate-fadeInUp hover:bg-muted/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {transfer.departingEmployee}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {transfer.position}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Building className="h-3 w-3" />
                          {transfer.department}
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className={`h-2 w-2 rounded-full ${getPriorityColor(
                              transfer.priority,
                            )} opacity-75`}
                          />
                          <span className="text-xs text-muted-foreground capitalize">
                            {transfer.priority} priority
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium text-sm">
                            {transfer.successor}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Taking over responsibilities
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={transfer.transferProgress}
                            className="w-20"
                          />
                          <span className="text-sm font-medium">
                            {transfer.transferProgress}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {transfer.completedItems}/{transfer.totalItems} items
                          completed
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          <div className="flex items-center gap-1">
                            {getStatusIcon(transfer.documentsHandover) && (
                              <AnimatedIcon
                                icon={getStatusIcon(transfer.documentsHandover)}
                                className={`h-3 w-3 ${getStatusColor(
                                  transfer.documentsHandover,
                                )}`}
                              />
                            )}
                            <span>Docs</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(transfer.clientHandover) && (
                              <AnimatedIcon
                                icon={getStatusIcon(transfer.clientHandover)}
                                className={`h-3 w-3 ${getStatusColor(
                                  transfer.clientHandover,
                                )}`}
                              />
                            )}
                            <span>Clients</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(transfer.systemAccess) && (
                              <AnimatedIcon
                                icon={getStatusIcon(transfer.systemAccess)}
                                className={`h-3 w-3 ${getStatusColor(
                                  transfer.systemAccess,
                                )}`}
                              />
                            )}
                            <span>Systems</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(transfer.knowledgeSession) && (
                              <AnimatedIcon
                                icon={getStatusIcon(transfer.knowledgeSession)}
                                className={`h-3 w-3 ${getStatusColor(
                                  transfer.knowledgeSession,
                                )}`}
                              />
                            )}
                            <span>Session</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>Last day: {transfer.lastWorkingDay}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-primary">
                          <Clock className="h-3 w-3" />
                          <span>Due: {transfer.nextDeadline}</span>
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
                              className="h-4 w-4"
                            />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <AnimatedIcon icon={Eye} className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AnimatedIcon
                              icon={Edit}
                              className="mr-2 h-4 w-4"
                            />
                            Update Progress
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AnimatedIcon
                              icon={Share}
                              className="mr-2 h-4 w-4"
                            />
                            Share with Successor
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AnimatedIcon
                              icon={Download}
                              className="mr-2 h-4 w-4"
                            />
                            Export Handover
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

        {/* Knowledge Repository */}
        <Card className="animate-bounceIn">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Database}
                animation="glow"
                className="text-construction-500"
              />
              <CardTitle>Knowledge Repository</CardTitle>
            </div>
            <CardDescription>
              Centralized repository of captured organizational knowledge
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {knowledgeRepository.map((item, index) => (
                <Card
                  key={item.id}
                  className="hover-lift animate-scaleIn cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <AnimatedIcon
                          icon={getTypeIcon(item.type)}
                          animation="float"
                          className="text-primary"
                        />
                        <h4 className="font-semibold text-sm">{item.title}</h4>
                      </div>
                      <div>
                        <Badge variant="secondary" className="text-xs mb-1">
                          {item.category}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {item.department}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Author:</span>
                          <span className="font-medium ml-1 block">
                            {item.author}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Downloads:
                          </span>
                          <span className="font-medium ml-1">
                            <AnimatedCounter value={item.downloads} />
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Updated: {item.lastUpdated}
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
                            icon={Download}
                            size="sm"
                            className="mr-1"
                          />
                          Download
                        </Button>
                      </div>
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
