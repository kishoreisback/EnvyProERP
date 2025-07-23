import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import {
  FileText,
  Save,
  Send,
  ArrowLeft,
  Building,
  Users,
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Briefcase,
  MapPin,
  History,
  Eye,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

// Mock existing data - would come from API
const existingData = {
  id: "REQ-001",
  positionTitle: "Senior Project Manager",
  department: "Engineering",
  hiringManager: "John Smith",
  reportingTo: "Director of Engineering",
  jobLevel: "Senior Level",
  employmentType: "Full-time",
  headcount: 1,
  urgency: "high",
  startDate: "2025-02-01",
  endDate: "",
  budget: "$110,000 - $130,000",
  location: "New York, NY",
  workArrangement: "hybrid",
  jobDescription: `We are seeking an experienced Senior Project Manager to lead large-scale construction projects from inception to completion. The successful candidate will be responsible for managing project timelines, budgets, and teams while ensuring quality standards and safety compliance.

This role requires strong leadership skills, technical expertise, and the ability to coordinate multiple stakeholders including clients, contractors, and internal teams.`,
  responsibilities: `• Lead and manage multiple construction projects simultaneously
• Develop comprehensive project plans, timelines, and budgets
• Coordinate with architects, engineers, contractors, and clients
• Monitor project progress and implement corrective actions as needed
• Ensure compliance with safety regulations and quality standards
• Manage project budgets and control costs throughout project lifecycle`,
  requirements: `• Bachelor's degree in Construction Management, Engineering, or related field
• Minimum 8 years of experience in construction project management
• PMP certification preferred
• Strong knowledge of construction methods and materials
• Excellent leadership and communication skills
• Proficiency in project management software (MS Project, Primavera)`,
  skills:
    "Project Management, Leadership, Budgeting, Risk Management, Quality Control, Safety Management",
  experience: "8+ years",
  education: "Bachelor's degree in Construction Management or Engineering",
  certifications:
    "PMP (Project Management Professional) - Preferred, OSHA 30-Hour Construction Safety - Required",
  benefits:
    "Competitive salary with performance bonuses, Comprehensive health insurance, 401(k) with matching, Flexible work arrangements",
  justification: `The Engineering department is experiencing significant growth with 3 new major projects starting in Q1 2025. Our current project managers are at capacity, and we need an experienced senior-level PM to ensure successful delivery of these high-value projects totaling over $50M.

This position is critical for maintaining our project delivery standards and client satisfaction while supporting the company's expansion goals.`,
  approvalNotes: "Urgent requirement due to project commitments in Q1 2025.",
  status: "pending_approval",
  lastModified: "2024-12-20",
};

export default function EditJobRequisition() {
  const { id } = useParams();
  const [formData, setFormData] = useState(existingData);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");

  useEffect(() => {
    // Track changes
    setHasChanges(JSON.stringify(formData) !== JSON.stringify(existingData));
  }, [formData]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving changes:", formData);
    setHasChanges(false);
  };

  const handleSubmit = () => {
    console.log("Submitting updated requisition:", formData);
  };

  const sections = [
    { id: "basic", label: "Basic Info", icon: Building },
    { id: "details", label: "Job Details", icon: FileText },
    { id: "requirements", label: "Requirements", icon: Target },
    { id: "approval", label: "Approval", icon: CheckCircle },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild className="hover-lift">
                <Link to={`/hrms/recruitment/requisitions/${id}`}>
                  <AnimatedIcon
                    icon={ArrowLeft}
                    animation="bounce"
                    className="mr-2"
                  />
                  Back to Details
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Edit Job Requisition
              </h1>
              <GlowingOrb className="animate-pulse" />
              {hasChanges && <PulsingDot />}
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={FileText}
                animation="float"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                {formData.id} - {formData.positionTitle}
              </p>
              <Badge variant="outline" className="text-yellow-600">
                <Clock className="mr-1 h-3 w-3" />
                {formData.status.replace("_", " ")}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button variant="outline" className="hover-lift" asChild>
              <Link to={`/hrms/recruitment/requisitions/${id}`}>
                <AnimatedIcon icon={Eye} animation="bounce" className="mr-2" />
                View Details
              </Link>
            </Button>
            <Button
              variant="outline"
              className="hover-lift"
              onClick={handleSave}
              disabled={!hasChanges}
            >
              <AnimatedIcon icon={Save} animation="bounce" className="mr-2" />
              Save Changes
            </Button>
            <Button
              className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden"
              onClick={handleSubmit}
              disabled={!hasChanges}
            >
              <AnimatedIcon icon={Send} animation="bounce" className="mr-2" />
              Update & Submit
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Change Indicator */}
        {hasChanges && (
          <Card className="border-yellow-200 bg-yellow-50 animate-slideInDown">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-yellow-800">
                <AnimatedIcon
                  icon={AlertTriangle}
                  animation="bounce"
                  className="text-yellow-600"
                />
                <p className="text-sm font-medium">
                  You have unsaved changes. Remember to save your progress.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Navigation Sidebar */}
          <Card className="lg:col-span-1 h-fit animate-slideInLeft">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AnimatedIcon
                  icon={Target}
                  animation="pulse"
                  className="text-primary"
                />
                Sections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "ghost"}
                    className="w-full justify-start hover-lift"
                    onClick={() => setActiveSection(section.id)}
                  >
                    <AnimatedIcon
                      icon={section.icon}
                      animation="bounce"
                      className="mr-2"
                      size="sm"
                    />
                    {section.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Form */}
          <Card className="lg:col-span-3 hover-lift animate-slideInRight">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AnimatedIcon
                  icon={
                    sections.find((s) => s.id === activeSection)?.icon ||
                    FileText
                  }
                  animation="pulse"
                  className="text-primary"
                />
                {sections.find((s) => s.id === activeSection)?.label}
              </CardTitle>
              <CardDescription>
                Last modified: {formData.lastModified}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Basic Information Section */}
              {activeSection === "basic" && (
                <div className="space-y-6 animate-fadeInUp">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="positionTitle">Position Title *</Label>
                      <Input
                        id="positionTitle"
                        value={formData.positionTitle}
                        onChange={(e) =>
                          handleInputChange("positionTitle", e.target.value)
                        }
                        className="hover:shadow-lg transition-shadow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department *</Label>
                      <Select
                        value={formData.department}
                        onValueChange={(value) =>
                          handleInputChange("department", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Engineering">
                            Engineering
                          </SelectItem>
                          <SelectItem value="Operations">Operations</SelectItem>
                          <SelectItem value="Safety">Safety</SelectItem>
                          <SelectItem value="Quality Assurance">
                            Quality Assurance
                          </SelectItem>
                          <SelectItem value="Administration">
                            Administration
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="hiringManager">Hiring Manager *</Label>
                      <Input
                        id="hiringManager"
                        value={formData.hiringManager}
                        onChange={(e) =>
                          handleInputChange("hiringManager", e.target.value)
                        }
                        className="hover:shadow-lg transition-shadow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reportingTo">Reports To</Label>
                      <Input
                        id="reportingTo"
                        value={formData.reportingTo}
                        onChange={(e) =>
                          handleInputChange("reportingTo", e.target.value)
                        }
                        className="hover:shadow-lg transition-shadow"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="headcount">Number of Positions *</Label>
                      <Input
                        id="headcount"
                        type="number"
                        value={formData.headcount}
                        onChange={(e) =>
                          handleInputChange(
                            "headcount",
                            parseInt(e.target.value),
                          )
                        }
                        className="hover:shadow-lg transition-shadow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="urgency">Priority Level *</Label>
                      <Select
                        value={formData.urgency}
                        onValueChange={(value) =>
                          handleInputChange("urgency", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low Priority</SelectItem>
                          <SelectItem value="medium">
                            Medium Priority
                          </SelectItem>
                          <SelectItem value="high">High Priority</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                        className="hover:shadow-lg transition-shadow"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="justification">
                      Business Justification *
                    </Label>
                    <Textarea
                      id="justification"
                      value={formData.justification}
                      onChange={(e) =>
                        handleInputChange("justification", e.target.value)
                      }
                      className="min-h-[120px] hover:shadow-lg transition-shadow"
                    />
                  </div>
                </div>
              )}

              {/* Job Details Section */}
              {activeSection === "details" && (
                <div className="space-y-6 animate-fadeInUp">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="jobLevel">Job Level *</Label>
                      <Select
                        value={formData.jobLevel}
                        onValueChange={(value) =>
                          handleInputChange("jobLevel", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Entry Level">
                            Entry Level
                          </SelectItem>
                          <SelectItem value="Mid Level">Mid Level</SelectItem>
                          <SelectItem value="Senior Level">
                            Senior Level
                          </SelectItem>
                          <SelectItem value="Executive">Executive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employmentType">Employment Type *</Label>
                      <Select
                        value={formData.employmentType}
                        onValueChange={(value) =>
                          handleInputChange("employmentType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                          <SelectItem value="Temporary">Temporary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Desired Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) =>
                          handleInputChange("startDate", e.target.value)
                        }
                        className="hover:shadow-lg transition-shadow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="workArrangement">Work Arrangement</Label>
                      <Select
                        value={formData.workArrangement}
                        onValueChange={(value) =>
                          handleInputChange("workArrangement", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="onsite">On-site</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobDescription">Job Description *</Label>
                    <Textarea
                      id="jobDescription"
                      value={formData.jobDescription}
                      onChange={(e) =>
                        handleInputChange("jobDescription", e.target.value)
                      }
                      className="min-h-[150px] hover:shadow-lg transition-shadow"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="responsibilities">
                      Key Responsibilities *
                    </Label>
                    <Textarea
                      id="responsibilities"
                      value={formData.responsibilities}
                      onChange={(e) =>
                        handleInputChange("responsibilities", e.target.value)
                      }
                      className="min-h-[120px] hover:shadow-lg transition-shadow"
                    />
                  </div>
                </div>
              )}

              {/* Requirements Section */}
              {activeSection === "requirements" && (
                <div className="space-y-6 animate-fadeInUp">
                  <div className="space-y-2">
                    <Label htmlFor="requirements">Minimum Requirements *</Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) =>
                        handleInputChange("requirements", e.target.value)
                      }
                      className="min-h-[120px] hover:shadow-lg transition-shadow"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Required Skills</Label>
                    <Textarea
                      id="skills"
                      value={formData.skills}
                      onChange={(e) =>
                        handleInputChange("skills", e.target.value)
                      }
                      className="min-h-[100px] hover:shadow-lg transition-shadow"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience *</Label>
                      <Input
                        id="experience"
                        value={formData.experience}
                        onChange={(e) =>
                          handleInputChange("experience", e.target.value)
                        }
                        className="hover:shadow-lg transition-shadow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="education">Education Requirements</Label>
                      <Input
                        id="education"
                        value={formData.education}
                        onChange={(e) =>
                          handleInputChange("education", e.target.value)
                        }
                        className="hover:shadow-lg transition-shadow"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certifications">
                      Required Certifications
                    </Label>
                    <Textarea
                      id="certifications"
                      value={formData.certifications}
                      onChange={(e) =>
                        handleInputChange("certifications", e.target.value)
                      }
                      className="min-h-[80px] hover:shadow-lg transition-shadow"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="benefits">Benefits & Perks</Label>
                    <Textarea
                      id="benefits"
                      value={formData.benefits}
                      onChange={(e) =>
                        handleInputChange("benefits", e.target.value)
                      }
                      className="min-h-[80px] hover:shadow-lg transition-shadow"
                    />
                  </div>
                </div>
              )}

              {/* Approval Section */}
              {activeSection === "approval" && (
                <div className="space-y-6 animate-fadeInUp">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Annual Budget/Salary Range *</Label>
                    <Input
                      id="budget"
                      value={formData.budget}
                      onChange={(e) =>
                        handleInputChange("budget", e.target.value)
                      }
                      className="hover:shadow-lg transition-shadow"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="approvalNotes">
                      Additional Notes for Approval
                    </Label>
                    <Textarea
                      id="approvalNotes"
                      value={formData.approvalNotes}
                      onChange={(e) =>
                        handleInputChange("approvalNotes", e.target.value)
                      }
                      className="min-h-[100px] hover:shadow-lg transition-shadow"
                    />
                  </div>

                  {/* Current Status */}
                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AnimatedIcon
                          icon={Clock}
                          animation="pulse"
                          className="text-yellow-600"
                        />
                        Current Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Status:</span>
                          <Badge variant="outline" className="text-yellow-600">
                            <Clock className="mr-1 h-3 w-3" />
                            Pending Approval
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Current Approver:
                          </span>
                          <span className="text-sm">Mike Wilson</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Last Modified:
                          </span>
                          <span className="text-sm">
                            {formData.lastModified}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Section Navigation */}
              <div className="flex items-center justify-between pt-6 border-t mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    const currentIndex = sections.findIndex(
                      (s) => s.id === activeSection,
                    );
                    if (currentIndex > 0) {
                      setActiveSection(sections[currentIndex - 1].id);
                    }
                  }}
                  disabled={activeSection === sections[0].id}
                  className="hover-lift"
                >
                  <AnimatedIcon
                    icon={ArrowLeft}
                    animation="bounce"
                    className="mr-2"
                  />
                  Previous
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleSave}
                    disabled={!hasChanges}
                    className="hover-lift"
                  >
                    <AnimatedIcon
                      icon={Save}
                      animation="pulse"
                      className="mr-2"
                    />
                    Save Changes
                  </Button>

                  {activeSection === sections[sections.length - 1].id ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={!hasChanges}
                      className="hover-lift animate-gradient bg-gradient-to-r from-primary to-emerald-500 relative overflow-hidden"
                    >
                      <AnimatedIcon
                        icon={Send}
                        animation="bounce"
                        className="mr-2"
                      />
                      Update & Submit
                      <ShimmerEffect className="absolute inset-0" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        const currentIndex = sections.findIndex(
                          (s) => s.id === activeSection,
                        );
                        if (currentIndex < sections.length - 1) {
                          setActiveSection(sections[currentIndex + 1].id);
                        }
                      }}
                      className="hover-lift"
                    >
                      Next
                      <AnimatedIcon
                        icon={Target}
                        animation="bounce"
                        className="ml-2"
                      />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
