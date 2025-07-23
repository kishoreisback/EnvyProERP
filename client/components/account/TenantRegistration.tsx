import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Building2,
  User,
  Globe,
  Package,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Star,
  Crown,
  Zap,
  Shield,
  Clock,
  Users,
  Database,
  Activity,
  Upload,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { AnimatedIcon, ShimmerEffect } from "../ui/animated-icons";
import { TenantRegistrationForm, BillingCycle } from "./types";
import { industryTypes, subscriptionPlans, moduleInfo } from "./data";
import { useNavigate } from "react-router-dom";
import { FileUpload } from "../ui/file-upload";

export function TenantRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<TenantRegistrationForm>({
    // Basic Info
    organizationName: "",
    adminName: "",
    adminEmail: "",
    adminPhone: "",
    adminAlternatePhone: "",

    // Company Details
    companyLegalName: "",
    incorporationDate: "",
    companyType: "private_limited",
    registeredAddress: "",
    communicationAddress: "",
    pincode: "",
    website: "",

    // Industry & Location
    industryId: "",
    subIndustry: "",
    businessDescription: "",
    country: "India",
    state: "",
    city: "",
    timezone: "Asia/Kolkata",

    // Statutory Details
    panNumber: "",
    tanNumber: "",
    gstNumber: "",
    cinNumber: "",
    llpinNumber: "",
    udyamNumber: "",
    iecCode: "",
    fssaiNumber: "",
    drugLicenseNumber: "",

    // Industry Specific
    reraNumber: "",
    sebiRegNumber: "",
    rbiLicenseNumber: "",
    irdaiLicenseNumber: "",
    aicteLicenseNumber: "",
    mciRegNumber: "",

    // Bank Details
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branchName: "",
    accountType: "current",

    // Document Uploads
    logoFile: undefined,
    panCardFile: undefined,
    gstCertificateFile: undefined,
    incorporationCertificateFile: undefined,
    moaFile: undefined,
    aoaFile: undefined,
    cancelledChequeFile: undefined,
    addressProofFile: undefined,
    additionalDocuments: [],

    // Subscription
    planId: "trial",
    billingCycle: "monthly",
    selectedModules: [],

    // Preferences
    functionalCurrency: "INR",
    financialYearStart: "04-01", // April 1st (Indian FY)
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24",

    // Additional Admin Details
    adminDesignation: "",
    adminDepartment: "",

    // Terms
    acceptedTerms: false,
    acceptedPrivacy: false,
    acceptedDataProcessing: false,
  });

  const updateFormData = (field: keyof TenantRegistrationForm, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectedIndustry = industryTypes.find(
    (i) => i.id === formData.industryId,
  );
  const selectedPlan = subscriptionPlans.find((p) => p.id === formData.planId);

  const formatCurrency = (amount: number, currency: string = "INR") => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStepIcon = (step: number) => {
    if (step < currentStep)
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (step === currentStep)
      return (
        <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
          {step}
        </div>
      );
    return (
      <div className="h-5 w-5 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-bold">
        {step}
      </div>
    );
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.organizationName &&
          formData.adminName &&
          formData.adminEmail &&
          formData.adminPhone
        );
      case 2:
        return (
          formData.companyLegalName &&
          formData.companyType &&
          formData.registeredAddress &&
          formData.pincode
        );
      case 3:
        return (
          formData.industryId &&
          formData.country &&
          formData.state &&
          formData.city &&
          formData.businessDescription
        );
      case 4:
        return (
          formData.panNumber &&
          formData.bankName &&
          formData.accountNumber &&
          formData.ifscCode
        );
      case 5:
        return (
          formData.logoFile &&
          formData.panCardFile &&
          formData.incorporationCertificateFile
        );
      case 6:
        return formData.planId;
      case 7:
        return formData.selectedModules.length > 0 && formData.adminDesignation;
      case 8:
        return (
          formData.acceptedTerms &&
          formData.acceptedPrivacy &&
          formData.acceptedDataProcessing
        );
      default:
        return false;
    }
  };

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Generate login credentials
      const username = formData.adminEmail;
      const password = generatePassword();

      // Mock tenant data storage
      const newTenant = {
        id: `tenant_${Date.now()}`,
        ...formData,
        createdAt: new Date().toISOString(),
        status: formData.planId === "trial" ? "trial" : "active",
        credentials: {
          username,
          password,
          firstLogin: true,
          mustChangePassword: true,
        },
      };

      // Store in localStorage for demo (would be real DB in production)
      const existingTenants = JSON.parse(
        localStorage.getItem("tenants") || "[]",
      );
      existingTenants.push(newTenant);
      localStorage.setItem("tenants", JSON.stringify(existingTenants));

      // Simulate sending welcome email
      const emailData = {
        to: formData.adminEmail,
        subject: `Welcome to ${formData.organizationName} - Your Account is Ready!`,
        template: "tenant-welcome",
        data: {
          organizationName: formData.organizationName,
          adminName: formData.adminName,
          username: username,
          password: password,
          loginUrl: `${window.location.origin}/login`,
          tenantId: newTenant.id,
          planName:
            subscriptionPlans.find((p) => p.id === formData.planId)?.name ||
            "Trial Plan",
        },
      };

      console.log("📧 Welcome Email Sent:", emailData);

      // Show success toast with credential info
      toast({
        title: "🎉 Tenant Created Successfully!",
        description: `${formData.organizationName} has been registered. Welcome email with credentials sent to ${formData.adminEmail}`,
        duration: 8000,
      });

      // Show credentials popup for demo
      setTimeout(() => {
        alert(
          `🔐 DEMO CREDENTIALS:\n\nUsername: ${username}\nPassword: ${password}\n\nThese credentials have been sent to your email address.`,
        );
      }, 1000);

      // Navigate to tenants list after showing credentials
      setTimeout(() => {
        navigate("/account/tenants");
      }, 3000);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description:
          "There was an error creating your tenant. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Welcome to Our Platform
          </h1>
          <p className="text-lg text-muted-foreground">
            Set up your organization in just a few simple steps
          </p>
        </div>

        {/* Progress Steps */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between overflow-x-auto">
              {[
                { step: 1, title: "Organization", icon: Building2 },
                { step: 2, title: "Company Details", icon: FileText },
                { step: 3, title: "Industry & Location", icon: Globe },
                { step: 4, title: "Statutory & Banking", icon: Shield },
                { step: 5, title: "Documents Upload", icon: Upload },
                { step: 6, title: "Subscription Plan", icon: Package },
                { step: 7, title: "Modules & Preferences", icon: Zap },
                { step: 8, title: "Review & Confirm", icon: CheckCircle },
              ].map((item, index) => (
                <div key={item.step} className="flex items-center">
                  <div className="flex flex-col items-center">
                    {getStepIcon(item.step)}
                    <span
                      className={`text-sm mt-2 ${currentStep >= item.step ? "text-blue-600 font-medium" : "text-gray-500"}`}
                    >
                      {item.title}
                    </span>
                  </div>
                  {index < 7 && (
                    <div
                      className={`h-0.5 w-8 mx-2 ${currentStep > item.step ? "bg-green-600" : "bg-gray-300"}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <AnimatedIcon
                    icon={Building2}
                    animation="bounce"
                    className="h-12 w-12 mx-auto text-blue-600 mb-4"
                  />
                  <h2 className="text-2xl font-bold">Organization Details</h2>
                  <p className="text-muted-foreground">
                    Tell us about your organization
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="orgName">Organization Name *</Label>
                    <Input
                      id="orgName"
                      value={formData.organizationName}
                      onChange={(e) =>
                        updateFormData("organizationName", e.target.value)
                      }
                      placeholder="Enter your company name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminName">Admin Name *</Label>
                    <Input
                      id="adminName"
                      value={formData.adminName}
                      onChange={(e) =>
                        updateFormData("adminName", e.target.value)
                      }
                      placeholder="Enter admin full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Admin Email *</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      value={formData.adminEmail}
                      onChange={(e) =>
                        updateFormData("adminEmail", e.target.value)
                      }
                      placeholder="admin@company.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminPhone">Admin Phone *</Label>
                    <Input
                      id="adminPhone"
                      value={formData.adminPhone}
                      onChange={(e) =>
                        updateFormData("adminPhone", e.target.value)
                      }
                      placeholder="+91-9876543210"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <AnimatedIcon
                    icon={FileText}
                    animation="float"
                    className="h-12 w-12 mx-auto text-blue-600 mb-4"
                  />
                  <h2 className="text-2xl font-bold">Company Details</h2>
                  <p className="text-muted-foreground">
                    Provide comprehensive company information
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyLegalName">
                      Legal Company Name *
                    </Label>
                    <Input
                      id="companyLegalName"
                      value={formData.companyLegalName}
                      onChange={(e) =>
                        updateFormData("companyLegalName", e.target.value)
                      }
                      placeholder="As per incorporation certificate"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyType">Company Type *</Label>
                    <Select
                      value={formData.companyType}
                      onValueChange={(value) =>
                        updateFormData("companyType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select company type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private_limited">
                          Private Limited
                        </SelectItem>
                        <SelectItem value="public_limited">
                          Public Limited
                        </SelectItem>
                        <SelectItem value="llp">
                          Limited Liability Partnership
                        </SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="proprietorship">
                          Proprietorship
                        </SelectItem>
                        <SelectItem value="trust">Trust</SelectItem>
                        <SelectItem value="society">Society</SelectItem>
                        <SelectItem value="ngo">NGO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="incorporationDate">
                      Incorporation Date
                    </Label>
                    <Input
                      id="incorporationDate"
                      type="date"
                      value={formData.incorporationDate}
                      onChange={(e) =>
                        updateFormData("incorporationDate", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) =>
                        updateFormData("website", e.target.value)
                      }
                      placeholder="https://www.company.com"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="registeredAddress">
                      Registered Address *
                    </Label>
                    <Textarea
                      id="registeredAddress"
                      value={formData.registeredAddress}
                      onChange={(e) =>
                        updateFormData("registeredAddress", e.target.value)
                      }
                      placeholder="Complete registered address"
                      rows={3}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="communicationAddress">
                        Communication Address
                      </Label>
                      <Textarea
                        id="communicationAddress"
                        value={formData.communicationAddress}
                        onChange={(e) =>
                          updateFormData("communicationAddress", e.target.value)
                        }
                        placeholder="If different from registered address"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) =>
                          updateFormData("pincode", e.target.value)
                        }
                        placeholder="6-digit pincode"
                        maxLength={6}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <AnimatedIcon
                    icon={Globe}
                    animation="float"
                    className="h-12 w-12 mx-auto text-blue-600 mb-4"
                  />
                  <h2 className="text-2xl font-bold">Industry & Location</h2>
                  <p className="text-muted-foreground">
                    Help us customize your experience
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessDescription">
                      Business Description *
                    </Label>
                    <Textarea
                      id="businessDescription"
                      value={formData.businessDescription}
                      onChange={(e) =>
                        updateFormData("businessDescription", e.target.value)
                      }
                      placeholder="Describe your business activities and services"
                      rows={4}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="subIndustry">Sub-Industry</Label>
                      <Input
                        id="subIndustry"
                        value={formData.subIndustry}
                        onChange={(e) =>
                          updateFormData("subIndustry", e.target.value)
                        }
                        placeholder="Specific industry segment"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone *</Label>
                      <Select
                        value={formData.timezone}
                        onValueChange={(value) =>
                          updateFormData("timezone", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Kolkata">
                            Asia/Kolkata (IST)
                          </SelectItem>
                          <SelectItem value="Asia/Dubai">
                            Asia/Dubai (GST)
                          </SelectItem>
                          <SelectItem value="Europe/London">
                            Europe/London (GMT/BST)
                          </SelectItem>
                          <SelectItem value="America/New_York">
                            America/New_York (EST/EDT)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Industry Type *</Label>
                    <div className="grid gap-3 md:grid-cols-2">
                      {industryTypes.map((industry) => (
                        <div
                          key={industry.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            formData.industryId === industry.id
                              ? "border-blue-500 bg-blue-50 shadow-md"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() =>
                            updateFormData("industryId", industry.id)
                          }
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{industry.icon}</span>
                            <div>
                              <h3 className="font-medium">{industry.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {industry.category}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedIndustry && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium mb-2">
                        Selected Industry: {selectedIndustry.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {selectedIndustry.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-sm font-medium">
                          Default modules:
                        </span>
                        {selectedIndustry.defaultModules.map((module) => (
                          <Badge
                            key={module}
                            variant="outline"
                            className="text-xs"
                          >
                            {module}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) =>
                          updateFormData("country", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="USA">United States</SelectItem>
                          <SelectItem value="UK">United Kingdom</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) =>
                          updateFormData("state", e.target.value)
                        }
                        placeholder="Enter state"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => updateFormData("city", e.target.value)}
                        placeholder="Enter city"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <AnimatedIcon
                    icon={Shield}
                    animation="pulse"
                    className="h-12 w-12 mx-auto text-blue-600 mb-4"
                  />
                  <h2 className="text-2xl font-bold">
                    Statutory & Banking Details
                  </h2>
                  <p className="text-muted-foreground">
                    Essential compliance and banking information
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Statutory Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Statutory Information
                    </h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="panNumber">PAN Number *</Label>
                        <Input
                          id="panNumber"
                          value={formData.panNumber}
                          onChange={(e) =>
                            updateFormData(
                              "panNumber",
                              e.target.value.toUpperCase(),
                            )
                          }
                          placeholder="ABCDE1234F"
                          maxLength={10}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gstNumber">GST Number</Label>
                        <Input
                          id="gstNumber"
                          value={formData.gstNumber}
                          onChange={(e) =>
                            updateFormData(
                              "gstNumber",
                              e.target.value.toUpperCase(),
                            )
                          }
                          placeholder="22ABCDE1234F1Z5"
                          maxLength={15}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tanNumber">TAN Number</Label>
                        <Input
                          id="tanNumber"
                          value={formData.tanNumber}
                          onChange={(e) =>
                            updateFormData(
                              "tanNumber",
                              e.target.value.toUpperCase(),
                            )
                          }
                          placeholder="ABCD12345E"
                          maxLength={10}
                        />
                      </div>
                    </div>

                    {/* Banking Details */}
                    <div className="space-y-4 mt-6">
                      <h3 className="text-lg font-semibold">
                        Banking Information
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="bankName">Bank Name *</Label>
                          <Input
                            id="bankName"
                            value={formData.bankName}
                            onChange={(e) =>
                              updateFormData("bankName", e.target.value)
                            }
                            placeholder="State Bank of India"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="accountNumber">
                            Account Number *
                          </Label>
                          <Input
                            id="accountNumber"
                            value={formData.accountNumber}
                            onChange={(e) =>
                              updateFormData("accountNumber", e.target.value)
                            }
                            placeholder="Account number"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="ifscCode">IFSC Code *</Label>
                          <Input
                            id="ifscCode"
                            value={formData.ifscCode}
                            onChange={(e) =>
                              updateFormData(
                                "ifscCode",
                                e.target.value.toUpperCase(),
                              )
                            }
                            placeholder="SBIN0001234"
                            maxLength={11}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="branchName">Branch Name</Label>
                          <Input
                            id="branchName"
                            value={formData.branchName}
                            onChange={(e) =>
                              updateFormData("branchName", e.target.value)
                            }
                            placeholder="Bank branch name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <AnimatedIcon
                    icon={Upload}
                    animation="bounce"
                    className="h-12 w-12 mx-auto text-blue-600 mb-4"
                  />
                  <h2 className="text-2xl font-bold">Document Upload</h2>
                  <p className="text-muted-foreground">
                    Upload required business documents
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FileUpload
                    label="Company Logo"
                    description="Upload your company logo (PNG, JPG)"
                    accept="image/*"
                    maxSize={5}
                    required
                    value={formData.logoFile}
                    onChange={(file) => updateFormData("logoFile", file)}
                  />

                  <FileUpload
                    label="PAN Card"
                    description="Company PAN card copy"
                    accept=".pdf,.jpg,.jpeg,.png"
                    maxSize={10}
                    required
                    value={formData.panCardFile}
                    onChange={(file) => updateFormData("panCardFile", file)}
                  />

                  <FileUpload
                    label="Incorporation Certificate"
                    description="Certificate of incorporation"
                    accept=".pdf,.jpg,.jpeg,.png"
                    maxSize={10}
                    required
                    value={formData.incorporationCertificateFile}
                    onChange={(file) =>
                      updateFormData("incorporationCertificateFile", file)
                    }
                  />

                  <FileUpload
                    label="Cancelled Cheque"
                    description="Bank account verification"
                    accept=".pdf,.jpg,.jpeg,.png"
                    maxSize={5}
                    value={formData.cancelledChequeFile}
                    onChange={(file) =>
                      updateFormData("cancelledChequeFile", file)
                    }
                  />
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <AnimatedIcon
                    icon={Package}
                    animation="pulse"
                    className="h-12 w-12 mx-auto text-blue-600 mb-4"
                  />
                  <h2 className="text-2xl font-bold">Choose Your Plan</h2>
                  <p className="text-muted-foreground">
                    Select the perfect plan for your organization
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {subscriptionPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`relative p-6 border rounded-xl cursor-pointer transition-all ${
                        formData.planId === plan.id
                          ? "border-blue-500 bg-blue-50 shadow-lg scale-105"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                      onClick={() => updateFormData("planId", plan.id)}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-gradient-to-r from-blue-600 to-orange-500 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Popular
                          </Badge>
                        </div>
                      )}

                      <div className="text-center">
                        {plan.type === "enterprise" && (
                          <Crown className="h-8 w-8 mx-auto text-yellow-500 mb-3" />
                        )}
                        {plan.type === "professional" && (
                          <Star className="h-8 w-8 mx-auto text-blue-500 mb-3" />
                        )}
                        {plan.type === "basic" && (
                          <Package className="h-8 w-8 mx-auto text-green-500 mb-3" />
                        )}
                        {plan.type === "trial" && (
                          <Clock className="h-8 w-8 mx-auto text-gray-500 mb-3" />
                        )}

                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {plan.description}
                        </p>

                        <div className="mb-4">
                          <div className="text-3xl font-bold">
                            {plan.pricing.monthly === 0
                              ? "Free"
                              : formatCurrency(plan.pricing.monthly)}
                          </div>
                          {plan.pricing.monthly > 0 && (
                            <div className="text-sm text-muted-foreground">
                              per month
                            </div>
                          )}
                          {plan.trialDays && (
                            <div className="text-sm text-blue-600 font-medium mt-1">
                              {plan.trialDays} days free trial
                            </div>
                          )}
                        </div>

                        <div className="space-y-2 text-left">
                          {plan.features.slice(0, 4).map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                          {plan.features.length > 4 && (
                            <div className="text-sm text-muted-foreground">
                              +{plan.features.length - 4} more features
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedPlan && formData.planId !== "trial" && (
                  <Card className="bg-gradient-to-r from-blue-50 to-orange-50">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-4">Billing Cycle</h4>
                      <div className="grid gap-3 md:grid-cols-3">
                        {(
                          ["monthly", "quarterly", "yearly"] as BillingCycle[]
                        ).map((cycle) => (
                          <div
                            key={cycle}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                              formData.billingCycle === cycle
                                ? "border-blue-500 bg-white shadow-md"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() =>
                              updateFormData("billingCycle", cycle)
                            }
                          >
                            <div className="text-center">
                              <h5 className="font-medium capitalize">
                                {cycle}
                              </h5>
                              <div className="text-lg font-bold mt-1">
                                {cycle === "monthly" &&
                                  formatCurrency(selectedPlan.pricing.monthly)}
                                {cycle === "quarterly" &&
                                  formatCurrency(
                                    selectedPlan.pricing.monthly * 3 * 0.9,
                                  )}
                                {cycle === "yearly" &&
                                  formatCurrency(selectedPlan.pricing.yearly)}
                              </div>
                              {cycle === "quarterly" && (
                                <div className="text-sm text-green-600">
                                  Save 10%
                                </div>
                              )}
                              {cycle === "yearly" && (
                                <div className="text-sm text-green-600">
                                  Save 15%
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <AnimatedIcon
                    icon={Zap}
                    animation="glow"
                    className="h-12 w-12 mx-auto text-blue-600 mb-4"
                  />
                  <h2 className="text-2xl font-bold">Select Modules</h2>
                  <p className="text-muted-foreground">
                    Choose the modules your organization needs
                  </p>
                </div>

                {selectedPlan && (
                  <Card className="bg-blue-50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">
                        Included in {selectedPlan.name}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPlan.modules.map((module) => (
                          <Badge
                            key={module.moduleId}
                            variant="default"
                            className="bg-blue-600"
                          >
                            {module.moduleName}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  {moduleInfo
                    .filter(
                      (module) =>
                        !selectedPlan?.modules.some(
                          (m) => m.moduleId === module.id,
                        ) || selectedPlan.type === "trial",
                    )
                    .map((module) => {
                      const isIncluded = selectedPlan?.modules.some(
                        (m) => m.moduleId === module.id,
                      );
                      const isSelected = formData.selectedModules.includes(
                        module.id,
                      );
                      const isPremium =
                        module.isPremium && selectedPlan?.type === "trial";

                      return (
                        <div
                          key={module.id}
                          className={`p-4 border rounded-lg transition-all ${
                            isPremium
                              ? "border-orange-200 bg-orange-50 opacity-75"
                              : isSelected || isIncluded
                                ? "border-blue-500 bg-blue-50 shadow-md"
                                : "border-gray-200 hover:border-gray-300 cursor-pointer"
                          }`}
                          onClick={() => {
                            if (!isPremium && !isIncluded) {
                              const newModules = isSelected
                                ? formData.selectedModules.filter(
                                    (m) => m !== module.id,
                                  )
                                : [...formData.selectedModules, module.id];
                              updateFormData("selectedModules", newModules);
                            }
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <span className="text-2xl">{module.icon}</span>
                              <div>
                                <h4 className="font-medium flex items-center gap-2">
                                  {module.name}
                                  {module.isPremium && (
                                    <Crown className="h-4 w-4 text-yellow-500" />
                                  )}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {module.description}
                                </p>
                                <div className="mt-2">
                                  <Badge variant="outline" className="text-xs">
                                    {module.category}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                              {isIncluded && (
                                <Badge variant="default">Included</Badge>
                              )}
                              {isPremium && (
                                <Badge variant="outline">Premium</Badge>
                              )}
                              {!isIncluded && !isPremium && (
                                <Checkbox
                                  checked={isSelected}
                                  onChange={() => {}}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <AnimatedIcon
                    icon={CheckCircle}
                    animation="bounce"
                    className="h-12 w-12 mx-auto text-green-600 mb-4"
                  />
                  <h2 className="text-2xl font-bold">Review & Confirm</h2>
                  <p className="text-muted-foreground">
                    Verify your information before creating your account
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Organization Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Organization:
                        </span>
                        <span className="font-medium">
                          {formData.organizationName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Admin:</span>
                        <span className="font-medium">
                          {formData.adminName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium">
                          {formData.adminEmail}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Industry:</span>
                        <span className="font-medium">
                          {selectedIndustry?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">
                          {formData.city}, {formData.state}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Subscription Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Plan:</span>
                        <span className="font-medium">
                          {selectedPlan?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Billing:</span>
                        <span className="font-medium capitalize">
                          {formData.billingCycle}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium">
                          {selectedPlan?.pricing.monthly === 0
                            ? "Free"
                            : formatCurrency(
                                formData.billingCycle === "yearly"
                                  ? selectedPlan?.pricing.yearly || 0
                                  : formData.billingCycle === "quarterly"
                                    ? (selectedPlan?.pricing.monthly || 0) *
                                      3 *
                                      0.9
                                    : selectedPlan?.pricing.monthly || 0,
                              )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Modules:</span>
                        <span className="font-medium">
                          {(selectedPlan?.modules.length || 0) +
                            formData.selectedModules.length}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={formData.acceptedTerms}
                          onCheckedChange={(checked) =>
                            updateFormData("acceptedTerms", checked)
                          }
                        />
                        <div className="text-sm">
                          I agree to the{" "}
                          <a href="#" className="text-blue-600 hover:underline">
                            Terms of Service
                          </a>{" "}
                          and understand the subscription terms and conditions.
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={formData.acceptedPrivacy}
                          onCheckedChange={(checked) =>
                            updateFormData("acceptedPrivacy", checked)
                          }
                        />
                        <div className="text-sm">
                          I acknowledge that I have read and understood the{" "}
                          <a href="#" className="text-blue-600 hover:underline">
                            Privacy Policy
                          </a>{" "}
                          and consent to the processing of my data.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep === 7 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <AnimatedIcon
                    icon={Zap}
                    animation="glow"
                    className="h-12 w-12 mx-auto text-blue-600 mb-4"
                  />
                  <h2 className="text-2xl font-bold">Modules & Preferences</h2>
                  <p className="text-muted-foreground">
                    Customize your platform experience
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Admin Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Administrator Details
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="adminDesignation">
                          Admin Designation *
                        </Label>
                        <Input
                          id="adminDesignation"
                          value={formData.adminDesignation}
                          onChange={(e) =>
                            updateFormData("adminDesignation", e.target.value)
                          }
                          placeholder="CEO, Managing Director, etc."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="adminDepartment">Department</Label>
                        <Input
                          id="adminDepartment"
                          value={formData.adminDepartment}
                          onChange={(e) =>
                            updateFormData("adminDepartment", e.target.value)
                          }
                          placeholder="Executive, IT, Operations, etc."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="adminAlternatePhone">
                          Alternate Phone
                        </Label>
                        <Input
                          id="adminAlternatePhone"
                          value={formData.adminAlternatePhone}
                          onChange={(e) =>
                            updateFormData(
                              "adminAlternatePhone",
                              e.target.value,
                            )
                          }
                          placeholder="+91-9876543210"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Business Preferences */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Business Preferences
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="functionalCurrency">
                          Functional Currency
                        </Label>
                        <Select
                          value={formData.functionalCurrency}
                          onValueChange={(value) =>
                            updateFormData("functionalCurrency", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="INR">
                              INR - Indian Rupee
                            </SelectItem>
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="GBP">
                              GBP - British Pound
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="financialYearStart">
                          Financial Year Start
                        </Label>
                        <Select
                          value={formData.financialYearStart}
                          onValueChange={(value) =>
                            updateFormData("financialYearStart", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select FY start" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="04-01">
                              April 1st (Indian FY)
                            </SelectItem>
                            <SelectItem value="01-01">
                              January 1st (Calendar Year)
                            </SelectItem>
                            <SelectItem value="07-01">July 1st</SelectItem>
                            <SelectItem value="10-01">October 1st</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateFormat">Date Format</Label>
                        <Select
                          value={formData.dateFormat}
                          onValueChange={(value) =>
                            updateFormData("dateFormat", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select date format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DD/MM/YYYY">
                              DD/MM/YYYY
                            </SelectItem>
                            <SelectItem value="MM/DD/YYYY">
                              MM/DD/YYYY
                            </SelectItem>
                            <SelectItem value="YYYY-MM-DD">
                              YYYY-MM-DD
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeFormat">Time Format</Label>
                        <Select
                          value={formData.timeFormat}
                          onValueChange={(value) =>
                            updateFormData("timeFormat", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select time format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="24">24 Hour (14:30)</SelectItem>
                            <SelectItem value="12">
                              12 Hour (2:30 PM)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Module Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Additional Modules
                    </h3>
                    {selectedPlan && (
                      <Card className="bg-blue-50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2">
                            Included in {selectedPlan.name}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedPlan.modules.map((module) => (
                              <Badge
                                key={module.moduleId}
                                variant="default"
                                className="bg-blue-600"
                              >
                                {module.moduleName}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <div className="grid gap-3 md:grid-cols-2">
                      {moduleInfo
                        .filter(
                          (module) =>
                            !selectedPlan?.modules.some(
                              (m) => m.moduleId === module.id,
                            ) || selectedPlan.type === "trial",
                        )
                        .map((module) => {
                          const isSelected = formData.selectedModules.includes(
                            module.id,
                          );
                          const isPremium =
                            module.isPremium && selectedPlan?.type === "trial";

                          return (
                            <div
                              key={module.id}
                              className={`p-3 border rounded-lg transition-all cursor-pointer ${
                                isPremium
                                  ? "border-orange-200 bg-orange-50 opacity-75"
                                  : isSelected
                                    ? "border-blue-500 bg-blue-50 shadow-md"
                                    : "border-gray-200 hover:border-gray-300"
                              }`}
                              onClick={() => {
                                if (!isPremium) {
                                  const newModules = isSelected
                                    ? formData.selectedModules.filter(
                                        (m) => m !== module.id,
                                      )
                                    : [...formData.selectedModules, module.id];
                                  updateFormData("selectedModules", newModules);
                                }
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <span className="text-lg">{module.icon}</span>
                                  <div>
                                    <h4 className="font-medium">
                                      {module.name}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      {module.description}
                                    </p>
                                  </div>
                                </div>
                                <Checkbox checked={isSelected} readOnly />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 8 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <AnimatedIcon
                    icon={CheckCircle}
                    animation="bounce"
                    className="h-12 w-12 mx-auto text-green-600 mb-4"
                  />
                  <h2 className="text-2xl font-bold">Review & Confirm</h2>
                  <p className="text-muted-foreground">
                    Please review all information before creating your account
                  </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Organization Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        Organization Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Organization Name:
                        </span>
                        <span className="font-medium">
                          {formData.organizationName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Legal Name:
                        </span>
                        <span className="font-medium">
                          {formData.companyLegalName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Company Type:
                        </span>
                        <span className="font-medium capitalize">
                          {formData.companyType.replace("_", " ")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Industry:</span>
                        <span className="font-medium">
                          {selectedIndustry?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">
                          {formData.city}, {formData.state}, {formData.country}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Website:</span>
                        <span className="font-medium">
                          {formData.website || "Not provided"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Admin Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Crown className="h-5 w-5" />
                        Administrator Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">
                          {formData.adminName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium">
                          {formData.adminEmail}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="font-medium">
                          {formData.adminPhone}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Designation:
                        </span>
                        <span className="font-medium">
                          {formData.adminDesignation}
                        </span>
                      </div>
                      {formData.adminDepartment && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Department:
                          </span>
                          <span className="font-medium">
                            {formData.adminDepartment}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Statutory Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Statutory Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          PAN Number:
                        </span>
                        <span className="font-medium font-mono">
                          {formData.panNumber}
                        </span>
                      </div>
                      {formData.gstNumber && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            GST Number:
                          </span>
                          <span className="font-medium font-mono">
                            {formData.gstNumber}
                          </span>
                        </div>
                      )}
                      {formData.cinNumber && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            CIN Number:
                          </span>
                          <span className="font-medium font-mono">
                            {formData.cinNumber}
                          </span>
                        </div>
                      )}
                      {formData.udyamNumber && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Udyam Number:
                          </span>
                          <span className="font-medium font-mono">
                            {formData.udyamNumber}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Banking Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Banking Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Bank Name:
                        </span>
                        <span className="font-medium">{formData.bankName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Account Number:
                        </span>
                        <span className="font-medium font-mono">
                          ****{formData.accountNumber.slice(-4)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          IFSC Code:
                        </span>
                        <span className="font-medium font-mono">
                          {formData.ifscCode}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Account Type:
                        </span>
                        <span className="font-medium capitalize">
                          {formData.accountType.replace("_", " ")}
                        </span>
                      </div>
                      {formData.branchName && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Branch:</span>
                          <span className="font-medium">
                            {formData.branchName}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Subscription Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Subscription Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Plan:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {selectedPlan?.name}
                          </span>
                          {selectedPlan?.popular && (
                            <Star className="h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Billing Cycle:
                        </span>
                        <span className="font-medium capitalize">
                          {formData.billingCycle}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium">
                          {selectedPlan?.pricing.monthly === 0
                            ? "Free Trial"
                            : formatCurrency(
                                formData.billingCycle === "yearly"
                                  ? selectedPlan?.pricing.yearly || 0
                                  : formData.billingCycle === "quarterly"
                                    ? (selectedPlan?.pricing.monthly || 0) *
                                      3 *
                                      0.9
                                    : selectedPlan?.pricing.monthly || 0,
                              )}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Documents Status */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Documents Upload Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        {
                          label: "Company Logo",
                          file: formData.logoFile,
                          required: true,
                        },
                        {
                          label: "PAN Card",
                          file: formData.panCardFile,
                          required: true,
                        },
                        {
                          label: "Incorporation Certificate",
                          file: formData.incorporationCertificateFile,
                          required: true,
                        },
                        {
                          label: "GST Certificate",
                          file: formData.gstCertificateFile,
                          required: false,
                        },
                        {
                          label: "Cancelled Cheque",
                          file: formData.cancelledChequeFile,
                          required: false,
                        },
                      ].map((doc, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="text-muted-foreground">
                            {doc.label}
                            {doc.required && (
                              <span className="text-red-500 ml-1">*</span>
                            )}
                          </span>
                          <div className="flex items-center gap-2">
                            {doc.file ? (
                              <>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-sm font-medium text-green-600">
                                  Uploaded
                                </span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="h-4 w-4 text-orange-600" />
                                <span className="text-sm font-medium text-orange-600">
                                  {doc.required ? "Required" : "Optional"}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Modules & Preferences Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Modules & Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="font-medium mb-2">Included Modules</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedPlan?.modules.map((module) => (
                            <Badge
                              key={module.moduleId}
                              variant="default"
                              className="text-xs"
                            >
                              {module.moduleName}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {formData.selectedModules.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">
                            Additional Modules
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {formData.selectedModules.map((moduleId) => {
                              const module = moduleInfo.find(
                                (m) => m.id === moduleId,
                              );
                              return module ? (
                                <Badge
                                  key={moduleId}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {module.name}
                                </Badge>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid gap-3 md:grid-cols-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Currency:</span>
                        <span className="font-medium">
                          {formData.functionalCurrency}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Date Format:
                        </span>
                        <span className="font-medium">
                          {formData.dateFormat}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Time Format:
                        </span>
                        <span className="font-medium">
                          {formData.timeFormat === "24" ? "24 Hour" : "12 Hour"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Timezone:</span>
                        <span className="font-medium">{formData.timezone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Terms and Conditions */}
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={formData.acceptedTerms}
                          onCheckedChange={(checked) =>
                            updateFormData("acceptedTerms", checked)
                          }
                        />
                        <div className="text-sm">
                          I agree to the{" "}
                          <a
                            href="#"
                            className="text-blue-600 hover:underline font-medium"
                          >
                            Terms of Service
                          </a>{" "}
                          and understand the subscription terms and conditions.
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={formData.acceptedPrivacy}
                          onCheckedChange={(checked) =>
                            updateFormData("acceptedPrivacy", checked)
                          }
                        />
                        <div className="text-sm">
                          I acknowledge that I have read and understood the{" "}
                          <a
                            href="#"
                            className="text-blue-600 hover:underline font-medium"
                          >
                            Privacy Policy
                          </a>{" "}
                          and consent to the processing of my data.
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={formData.acceptedDataProcessing}
                          onCheckedChange={(checked) =>
                            updateFormData("acceptedDataProcessing", checked)
                          }
                        />
                        <div className="text-sm">
                          I consent to the processing of business data,
                          documents, and information for account setup,
                          compliance verification, and service delivery
                          purposes.
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">
                        🔐 What happens next?
                      </h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Your account will be created immediately</li>
                        <li>
                          • Login credentials will be sent to{" "}
                          {formData.adminEmail}
                        </li>
                        <li>
                          • You can start adding users and configuring your
                          workspace
                        </li>
                        <li>• Our support team will assist with onboarding</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep < 8 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 relative overflow-hidden"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                  <ShimmerEffect className="absolute inset-0" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 relative overflow-hidden"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Create Account
                    </>
                  )}
                  <ShimmerEffect className="absolute inset-0" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
