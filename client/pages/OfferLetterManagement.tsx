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
  Award,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Send,
  Download,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
  DollarSign,
  Calendar,
  Building,
  User,
  Mail,
  Phone,
  Plus,
  TrendingUp,
  Zap,
  Signature,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const offerStats = [
  {
    label: "Active Offers",
    value: 12,
    change: "+3 this week",
    icon: Award,
    color: "text-primary",
  },
  {
    label: "Pending Signatures",
    value: 5,
    change: "Awaiting response",
    icon: Signature,
    color: "text-yellow-500",
  },
  {
    label: "Accepted Offers",
    value: 8,
    change: "This month",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
  {
    label: "Avg Response Time",
    value: 3.2,
    change: "days",
    icon: Clock,
    color: "text-construction-500",
  },
];

const offerLetters = [
  {
    id: 1,
    candidateName: "Sarah Mitchell",
    position: "Senior Project Manager",
    department: "Construction",
    salary: 95000,
    startDate: "2024-01-15",
    sentDate: "2024-01-02",
    status: "accepted",
    validUntil: "2024-01-12",
    hiringManager: "John Smith",
    template: "Senior Level Template",
    benefits: ["Health Insurance", "401k", "PTO"],
  },
  {
    id: 2,
    candidateName: "David Park",
    position: "Site Supervisor",
    department: "Operations",
    salary: 78000,
    startDate: "2024-01-20",
    sentDate: "2024-01-05",
    status: "pending",
    validUntil: "2024-01-15",
    hiringManager: "Emily Johnson",
    template: "Supervisor Template",
    benefits: ["Health Insurance", "PTO", "Safety Bonus"],
  },
  {
    id: 3,
    candidateName: "Maria Rodriguez",
    position: "Safety Coordinator",
    department: "Safety & Compliance",
    salary: 65000,
    startDate: "2024-02-01",
    sentDate: "2024-01-08",
    status: "draft",
    validUntil: "2024-01-25",
    hiringManager: "Michael Brown",
    template: "Standard Template",
    benefits: ["Health Insurance", "PTO"],
  },
  {
    id: 4,
    candidateName: "James Wilson",
    position: "QA Inspector",
    department: "Quality Control",
    salary: 58000,
    startDate: "2024-01-25",
    sentDate: "2024-01-03",
    status: "declined",
    validUntil: "2024-01-13",
    hiringManager: "Lisa Chen",
    template: "Entry Level Template",
    benefits: ["Health Insurance", "PTO"],
  },
  {
    id: 5,
    candidateName: "Emma Thompson",
    position: "Project Engineer",
    department: "Engineering",
    salary: 85000,
    startDate: "2024-02-05",
    sentDate: "2024-01-10",
    status: "pending",
    validUntil: "2024-01-20",
    hiringManager: "Robert Davis",
    template: "Engineering Template",
    benefits: ["Health Insurance", "401k", "PTO", "Professional Development"],
  },
];

const templates = [
  {
    id: 1,
    name: "Senior Level Template",
    category: "Management",
    lastUpdated: "2024-01-01",
    usageCount: 24,
  },
  {
    id: 2,
    name: "Engineering Template",
    category: "Technical",
    lastUpdated: "2023-12-15",
    usageCount: 18,
  },
  {
    id: 3,
    name: "Supervisor Template",
    category: "Operations",
    lastUpdated: "2023-12-20",
    usageCount: 15,
  },
  {
    id: 4,
    name: "Standard Template",
    category: "General",
    lastUpdated: "2024-01-05",
    usageCount: 32,
  },
];

export default function OfferLetterManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredOffers = offerLetters.filter((offer) => {
    const matchesSearch =
      offer.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.hiringManager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || offer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "accepted":
        return "default";
      case "pending":
        return "secondary";
      case "declined":
        return "destructive";
      case "draft":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return CheckCircle;
      case "pending":
        return Clock;
      case "declined":
        return X;
      case "draft":
        return FileText;
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
                Offer Letter Management
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Award}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Digital offer letter creation, tracking, and e-signature
                workflow
              </p>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon
                icon={FileText}
                animation="bounce"
                className="mr-2"
              />
              Templates
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Create Offer
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {offerStats.map((stat, index) => (
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
                  {stat.label.includes("Avg") && (
                    <span className="text-sm font-normal ml-1">days</span>
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

        {/* Quick Actions */}
        <Card className="animate-slideInUp">
          <CardContent className="p-4">
            <div className="grid gap-3 md:grid-cols-4">
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
                New Offer Letter
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={FileText}
                  animation="pulse"
                  className="mr-2"
                />
                Manage Templates
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Signature}
                  animation="float"
                  className="mr-2"
                />
                Signature Tracking
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Download}
                  animation="glow"
                  className="mr-2"
                />
                Export Reports
              </Button>
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
                    placeholder="Search by candidate, position, department, or hiring manager..."
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
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Offer Letters Table */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Award}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Offer Letters</CardTitle>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <AnimatedCounter value={filteredOffers.length} /> offers
              </Badge>
            </div>
            <CardDescription>
              Manage offer letters, track signatures, and monitor acceptance
              status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Compensation</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Hiring Manager</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOffers.map((offer, index) => (
                  <TableRow
                    key={offer.id}
                    className="animate-fadeInUp hover:bg-muted/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {offer.candidateName}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Building className="h-3 w-3" />
                          {offer.department}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{offer.position}</p>
                        <p className="text-xs text-muted-foreground">
                          {offer.template}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3 text-emerald-600" />
                          <span className="font-medium text-sm">
                            ${offer.salary.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Annual salary
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(offer.status)}
                        className="flex items-center gap-1 w-fit"
                      >
                        {offer.status === "pending" && (
                          <PulsingDot className="scale-50" />
                        )}
                        <AnimatedIcon
                          icon={getStatusIcon(offer.status)}
                          className="h-3 w-3"
                        />
                        {offer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>Start: {offer.startDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Valid until: {offer.validUntil}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{offer.hiringManager}</span>
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
                            Edit Offer
                          </DropdownMenuItem>
                          {offer.status === "draft" && (
                            <DropdownMenuItem>
                              <AnimatedIcon
                                icon={Send}
                                className="mr-2 h-4 w-4"
                              />
                              Send Offer
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <AnimatedIcon
                              icon={Download}
                              className="mr-2 h-4 w-4"
                            />
                            Download PDF
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

        {/* Templates Overview */}
        <Card className="animate-bounceIn">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={FileText}
                animation="glow"
                className="text-construction-500"
              />
              <CardTitle>Offer Letter Templates</CardTitle>
            </div>
            <CardDescription>
              Pre-configured templates for different position types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {templates.map((template, index) => (
                <Card
                  key={template.id}
                  className="hover-lift animate-scaleIn cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">
                          {template.name}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Used</span>
                          <span className="font-medium">
                            <AnimatedCounter value={template.usageCount} />{" "}
                            times
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Updated</span>
                          <span>{template.lastUpdated}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="w-full hover-lift"
                        variant="outline"
                      >
                        <AnimatedIcon icon={Edit} size="sm" className="mr-2" />
                        Edit Template
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
