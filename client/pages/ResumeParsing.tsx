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
import { Textarea } from "@/components/ui/textarea";
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
  FileText,
  Search,
  Filter,
  Eye,
  Download,
  CheckCircle,
  AlertTriangle,
  Clock,
  Brain,
  Zap,
  Target,
  TrendingUp,
  Users,
  Award,
  Star,
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Plus,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const parsingStats = [
  {
    label: "Resumes Processed",
    value: 1247,
    change: "+89 this week",
    icon: FileText,
    color: "text-primary",
  },
  {
    label: "Skills Extracted",
    value: 8456,
    change: "+234 unique skills",
    icon: Brain,
    color: "text-construction-500",
  },
  {
    label: "Auto-Matched",
    value: 456,
    change: "85% accuracy",
    icon: Target,
    color: "text-emerald-600",
  },
  {
    label: "Processing Queue",
    value: 23,
    change: "Avg 2.3 min",
    icon: Clock,
    color: "text-yellow-500",
  },
];

const recentParsingResults = [
  {
    id: 1,
    fileName: "john_smith_resume.pdf",
    candidateName: "John Smith",
    uploadedAt: "2 minutes ago",
    status: "completed",
    accuracy: 94,
    skillsExtracted: 15,
    experience: "8 years",
    position: "Project Manager",
    matchedJobs: 3,
  },
  {
    id: 2,
    fileName: "sarah_johnson_cv.docx",
    candidateName: "Sarah Johnson",
    uploadedAt: "5 minutes ago",
    status: "processing",
    accuracy: 0,
    skillsExtracted: 0,
    experience: "",
    position: "",
    matchedJobs: 0,
  },
  {
    id: 3,
    fileName: "mike_chen_resume.pdf",
    candidateName: "Mike Chen",
    uploadedAt: "10 minutes ago",
    status: "completed",
    accuracy: 91,
    skillsExtracted: 18,
    experience: "5 years",
    position: "Site Engineer",
    matchedJobs: 2,
  },
  {
    id: 4,
    fileName: "lisa_wang_portfolio.pdf",
    candidateName: "Lisa Wang",
    uploadedAt: "15 minutes ago",
    status: "error",
    accuracy: 0,
    skillsExtracted: 0,
    experience: "",
    position: "",
    matchedJobs: 0,
  },
  {
    id: 5,
    fileName: "david_wilson_cv.pdf",
    candidateName: "David Wilson",
    uploadedAt: "20 minutes ago",
    status: "completed",
    accuracy: 88,
    skillsExtracted: 12,
    experience: "3 years",
    position: "QA Inspector",
    matchedJobs: 4,
  },
];

const skillCategories = [
  {
    category: "Technical Skills",
    skills: [
      "AutoCAD",
      "Project Management",
      "Quality Control",
      "Safety Management",
    ],
    count: 234,
    color: "text-primary",
  },
  {
    category: "Soft Skills",
    skills: [
      "Leadership",
      "Communication",
      "Problem Solving",
      "Team Management",
    ],
    count: 189,
    color: "text-construction-500",
  },
  {
    category: "Certifications",
    skills: ["PMP", "OSHA 30", "LEED AP", "Six Sigma"],
    count: 156,
    color: "text-emerald-600",
  },
  {
    category: "Software",
    skills: ["MS Project", "Primavera", "Revit", "Excel"],
    count: 145,
    color: "text-yellow-600",
  },
];

export default function ResumeParsing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isDragOver, setIsDragOver] = useState(false);

  const filteredResults = recentParsingResults.filter((result) => {
    const matchesSearch =
      result.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || result.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "processing":
        return "secondary";
      case "error":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "processing":
        return Clock;
      case "error":
        return AlertTriangle;
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
                Resume Parsing & Analysis
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Brain}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                AI-powered resume analysis and skill extraction
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
              Export Results
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Zap} animation="bounce" className="mr-2" />
              Bulk Process
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {parsingStats.map((stat, index) => (
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

        {/* Upload Section */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Upload}
                animation="bounce"
                className="text-construction-500"
              />
              <CardTitle>Upload Resumes</CardTitle>
            </div>
            <CardDescription>
              Upload single or multiple resumes for AI-powered parsing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragOver
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-primary/50"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
              }}
            >
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <AnimatedIcon
                    icon={Upload}
                    animation="bounce"
                    className="text-primary h-8 w-8"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">
                    Drag and drop resumes here, or click to browse
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Supports PDF, DOCX, DOC files up to 10MB each
                  </p>
                </div>
                <Button className="hover-lift">
                  <AnimatedIcon
                    icon={Plus}
                    animation="bounce"
                    className="mr-2"
                  />
                  Select Files
                </Button>
              </div>
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
                    placeholder="Search by candidate name, file name, or position..."
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
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Recent Parsing Results */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={FileText}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Recent Parsing Results</CardTitle>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <AnimatedCounter value={filteredResults.length} /> results
              </Badge>
            </div>
            <CardDescription>
              AI-powered resume analysis and extraction results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>File</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Accuracy</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Matches</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResults.map((result, index) => (
                  <TableRow
                    key={result.id}
                    className="animate-fadeInUp hover:bg-muted/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {result.candidateName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {result.position || "Position not detected"}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm font-mono">{result.fileName}</p>
                        <p className="text-xs text-muted-foreground">
                          {result.uploadedAt}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(result.status)}
                        className="flex items-center gap-1 w-fit"
                      >
                        {result.status === "processing" && (
                          <PulsingDot className="scale-50" />
                        )}
                        <AnimatedIcon
                          icon={getStatusIcon(result.status)}
                          className="h-3 w-3"
                        />
                        {result.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {result.accuracy > 0 ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Progress
                              value={result.accuracy}
                              className="w-16"
                            />
                            <span className="text-sm font-medium">
                              {result.accuracy}%
                            </span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {result.skillsExtracted > 0 ? (
                        <Badge variant="outline" className="text-xs">
                          <Brain className="h-3 w-3 mr-1" />
                          {result.skillsExtracted} skills
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {result.experience ? (
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{result.experience}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {result.matchedJobs > 0 ? (
                        <Badge variant="secondary" className="text-xs">
                          <Target className="h-3 w-3 mr-1" />
                          {result.matchedJobs} matches
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
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
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Skill Analytics */}
        <Card className="animate-bounceIn">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Award}
                animation="glow"
                className="text-construction-500"
              />
              <CardTitle>Skill Analytics</CardTitle>
            </div>
            <CardDescription>
              Most frequently extracted skills across all resumes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {skillCategories.map((category, index) => (
                <Card
                  key={category.category}
                  className="hover-lift animate-scaleIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">
                          {category.category}
                        </h4>
                        <Badge variant="outline" className={category.color}>
                          <AnimatedCounter value={category.count} />
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        {category.skills.map((skill, skillIndex) => (
                          <div
                            key={skillIndex}
                            className="flex items-center gap-2 text-xs"
                          >
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span className="text-muted-foreground">
                              {skill}
                            </span>
                          </div>
                        ))}
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
