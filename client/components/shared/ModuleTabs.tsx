import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideIcon } from "lucide-react";

export interface TabConfig {
  value: string;
  label: string;
  icon?: LucideIcon;
  content: React.ReactNode;
  disabled?: boolean;
}

interface ModuleTabsProps {
  tabs: TabConfig[];
  defaultTab?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
  onTabChange?: (value: string) => void;
  urlParam?: string; // URL parameter name for tab state
}

export function ModuleTabs({
  tabs,
  defaultTab,
  orientation = "horizontal",
  className = "",
  onTabChange,
  urlParam = "tab",
}: ModuleTabsProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Get active tab from URL or use default
  const getActiveTab = () => {
    const searchParams = new URLSearchParams(location.search);
    const urlTab = searchParams.get(urlParam);
    return urlTab || defaultTab || tabs[0]?.value || "";
  };

  const activeTab = getActiveTab();

  // Handle tab changes
  const handleTabChange = (value: string) => {
    // Update URL if urlParam is provided
    if (urlParam) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set(urlParam, value);
      navigate({ search: searchParams.toString() }, { replace: true });
    }

    // Call external handler if provided
    onTabChange?.(value);
  };

  // Calculate grid columns based on number of tabs
  const getGridCols = () => {
    const count = tabs.length;
    if (count <= 4) return 4;
    if (count <= 6) return 6;
    if (count <= 8) return 8;
    if (count <= 10) return 10;
    return 12;
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      orientation={orientation}
      className={`space-y-4 ${className}`}
    >
      <TabsList className={`grid w-full grid-cols-${getGridCols()}`}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            className="flex items-center gap-2"
          >
            {tab.icon && <tab.icon className="h-4 w-4" />}
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.slice(0, 4)}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="space-y-6">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
