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
  Briefcase,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Share,
  Pause,
  Play,
  Calendar,
  MapPin,
  Users,
  ExternalLink,
  Globe,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  Building,
  Target,
  Download,
  BarChart3,
  FileText,
  Copy,
  Settings,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const postingStats = [
  {
    label: "Active Postings",
    value: 12,
    change: "+3 this week",
    icon: Play,
    color: "text-emerald-600",
  },
  {
    label: "Total Applications",
    value: 148,
    change: "+24 new today",
    icon: Users,
    color: "text-primary",
  },
  {
    label: "Avg Applications",
    value: 12.3,
    change: "per posting",
    icon: Target,
    color: "text-construction-500",
  },
  {
    label: "Success Rate",
    value: 85,
    change: "% fill rate",
    icon: TrendingUp,
    color: "text-yellow-500",
  },
];

const jobPostings = [
  {
    id: "POST-001",
    title: "Senior Project Manager",
    department: "Engineering",
    location: "New York, NY",
    type: "Full-time",
    status: "active",
    postedDate: "2024-01-05",
    expiryDate: "2024-02-05",
    applications: 24,
    views: 342,
    platforms: ["LinkedIn", "Indeed", "Company Website"],
    salary: "$110,000 - $130,000",
    requisitionId: "REQ-001",
    priority: "high",
    hiringManager: "John Smith",
  },
  {
    id: "POST-002",
    title: "Site Supervisor",
    department: "Operations",
    location: "Los Angeles, CA",
    type: "Full-time",
    status: "active",
    postedDate: "2024-01-03",
    expiryDate: "2024-02-03",
    applications: 18,
    views: 256,
    platforms: ["Indeed", "Company Website"],
    salary: "$65,000 - $75,000",
    requisitionId: "REQ-002",
    priority: "medium",
    hiringManager: "Emily Johnson",
  },
  {
    id: "POST-003",
    title: "Safety Coordinator",
    department: "Safety",
    location: "Houston, TX",
    type: "Full-time",
    status: "draft",
    postedDate: "2024-01-08",
    expiryDate: "2024-02-08",
    applications: 0,
    views: 0,
    platforms: [],
    salary: "$55,000 - $65,000",
    requisitionId: "REQ-003",
    priority: "medium",
    hiringManager: "Michael Brown",
  },
  {
    id: "POST-004",
    title: "QA Inspector",
    department: "Quality",
    location: "Chicago, IL",
    type: "Full-time",
    status: "paused",
    postedDate: "2024-01-01",
    expiryDate: "2024-02-01",
    applications: 31,
    views: 187,
    platforms: ["LinkedIn", "Glassdoor"],
    salary: "$45,000 - $55,000",
    requisitionId: "REQ-004",
    priority: "low",
    hiringManager: "Lisa Chen",
  },
  {
    id: "POST-005",
    title: "Equipment Operator",
    department: "Operations",
    location: "Phoenix, AZ",
    type: "Full-time",
    status: "active",
    postedDate: "2024-01-06",
    expiryDate: "2024-02-06",
    applications: 15,
    views: 203,
    platforms: ["Indeed", "Company Website", "ZipRecruiter"],
    salary: "$45,000 - $55,000",
    requisitionId: "REQ-005",
    priority: "medium",
    hiringManager: "Robert Davis",
  },
];

const availablePlatforms = [
  {
    name: "LinkedIn",
    icon: Globe,
    color: "text-blue-600",
    postings: 8,
    applications: 45,
  },
  {
    name: "Indeed",
    icon: Briefcase,
    color: "text-blue-800",
    postings: 10,
    applications: 62,
  },
  {
    name: "Glassdoor",
    icon: Building,
    color: "text-green-600",
    postings: 5,
    applications: 23,
  },
  {
    name: "Company Website",
    icon: Globe,
    color: "text-primary",
    postings: 12,
    applications: 34,
  },
  {
    name: "ZipRecruiter",
    icon: Target,
    color: "text-orange-600",
    postings: 3,
    applications: 18,
  },
  {
    name: "Monster",
    icon: Users,
    color: "text-purple-600",
    postings: 2,
    applications: 12,
  },
];

