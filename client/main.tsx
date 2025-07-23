import "./global.css";

// TypeScript declaration for HMR root persistence
declare global {
  interface Window {
    __reactRoot?: ReturnType<typeof createRoot>;
  }
}

import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import CRM from "./pages/CRM";
import HRMS from "./pages/HRMS";
import HRMSDashboard from "./pages/HRMSDashboard";
import EmployeeManagement from "./pages/EmployeeManagement";
import OrganizationalStructure from "./pages/OrganizationalStructure";
import EmployeeSelfService from "./pages/EmployeeSelfService";
import ManagerSelfService from "./pages/ManagerSelfService";
import Recruitment from "./pages/Recruitment";
import JobRequisitions from "./pages/JobRequisitions";
import CreateJobRequisition from "./pages/CreateJobRequisition";
import ViewJobRequisition from "./pages/ViewJobRequisition";
import EditJobRequisition from "./pages/EditJobRequisition";
import RequisitionApprovals from "./pages/RequisitionApprovals";
import JobPostings from "./pages/JobPostings";
import ApplicantTracking from "./pages/ApplicantTracking";
import CandidateDatabase from "./pages/CandidateDatabase";
import InterviewScheduling from "./pages/InterviewScheduling";
import ResumeParsing from "./pages/ResumeParsing";
import OfferLetterManagement from "./pages/OfferLetterManagement";
import PreEmploymentChecks from "./pages/PreEmploymentChecks";
import OnboardingWorkflow from "./pages/OnboardingWorkflow";
import OnboardingOffboarding from "./pages/OnboardingOffboarding";
import DigitalOnboardingForms from "./pages/DigitalOnboardingForms";
import DocumentVerification from "./pages/DocumentVerification";
import AssetAllocation from "./pages/AssetAllocation";
import ExitInterviewManagement from "./pages/ExitInterviewManagement";
import InductionOrientation from "./pages/InductionOrientation";
import WelcomeEmailsChecklists from "./pages/WelcomeEmailsChecklists";
import KnowledgeTransfer from "./pages/KnowledgeTransfer";
import TimeAttendanceManagement from "./pages/TimeAttendanceManagement";
import AttendanceTracking from "./pages/AttendanceTracking";
import ShiftManagement from "./pages/ShiftManagement";
import OvertimeManagement from "./pages/OvertimeManagement";
import WorkSchedules from "./pages/WorkSchedules";
import TimesheetManagement from "./pages/TimesheetManagement";
import GeoFencingTracking from "./pages/GeoFencingTracking";
import LeaveIntegration from "./pages/LeaveIntegration";
import LeaveAbsenceManagement from "./pages/LeaveAbsenceManagement";
import LeavePoliciesConfiguration from "./pages/LeavePoliciesConfiguration";
import LeaveTypes from "./pages/LeaveTypes";
import LeaveRequestApproval from "./pages/LeaveRequestApproval";
import LeaveBalancesAccruals from "./pages/LeaveBalancesAccruals";
import HolidayCalendar from "./pages/HolidayCalendar";
import LeaveEncashment from "./pages/LeaveEncashment";
import PayrollManagement from "./pages/PayrollManagement";
import PayrollProcessing from "./pages/PayrollProcessing";
import SalaryStructures from "./pages/SalaryStructures";
import StatutoryCompliance from "./pages/StatutoryCompliance";
import ComplianceAuditManagement from "./pages/ComplianceAuditManagement";
import WorkforceAnalyticsReporting from "./pages/WorkforceAnalyticsReporting";
import EmployeeEngagementCommunication from "./pages/EmployeeEngagementCommunication";
import TravelExpenseManagement from "./pages/TravelExpenseManagement";
import HRHelpdeskServiceDesk from "./pages/HRHelpdeskServiceDesk";
import ExitManagement from "./pages/ExitManagement";
import Integrations from "./pages/Integrations";
import PayrollConfigurations from "./pages/PayrollConfigurations";
import LeadManagement from "./pages/LeadManagement";
import ContactManagement from "./pages/ContactManagement";
import CRMCommunication from "./pages/CRMCommunication";
import PropertyCatalog from "./pages/PropertyCatalog";
import DealManagement from "./pages/DealManagement";
import SalesAutomation from "./pages/SalesAutomation";
import MarketingAutomation from "./pages/MarketingAutomation";
import Clients from "./pages/Clients";
import Customers from "./pages/Customers";
import TaxCalculation from "./pages/TaxCalculation";
import PayslipGeneration from "./pages/PayslipGeneration";
import ReimbursementsDeductions from "./pages/ReimbursementsDeductions";
import LoansAdvances from "./pages/LoansAdvances";
import FullFinalSettlements from "./pages/FullFinalSettlements";
import BankTransferIntegration from "./pages/BankTransferIntegration";
import PerformanceManagement from "./pages/PerformanceManagement";
import GoalSettingAlignment from "./pages/GoalSettingAlignment";
import ContinuousFeedback from "./pages/ContinuousFeedback";
import AppraisalCycles from "./pages/AppraisalCycles";
import Feedback360 from "./pages/Feedback360";
import PerformanceRatings from "./pages/PerformanceRatings";
import PerformanceImprovementPlans from "./pages/PerformanceImprovementPlans";
import AppraisalHistoryAnalytics from "./pages/AppraisalHistoryAnalytics";
import LearningDevelopment from "./pages/LearningDevelopment";
import CourseCatalog from "./pages/CourseCatalog";
import TrainingRequests from "./pages/TrainingRequests";
import TrainingCalendar from "./pages/TrainingCalendar";
import ElearningLMS from "./pages/ElearningLMS";
import TrainingTracking from "./pages/TrainingTracking";
import CertificationManagement from "./pages/CertificationManagement";
import TrainingFeedback from "./pages/TrainingFeedback";
import CompensationBenefits from "./pages/CompensationBenefits";
import CompensationPlanning from "./pages/CompensationPlanning";
import Communications from "./pages/Communications";
// PaymentGateway import removed - now consolidated in Financial Management
import AdminSettings from "./pages/AdminSettings";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import SalaryRevisionCycles from "./pages/SalaryRevisionCycles";
import BonusIncentiveManagement from "./pages/BonusIncentiveManagement";
import EquityESOPManagement from "./pages/EquityESOPManagement";
import BenefitsAdministration from "./pages/BenefitsAdministration";
import Safety from "./pages/Safety";
import Reports from "./pages/Reports";
import Inventory from "./pages/Inventory";
import TenantInventory from "./pages/TenantInventory";
// Old Finance and Accounting imports removed - now consolidated in Financial Management
import UserManagement from "./pages/UserManagement";
import ConstructionProgress from "./pages/ConstructionProgress";
import ChannelPartners from "./pages/ChannelPartners";
import AdvancedPatternsDemo from "./pages/AdvancedPatternsDemo";
import FormBuilderDemo from "./pages/FormBuilderDemo";
import DashboardBuilderDemo from "./pages/DashboardBuilderDemo";
import AIFormBuilderDemo from "./pages/AIFormBuilderDemo";
import VisualWorkflowBuilderDemo from "./pages/VisualWorkflowBuilderDemo";
import AIAgentsDemo from "./pages/AIAgentsDemo";
import MultiTenantDemo from "./pages/MultiTenantDemo";
import IntegrationsDemo from "./pages/IntegrationsDemo";
import PossessionHandover from "./pages/PossessionHandover";
import AccountManagement from "./pages/AccountManagement";
import TenantRegistrationPage from "./pages/TenantRegistrationPage";
import TenantsListPage from "./pages/TenantsList";
import NotificationsWorkflows from "./pages/NotificationsWorkflows";
import TenantCRM from "./pages/TenantCRM";
import TenantHRMS from "./pages/TenantHRMS";
import SupplyChain from "./pages/SupplyChain";
import TenantSupplyChain from "./pages/TenantSupplyChain";
import SCMSuppliers from "./pages/SCMSuppliers";
import SCMOnboarding from "./pages/SCMOnboarding";
import SCMPerformance from "./pages/SCMPerformance";
import SCMCompliance from "./pages/SCMCompliance";
import SCMProcurement from "./pages/SCMProcurement";
import SCMLogistics from "./pages/SCMLogistics";
import SCMRisk from "./pages/SCMRisk";
import SalesManagement from "./pages/SalesManagement";
import FranchiseeManagement from "./pages/FranchiseeManagement";
import CorporateReview from "./pages/CorporateReview";
import FranchiseeSetup from "./pages/FranchiseeSetup";
import ProductCatalog from "./pages/ProductCatalog";

