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
} from "lucide-react";
import { Link } from "react-router-dom";

const departments = [
  "Engineering",
  "Operations",
  "Safety",
  "Quality Assurance",
  "Administration",
  "Finance",
];

const hiringManagers = [
  { name: "John Smith", department: "Engineering" },
  { name: "Sarah Johnson", department: "Operations" },
  { name: "Mike Wilson", department: "Safety" },
  { name: "Lisa Chen", department: "Quality Assurance" },
  { name: "David Park", department: "Administration" },
];

const jobLevels = ["Entry Level", "Mid Level", "Senior Level", "Executive"];

const employmentTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Temporary",
  "Intern",
];

const urgencyLevels = [
  { value: "low", label: "Low Priority", color: "text-green-600" },
  { value: "medium", label: "Medium Priority", color: "text-yellow-600" },
  { value: "high", label: "High Priority", color: "text-red-600" },
  { value: "critical", label: "Critical", color: "text-red-800" },
];

export default function CreateJobRequisition() {
  const [formData, setFormData] = useState({
    positionTitle: "",
    department: "",
    hiringManager: "",
    reportingTo: "",
    jobLevel: "",
    employmentType: "",
    headcount: 1,
    urgency: "",
    startDate: "",
    endDate: "",
    budget: "",
    location: "",
    workArrangement: "",
    jobDescription: "",
    responsibilities: "",
    requirements: "",
    skills: "",
    experience: "",
    education: "",
    certifications: "",
    benefits: "",
    justification: "",
    approvalNotes: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", formData);
    // Implement draft save logic
  };

  const handleSubmit = () => {
    console.log("Submitting requisition:", formData);
    // Implement submission logic
  };

  const getStepIcon = (step: number) => {
    if (step < currentStep) return CheckCircle;
    if (step === currentStep) return Clock;
    return Target;
  };

  const getStepColor = (step: number) => {
    if (step < currentStep) return "text-emerald-600";
    if (step === currentStep) return "text-primary";
    return "text-gray-400";
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild className="hover-lift">
                <Link to="/hrms/recruitment/requisitions">
                  <AnimatedIcon
                    icon={ArrowLeft}
                    animation="bounce"
                    className="mr-2"
                  />
                  Back to Requisitions
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Create Job Requisition
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
                Create a new job requisition with approval workflow
              </p>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button
              variant="outline"
              className="hover-lift"
              onClick={handleSaveDraft}
            >
              <AnimatedIcon icon={Save} animation="bounce" className="mr-2" />
              Save Draft
            </Button>
            <Button
              className="hover-lift animate-gradient bg-gradient-to-r from-primary to-construction-500 relative overflow-hidden"
              onClick={handleSubmit}
            >
              <AnimatedIcon icon={Send} animation="bounce" className="mr-2" />
              Submit for Approval
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Progress Steps */}
        <Card className="animate-fadeInUp">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {[
                "Basic Information",
                "Job Details",
                "Requirements",
                "Approval & Budget",
              ].map((stepName, index) => {
                const step = index + 1;
                const StepIcon = getStepIcon(step);
                return (
                  <div
                    key={step}
                    className="flex items-center gap-2"
                    style={{ flex: step === totalSteps ? "none" : "1" }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                          step <= currentStep
                            ? "border-primary bg-primary text-white"
                            : "border-gray-300 bg-white text-gray-400"
                        }`}
                      >
                        <AnimatedIcon
                          icon={StepIcon}
                          animation="pulse"
                          size="sm"
                          className={getStepColor(step)}
                        />
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          step <= currentStep ? "text-primary" : "text-gray-400"
                        }`}
                      >
                        {stepName}
                      </span>
                    </div>
                    {step < totalSteps && (
                      <div
                        className={`h-0.5 flex-1 ${
                          step < currentStep ? "bg-primary" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card className="hover-lift animate-fadeInUp">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AnimatedIcon
                icon={Target}
                animation="pulse"
                className="text-primary"
              />
              Step {currentStep}:{" "}
              {
                [
                  "Basic Information",
                  "Job Details",
                  "Requirements",
                  "Approval & Budget",
                ][currentStep - 1]
              }
            </CardTitle>
            <CardDescription>
              Complete all required fields to proceed to the next step
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-slideInRight">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="positionTitle">Position Title *</Label>
                    <Input
                      id="positionTitle"
                      placeholder="e.g., Senior Project Manager"
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
                      <SelectTrigger className="hover:shadow-lg transition-shadow">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            <div className="flex items-center gap-2">
                              <AnimatedIcon
                                icon={Building}
                                size="sm"
                                className="text-construction-500"
                              />
                              {dept}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="hiringManager">Hiring Manager *</Label>
                    <Select
                      value={formData.hiringManager}
                      onValueChange={(value) =>
                        handleInputChange("hiringManager", value)
                      }
                    >
                      <SelectTrigger className="hover:shadow-lg transition-shadow">
                        <SelectValue placeholder="Select hiring manager" />
                      </SelectTrigger>
                      <SelectContent>
                        {hiringManagers.map((manager) => (
                          <SelectItem key={manager.name} value={manager.name}>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <AnimatedIcon
                                  icon={Users}
                                  size="sm"
                                  className="text-primary"
                                />
                                {manager.name}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {manager.department}
                              </p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reportingTo">Reports To</Label>
                    <Input
                      id="reportingTo"
                      placeholder="Direct supervisor"
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
                      min="1"
                      value={formData.headcount}
                      onChange={(e) =>
                        handleInputChange("headcount", parseInt(e.target.value))
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
                      <SelectTrigger className="hover:shadow-lg transition-shadow">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <div className="flex items-center gap-2">
                              <AnimatedIcon
                                icon={AlertTriangle}
                                size="sm"
                                className={level.color}
                              />
                              {level.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="Work location"
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
                    placeholder="Explain why this position is needed and how it supports business objectives..."
                    value={formData.justification}
                    onChange={(e) =>
                      handleInputChange("justification", e.target.value)
                    }
                    className="min-h-[100px] hover:shadow-lg transition-shadow"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Job Details */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-slideInRight">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="jobLevel">Job Level *</Label>
                    <Select
                      value={formData.jobLevel}
                      onValueChange={(value) =>
                        handleInputChange("jobLevel", value)
                      }
                    >
                      <SelectTrigger className="hover:shadow-lg transition-shadow">
                        <SelectValue placeholder="Select job level" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            <div className="flex items-center gap-2">
                              <AnimatedIcon
                                icon={Target}
                                size="sm"
                                className="text-construction-500"
                              />
                              {level}
                            </div>
                          </SelectItem>
                        ))}
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
                      <SelectTrigger className="hover:shadow-lg transition-shadow">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {employmentTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            <div className="flex items-center gap-2">
                              <AnimatedIcon
                                icon={Briefcase}
                                size="sm"
                                className="text-primary"
                              />
                              {type}
                            </div>
                          </SelectItem>
                        ))}
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
                    <Label htmlFor="endDate">
                      Contract End Date (if applicable)
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        handleInputChange("endDate", e.target.value)
                      }
                      className="hover:shadow-lg transition-shadow"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobDescription">Job Description *</Label>
                  <Textarea
                    id="jobDescription"
                    placeholder="Provide a comprehensive description of the role, its purpose, and key objectives..."
                    value={formData.jobDescription}
                    onChange={(e) =>
                      handleInputChange("jobDescription", e.target.value)
                    }
                    className="min-h-[120px] hover:shadow-lg transition-shadow"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsibilities">
                    Key Responsibilities *
                  </Label>
                  <Textarea
                    id="responsibilities"
                    placeholder="List the main duties and responsibilities of this position..."
                    value={formData.responsibilities}
                    onChange={(e) =>
                      handleInputChange("responsibilities", e.target.value)
                    }
                    className="min-h-[120px] hover:shadow-lg transition-shadow"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Requirements */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-slideInRight">
                <div className="space-y-2">
                  <Label htmlFor="requirements">Minimum Requirements *</Label>
                  <Textarea
                    id="requirements"
                    placeholder="List the essential qualifications, skills, and experience required..."
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
                    placeholder="Technical and soft skills required for this position..."
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
                      placeholder="e.g., 3-5 years"
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
                      placeholder="e.g., Bachelor's degree in Engineering"
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
                    placeholder="Professional certifications, licenses, or training required..."
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
                    placeholder="Compensation package, benefits, and perks offered..."
                    value={formData.benefits}
                    onChange={(e) =>
                      handleInputChange("benefits", e.target.value)
                    }
                    className="min-h-[80px] hover:shadow-lg transition-shadow"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Approval & Budget */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-slideInRight">
                <div className="space-y-2">
                  <Label htmlFor="budget">Annual Budget/Salary Range *</Label>
                  <Input
                    id="budget"
                    placeholder="e.g., $80,000 - $120,000"
                    value={formData.budget}
                    onChange={(e) =>
                      handleInputChange("budget", e.target.value)
                    }
                    className="hover:shadow-lg transition-shadow"
                  />
                  <p className="text-sm text-muted-foreground">
                    Include base salary, benefits, and any additional costs
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workArrangement">Work Arrangement</Label>
                  <Select
                    value={formData.workArrangement}
                    onValueChange={(value) =>
                      handleInputChange("workArrangement", value)
                    }
                  >
                    <SelectTrigger className="hover:shadow-lg transition-shadow">
                      <SelectValue placeholder="Select work arrangement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onsite">
                        <div className="flex items-center gap-2">
                          <AnimatedIcon
                            icon={Building}
                            size="sm"
                            className="text-construction-500"
                          />
                          On-site
                        </div>
                      </SelectItem>
                      <SelectItem value="remote">
                        <div className="flex items-center gap-2">
                          <AnimatedIcon
                            icon={MapPin}
                            size="sm"
                            className="text-primary"
                          />
                          Remote
                        </div>
                      </SelectItem>
                      <SelectItem value="hybrid">
                        <div className="flex items-center gap-2">
                          <AnimatedIcon
                            icon={Target}
                            size="sm"
                            className="text-emerald-600"
                          />
                          Hybrid
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="approvalNotes">
                    Additional Notes for Approval
                  </Label>
                  <Textarea
                    id="approvalNotes"
                    placeholder="Any additional information for the approval team..."
                    value={formData.approvalNotes}
                    onChange={(e) =>
                      handleInputChange("approvalNotes", e.target.value)
                    }
                    className="min-h-[100px] hover:shadow-lg transition-shadow"
                  />
                </div>

                {/* Review Summary */}
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AnimatedIcon
                        icon={CheckCircle}
                        animation="glow"
                        className="text-emerald-600"
                      />
                      Requisition Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid gap-2 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium">Position:</p>
                        <p className="text-sm text-muted-foreground">
                          {formData.positionTitle || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Department:</p>
                        <p className="text-sm text-muted-foreground">
                          {formData.department || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Hiring Manager:</p>
                        <p className="text-sm text-muted-foreground">
                          {formData.hiringManager || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Budget:</p>
                        <p className="text-sm text-muted-foreground">
                          {formData.budget || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
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
                  onClick={handleSaveDraft}
                  className="hover-lift"
                >
                  <AnimatedIcon
                    icon={Save}
                    animation="pulse"
                    className="mr-2"
                  />
                  Save Draft
                </Button>

                {currentStep < totalSteps ? (
                  <Button onClick={handleNext} className="hover-lift">
                    Next
                    <AnimatedIcon
                      icon={Target}
                      animation="bounce"
                      className="ml-2"
                    />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="hover-lift animate-gradient bg-gradient-to-r from-primary to-emerald-500 relative overflow-hidden"
                  >
                    <AnimatedIcon
                      icon={Send}
                      animation="bounce"
                      className="mr-2"
                    />
                    Submit for Approval
                    <ShimmerEffect className="absolute inset-0" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
