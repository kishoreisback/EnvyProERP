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
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "@/components/ui/animated-icons";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  BarChart3,
  Download,
  FileText,
  TrendingUp,
  Calendar,
  Filter,
  Star,
  Zap,
} from "lucide-react";

export default function Reports() {
  const reportCategories = [
    {
      title: "Project Reports",
      description: "Progress, timelines, and project analytics",
      reports: [
        "Project Status Summary",
        "Timeline Performance",
        "Resource Utilization",
        "Cost Analysis",
      ],
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Financial Reports",
      description: "Revenue, expenses, and budget analysis",
      reports: [
        "Profit & Loss Statement",
        "Budget vs Actual",
        "Cash Flow Report",
        "Invoice Aging",
      ],
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Safety Reports",
      description: "Incident tracking and compliance metrics",
      reports: [
        "Safety Incident Summary",
        "Compliance Dashboard",
        "Training Status Report",
        "Risk Assessment",
      ],
      color: "bg-safety-100 text-safety-700",
    },
    {
      title: "HR Reports",
      description: "Workforce analytics and performance",
      reports: [
        "Employee Performance",
        "Attendance Summary",
        "Payroll Report",
        "Training Progress",
      ],
      color: "bg-construction-100 text-construction-700",
    },
  ];

  const quickStats = [
    { label: "Reports Generated", value: "245", period: "This Month" },
    { label: "Scheduled Reports", value: "12", period: "Upcoming" },
    { label: "Data Sources", value: "8", period: "Connected" },
    { label: "Export Formats", value: "4", period: "Available" },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Reports & Analytics
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={BarChart3}
                animation="bounce"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Generate insights from your construction business data
              </p>
            </div>
          </div>
          <div className="flex gap-2 animate-slideInRight">
            <Button variant="outline" className="hover-lift">
              <AnimatedIcon icon={Filter} animation="bounce" className="mr-2" />
              Filters
            </Button>
            <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-emerald-500 relative overflow-hidden">
              <AnimatedIcon
                icon={Download}
                animation="bounce"
                className="mr-2"
              />
              Export Data
              <ShimmerEffect className="absolute inset-0" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickStats.map((stat, index) => (
            <Card
              key={index}
              className="hover-lift animate-fadeInUp relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    {index === 0 && (
                      <AnimatedIcon
                        icon={FileText}
                        animation="float"
                        className="text-primary"
                        size="sm"
                      />
                    )}
                    {index === 1 && (
                      <AnimatedIcon
                        icon={Calendar}
                        animation="pulse"
                        className="text-construction-500"
                        size="sm"
                      />
                    )}
                    {index === 2 && (
                      <AnimatedIcon
                        icon={BarChart3}
                        animation="bounce"
                        className="text-emerald-600"
                        size="sm"
                      />
                    )}
                    {index === 3 && (
                      <AnimatedIcon
                        icon={Download}
                        animation="glow"
                        className="text-safety-600"
                        size="sm"
                      />
                    )}
                  </div>
                  <p className="text-2xl font-bold">
                    {stat.label === "Reports Generated" ? (
                      <AnimatedCounter value={245} />
                    ) : stat.label === "Scheduled Reports" ? (
                      <AnimatedCounter value={12} />
                    ) : stat.label === "Data Sources" ? (
                      <AnimatedCounter value={8} />
                    ) : (
                      <AnimatedCounter value={4} />
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.period}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Categories */}
        <div className="grid gap-6 md:grid-cols-2">
          {reportCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded ${category.color}`}>
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.reports.map((report, reportIndex) => (
                    <div
                      key={reportIndex}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-sm">{report}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          Ready
                        </Badge>
                        <Button size="sm" variant="ghost">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Analytics & Business Intelligence
            </CardTitle>
            <CardDescription>
              Advanced reporting and data visualization tools
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">Custom Dashboards</h3>
                <p className="text-sm text-muted-foreground">
                  Create personalized dashboards with drag-and-drop widgets
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">Automated Reports</h3>
                <p className="text-sm text-muted-foreground">
                  Schedule and automate report generation and delivery
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">Data Export</h3>
                <p className="text-sm text-muted-foreground">
                  Export data in multiple formats: PDF, Excel, CSV, JSON
                </p>
              </div>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-center text-muted-foreground">
                📊 Advanced analytics features are under development. Full
                business intelligence capabilities will be available soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
