import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useToast } from "../ui/use-toast";
import {
  Building2,
  User,
  MapPin,
  Package,
  CreditCard,
  FileText,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Upload,
  X,
  Plus,
  Trash2,
  Eye,
  Calendar,
  Phone,
  Mail,
  MapPin as LocationIcon,
  Truck,
  Clock,
  DollarSign,
} from "lucide-react";
import { FranchiseeRegistrationForm, DeliveryVehicle, Document } from "./types";

interface FranchiseeRegistrationProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FranchiseeRegistrationForm) => void;
  mode?: "public" | "admin";
}

const STEPS = [
  {
    id: 1,
    title: "Business Information",
    icon: Building2,
    description: "Legal and business details",
  },
  {
    id: 2,
    title: "Owner Information",
    icon: User,
    description: "Personal and KYC details",
  },
  {
    id: 3,
    title: "Location Details",
    icon: MapPin,
    description: "Address and service area",
  },
  {
    id: 4,
    title: "Inventory Capability",
    icon: Package,
    description: "Storage and delivery setup",
  },
  {
    id: 5,
    title: "Bank Details",
    icon: CreditCard,
    description: "Financial information",
  },
  {
    id: 6,
    title: "Document Upload",
    icon: FileText,
    description: "Required documents",
  },
  {
    id: 7,
    title: "Terms & Agreement",
    icon: CheckCircle,
    description: "Final approval",
  },
];

