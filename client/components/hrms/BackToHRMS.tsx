import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface BackToHRMSProps {
  className?: string;
}

export function BackToHRMS({ className = "" }: BackToHRMSProps) {
  // Check if user is Super Admin
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const isSuperAdmin =
    currentUser?.role === "super_admin" ||
    currentUser?.email === "admin@buildsaathi.com" ||
    currentUser?.tenantRole === "owner";

  // Determine navigation path based on user type
  const backPath = isSuperAdmin ? "/hrms" : "/hrms/tenant/overview";
  const backText = isSuperAdmin ? "Back to HRMS" : "Back to Tenant HRMS";

  return (
    <div className={`flex items-center gap-4 animate-slideInLeft ${className}`}>
      <Button variant="outline" className="hover-lift" asChild>
        <Link to={backPath}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {backText}
        </Link>
      </Button>
    </div>
  );
}
