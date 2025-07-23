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
  HardHat,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Star,
  TrendingUp,
  Zap,
  Award,
} from "lucide-react";

export default function Safety() {
  const safetyMetrics = [
    { label: "Days without incident", value: "127", status: "good" },
    { label: "Safety compliance score", value: "98.5%", status: "excellent" },
    { label: "Open safety issues", value: "3", status: "warning" },
    { label: "Training completion", value: "94%", status: "good" },
  ];

  const recentIncidents = [
    {
      id: 1,
      type: "Minor Injury",
      location: "Sunset Apartments - Site 2",
      date: "2 days ago",
      status: "resolved",
    },
    {
      id: 2,
      type: "Equipment Malfunction",
      location: "Corporate Tower - Floor 15",
      date: "1 week ago",
      status: "investigating",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Safety Management
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Shield}
                animation="glow"
                className="text-safety-600"
              />
              <p className="text-muted-foreground">
                Monitor workplace safety and compliance across all sites
              </p>
            </div>
          </div>
          <Button className="hover-lift animate-gradient bg-gradient-to-r from-safety-500 to-primary relative overflow-hidden animate-slideInRight">
            <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
            Report Incident
            <ShimmerEffect className="absolute inset-0" />
          </Button>
        </div>

        {/* Safety Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {safetyMetrics.map((metric, index) => (
            <Card
              key={index}
              className="hover-lift animate-fadeInUp relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-safety-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {metric.label}
                    </p>
                    <p className="text-2xl font-bold">
                      {metric.label === "Days without incident" ? (
                        <AnimatedCounter value={127} />
                      ) : metric.label === "Safety compliance score" ? (
                        <AnimatedCounter value={98.5} suffix="%" decimals={1} />
                      ) : metric.label === "Open safety issues" ? (
                        <AnimatedCounter value={3} />
                      ) : (
                        <AnimatedCounter value={94} suffix="%" />
                      )}
                    </p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-safety-100 flex items-center justify-center relative">
                    {metric.status === "excellent" && (
                      <>
                        <AnimatedIcon
                          icon={CheckCircle}
                          animation="glow"
                          className="text-emerald-600"
                        />
                        <Star className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500 animate-pulse" />
                      </>
                    )}
                    {metric.status === "good" && (
                      <AnimatedIcon
                        icon={CheckCircle}
                        animation="pulse"
                        className="text-emerald-600"
                      />
                    )}
                    {metric.status === "warning" && (
                      <>
                        <AnimatedIcon
                          icon={AlertTriangle}
                          animation="bounce"
                          className="text-safety-600"
                        />
                        <PulsingDot className="absolute -top-1 -right-1" />
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-lift animate-slideInLeft relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-safety-500/5 via-transparent to-primary/5" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AnimatedIcon
                  icon={HardHat}
                  animation="float"
                  className="text-safety-600"
                  size="lg"
                />
                Safety Management Module
              </CardTitle>
              <CardDescription>
                Comprehensive workplace safety and compliance management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="rounded-lg border p-3 hover-lift animate-scaleIn group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-safety-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-2 mb-1">
                    <AnimatedIcon
                      icon={AlertTriangle}
                      animation="bounce"
                      className="text-safety-600"
                      size="sm"
                    />
                    <h4 className="font-semibold text-sm">
                      Incident Reporting
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Digital forms for quick incident documentation
                  </p>
                </div>
                <div
                  className="rounded-lg border p-3 hover-lift animate-scaleIn group relative overflow-hidden"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-construction-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-2 mb-1">
                    <AnimatedIcon
                      icon={Award}
                      animation="pulse"
                      className="text-construction-500"
                      size="sm"
                    />
                    <h4 className="font-semibold text-sm">Safety Training</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Track employee certifications and training schedules
                  </p>
                </div>
                <div
                  className="rounded-lg border p-3 hover-lift animate-scaleIn group relative overflow-hidden"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-2 mb-1">
                    <AnimatedIcon
                      icon={CheckCircle}
                      animation="glow"
                      className="text-emerald-600"
                      size="sm"
                    />
                    <h4 className="font-semibold text-sm">
                      Compliance Tracking
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Monitor adherence to safety regulations and standards
                  </p>
                </div>
              </div>
              <div className="rounded-lg bg-muted p-3 relative overflow-hidden animate-bounceIn">
                <div className="flex items-center justify-center gap-2">
                  <AnimatedIcon
                    icon={Zap}
                    animation="glow"
                    className="text-safety-500"
                  />
                  <p className="text-center text-sm text-muted-foreground">
                    🦺 This module is under development. Full safety management
                    features will be available soon.
                  </p>
                  <Star className="h-4 w-4 text-yellow-500 animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Safety Incidents</CardTitle>
              <CardDescription>
                Latest safety reports and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentIncidents.map((incident) => (
                  <div
                    key={incident.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{incident.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {incident.location}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {incident.date}
                      </p>
                    </div>
                    <Badge
                      variant={
                        incident.status === "resolved"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {incident.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
