import { MainLayout } from "@/components/layout/MainLayout";
import { SystemAuditDashboard } from "@/components/audit/SystemAuditDashboard";

export default function AuditTrail() {
  // Get current user info from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const tenantId = currentUser?.tenantId || "demo-tenant";
  const userRole = currentUser?.role || "admin";

  return (
    <MainLayout>
      <SystemAuditDashboard tenantId={tenantId} userRole={userRole} />
    </MainLayout>
  );
}
