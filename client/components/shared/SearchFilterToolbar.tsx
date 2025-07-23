import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, Download, Upload } from "lucide-react";

interface ActionButton {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  disabled?: boolean;
}

interface SearchFilterToolbarProps {
  title?: string;
  subtitle?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
  showFilter?: boolean;
  onFilterClick?: () => void;
  filterLabel?: string;
  primaryActions?: ActionButton[];
  secondaryActions?: ActionButton[];
  customContent?: ReactNode;
  className?: string;
}

export function SearchFilterToolbar({
  title,
  subtitle,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  showSearch = true,
  showFilter = true,
  onFilterClick,
  filterLabel = "Filter",
  primaryActions = [],
  secondaryActions = [],
  customContent,
  className = "",
}: SearchFilterToolbarProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Title Section */}
      {(title || subtitle) && (
        <div className="flex items-center justify-between">
          <div>
            {title && <h3 className="text-lg font-medium">{title}</h3>}
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>

          {/* Primary Actions */}
          {primaryActions.length > 0 && (
            <div className="flex gap-2">
              {primaryActions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || "default"}
                  onClick={action.onClick}
                  disabled={action.disabled}
                >
                  <action.icon className="mr-2 h-4 w-4" />
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Search and Filter Section */}
      {(showSearch ||
        showFilter ||
        secondaryActions.length > 0 ||
        customContent) && (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1">
            {/* Search */}
            {showSearch && (
              <div className="relative max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="pl-8"
                />
              </div>
            )}

            {/* Custom Content */}
            {customContent}
          </div>

          {/* Secondary Actions and Filter */}
          <div className="flex items-center gap-2">
            {/* Secondary Actions */}
            {secondaryActions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || "outline"}
                onClick={action.onClick}
                disabled={action.disabled}
              >
                <action.icon className="mr-2 h-4 w-4" />
                {action.label}
              </Button>
            ))}

            {/* Filter Button */}
            {showFilter && (
              <Button variant="outline" onClick={onFilterClick}>
                <Filter className="mr-2 h-4 w-4" />
                {filterLabel}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Pre-configured common action buttons
export const CommonActions = {
  add: (onClick: () => void, label: string = "Add New"): ActionButton => ({
    label,
    icon: Plus,
    onClick,
    variant: "default",
  }),

  export: (onClick: () => void, label: string = "Export"): ActionButton => ({
    label,
    icon: Download,
    onClick,
    variant: "outline",
  }),

  import: (onClick: () => void, label: string = "Import"): ActionButton => ({
    label,
    icon: Upload,
    onClick,
    variant: "outline",
  }),
};
