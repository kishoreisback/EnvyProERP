import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
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
  Star,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Award,
  FileText,
  Plus,
  Eye,
  Download,
  Upload,
  Target,
  ArrowLeft,
} from "lucide-react";

const candidateStats = [
  { label: "Total Candidates", value: 342, color: "text-primary" },
  { label: "Active Profiles", value: 156, color: "text-emerald-600" },
  { label: "Available Now", value: 89, color: "text-construction-500" },
  { label: "High Rated", value: 67, color: "text-yellow-500" },
];

const candidates = [
  {
    id: 1,
    name: "Sarah Mitchell",
    email: "sarah.mitchell@email.com",
    phone: "+1 (555) 123-4567",
    currentRole: "Project Manager",
    desiredRole: "Senior Project Manager",
    experience: "8 years",
    location: "New York, NY",
    availability: "2 weeks",
    rating: 4.8,
    skills: [
      "Project Management",
      "PMP Certified",
      "Construction",
      "Leadership",
      "Budgeting",
    ],
    education: "MS Construction Management",
    lastContact: "2024-12-20",
    source: "LinkedIn",
    status: "active",
    avatar: "/placeholder.svg",
    salaryExpectation: "$120,000",
    willingToRelocate: true,
  },
  {
    id: 2,
    name: "David Park",
    email: "david.park@email.com",
    phone: "+1 (555) 234-5678",
    currentRole: "Site Supervisor",
    desiredRole: "Site Manager",
    experience: "6 years",
    location: "Los Angeles, CA",
    availability: "Immediate",
    rating: 4.5,
    skills: ["Site Management", "Safety", "Team Leadership", "OSHA", "Quality"],
    education: "BS Civil Engineering",
    lastContact: "2024-12-18",
    source: "Indeed",
    status: "active",
    avatar: "/placeholder.svg",
    salaryExpectation: "$85,000",
    willingToRelocate: false,
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    email: "maria.rodriguez@email.com",
    phone: "+1 (555) 345-6789",
    currentRole: "Safety Coordinator",
    desiredRole: "Safety Manager",
    experience: "4 years",
    location: "Houston, TX",
    availability: "1 month",
    rating: 4.9,
    skills: [
      "OSHA Certified",
      "Safety Training",
      "Compliance",
      "Risk Assessment",
    ],
    education: "BS Occupational Safety",
    lastContact: "2024-12-15",
    source: "Company Website",
    status: "contacted",
    avatar: "/placeholder.svg",
    salaryExpectation: "$70,000",
    willingToRelocate: true,
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.wilson@email.com",
    phone: "+1 (555) 456-7890",
    currentRole: "QA Inspector",
    desiredRole: "QA Lead",
    experience: "3 years",
    location: "Chicago, IL",
    availability: "Immediate",
    rating: 4.2,
    skills: [
      "Quality Control",
      "Inspection",
      "Documentation",
      "Testing",
      "Standards",
    ],
    education: "AS Construction Technology",
    lastContact: "2024-12-22",
    source: "Referral",
    status: "new",
    avatar: "/placeholder.svg",
    salaryExpectation: "$58,000",
    willingToRelocate: false,
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.wang@email.com",
    phone: "+1 (555) 567-8901",
    currentRole: "Project Engineer",
    desiredRole: "Senior Engineer",
    experience: "5 years",
    location: "Seattle, WA",
    availability: "3 weeks",
    rating: 4.7,
    skills: [
      "Structural Engineering",
      "AutoCAD",
      "Project Planning",
      "Analysis",
    ],
    education: "MS Structural Engineering",
    lastContact: "2024-12-10",
    source: "Glassdoor",
    status: "passive",
    avatar: "/placeholder.svg",
    salaryExpectation: "$95,000",
    willingToRelocate: true,
  },
];

export default function CandidateDatabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.currentRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ||
      candidate.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || candidate.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-emerald-600";
      case "contacted":
        return "text-blue-600";
      case "passive":
        return "text-yellow-600";
      case "new":
        return "text-purple-600";
      default:
        return "text-muted-foreground";
    }
  };

  const getAvailabilityColor = (availability: string) => {
    if (availability === "Immediate") return "text-emerald-600";
    if (availability.includes("week")) return "text-yellow-600";
    return "text-muted-foreground";
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
                Candidate Database
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
                Centralized talent pool and candidate management system
              </p>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon icon={Upload} animation="bounce" className="mr-2" />
              Import Resumes
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden">
              <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
              Add Candidate
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {candidateStats.map((stat, index) => (
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
                    icon={Users}
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
                  placeholder="Search candidates by name, role, skills, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="hover-lift">
                <AnimatedIcon
                  icon={Filter}
                  animation="bounce"
                  className="mr-2"
                />
                Advanced Filters
              </Button>
              <Button variant="outline" className="hover-lift">
                <AnimatedIcon
                  icon={Download}
                  animation="bounce"
                  className="mr-2"
                />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Candidates Grid */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedIcon
                  icon={Target}
                  animation="pulse"
                  className="text-primary"
                />
                <CardTitle>Talent Pool</CardTitle>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <AnimatedCounter value={filteredCandidates.length} /> candidates
              </Badge>
            </div>
            <CardDescription>
              Browse and manage your candidate database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCandidates.map((candidate, index) => (
                <Card
                  key={candidate.id}
                  className="hover-lift animate-scaleIn relative overflow-hidden group cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start gap-3">
                        <Avatar className="h-12 w-12 animate-pulse">
                          <AvatarImage src={candidate.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-construction-500 text-white">
                            {candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">
                            {candidate.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {candidate.currentRole}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <AnimatedIcon
                              icon={Star}
                              animation="glow"
                              className="text-yellow-500"
                              size="sm"
                            />
                            <span className="text-sm font-medium">
                              {candidate.rating}
                            </span>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getStatusColor(
                            candidate.status,
                          )}`}
                        >
                          {candidate.status === "active" && (
                            <PulsingDot className="mr-1 scale-50" />
                          )}
                          {candidate.status}
                        </Badge>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          Seeking: {candidate.desiredRole}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {candidate.location} • {candidate.experience}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Available:{" "}
                          <span
                            className={getAvailabilityColor(
                              candidate.availability,
                            )}
                          >
                            {candidate.availability}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          {candidate.education}
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="space-y-1">
                        <p className="text-xs font-medium">Top Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills
                            .slice(0, 3)
                            .map((skill, skillIndex) => (
                              <Badge
                                key={skillIndex}
                                variant="secondary"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          {candidate.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{candidate.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Salary & Relocation */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          Expected: {candidate.salaryExpectation}
                        </span>
                        {candidate.willingToRelocate && (
                          <Badge variant="outline" className="text-xs">
                            Open to relocate
                          </Badge>
                        )}
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {candidate.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {candidate.phone}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-2 border-t">
                        <Button size="sm" variant="outline" className="flex-1">
                          <AnimatedIcon icon={Eye} size="sm" className="mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <AnimatedIcon
                            icon={Mail}
                            size="sm"
                            className="mr-1"
                          />
                          Contact
                        </Button>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Last contact: {candidate.lastContact} • Source:{" "}
                        {candidate.source}
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