import FranchiseePurchaseOrder from "./pages/FranchiseePurchaseOrder";
import { CorporatePOReview } from "./pages/CorporatePOReview";
import { DeliveryLogistics } from "./pages/DeliveryLogistics";
import { NotificationManagement } from "./pages/NotificationManagement";
import FinancePayments from "./pages/FinancePayments";
import OrderInventoryHistory from "./pages/OrderInventoryHistory";
import AuditTrail from "./pages/AuditTrail";
import FranchiseeSelfService from "./pages/FranchiseeSelfService";
import FinancialManagement from "./pages/FinancialManagement";
import TenantFinancialManagement from "./pages/TenantFinancialManagement";
import HumanResources from "./pages/HumanResources";
import TenantHumanResources from "./pages/TenantHumanResources";

const queryClient = new QueryClient();

// Suppress ResizeObserver loop errors
const suppressResizeObserverErrors = () => {
  const resizeObserverErr =
    /ResizeObserver loop completed with undelivered notifications/;
  const originalConsoleError = console.error;

  console.error = (...args) => {
    if (
      args.length > 0 &&
      typeof args[0] === "string" &&
      resizeObserverErr.test(args[0])
    ) {
      return; // Suppress ResizeObserver errors
    }
    originalConsoleError.apply(console, args);
  };

  // Also handle uncaught errors
  window.addEventListener("error", (event) => {
    if (resizeObserverErr.test(event.message)) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
};

// Initialize error suppression
suppressResizeObserverErrors();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    return <Login />;
  }
  return <>{children}</>;
};

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("React Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-4">
              Please refresh the page to continue
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/projects/*"
                element={
                  <ProtectedRoute>
                    <Projects />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/crm/dashboard"
                element={
                  <ProtectedRoute>
                    <CRM />
                  </ProtectedRoute>
                }
              />
              {/* Old HRMS routes removed - now consolidated in Human Resources */}
              {/* More HRMS routes removed - consolidated in Human Resources */}
              <Route path="/crm/leads" element={<LeadManagement />} />
              <Route path="/crm/contacts" element={<ContactManagement />} />
              <Route path="/crm/communication" element={<CRMCommunication />} />
              <Route path="/crm/properties" element={<PropertyCatalog />} />
              <Route path="/crm/deals" element={<DealManagement />} />
              <Route
                path="/crm/sales-automation"
                element={<SalesAutomation />}
              />
              <Route
                path="/crm/marketing-automation"
                element={<MarketingAutomation />}
              />
              <Route path="/crm/clients" element={<Clients />} />
              <Route path="/crm/customers" element={<Customers />} />
              <Route
                path="/crm/*"
                element={
                  <ProtectedRoute>
                    <CRM />
                  </ProtectedRoute>
                }
              />
              {/* Performance, Learning, and Compensation HRMS routes removed - consolidated in Human Resources */}
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/inventory/tenant" element={<TenantInventory />} />
              <Route
                path="/inventory/tenant/:tab"
                element={<TenantInventory />}
              />
              <Route path="/safety/*" element={<Safety />} />
              <Route path="/reports" element={<Reports />} />
              {/* Old Finance routes removed - now consolidated in Financial Management */}
              <Route
                path="/finance/payments"
                element={
                  <ProtectedRoute>
                    <FinancePayments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/finance/payments/:tab"
                element={
                  <ProtectedRoute>
                    <FinancePayments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/financial-management"
                element={
                  <ProtectedRoute>
                    <FinancialManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/financial-management/:tab"
                element={
                  <ProtectedRoute>
                    <FinancialManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/financial-management/tenant/:tab"
                element={
                  <ProtectedRoute>
                    <TenantFinancialManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/financial-management/tenant"
                element={
                  <ProtectedRoute>
                    <TenantFinancialManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/human-resources"
                element={
                  <ProtectedRoute>
                    <HumanResources />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/human-resources/:tab"
                element={
                  <ProtectedRoute>
                    <HumanResources />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/human-resources/tenant/:tab"
                element={
                  <ProtectedRoute>
                    <TenantHumanResources />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/human-resources/tenant"
                element={
                  <ProtectedRoute>
                    <TenantHumanResources />
                  </ProtectedRoute>
                }
              />
              {/* Old Accounting routes removed - now consolidated in Financial Management */}
              {/* Old User Management routes removed - now consolidated in Human Resources */}
              <Route
                path="/communications/*"
                element={
                  <ProtectedRoute>
                    <Communications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/communications"
                element={
                  <ProtectedRoute>
                    <Communications />
                  </ProtectedRoute>
                }
              />
              {/* Old Payment Gateway routes removed - now consolidated in Financial Management */}
              <Route
                path="/admin-settings/*"
                element={
                  <ProtectedRoute>
                    <AdminSettings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-settings"
                element={
                  <ProtectedRoute>
                    <AdminSettings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/construction-progress/*"
                element={
                  <ProtectedRoute>
                    <ConstructionProgress />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/construction-progress"
                element={
                  <ProtectedRoute>
                    <ConstructionProgress />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/channel-partners/*"
                element={
                  <ProtectedRoute>
                    <ChannelPartners />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/channel-partners"
                element={
                  <ProtectedRoute>
                    <ChannelPartners />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/advanced-patterns"
                element={
                  <ProtectedRoute>
                    <AdvancedPatternsDemo />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/form-builder"
                element={
                  <ProtectedRoute>
                    <FormBuilderDemo />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard-builder"
                element={
                  <ProtectedRoute>
                    <DashboardBuilderDemo />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai-form-builder"
                element={
                  <ProtectedRoute>
                    <AIFormBuilderDemo />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/visual-workflow-builder"
                element={
                  <ProtectedRoute>
                    <VisualWorkflowBuilderDemo />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai-agents"
                element={
                  <ProtectedRoute>
                    <AIAgentsDemo />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/multi-tenant"
                element={
                  <ProtectedRoute>
                    <MultiTenantDemo />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/integrations"
                element={
                  <ProtectedRoute>
                    <IntegrationsDemo />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/crm/possession-handover"
                element={
                  <ProtectedRoute>
                    <PossessionHandover />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <AccountManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/account/tenants"
                element={
                  <ProtectedRoute>
                    <TenantsListPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/register" element={<TenantRegistrationPage />} />
              <Route
                path="/notifications-workflows"
                element={
                  <ProtectedRoute>
                    <NotificationsWorkflows />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications-workflows/:tab"
                element={
                  <ProtectedRoute>
                    <NotificationsWorkflows />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/crm/tenant"
                element={
                  <ProtectedRoute>
                    <TenantCRM />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/crm/tenant/:tab"
                element={
                  <ProtectedRoute>
                    <TenantCRM />
                  </ProtectedRoute>
                }
              />
              {/* Old Tenant HRMS routes removed - now consolidated in Human Resources */}
              <Route
                path="/supply-chain"
                element={
                  <ProtectedRoute>
                    <SupplyChain />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/supply-chain/suppliers"
                element={
                  <ProtectedRoute>
                    <SCMSuppliers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/supply-chain/onboarding"
                element={
                  <ProtectedRoute>
                    <SCMOnboarding />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/supply-chain/performance"
                element={
                  <ProtectedRoute>
                    <SCMPerformance />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/supply-chain/compliance"
                element={
                  <ProtectedRoute>
                    <SCMCompliance />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/supply-chain/procurement"
                element={
                  <ProtectedRoute>
                    <SCMProcurement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/supply-chain/logistics"
                element={
                  <ProtectedRoute>
                    <SCMLogistics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/supply-chain/risk"
                element={
                  <ProtectedRoute>
                    <SCMRisk />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/supply-chain/tenant"
                element={
                  <ProtectedRoute>
                    <TenantSupplyChain />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/supply-chain/tenant/:tab"
                element={
                  <ProtectedRoute>
                    <TenantSupplyChain />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sales-management"
                element={
                  <ProtectedRoute>
                    <SalesManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sales-management/:tab"
                element={
                  <ProtectedRoute>
                    <SalesManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/franchisee-management"
                element={
                  <ProtectedRoute>
                    <FranchiseeManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/franchisee-management/:tab"
                element={
                  <ProtectedRoute>
                    <FranchiseeManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/corporate-review"
                element={
                  <ProtectedRoute>
                    <CorporateReview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/corporate-review/:tab"
                element={
                  <ProtectedRoute>
                    <CorporateReview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/franchisee-setup"
                element={
                  <ProtectedRoute>
                    <FranchiseeSetup />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/franchisee-setup/:tab"
                element={
                  <ProtectedRoute>
                    <FranchiseeSetup />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/product-catalog"
                element={
                  <ProtectedRoute>
                    <ProductCatalog />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/product-catalog/:tab"
                element={
                  <ProtectedRoute>
                    <ProductCatalog />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/franchisee-purchase-order"
                element={
                  <ProtectedRoute>
                    <FranchiseePurchaseOrder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/franchisee-purchase-order/:tab"
                element={
                  <ProtectedRoute>
                    <FranchiseePurchaseOrder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/corporate-po-review"
                element={
                  <ProtectedRoute>
                    <CorporatePOReview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/corporate-po-review/:tab"
                element={
                  <ProtectedRoute>
                    <CorporatePOReview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/delivery-logistics"
                element={
                  <ProtectedRoute>
                    <DeliveryLogistics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/delivery-logistics/:tab"
                element={
                  <ProtectedRoute>
                    <DeliveryLogistics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications/:userType"
                element={
                  <ProtectedRoute>
                    <NotificationManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications/:userType/:tab"
                element={
                  <ProtectedRoute>
                    <NotificationManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-inventory-history"
                element={
                  <ProtectedRoute>
                    <OrderInventoryHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-inventory-history/:tab"
                element={
                  <ProtectedRoute>
                    <OrderInventoryHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/audit-trail"
                element={
                  <ProtectedRoute>
                    <AuditTrail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/franchisee-self-service"
                element={
                  <ProtectedRoute>
                    <FranchiseeSelfService />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/franchisee-self-service/:tab"
                element={
                  <ProtectedRoute>
                    <FranchiseeSelfService />
                  </ProtectedRoute>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

// Prevent double mounting in development
const container = document.getElementById("root")!;
let root: ReturnType<typeof createRoot>;

// Check if we're in development and prevent double mounting
if (import.meta.hot) {
  // In development with HMR
  if (!window.__reactRoot) {
    window.__reactRoot = createRoot(container);
  }
  root = window.__reactRoot;
} else {
  // In production
  root = createRoot(container);
}

root.render(<App />);
