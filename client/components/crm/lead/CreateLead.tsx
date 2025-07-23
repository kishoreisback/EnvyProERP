import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../ui/dialog";
import {
  UserPlus,
  Building2,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Calendar,
  Target,
  Save,
  X,
} from "lucide-react";
import { LeadForm, LeadStatus, LeadPriority } from "./types";
import { leadSources, industries, salesTeam } from "./data";

interface CreateLeadProps {
  onSubmit: (leadData: LeadForm) => void;
  onClose: () => void;
}

export function CreateLead({ onSubmit, onClose }: CreateLeadProps) {
  const [formData, setFormData] = useState<LeadForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    company: "",
    designation: "",
    industry: "",
    leadSourceId: "",
    status: "new",
    priority: "medium",
    assignedTo: "",
    expectedValue: undefined,
    requirements: "",
    budgetMin: undefined,
    budgetMax: undefined,
    timeline: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    campaignId: "",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    nextFollowUpDate: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.leadSourceId)
      newErrors.leadSourceId = "Lead source is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error creating lead:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof LeadForm, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Create New Lead
        </DialogTitle>
        <DialogDescription>
          Add a new lead to your sales pipeline with comprehensive information
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="max-h-[60vh] overflow-y-auto">
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="company">Company</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="tracking">Tracking</TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    placeholder="Enter first name"
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">{errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    placeholder="Enter last name"
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="email@company.com"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91-9876543210"
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alternatePhone">Alternate Phone</Label>
                  <Input
                    id="alternatePhone"
                    value={formData.alternatePhone || ""}
                    onChange={(e) =>
                      handleInputChange("alternatePhone", e.target.value)
                    }
                    placeholder="+91-9876543211"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    value={formData.designation || ""}
                    onChange={(e) =>
                      handleInputChange("designation", e.target.value)
                    }
                    placeholder="CEO, Manager, Director"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="leadSource">Lead Source *</Label>
                  <Select
                    value={formData.leadSourceId}
                    onValueChange={(value) =>
                      handleInputChange("leadSourceId", value)
                    }
                  >
                    <SelectTrigger
                      className={errors.leadSourceId ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select lead source" />
                    </SelectTrigger>
                    <SelectContent>
                      {leadSources.map((source) => (
                        <SelectItem key={source.id} value={source.id}>
                          {source.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.leadSourceId && (
                    <p className="text-sm text-red-500">
                      {errors.leadSourceId}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleInputChange("status", value as LeadStatus)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="proposal">Proposal</SelectItem>
                      <SelectItem value="negotiation">Negotiation</SelectItem>
                      <SelectItem value="nurturing">Nurturing</SelectItem>
                      <SelectItem value="on_hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) =>
                      handleInputChange("priority", value as LeadPriority)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignedTo">Assign To</Label>
                <Select
                  value={formData.assignedTo || ""}
                  onValueChange={(value) =>
                    handleInputChange("assignedTo", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sales person" />
                  </SelectTrigger>
                  <SelectContent>
                    {salesTeam.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            {/* Company Information Tab */}
            <TabsContent value="company" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={formData.company || ""}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                    placeholder="Company Pvt Ltd"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={formData.industry || ""}
                    onValueChange={(value) =>
                      handleInputChange("industry", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Address Information
                </h4>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={formData.street || ""}
                      onChange={(e) =>
                        handleInputChange("street", e.target.value)
                      }
                      placeholder="Complete address"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city || ""}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        placeholder="Mumbai"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state || ""}
                        onChange={(e) =>
                          handleInputChange("state", e.target.value)
                        }
                        placeholder="Maharashtra"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        value={formData.pincode || ""}
                        onChange={(e) =>
                          handleInputChange("pincode", e.target.value)
                        }
                        placeholder="400001"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={formData.country || "India"}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                        placeholder="India"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Requirements Tab */}
            <TabsContent value="requirements" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements || ""}
                  onChange={(e) =>
                    handleInputChange("requirements", e.target.value)
                  }
                  placeholder="Describe the lead's specific requirements and needs..."
                  rows={4}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="expectedValue">Expected Value (₹)</Label>
                  <Input
                    id="expectedValue"
                    type="number"
                    value={formData.expectedValue || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "expectedValue",
                        e.target.value ? parseInt(e.target.value) : undefined,
                      )
                    }
                    placeholder="250000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budgetMin">Budget Min (₹)</Label>
                  <Input
                    id="budgetMin"
                    type="number"
                    value={formData.budgetMin || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "budgetMin",
                        e.target.value ? parseInt(e.target.value) : undefined,
                      )
                    }
                    placeholder="200000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budgetMax">Budget Max (₹)</Label>
                  <Input
                    id="budgetMax"
                    type="number"
                    value={formData.budgetMax || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "budgetMax",
                        e.target.value ? parseInt(e.target.value) : undefined,
                      )
                    }
                    placeholder="400000"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Input
                    id="timeline"
                    value={formData.timeline || ""}
                    onChange={(e) =>
                      handleInputChange("timeline", e.target.value)
                    }
                    placeholder="Q2 2024, 3 months, ASAP"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nextFollowUpDate">Next Follow-up Date</Label>
                  <Input
                    id="nextFollowUpDate"
                    type="datetime-local"
                    value={formData.nextFollowUpDate || ""}
                    onChange={(e) =>
                      handleInputChange("nextFollowUpDate", e.target.value)
                    }
                  />
                </div>
              </div>
            </TabsContent>

            {/* Tracking Tab */}
            <TabsContent value="tracking" className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Campaign Tracking</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="campaignId">Campaign ID</Label>
                    <Input
                      id="campaignId"
                      value={formData.campaignId || ""}
                      onChange={(e) =>
                        handleInputChange("campaignId", e.target.value)
                      }
                      placeholder="campaign_001"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="utmSource">UTM Source</Label>
                    <Input
                      id="utmSource"
                      value={formData.utmSource || ""}
                      onChange={(e) =>
                        handleInputChange("utmSource", e.target.value)
                      }
                      placeholder="google, facebook, linkedin"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="utmMedium">UTM Medium</Label>
                    <Input
                      id="utmMedium"
                      value={formData.utmMedium || ""}
                      onChange={(e) =>
                        handleInputChange("utmMedium", e.target.value)
                      }
                      placeholder="cpc, social, email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="utmCampaign">UTM Campaign</Label>
                    <Input
                      id="utmCampaign"
                      value={formData.utmCampaign || ""}
                      onChange={(e) =>
                        handleInputChange("utmCampaign", e.target.value)
                      }
                      placeholder="spring_sale, product_launch"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Creating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create Lead
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}
