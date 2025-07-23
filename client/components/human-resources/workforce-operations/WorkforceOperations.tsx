import React, { useState } from "react";
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
  Clock,
  Calendar,
  DollarSign,
  Award,
  GraduationCap,
  Plus,
  Download,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Users,
  TrendingUp,
} from "lucide-react";

interface WorkforceOperationsProps {
  tenantId: string;
}

export function WorkforceOperations({ tenantId }: WorkforceOperationsProps) {
  const [activeTab, setActiveTab] = useState("attendance");

  // Mock metrics
  const workforceMetrics = {
    attendanceRate: 94.5,
    pendingLeaves: 12,
    payrollProcessed: 78,
    trainingsCompleted: 25,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Workforce Operations</h2>
          <p className="text-muted-foreground">
            Manage attendance, leave, payroll, and training operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Quick Action
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Workforce Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {workforceMetrics.attendanceRate}%
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Leaves</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              <AnimatedCounter value={workforceMetrics.pendingLeaves} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payroll Processed</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              <AnimatedCounter value={workforceMetrics.payrollProcessed} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trainings Completed</CardTitle>
            <GraduationCap className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              <AnimatedCounter value={workforceMetrics.trainingsCompleted} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="attendance" className="gap-2">
            <Clock className="h-4 w-4" />
            Attendance
          </TabsTrigger>
          <TabsTrigger value="leave" className="gap-2">
            <Calendar className="h-4 w-4" />
            Leave
          </TabsTrigger>
          <TabsTrigger value="payroll" className="gap-2">
            <DollarSign className="h-4 w-4" />
            Payroll
          </TabsTrigger>
          <TabsTrigger value="performance" className="gap-2">
            <Award className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="training" className="gap-2">
            <GraduationCap className="h-4 w-4" />
            Training
          </TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Management</CardTitle>
              <CardDescription>Track and manage employee attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Attendance management coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Management</CardTitle>
              <CardDescription>Process leave requests and manage policies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Leave management coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Management</CardTitle>
              <CardDescription>Process payroll and manage compensation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Payroll management coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Management</CardTitle>
              <CardDescription>Track performance reviews and goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Performance management coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Training & Development</CardTitle>
              <CardDescription>Manage training programs and certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Training management coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
