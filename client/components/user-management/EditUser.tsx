import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
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
import { Switch } from "../ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { TenantUser } from "./types";
import { getTenantRoles } from "./data";

interface EditUserProps {
  user: TenantUser;
  tenantId: string;
  onSubmit: (userData: any) => void;
  onCancel: () => void;
}

interface EditUserForm {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  employeeId: string;
  designation: string;
  department: string;
  location: string;
  roleId: string;
  tenantRole: "owner" | "admin" | "member" | "guest";
  status: "active" | "pending" | "suspended";
  bio: string;
  workPhone: string;
  emergencyContact: string;
  reportingTo: string;
  startDate: string;
  endDate: string;
  address: string;
  skills: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  mfaEnabled: boolean;
  sessionTimeout: number;
  deviceTrust: boolean;
}

const departments = [
  "Sales",
  "Marketing",
  "IT",
  "HR",
  "Finance",
  "Operations",
  "Support",
];
const locations = [
  "Mumbai Office",
  "Delhi Office",
  "Bangalore Office",
  "Chennai Office",
  "Remote",
];

export function EditUser({
  user,
  tenantId,
  onSubmit,
  onCancel,
}: EditUserProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const roles = getTenantRoles(tenantId);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<EditUserForm>();

  useEffect(() => {
    reset({
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone || "",
      employeeId: user.employeeId || "",
      designation: user.designation || "",
      department: user.department || "",
      location: user.location || "",
      roleId: user.roleId,
      tenantRole: user.tenantRole,
      status: user.status,
      bio: user.profile?.bio || "",
      workPhone: user.profile?.workPhone || "",
      emergencyContact: user.profile?.emergencyContact || "",
      reportingTo: user.profile?.reportingTo || "",
      startDate: user.profile?.startDate || "",
      endDate: user.profile?.endDate || "",
      address: user.profile?.address || "",
      skills: user.profile?.skills?.join(", ") || "",
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      mfaEnabled: user.mfaEnabled,
      sessionTimeout: user.security?.sessionTimeout || 240,
      deviceTrust: user.security?.deviceTrust || false,
    });
  }, [user, reset]);

  const handleFormSubmit = (data: EditUserForm) => {
    const updatedUserData = {
      ...data,
      skills: data.skills ? data.skills.split(",").map((s) => s.trim()) : [],
      profile: {
        ...user.profile,
        bio: data.bio,
        workPhone: data.workPhone,
        emergencyContact: data.emergencyContact,
        reportingTo: data.reportingTo,
        startDate: data.startDate,
        endDate: data.endDate,
        address: data.address,
        skills: data.skills ? data.skills.split(",").map((s) => s.trim()) : [],
      },
      security: {
        ...user.security,
        sessionTimeout: data.sessionTimeout,
        deviceTrust: data.deviceTrust,
      },
    };

    onSubmit(updatedUserData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Badge className={getStatusColor(user.status)}>
          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        </Badge>
        <Badge variant="outline">{user.tenantRole}</Badge>
        {user.lastLogin && (
          <span className="text-sm text-muted-foreground">
            Last login: {new Date(user.lastLogin).toLocaleDateString()}
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="work">Work Details</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username *</Label>
                    <Input
                      id="username"
                      {...register("username", {
                        required: "Username is required",
                      })}
                      placeholder="Enter username"
                    />
                    {errors.username && (
                      <p className="text-sm text-red-500">
                        {errors.username.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      placeholder="Enter email address"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      onValueChange={(value) =>
                        setValue("status", value as any)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="work" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Work Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input
                      id="employeeId"
                      {...register("employeeId")}
                      placeholder="Enter employee ID"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      {...register("designation")}
                      placeholder="Enter designation"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      onValueChange={(value) => setValue("department", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select
                      onValueChange={(value) => setValue("location", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="roleId">Role *</Label>
                    <Select
                      onValueChange={(value) => setValue("roleId", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tenantRole">Tenant Role</Label>
                    <Select
                      onValueChange={(value) =>
                        setValue("tenantRole", value as any)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select tenant role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="guest">Guest</SelectItem>
                        {user.tenantRole === "owner" && (
                          <SelectItem value="owner">Owner</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      {...register("startDate")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="date" {...register("endDate")} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    {...register("bio")}
                    placeholder="Enter user bio"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="workPhone">Work Phone</Label>
                    <Input
                      id="workPhone"
                      {...register("workPhone")}
                      placeholder="Enter work phone"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      {...register("emergencyContact")}
                      placeholder="Enter emergency contact"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reportingTo">Reporting To</Label>
                  <Input
                    id="reportingTo"
                    {...register("reportingTo")}
                    placeholder="Enter supervisor"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    {...register("address")}
                    placeholder="Enter address"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    {...register("skills")}
                    placeholder="e.g., Sales, Marketing, Leadership"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailVerified">Email Verified</Label>
                    <Switch
                      id="emailVerified"
                      checked={watch("emailVerified")}
                      onCheckedChange={(checked) =>
                        setValue("emailVerified", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="phoneVerified">Phone Verified</Label>
                    <Switch
                      id="phoneVerified"
                      checked={watch("phoneVerified")}
                      onCheckedChange={(checked) =>
                        setValue("phoneVerified", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="mfaEnabled">MFA Enabled</Label>
                    <Switch
                      id="mfaEnabled"
                      checked={watch("mfaEnabled")}
                      onCheckedChange={(checked) =>
                        setValue("mfaEnabled", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="deviceTrust">Device Trust Enabled</Label>
                    <Switch
                      id="deviceTrust"
                      checked={watch("deviceTrust")}
                      onCheckedChange={(checked) =>
                        setValue("deviceTrust", checked)
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">
                    Session Timeout (minutes)
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setValue("sessionTimeout", parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                      <SelectItem value="480">8 hours</SelectItem>
                      <SelectItem value="720">12 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {user.security && (
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Security Status</h4>
                    <div className="text-sm space-y-1">
                      <p>
                        Failed login attempts:{" "}
                        {user.security.failedLoginAttempts}
                      </p>
                      <p>
                        Account locked:{" "}
                        {user.security.accountLocked ? "Yes" : "No"}
                      </p>
                      {user.security.lastLoginIP && (
                        <p>Last login IP: {user.security.lastLoginIP}</p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || !isDirty}>
            {isSubmitting ? "Updating..." : "Update User"}
          </Button>
        </div>
      </form>
    </div>
  );
}