export default function JobPostings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredPostings = jobPostings.filter((posting) => {
    const matchesSearch =
      posting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      posting.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      posting.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      posting.hiringManager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || posting.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "draft":
        return "secondary";
      case "paused":
        return "outline";
      case "expired":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return Play;
      case "draft":
        return FileText;
      case "paused":
        return Pause;
      case "expired":
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-emerald-500";
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
                Job Posting Management
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Briefcase}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Multi-platform job posting and application tracking
              </p>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon
                icon={BarChart3}
                animation="bounce"
                className="mr-2"
              />
              Analytics
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Create Posting
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {postingStats.map((stat, index) => (
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
                  {stat.label === "Success Rate" && (
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

        {/* Quick Actions */}
        <Card className="animate-slideInUp">
          <CardContent className="p-4">
            <div className="grid gap-3 md:grid-cols-4">
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
                Create New Posting
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon icon={Copy} animation="pulse" className="mr-2" />
                Duplicate Posting
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Settings}
                  animation="float"
                  className="mr-2"
                />
                Platform Settings
              </Button>
              <Button variant="outline" className="hover-lift justify-start">
                <AnimatedIcon
                  icon={Download}
                  animation="glow"
                  className="mr-2"
                />
                Export Report
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
                    placeholder="Search by title, department, location, or hiring manager..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Job Postings Table */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Briefcase}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Job Postings</CardTitle>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <AnimatedCounter value={filteredPostings.length} /> postings
              </Badge>
            </div>
            <CardDescription>
              Manage job postings across multiple platforms and track
              performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Details</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Platforms</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPostings.map((posting, index) => (
                  <TableRow
                    key={posting.id}
                    className="animate-fadeInUp hover:bg-muted/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{posting.title}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Building className="h-3 w-3" />
                          {posting.department}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {posting.location}
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <div
                            className={`h-2 w-2 rounded-full ${getPriorityColor(
                              posting.priority,
                            )} opacity-75`}
                          />
                          <span className="text-muted-foreground capitalize">
                            {posting.priority}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(posting.status)}
                        className="flex items-center gap-1 w-fit"
                      >
                        {posting.status === "active" && (
                          <PulsingDot className="scale-50" />
                        )}
                        <AnimatedIcon
                          icon={getStatusIcon(posting.status)}
                          className="h-3 w-3"
                        />
                        {posting.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-primary" />
                          <span className="font-medium text-sm">
                            <AnimatedCounter value={posting.applications} />
                          </span>
                          <span className="text-xs text-muted-foreground">
                            applications
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3 text-construction-500" />
                          <span className="text-sm">
                            <AnimatedCounter value={posting.views} />
                          </span>
                          <span className="text-xs text-muted-foreground">
                            views
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <DollarSign className="h-3 w-3 text-emerald-600" />
                          <span className="text-muted-foreground">
                            {posting.salary}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {posting.platforms.length > 0 ? (
                        <div className="space-y-1">
                          {posting.platforms.slice(0, 2).map((platform) => (
                            <Badge
                              key={platform}
                              variant="outline"
                              className="text-xs mr-1"
                            >
                              <Globe className="h-3 w-3 mr-1" />
                              {platform}
                            </Badge>
                          ))}
                          {posting.platforms.length > 2 && (
                            <p className="text-xs text-muted-foreground">
                              +{posting.platforms.length - 2} more
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          Not published
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>Posted: {posting.postedDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Expires: {posting.expiryDate}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {posting.requisitionId}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{posting.hiringManager}</span>
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
                            Edit Posting
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AnimatedIcon
                              icon={Share}
                              className="mr-2 h-4 w-4"
                            />
                            Manage Publishing
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AnimatedIcon
                              icon={Copy}
                              className="mr-2 h-4 w-4"
                            />
                            Duplicate
                          </DropdownMenuItem>
                          {posting.status === "active" ? (
                            <DropdownMenuItem>
                              <AnimatedIcon
                                icon={Pause}
                                className="mr-2 h-4 w-4"
                              />
                              Pause Posting
                            </DropdownMenuItem>
                          ) : posting.status === "paused" ? (
                            <DropdownMenuItem>
                              <AnimatedIcon
                                icon={Play}
                                className="mr-2 h-4 w-4"
                              />
                              Resume Posting
                            </DropdownMenuItem>
                          ) : null}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Platform Analytics */}
        <Card className="animate-bounceIn">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={BarChart3}
                animation="glow"
                className="text-construction-500"
              />
              <CardTitle>Platform Performance</CardTitle>
            </div>
            <CardDescription>
              Performance metrics across different job posting platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {availablePlatforms.map((platform, index) => (
                <Card
                  key={platform.name}
                  className="hover-lift animate-scaleIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AnimatedIcon
                            icon={platform.icon}
                            animation="float"
                            className={platform.color}
                          />
                          <h4 className="font-semibold text-sm">
                            {platform.name}
                          </h4>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover-lift"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground text-xs">
                            Active Posts
                          </p>
                          <p className="font-semibold">
                            <AnimatedCounter value={platform.postings} />
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground text-xs">
                            Applications
                          </p>
                          <p className="font-semibold">
                            <AnimatedCounter value={platform.applications} />
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Avg:{" "}
                        <span className="font-medium">
                          {(platform.applications / platform.postings).toFixed(
                            1,
                          )}
                        </span>{" "}
                        applications per post
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
