import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ModuleTabs } from "@/components/shared";
import type { TabConfig } from "@/components/shared";
import {
  ProjectTimeline,
  MilestoneTracker,
  FinancialMetrics,
  EmployeeCard,
  LeadFunnel,
} from "@/components/domain";
import type {
  TimelineEvent,
  Milestone,
  FinancialData,
  Employee,
  Lead,
} from "@/components/domain";
import { Building2, DollarSign, Users, Target, Calendar } from "lucide-react";

export default function DomainComponentsExample() {
  // Sample data for construction domain
  const [timelineEvents] = useState<TimelineEvent[]>([
    {
      id: "1",
      title: "Foundation Work Completed",
      description: "All foundation work has been completed successfully",
      date: "2024-01-25",
      type: "completion",
      status: "completed",
      assignedTo: "Construction Team A",
      duration: 10,
      dependencies: [],
    },
    {
      id: "2",
      title: "Plinth Work Started",
      description: "Plinth beam construction has commenced",
      date: "2024-01-26",
      type: "milestone",
      status: "in-progress",
      assignedTo: "Structure Team B",
      duration: 8,
      dependencies: ["1"],
    },
  ]);

  const [milestones] = useState<Milestone[]>([
    {
      id: "1",
      name: "Foundation Work",
      description:
        "Complete foundation including excavation and concrete pouring",
      phase: "Foundation",
      startDate: "2024-01-15",
      endDate: "2024-01-25",
      status: "completed",
      progress: 100,
      priority: "high",
      assignedTeam: "Team A",
      estimatedCost: 500000,
      actualCost: 485000,
      dependencies: [],
    },
    {
      id: "2",
      name: "Plinth Construction",
      description: "Plinth beam and ground floor preparation",
      phase: "Structure",
      startDate: "2024-01-26",
      endDate: "2024-02-05",
      status: "in-progress",
      progress: 65,
      priority: "high",
      assignedTeam: "Team B",
      estimatedCost: 350000,
      dependencies: ["1"],
    },
  ]);

  // Sample data for financial domain
  const [financialData] = useState<FinancialData[]>([
    {
      revenue: 12500000,
      expenses: 8750000,
      profit: 3750000,
      margin: 30,
      period: "2024-01",
      growth: 12.5,
    },
    {
      revenue: 11200000,
      expenses: 8100000,
      profit: 3100000,
      margin: 27.7,
      period: "2023-12",
      growth: 8.2,
    },
  ]);

  // Sample data for HR domain
  const [employees] = useState<Employee[]>([
    {
      id: "1",
      name: "Rajesh Kumar",
      email: "rajesh@company.com",
      phone: "+91 98765 43210",
      department: "Engineering",
      designation: "Senior Project Manager",
      manager: "Suresh Patel",
      joinDate: "2022-03-15",
      status: "active",
      location: "Mumbai",
      employeeId: "EMP001",
      salary: 1250000,
      performanceRating: 4.5,
      skills: ["Project Management", "Construction", "Leadership"],
    },
    {
      id: "2",
      name: "Priya Sharma",
      email: "priya@company.com",
      phone: "+91 98765 43211",
      department: "Sales",
      designation: "Sales Manager",
      manager: "Amit Singh",
      joinDate: "2021-11-20",
      status: "active",
      location: "Delhi",
      employeeId: "EMP002",
      salary: 950000,
      performanceRating: 4.2,
      skills: ["Sales", "CRM", "Communication"],
    },
  ]);

  // Sample data for CRM domain
  const [leads] = useState<Lead[]>([
    {
      id: "1",
      name: "Agarwal Family",
      email: "agarwal@email.com",
      phone: "+91 98765 43210",
      source: "Website",
      status: "proposal",
      score: 85,
      value: 8500000,
      assignedTo: "Priya Sharma",
      createdAt: "2024-01-15",
      lastActivity: "2024-01-28",
      nextFollowUp: "2024-01-30",
      location: "Gurgaon",
      priority: "high",
      tags: ["3BHK", "Premium"],
    },
    {
      id: "2",
      name: "Verma Enterprises",
      email: "verma@company.com",
      phone: "+91 98765 43211",
      source: "Referral",
      status: "negotiation",
      score: 90,
      value: 15000000,
      assignedTo: "Rajesh Kumar",
      createdAt: "2024-01-10",
      lastActivity: "2024-01-29",
      location: "Mumbai",
      priority: "urgent",
      tags: ["Commercial", "Bulk"],
    },
    {
      id: "3",
      name: "Sharma Family",
      email: "sharma@email.com",
      phone: "+91 98765 43212",
      source: "Walk-in",
      status: "qualified",
      score: 70,
      value: 6500000,
      assignedTo: "Amit Patel",
      createdAt: "2024-01-20",
      lastActivity: "2024-01-25",
      location: "Pune",
      priority: "medium",
      tags: ["2BHK", "Standard"],
    },
    {
      id: "4",
      name: "Tech Solutions Ltd",
      email: "tech@solutions.com",
      phone: "+91 98765 43213",
      source: "Campaign",
      status: "new",
      score: 60,
      value: 4500000,
      assignedTo: "Priya Sharma",
      createdAt: "2024-01-25",
      lastActivity: "2024-01-25",
      location: "Bangalore",
      priority: "low",
      tags: ["Office Space"],
    },
    {
      id: "5",
      name: "Kumar Builders",
      email: "kumar@builders.com",
      phone: "+91 98765 43214",
      source: "Partner",
      status: "closed",
      score: 95,
      value: 12000000,
      assignedTo: "Rajesh Kumar",
      createdAt: "2023-12-15",
      lastActivity: "2024-01-20",
      location: "Hyderabad",
      priority: "high",
      tags: ["Bulk Purchase", "Premium"],
    },
  ]);

  // Tab configuration using domain components
  const tabs: TabConfig[] = [
    {
      value: "construction",
      label: "Construction",
      icon: Building2,
      content: (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Construction Management</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <ProjectTimeline
              events={timelineEvents}
              onViewEvent={(event) => console.log("View event:", event)}
              onEditEvent={(event) => console.log("Edit event:", event)}
            />
            <MilestoneTracker
              milestones={milestones}
              onAddMilestone={() => console.log("Add milestone")}
              onEditMilestone={(milestone) =>
                console.log("Edit milestone:", milestone)
              }
            />
          </div>
        </div>
      ),
    },
    {
      value: "financial",
      label: "Financial",
      icon: DollarSign,
      content: (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Financial Metrics</h3>
          <FinancialMetrics
            data={financialData}
            showTrends={true}
            showTargets={true}
            targets={{
              revenue: 15000000,
              profit: 4500000,
              margin: 35,
            }}
          />
        </div>
      ),
    },
    {
      value: "hr",
      label: "HR",
      icon: Users,
      content: (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Employee Management</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {employees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                showSalary={true}
                showPerformance={true}
                onView={(emp) => console.log("View employee:", emp)}
                onEdit={(emp) => console.log("Edit employee:", emp)}
                onMessage={(emp) => console.log("Message employee:", emp)}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      value: "crm",
      label: "CRM",
      icon: Target,
      content: (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Sales Funnel</h3>
          <LeadFunnel
            leads={leads}
            showValues={true}
            showConversionRates={true}
          />
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Domain-Specific Components
            </h2>
            <p className="text-muted-foreground">
              Specialized components tailored for specific business domains
            </p>
          </div>
        </div>

        <ModuleTabs tabs={tabs} defaultTab="construction" />
      </div>
    </MainLayout>
  );
}
