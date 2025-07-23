import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Clock,
  Shield,
  CheckCircle,
  XCircle,
  Edit,
  AlertTriangle,
} from "lucide-react";
import { TenantUser } from "./types";

interface UserDetailsProps {
  user: TenantUser;
  onClose: () => void;
  onEdit: () => void;
}

const Label = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <label className={`text-sm font-medium ${className}`}>{children}</label>;

export function UserDetails({ user, onClose, onEdit }: UserDetailsProps) {
  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      suspended: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getRoleColor = (role: string) => {
    const colors = {
      owner: "bg-purple-100 text-purple-800",
      admin: "bg-blue-100 text-blue-800",
      member: "bg-green-100 text-green-800",
      guest: "bg-gray-100 text-gray-800",
    };
    return colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                {user.firstName} {user.lastName}
              </DialogTitle>
              <DialogDescription className="mt-1">
                View detailed user information and permissions
              </DialogDescription>
            </div>
            <Button onClick={onEdit} className="gap-2">
              <Edit className="h-4 w-4" />
              Edit User
            </Button>
          </div>
        </DialogHeader>

        <div className="flex items-center gap-2 mb-6">
          <Badge className={getStatusColor(user.status)}>
            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
          </Badge>
          <Badge className={getRoleColor(user.tenantRole)}>
            {user.tenantRole.charAt(0).toUpperCase() + user.tenantRole.slice(1)}
          </Badge>
          {user.emailVerified && (
            <Badge variant="outline" className="gap-1">
              <CheckCircle className="h-3 w-3" />
              Email Verified
            </Badge>
          )}
          {user.mfaEnabled && (
            <Badge variant="outline" className="gap-1">
              <Shield className="h-3 w-3" />
              MFA Enabled
            </Badge>
          )}
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="work">Work Info</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{user.email}</span>
                    {user.emailVerified ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{user.phone}</span>
                      {user.phoneVerified ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">@{user.username}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Work Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {user.employeeId && (
                    <div>
                      <span className="text-sm font-medium">Employee ID: </span>
                      <span className="text-sm">{user.employeeId}</span>
                    </div>
                  )}
                  {user.designation && (
                    <div>
                      <span className="text-sm font-medium">Designation: </span>
                      <span className="text-sm">{user.designation}</span>
                    </div>
                  )}
                  {user.department && (
                    <div>
                      <span className="text-sm font-medium">Department: </span>
                      <span className="text-sm">{user.department}</span>
                    </div>
                  )}
                  {user.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{user.location}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Activity Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Joined: </span>
                    <span>{formatDate(user.joinedAt)}</span>
                  </div>
                  <div>
                    <span className="font-medium">Last Login: </span>
                    <span>{formatDateTime(user.lastLogin)}</span>
                  </div>
                  <div>
                    <span className="font-medium">Last Updated: </span>
                    <span>{formatDateTime(user.updatedAt)}</span>
                  </div>
                </div>
                {user.invitedBy && (
                  <div className="pt-2 border-t">
                    <span className="text-sm font-medium">Invited by: </span>
                    <span className="text-sm">{user.invitedBy}</span>
                    {user.invitationAcceptedAt && (
                      <span className="text-sm text-muted-foreground ml-2">
                        (Accepted: {formatDateTime(user.invitationAcceptedAt)})
                      </span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="work" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Work Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Employee ID</Label>
                    <p className="text-sm text-muted-foreground">
                      {user.employeeId || "Not set"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Designation</Label>
                    <p className="text-sm text-muted-foreground">
                      {user.designation || "Not set"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Department</Label>
                    <p className="text-sm text-muted-foreground">
                      {user.department || "Not set"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Location</Label>
                    <p className="text-sm text-muted-foreground">
                      {user.location || "Not set"}
                    </p>
                  </div>
                </div>

                {(user.profile?.workPhone || user.profile?.reportingTo) && (
                  <>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user.profile.workPhone && (
                        <div>
                          <Label className="text-sm font-medium">
                            Work Phone
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {user.profile.workPhone}
                          </p>
                        </div>
                      )}
                      {user.profile.reportingTo && (
                        <div>
                          <Label className="text-sm font-medium">
                            Reporting To
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {user.profile.reportingTo}
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {(user.profile?.startDate || user.profile?.endDate) && (
                  <>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user.profile.startDate && (
                        <div>
                          <Label className="text-sm font-medium">
                            Start Date
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(user.profile.startDate)}
                          </p>
                        </div>
                      )}
                      {user.profile.endDate && (
                        <div>
                          <Label className="text-sm font-medium">
                            End Date
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(user.profile.endDate)}
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.profile?.bio && (
                  <div>
                    <Label className="text-sm font-medium">Bio</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {user.profile.bio}
                    </p>
                  </div>
                )}

                {user.profile?.address && (
                  <div>
                    <Label className="text-sm font-medium">Address</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {user.profile.address}
                    </p>
                  </div>
                )}

                {user.profile?.emergencyContact && (
                  <div>
                    <Label className="text-sm font-medium">
                      Emergency Contact
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {user.profile.emergencyContact}
                    </p>
                  </div>
                )}

                {user.profile?.skills && user.profile.skills.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">Skills</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {user.profile.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {user.profile?.certifications &&
                  user.profile.certifications.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium">
                        Certifications
                      </Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.profile.certifications.map((cert, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Role & Permissions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Role ID</Label>
                  <p className="text-sm text-muted-foreground">{user.roleId}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Tenant Role</Label>
                  <Badge className={getRoleColor(user.tenantRole)}>
                    {user.tenantRole.charAt(0).toUpperCase() +
                      user.tenantRole.slice(1)}
                  </Badge>
                </div>

                <Separator />

                <div>
                  <Label className="text-sm font-medium">
                    Permissions ({user.permissions.length})
                  </Label>
                  <div className="mt-2 max-h-40 overflow-y-auto">
                    <div className="grid grid-cols-1 gap-1">
                      {user.permissions.map((permission, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs justify-start"
                        >
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {user.customPermissions &&
                  user.customPermissions.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium">
                        Custom Permissions
                      </Label>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {user.customPermissions.map((permission, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Email Verified</span>
                    {user.emailVerified ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Phone Verified</span>
                    {user.phoneVerified ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">MFA Enabled</span>
                    {user.mfaEnabled ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Device Trust</span>
                    {user.security?.deviceTrust ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>

                <Separator />

                {user.security && (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">
                        Session Timeout
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {user.security.sessionTimeout} minutes
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">
                        Failed Login Attempts
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {user.security.failedLoginAttempts}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Account Locked
                      </span>
                      {user.security.accountLocked ? (
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-red-600">Yes</span>
                        </div>
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>

                    {user.security.lastLoginIP && (
                      <div>
                        <Label className="text-sm font-medium">
                          Last Login IP
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {user.security.lastLoginIP}
                        </p>
                      </div>
                    )}

                    {user.security.ipWhitelist &&
                      user.security.ipWhitelist.length > 0 && (
                        <div>
                          <Label className="text-sm font-medium">
                            IP Whitelist
                          </Label>
                          <div className="mt-1">
                            {user.security.ipWhitelist.map((ip, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs mr-1"
                              >
                                {ip}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                    {user.lastPasswordChange && (
                      <div>
                        <Label className="text-sm font-medium">
                          Last Password Change
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {formatDateTime(user.lastPasswordChange)}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onEdit} className="gap-2">
            <Edit className="h-4 w-4" />
            Edit User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
