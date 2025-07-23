import React from "react";
import { TenantFeatures } from "./types";
import { useTenant, useFeature } from "./TenantContext";
import { Alert, AlertDescription } from "../../ui/alert";
import { AlertTriangle, Lock } from "lucide-react";

interface FeatureToggleProps {
  feature: keyof TenantFeatures;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showAlert?: boolean;
  className?: string;
}

export function FeatureToggle({
  feature,
  children,
  fallback,
  showAlert = true,
  className,
}: FeatureToggleProps) {
  const isEnabled = useFeature(feature);
  const { currentTenant } = useTenant();

  if (isEnabled) {
    return <div className={className}>{children}</div>;
  }

  // Default fallback with upgrade message
  const defaultFallback = showAlert ? (
    <Alert className="border-yellow-200 bg-yellow-50">
      <Lock className="h-4 w-4 text-yellow-600" />
      <AlertDescription className="text-yellow-800">
        <div className="flex items-center justify-between">
          <span>
            This feature is not available in your{" "}
            <strong>{currentTenant?.tier}</strong> plan.
          </span>
          <span className="text-sm underline cursor-pointer hover:text-yellow-900">
            Upgrade Plan
          </span>
        </div>
      </AlertDescription>
    </Alert>
  ) : null;

  return <div className={className}>{fallback || defaultFallback}</div>;
}

// Higher-order component for feature gating
export function withFeatureToggle<P extends object>(
  Component: React.ComponentType<P>,
  feature: keyof TenantFeatures,
  fallback?: React.ReactNode,
) {
  const WrappedComponent = (props: P) => {
    return (
      <FeatureToggle feature={feature} fallback={fallback}>
        <Component {...props} />
      </FeatureToggle>
    );
  };

  WrappedComponent.displayName = `withFeatureToggle(${Component.displayName || Component.name})`;
  return WrappedComponent;
}

// Hook for feature-gated functionality
export function useFeatureGate(feature: keyof TenantFeatures) {
  const isEnabled = useFeature(feature);
  const { currentTenant } = useTenant();

  return {
    isEnabled,
    tier: currentTenant?.tier,
    canUpgrade: currentTenant?.tier !== "enterprise",
    featureName: feature,
  };
}

// Component for feature-specific UI elements
export function FeatureGatedButton({
  feature,
  children,
  onClick,
  className,
  ...props
}: {
  feature: keyof TenantFeatures;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  [key: string]: any;
}) {
  const { isEnabled, tier } = useFeatureGate(feature);
  const { currentTenant } = useTenant();

  const handleClick = () => {
    if (isEnabled && onClick) {
      onClick();
    } else {
      // Show upgrade modal or toast
      console.log(`Feature ${feature} not available in ${tier} plan`);
    }
  };

  return (
    <button
      {...props}
      className={`${className} ${!isEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={handleClick}
      disabled={!isEnabled}
      title={!isEnabled ? `Available in higher tier plans` : undefined}
    >
      {children}
      {!isEnabled && <Lock className="h-3 w-3 ml-1" />}
    </button>
  );
}

// Feature availability indicator
export function FeatureAvailability({
  feature,
  showTier = true,
}: {
  feature: keyof TenantFeatures;
  showTier?: boolean;
}) {
  const { isEnabled, tier } = useFeatureGate(feature);

  const availableIn = {
    projectManagement: ["basic", "professional", "enterprise"],
    crm: ["basic", "professional", "enterprise"],
    hrms: ["professional", "enterprise"],
    accounting: ["professional", "enterprise"],
    inventory: ["professional", "enterprise"],
    reports: ["basic", "professional", "enterprise"],
    aiAgents: ["professional", "enterprise"],
    workflowBuilder: ["professional", "enterprise"],
    formBuilder: ["basic", "professional", "enterprise"],
    dashboardBuilder: ["basic", "professional", "enterprise"],
    apiAccess: ["professional", "enterprise"],
    sso: ["enterprise"],
    ldap: ["enterprise"],
    auditLog: ["professional", "enterprise"],
    customBranding: ["enterprise"],
    whiteLabel: ["enterprise"],
    customDomain: ["enterprise"],
    advancedAnalytics: ["professional", "enterprise"],
    mobileApp: ["basic", "professional", "enterprise"],
    offlineMode: ["professional", "enterprise"],
    bulkOperations: ["professional", "enterprise"],
    dataExport: ["basic", "professional", "enterprise"],
    customIntegrations: ["enterprise"],
  };

  const requiredTiers = availableIn[feature] || [];
  const lowestTier = requiredTiers[0];

  if (isEnabled) {
    return (
      <span className="inline-flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
        Available
      </span>
    );
  }

  return (
    <span className="inline-flex items-center text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
      <Lock className="h-3 w-3 mr-1" />
      {showTier && lowestTier ? `Requires ${lowestTier}+` : "Locked"}
    </span>
  );
}

// Usage examples and demo component
export function FeatureToggleDemo() {
  const features: (keyof TenantFeatures)[] = [
    "aiAgents",
    "workflowBuilder",
    "customBranding",
    "sso",
    "advancedAnalytics",
  ];

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="font-medium">Feature Toggle Examples</h3>

      {features.map((feature) => (
        <div key={feature} className="flex items-center justify-between">
          <span className="capitalize">
            {feature.replace(/([A-Z])/g, " $1").toLowerCase()}
          </span>
          <FeatureAvailability feature={feature} />
        </div>
      ))}

      <div className="space-y-2">
        <FeatureToggle feature="aiAgents">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded">
            ✅ AI Agents feature is available!
          </div>
        </FeatureToggle>

        <FeatureToggle feature="customBranding">
          <div className="p-3 bg-purple-50 border border-purple-200 rounded">
            ✅ Custom Branding feature is available!
          </div>
        </FeatureToggle>

        <FeatureToggle
          feature="sso"
          fallback={
            <div className="p-3 bg-gray-50 border border-gray-200 rounded">
              ❌ SSO is not available in your plan
            </div>
          }
        >
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            ✅ SSO feature is available!
          </div>
        </FeatureToggle>
      </div>
    </div>
  );
}