export function FranchiseeRegistration({
  isOpen,
  onClose,
  onSubmit,
  mode = "public",
}: FranchiseeRegistrationProps) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FranchiseeRegistrationForm>>(
    {},
  );
  const [vehicles, setVehicles] = useState<DeliveryVehicle[]>([]);
  const [documents, setDocuments] = useState<
    { type: string; file: File | null; uploaded: boolean }[]
  >([
    { type: "pan", file: null, uploaded: false },
    { type: "aadhar", file: null, uploaded: false },
    { type: "gst_certificate", file: null, uploaded: false },
    { type: "bank_statement", file: null, uploaded: false },
    { type: "property_proof", file: null, uploaded: false },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  const progress = (currentStep / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const addVehicle = () => {
    const newVehicle: DeliveryVehicle = {
      id: `vehicle_${Date.now()}`,
      type: "bike",
      capacity: 0,
      hasRefrigeration: false,
      licenseNumber: "",
      ownershipType: "owned",
    };
    setVehicles([...vehicles, newVehicle]);
  };

  const removeVehicle = (id: string) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
  };

  const updateVehicle = (
    id: string,
    field: keyof DeliveryVehicle,
    value: any,
  ) => {
    setVehicles(
      vehicles.map((v) => (v.id === id ? { ...v, [field]: value } : v)),
    );
  };

  const handleFileUpload = (type: string, file: File) => {
    setDocuments((docs) =>
      docs.map((doc) =>
        doc.type === type ? { ...doc, file, uploaded: true } : doc,
      ),
    );
    toast({
      title: "File Uploaded",
      description: `${file.name} uploaded successfully.`,
    });
  };

  const handleFinalSubmit = (data: any) => {
    const completeData: FranchiseeRegistrationForm = {
      step1: formData.step1 || data,
      step2: formData.step2 || data,
      step3: formData.step3 || data,
      step4: { ...formData.step4, vehicles },
      step5: formData.step5 || data,
      step6: { documents },
      step7: { ...data, termsAccepted: true },
    };

    onSubmit(completeData);
    toast({
      title: "Application Submitted",
      description:
        "Your franchisee application has been submitted successfully.",
    });
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="legalName">Legal Business Name *</Label>
                <Input
                  id="legalName"
                  {...register("legalName", {
                    required: "Legal name is required",
                  })}
                  placeholder="Enter legal business name"
                />
                {errors.legalName && (
                  <p className="text-sm text-red-600">
                    {errors.legalName.message as string}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="tradeName">Trade Name *</Label>
                <Input
                  id="tradeName"
                  {...register("tradeName", {
                    required: "Trade name is required",
                  })}
                  placeholder="Enter trade name"
                />
              </div>
              <div>
                <Label htmlFor="businessType">Business Type *</Label>
                <Select
                  onValueChange={(value) => setValue("businessType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sole_proprietorship">
                      Sole Proprietorship
                    </SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="private_limited">
                      Private Limited
                    </SelectItem>
                    <SelectItem value="llp">LLP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="incorporationDate">Incorporation Date *</Label>
                <Input
                  id="incorporationDate"
                  type="date"
                  {...register("incorporationDate", {
                    required: "Date is required",
                  })}
                />
              </div>
              <div>
                <Label htmlFor="panNumber">PAN Number *</Label>
                <Input
                  id="panNumber"
                  {...register("panNumber", {
                    required: "PAN is required",
                    pattern: {
                      value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                      message: "Invalid PAN format",
                    },
                  })}
                  placeholder="ABCDE1234F"
                />
              </div>
              <div>
                <Label htmlFor="gstNumber">GST Number *</Label>
                <Input
                  id="gstNumber"
                  {...register("gstNumber", {
                    required: "GST number is required",
                  })}
                  placeholder="27ABCDE1234F1Z5"
                />
              </div>
              <div>
                <Label htmlFor="fssaiLicense">FSSAI License *</Label>
                <Input
                  id="fssaiLicense"
                  {...register("fssaiLicense", {
                    required: "FSSAI license is required",
                  })}
                  placeholder="Enter FSSAI license number"
                />
              </div>
              <div>
                <Label htmlFor="yearsInBusiness">Years in Business</Label>
                <Input
                  id="yearsInBusiness"
                  type="number"
                  {...register("yearsInBusiness")}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="investmentCapacity">
                  Investment Capacity (₹) *
                </Label>
                <Input
                  id="investmentCapacity"
                  type="number"
                  {...register("investmentCapacity", {
                    required: "Investment capacity is required",
                  })}
                  placeholder="2500000"
                />
              </div>
              <div>
                <Label htmlFor="expectedMonthlyRevenue">
                  Expected Monthly Revenue (₹)
                </Label>
                <Input
                  id="expectedMonthlyRevenue"
                  type="number"
                  {...register("expectedMonthlyRevenue")}
                  placeholder="800000"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  placeholder="+91-9876543210"
                />
              </div>
              <div>
                <Label htmlFor="aadharNumber">Aadhar Number *</Label>
                <Input
                  id="aadharNumber"
                  {...register("aadharNumber", {
                    required: "Aadhar number is required",
                    pattern: {
                      value: /^\d{4}-\d{4}-\d{4}$/,
                      message: "Invalid Aadhar format (XXXX-XXXX-XXXX)",
                    },
                  })}
                  placeholder="1234-5678-9012"
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth", {
                    required: "Date of birth is required",
                  })}
                />
              </div>
              <div>
                <Label htmlFor="experience">Experience (Years)</Label>
                <Input
                  id="experience"
                  type="number"
                  {...register("experience")}
                  placeholder="5"
                />
              </div>
              <div>
                <Label htmlFor="education">Education</Label>
                <Input
                  id="education"
                  {...register("education")}
                  placeholder="MBA, B.Com, etc."
                />
              </div>
            </div>

            <div>
              <Label htmlFor="previousBusinessExperience">
                Previous Business Experience
              </Label>
              <Textarea
                id="previousBusinessExperience"
                {...register("previousBusinessExperience")}
                placeholder="Describe your previous business experience..."
                rows={3}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label htmlFor="street">Street Address *</Label>
                <Input
                  id="street"
                  {...register("street", {
                    required: "Street address is required",
                  })}
                  placeholder="123, Commercial Complex"
                />
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  {...register("city", { required: "City is required" })}
                  placeholder="Mumbai"
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Select onValueChange={(value) => setValue("state", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                    <SelectItem value="gujarat">Gujarat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  {...register("zipCode", { required: "ZIP code is required" })}
                  placeholder="400001"
                />
              </div>
              <div>
                <Label htmlFor="landmark">Landmark</Label>
                <Input
                  id="landmark"
                  {...register("landmark")}
                  placeholder="Near Metro Station"
                />
              </div>
              <div>
                <Label htmlFor="area">Area/Locality *</Label>
                <Input
                  id="area"
                  {...register("area", { required: "Area is required" })}
                  placeholder="Andheri West"
                />
              </div>
              <div>
                <Label htmlFor="radius">Delivery Radius (km) *</Label>
                <Input
                  id="radius"
                  type="number"
                  {...register("radius", {
                    required: "Delivery radius is required",
                  })}
                  placeholder="5"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
              <LocationIcon className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Location Services</p>
                <p className="text-xs text-muted-foreground">
                  We'll verify your location and analyze market potential in
                  your area.
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="storageArea">
                  Total Storage Area (sq ft) *
                </Label>
                <Input
                  id="storageArea"
                  type="number"
                  {...register("storageArea", {
                    required: "Storage area is required",
                  })}
                  placeholder="500"
                />
              </div>
              <div>
                <Label htmlFor="staffCapacity">Staff Capacity *</Label>
                <Input
                  id="staffCapacity"
                  type="number"
                  {...register("staffCapacity", {
                    required: "Staff capacity is required",
                  })}
                  placeholder="8"
                />
              </div>
              <div>
                <Label htmlFor="freezerCapacity">
                  Freezer Capacity (liters)
                </Label>
                <Input
                  id="freezerCapacity"
                  type="number"
                  {...register("freezerCapacity")}
                  placeholder="200"
                />
              </div>
              <div>
                <Label htmlFor="dryStorageCapacity">Dry Storage (sq ft)</Label>
                <Input
                  id="dryStorageCapacity"
                  type="number"
                  {...register("dryStorageCapacity")}
                  placeholder="300"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="refrigeratedStorage"
                {...register("refrigeratedStorage")}
              />
              <Label htmlFor="refrigeratedStorage">
                Has Refrigerated Storage Facility
              </Label>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>Delivery Vehicles</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addVehicle}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Vehicle
                </Button>
              </div>

              {vehicles.map((vehicle, index) => (
                <Card key={vehicle.id} className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Vehicle {index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeVehicle(vehicle.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <Select
                        value={vehicle.type}
                        onValueChange={(value) =>
                          updateVehicle(vehicle.id, "type", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bike">Bike</SelectItem>
                          <SelectItem value="auto">Auto Rickshaw</SelectItem>
                          <SelectItem value="van">Van</SelectItem>
                          <SelectItem value="truck">Truck</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Capacity (kg)"
                        type="number"
                        value={vehicle.capacity}
                        onChange={(e) =>
                          updateVehicle(
                            vehicle.id,
                            "capacity",
                            parseInt(e.target.value),
                          )
                        }
                      />
                      <Input
                        placeholder="License Number"
                        value={vehicle.licenseNumber}
                        onChange={(e) =>
                          updateVehicle(
                            vehicle.id,
                            "licenseNumber",
                            e.target.value,
                          )
                        }
                      />
                      <Select
                        value={vehicle.ownershipType}
                        onValueChange={(value) =>
                          updateVehicle(vehicle.id, "ownershipType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Ownership" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owned">Owned</SelectItem>
                          <SelectItem value="rented">Rented</SelectItem>
                          <SelectItem value="third_party">
                            Third Party
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <Checkbox
                        checked={vehicle.hasRefrigeration}
                        onCheckedChange={(checked) =>
                          updateVehicle(vehicle.id, "hasRefrigeration", checked)
                        }
                      />
                      <Label>Has Refrigeration</Label>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="openTime">Opening Time *</Label>
                <Input
                  id="openTime"
                  type="time"
                  {...register("openTime", {
                    required: "Opening time is required",
                  })}
                />
              </div>
              <div>
                <Label htmlFor="closeTime">Closing Time *</Label>
                <Input
                  id="closeTime"
                  type="time"
                  {...register("closeTime", {
                    required: "Closing time is required",
                  })}
                />
              </div>
              <div>
                <Label>Working Days</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day) => (
                      <Badge
                        key={day}
                        variant="outline"
                        className="cursor-pointer"
                      >
                        {day}
                      </Badge>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="accountHolderName">Account Holder Name *</Label>
                <Input
                  id="accountHolderName"
                  {...register("accountHolderName", {
                    required: "Account holder name is required",
                  })}
                  placeholder="Enter account holder name"
                />
              </div>
              <div>
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  {...register("accountNumber", {
                    required: "Account number is required",
                  })}
                  placeholder="1234567890123456"
                />
              </div>
              <div>
                <Label htmlFor="ifscCode">IFSC Code *</Label>
                <Input
                  id="ifscCode"
                  {...register("ifscCode", {
                    required: "IFSC code is required",
                  })}
                  placeholder="HDFC0001234"
                />
              </div>
              <div>
                <Label htmlFor="bankName">Bank Name *</Label>
                <Input
                  id="bankName"
                  {...register("bankName", {
                    required: "Bank name is required",
                  })}
                  placeholder="HDFC Bank"
                />
              </div>
              <div>
                <Label htmlFor="branchName">Branch Name *</Label>
                <Input
                  id="branchName"
                  {...register("branchName", {
                    required: "Branch name is required",
                  })}
                  placeholder="Andheri West"
                />
              </div>
              <div>
                <Label htmlFor="accountType">Account Type *</Label>
                <Select
                  onValueChange={(value) => setValue("accountType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="current">Current</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="upiId">UPI ID</Label>
                <Input
                  id="upiId"
                  {...register("upiId")}
                  placeholder="yourname@bankname"
                />
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <h4 className="font-medium text-green-800">
                  Payment Integration
                </h4>
              </div>
              <p className="text-sm text-green-700">
                This account will be used for commission payments, refunds, and
                other financial transactions.
              </p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="grid gap-4">
              {documents.map((doc, index) => (
                <Card key={doc.type} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium capitalize">
                          {doc.type.replace("_", " ")} *
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {doc.file ? doc.file.name : "No file selected"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.uploaded && (
                        <Badge
                          variant="default"
                          className="bg-green-100 text-green-800"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Uploaded
                        </Badge>
                      )}
                      <input
                        type="file"
                        id={`file-${doc.type}`}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(doc.type, file);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          document.getElementById(`file-${doc.type}`)?.click()
                        }
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                      {doc.file && (
                        <Button type="button" variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="p-4 bg-amber-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-amber-600" />
                <h4 className="font-medium text-amber-800">
                  Document Requirements
                </h4>
              </div>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• All documents should be clear and legible</li>
                <li>• Accepted formats: PDF, JPG, PNG (Max 5MB)</li>
                <li>• Documents will be verified within 2-3 business days</li>
              </ul>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Review & Submit Application
              </h3>
              <p className="text-muted-foreground">
                Please review all information and accept the terms to submit
                your application.
              </p>
            </div>

            <Card className="p-6">
              <h4 className="font-medium mb-4">Application Summary</h4>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Business Name:</span>
                  <span>{watch("tradeName") || "Not provided"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Owner:</span>
                  <span>
                    {watch("firstName")} {watch("lastName") || "Not provided"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span>
                    {watch("city")}, {watch("state") || "Not provided"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Investment:</span>
                  <span>
                    ₹{watch("investmentCapacity")?.toLocaleString() || "0"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Documents:</span>
                  <span>
                    {documents.filter((d) => d.uploaded).length}/
                    {documents.length} uploaded
                  </span>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="termsAccepted"
                  {...register("termsAccepted", {
                    required: "You must accept the terms",
                  })}
                />
                <Label htmlFor="termsAccepted" className="text-sm">
                  I accept the{" "}
                  <Button variant="link" className="h-auto p-0 text-blue-600">
                    Franchise Agreement Terms & Conditions
                  </Button>
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacyAccepted"
                  {...register("privacyAccepted", {
                    required: "You must accept the privacy policy",
                  })}
                />
                <Label htmlFor="privacyAccepted" className="text-sm">
                  I accept the{" "}
                  <Button variant="link" className="h-auto p-0 text-blue-600">
                    Privacy Policy
                  </Button>
                </Label>
              </div>
            </div>

            {(errors.termsAccepted || errors.privacyAccepted) && (
              <p className="text-sm text-red-600">
                Please accept all terms to continue
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-blue-600" />
            Franchisee Registration
          </DialogTitle>
          <DialogDescription>
            Complete the multi-step registration process to become our franchise
            partner
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Step {currentStep} of {STEPS.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Navigator */}
        <div className="flex items-center justify-between mb-6 overflow-x-auto">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col items-center cursor-pointer transition-colors ${
                step.id === currentStep
                  ? "text-blue-600"
                  : step.id < currentStep
                    ? "text-green-600"
                    : "text-muted-foreground"
              }`}
              onClick={() => handleStepClick(step.id)}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                  step.id === currentStep
                    ? "bg-blue-100 border-2 border-blue-600"
                    : step.id < currentStep
                      ? "bg-green-100 border-2 border-green-600"
                      : "bg-gray-100 border-2 border-gray-300"
                }`}
              >
                {step.id < currentStep ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              <span className="text-xs font-medium text-center max-w-16">
                {step.title}
              </span>
            </div>
          ))}
        </div>

        <Separator className="mb-6" />

        {/* Form Content */}
        <form
          onSubmit={handleSubmit(
            currentStep === 7 ? handleFinalSubmit : handleNext,
          )}
        >
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {React.createElement(STEPS[currentStep - 1].icon, {
                  className: "h-5 w-5",
                })}
                {STEPS[currentStep - 1].title}
              </CardTitle>
              <CardDescription>
                {STEPS[currentStep - 1].description}
              </CardDescription>
            </CardHeader>
            <CardContent>{renderStepContent()}</CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>

              {currentStep === STEPS.length ? (
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Submit Application
                </Button>
              ) : (
                <Button type="submit">
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
