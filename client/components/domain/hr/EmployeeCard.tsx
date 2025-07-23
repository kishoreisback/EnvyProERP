import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/shared";
import { formatCurrency, getInitials, getRelativeTime } from "@/lib/formatters";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  User,
  Building,
  Eye,
  Edit,
  MessageSquare,
} from "lucide-react";
import type { Employee } from "./types";

interface EmployeeCardProps {
  employee: Employee;
  showSalary?: boolean;
  showPerformance?: boolean;
  showActions?: boolean;
  onView?: (employee: Employee) => void;
  onEdit?: (employee: Employee) => void;
  onMessage?: (employee: Employee) => void;
  className?: string;
}

export function EmployeeCard({
  employee,
  showSalary = false,
  showPerformance = true,
  showActions = true,
  onView,
  onEdit,
  onMessage,
  className = "",
}: EmployeeCardProps) {
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-blue-600";
    if (rating >= 3.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={employee.avatar} alt={employee.name} />
              <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{employee.name}</h3>
              <p className="text-sm text-muted-foreground">
                {employee.designation}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Badge variant="outline" className="text-xs">
                  {employee.employeeId}
                </Badge>
                <StatusBadge status={employee.status} />
              </div>
            </div>
          </div>
          {showActions && (
            <div className="flex gap-1">
              {onView && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onView(employee)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              )}
              {onEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(employee)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              {onMessage && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMessage(employee)}
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Contact Information */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">{employee.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">{employee.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">{employee.location}</span>
          </div>
        </div>

        {/* Department & Manager */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Building className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">{employee.department}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <User className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">
              Reports to: {employee.manager}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">
              Joined {getRelativeTime(employee.joinDate)}
            </span>
          </div>
        </div>

        {/* Performance Rating */}
        {showPerformance && (
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Performance</span>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {getRatingStars(employee.performanceRating)}
                </div>
                <span
                  className={`text-sm font-medium ${getRatingColor(employee.performanceRating)}`}
                >
                  {employee.performanceRating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Salary */}
        {showSalary && (
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Salary</span>
              <span className="text-sm font-semibold">
                {formatCurrency(employee.salary, { compact: true })}
              </span>
            </div>
          </div>
        )}

        {/* Skills */}
        {employee.skills && employee.skills.length > 0 && (
          <div className="pt-2 border-t">
            <div className="text-sm font-medium mb-2">Skills</div>
            <div className="flex flex-wrap gap-1">
              {employee.skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {employee.skills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{employee.skills.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
