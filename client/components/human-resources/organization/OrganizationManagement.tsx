import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  Building2,
  MapPin,
  Users,
  Briefcase,
  Plus,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react";
import { getDepartmentsByTenant, getLocationsByTenant } from "../data";

interface OrganizationManagementProps {
  tenantId: string;
}

export function OrganizationManagement({ tenantId }: OrganizationManagementProps) {
  const [activeTab, setActiveTab] = useState("departments");

  const departments = useMemo(() => getDepartmentsByTenant(tenantId), [tenantId]);
  const locations = useMemo(() => getLocationsByTenant(tenantId), [tenantId]);

  const orgMetrics = useMemo(() => {
    const totalDepartments = departments.length;
    const totalLocations = locations.length;
    const totalEmployees = departments.reduce((sum, dept) => sum + dept.employeeCount, 0);
    const totalBudget = departments.reduce((sum, dept) => sum + (dept.budget || 0), 0);

    return { totalDepartments, totalLocations, totalEmployees, totalBudget };
  }, [departments, locations]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Organization Management</h2>
          <p className="text-muted-foreground">
            Manage organizational structure, departments, and locations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Department
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Organization Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              <AnimatedCounter value={orgMetrics.totalDepartments} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations</CardTitle>
            <MapPin className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              <AnimatedCounter value={orgMetrics.totalLocations} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              <AnimatedCounter value={orgMetrics.totalEmployees} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <Briefcase className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              ₹{(orgMetrics.totalBudget / 10000000).toFixed(1)}Cr
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="departments" className="gap-2">
            <Building2 className="h-4 w-4" />
            Departments
          </TabsTrigger>
          <TabsTrigger value="locations" className="gap-2">
            <MapPin className="h-4 w-4" />
            Locations
          </TabsTrigger>
          <TabsTrigger value="org-chart" className="gap-2">
            <Users className="h-4 w-4" />
            Org Chart
          </TabsTrigger>
          <TabsTrigger value="structure" className="gap-2">
            <Briefcase className="h-4 w-4" />
            Structure
          </TabsTrigger>
        </TabsList>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Management</CardTitle>
              <CardDescription>Manage organizational departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departments.map((dept) => (
                  <div key={dept.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                        <Building2 className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{dept.name}</h3>
                        <p className="text-sm text-muted-foreground">{dept.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm">Code: {dept.code}</span>
                          <span className="text-sm">{dept.employeeCount} employees</span>
                          {dept.budget && <span className="text-sm">Budget: ₹{(dept.budget / 100000).toFixed(1)}L</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={dept.isActive ? "default" : "secondary"}>
                        {dept.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Location Management</CardTitle>
              <CardDescription>Manage office locations and facilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locations.map((location) => (
                  <div key={location.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{location.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {location.address.city}, {location.address.state}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm">Capacity: {location.capacity}</span>
                          <span className="text-sm">{location.employeeCount} employees</span>
                          {location.isHeadOffice && <Badge variant="default">Head Office</Badge>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={location.isActive ? "default" : "secondary"}>
                        {location.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="org-chart" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Chart</CardTitle>
              <CardDescription>Visual organization hierarchy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Organization chart coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="structure" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organizational Structure</CardTitle>
              <CardDescription>Manage reporting relationships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Structure management coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
