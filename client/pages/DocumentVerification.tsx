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
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  Upload,
  Shield,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
  Eye,
  Download,
  Search,
  Filter,
  Plus,
  ArrowLeft,
  TrendingUp,
  Scan,
  CreditCard,
  GraduationCap,
  Building,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";

const verificationStats = [
  {
    label: "Pending Verification",
    value: 15,
    change: "+5 new uploads",
    icon: Clock,
    color: "text-yellow-500",
  },
  {
    label: "Verified Documents",
    value: 89,
    change: "This month",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
  {
    label: "Rejected Documents",
    value: 3,
    change: "Quality issues",
    icon: X,
    color: "text-red-500",
  },
  {
    label: "Auto-Verification Rate",
    value: 85,
    change: "% success rate",
    icon: TrendingUp,
    color: "text-primary",
  },
];

const documentCategories = [
  {
    category: "Identity Documents",
    icon: CreditCard,
    color: "text-blue-600",
    types: ["Driver's License", "Passport", "State ID", "Military ID"],
    verified: 12,
    pending: 3,
  },
  {
    category: "Education Certificates",
    icon: GraduationCap,
    color: "text-purple-600",
    types: ["Diplomas", "Transcripts", "Certifications", "Training Records"],
    verified: 8,
    pending: 2,
  },
  {
    category: "Employment Authorization",
    icon: Building,
    color: "text-emerald-600",
    types: ["I-9 Form", "Work Visa", "Green Card", "Social Security"],
    verified: 15,
    pending: 4,
  },
  {
    category: "Background Check",
    icon: Shield,
    color: "text-red-600",
    types: ["Criminal History", "Credit Report", "Reference Letters"],
    verified: 10,
    pending: 1,
  },
];

const documentUploads = [
  {
    id: 1,
    employeeName: "Sarah Mitchell",
    documentType: "Driver's License",
    category: "Identity",
    uploadedDate: "2024-01-15",
    status: "verified",
    verificationDate: "2024-01-15",
    fileSize: "2.4 MB",
    aiConfidence: 98,
    reviewer: "Auto-verified",
  },
  {
    id: 2,
    employeeName: "David Park",
    documentType: "Bachelor's Degree",
    category: "Education",
    uploadedDate: "2024-01-14",
    status: "pending_review",
    verificationDate: null,
    fileSize: "3.1 MB",
    aiConfidence: 75,
    reviewer: "HR Team",
  },
  {
    id: 3,
    employeeName: "Maria Rodriguez",
    documentType: "I-9 Form",
    category: "Work Authorization",
    uploadedDate: "2024-01-16",
    status: "verified",
    verificationDate: "2024-01-16",
    fileSize: "1.8 MB",
    aiConfidence: 95,
    reviewer: "Auto-verified",
  },
  {
    id: 4,
    employeeName: "James Wilson",
    documentType: "Background Check",
    category: "Security",
    uploadedDate: "2024-01-13",
    status: "rejected",
    verificationDate: "2024-01-14",
    fileSize: "4.2 MB",
    aiConfidence: 45,
    reviewer: "John Smith",
  },
];

export default function DocumentVerification() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredDocuments = documentUploads.filter((doc) => {
    const matchesSearch =
      doc.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.documentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || doc.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "verified":
        return "default";
      case "pending_review":
        return "secondary";
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return CheckCircle;
      case "pending_review":
        return Clock;
      case "rejected":
        return X;
      default:
        return FileText;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-emerald-600";
    if (confidence >= 70) return "text-yellow-600";
    return "text-red-600";
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
                Document Upload & Verification
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Upload}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Secure document management with AI-powered verification
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
              Export Report
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Upload Documents
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {verificationStats.map((stat, index) => (
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

        {/* Document Categories */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Scan}
                animation="pulse"
                className="text-construction-500"
              />
              <CardTitle>Document Categories</CardTitle>
            </div>
            <CardDescription>
              Track verification status by document type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {documentCategories.map((category, index) => (
                <Card
                  key={category.category}
                  className="hover-lift animate-scaleIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <AnimatedIcon
                          icon={category.icon}
                          animation="float"
                          className={category.color}
                        />
                        <h4 className="font-semibold text-sm">
                          {category.category}
                        </h4>
                      </div>
                      <div className="space-y-1">
                        {category.types.slice(0, 3).map((type, idx) => (
                          <p
                            key={idx}
                            className="text-xs text-muted-foreground"
                          >
                            • {type}
                          </p>
                        ))}
                        {category.types.length > 3 && (
                          <p className="text-xs text-muted-foreground">
                            +{category.types.length - 3} more
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-muted-foreground">Verified</p>
                          <p className="font-semibold text-emerald-600">
                            <AnimatedCounter value={category.verified} />
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Pending</p>
                          <p className="font-semibold text-yellow-600">
                            <AnimatedCounter value={category.pending} />
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

        {/* Filters & Search */}
        <Card className="animate-slideInUp">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by employee, document type, or category..."
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
                  <SelectItem value="pending_review">Pending Review</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Documents Table */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={FileText}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Document Verification Queue</CardTitle>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <AnimatedCounter value={filteredDocuments.length} /> documents
              </Badge>
            </div>
            <CardDescription>
              AI-powered document verification and validation system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee & Document</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>AI Confidence</TableHead>
                  <TableHead>Upload Details</TableHead>
                  <TableHead>Reviewer</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((document, index) => (
                  <TableRow
                    key={document.id}
                    className="animate-fadeInUp hover:bg-muted/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {document.employeeName}
                        </p>
                        <p className="text-xs font-medium">
                          {document.documentType}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {document.category}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(document.status)}
                        className="flex items-center gap-1 w-fit"
                      >
                        {document.status === "pending_review" && (
                          <PulsingDot className="scale-50" />
                        )}
                        <AnimatedIcon
                          icon={getStatusIcon(document.status)}
                          className="h-3 w-3"
                        />
                        {document.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={document.aiConfidence}
                            className="w-16"
                          />
                          <span
                            className={`text-sm font-medium ${getConfidenceColor(
                              document.aiConfidence,
                            )}`}
                          >
                            {document.aiConfidence}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          AI Analysis
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>{document.uploadedDate}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {document.fileSize}
                        </p>
                        {document.verificationDate && (
                          <p className="text-xs text-muted-foreground">
                            Verified: {document.verificationDate}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{document.reviewer}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover-lift"
                        >
                          <AnimatedIcon icon={Eye} className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover-lift"
                        >
                          <AnimatedIcon icon={Download} className="h-3 w-3" />
                        </Button>
                        {document.status === "pending_review" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover-lift"
                          >
                            <AnimatedIcon
                              icon={CheckCircle}
                              className="h-3 w-3"
                            />
                          </Button>
                        )}
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
