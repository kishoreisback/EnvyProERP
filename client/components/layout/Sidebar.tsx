import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AnimatedIcon,
  GlowingOrb,
  PulsingDot,
} from "@/components/ui/animated-icons";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Users,
  UserCheck,
  Package,
  DollarSign,
  BarChart3,
  Settings,
  ChevronDown,
  HardHat,
  CalendarDays,
  FileText,
  Truck,
  X,
  Zap,
  UserCog,
  MessageSquare,
  CreditCard,
  Hammer,
  Handshake,
  Bell,
  Workflow,
  ShoppingCart,
  History,
  Activity,
  User,
} from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    icon: Building2,
    children: [
      { name: "All Projects", href: "/projects" },
      { name: "Active Projects", href: "/projects/active" },
      { name: "Project Timeline", href: "/projects/timeline" },
      { name: "New Project", href: "/projects/new" },
    ],
  },
  {
    name: "Construction Progress",
    icon: Hammer,
    children: [
      { name: "Overview", href: "/construction-progress/overview" },
      { name: "Milestones", href: "/construction-progress/milestones" },
      { name: "Daily Reports", href: "/construction-progress/daily-reports" },
      { name: "Site Photos", href: "/construction-progress/site-photos" },
      { name: "Contractors", href: "/construction-progress/contractors" },
      { name: "Materials", href: "/construction-progress/materials" },
      { name: "Analytics", href: "/construction-progress/analytics" },
    ],
  },
  {
    name: "CRM",
    icon: Users,
    children: [
      { name: "CRM Dashboard", href: "/crm/dashboard" },
      { name: "Tenant CRM", href: "/crm/tenant/overview" },
      { name: "Customers", href: "/crm/customers" },
      { name: "Clients", href: "/crm/clients" },
      { name: "Leads", href: "/crm/leads" },
      { name: "Contacts", href: "/crm/contacts" },
      { name: "Communication", href: "/crm/communication" },
    ],
  },
  {
    name: "Sales Management",
    icon: DollarSign,
    children: [
      { name: "Sales Overview", href: "/sales-management/overview" },
      { name: "Quotations", href: "/sales-management/quotations" },
      { name: "Sales Orders", href: "/sales-management/orders" },
      { name: "Customers", href: "/sales-management/customers" },
      { name: "Products", href: "/sales-management/products" },
      { name: "Analytics", href: "/sales-management/analytics" },
      { name: "Performance Reports", href: "/sales-management/reports" },
      { name: "Settings", href: "/sales-management/settings" },
    ],
  },
  {
    name: "Franchisee Management",
    icon: Handshake,
    children: [
      { name: "Overview", href: "/franchisee-management/overview" },
      { name: "Applications", href: "/franchisee-management/requests" },
      {
        name: "Active Franchisees",
        href: "/franchisee-management/franchisees",
      },
      { name: "Performance", href: "/franchisee-management/performance" },
      { name: "Analytics", href: "/franchisee-management/analytics" },
      { name: "Settings", href: "/franchisee-management/settings" },
    ],
  },
  {
    name: "Franchisee Self-Service",
    href: "/franchisee-self-service/dashboard",
    icon: User,
  },
  {
    name: "Corporate Review",
    icon: UserCheck,
    children: [
      { name: "Dashboard", href: "/corporate-review/dashboard" },
      { name: "Pending Reviews", href: "/corporate-review/requests" },
      { name: "My Assignments", href: "/corporate-review/assignments" },
      { name: "Notifications", href: "/corporate-review/notifications" },
      { name: "Analytics", href: "/corporate-review/analytics" },
      { name: "PO Review & Fulfillment", href: "/corporate-po-review/pending" },
    ],
  },
  {
    name: "Franchisee Setup",
    icon: Settings,
    children: [
      { name: "Dashboard", href: "/franchisee-setup/dashboard" },
      { name: "Active Setups", href: "/franchisee-setup/setups" },
      { name: "Configurations", href: "/franchisee-setup/configurations" },
      { name: "Templates", href: "/franchisee-setup/templates" },
      { name: "Analytics", href: "/franchisee-setup/analytics" },
      { name: "Settings", href: "/franchisee-setup/settings" },
    ],
  },
  {
    name: "Product Catalog",
    icon: Package,
    children: [
      { name: "Dashboard", href: "/product-catalog/dashboard" },
      { name: "Products", href: "/product-catalog/products" },
      { name: "Categories", href: "/product-catalog/categories" },
      { name: "Sync Status", href: "/product-catalog/sync" },
      { name: "Analytics", href: "/product-catalog/analytics" },
      { name: "Settings", href: "/product-catalog/settings" },
    ],
  },
  {
    name: "Franchisee Portal",
    icon: User,
    children: [
      { name: "Dashboard", href: "/franchisee-self-service/dashboard" },
      { name: "Purchase Orders", href: "/franchisee-self-service/orders" },
      { name: "Inventory", href: "/franchisee-self-service/inventory" },
      { name: "Invoices", href: "/franchisee-self-service/invoices" },
      { name: "GRN", href: "/franchisee-self-service/grn" },
      { name: "Schemes", href: "/franchisee-self-service/schemes" },
      { name: "Loyalty", href: "/franchisee-self-service/loyalty" },
      { name: "Support", href: "/franchisee-self-service/support" },
    ],
  },
  {
    name: "Purchase Orders",
    icon: ShoppingCart,
    children: [
      { name: "Dashboard", href: "/franchisee-purchase-order/dashboard" },
      { name: "Purchase Orders", href: "/franchisee-purchase-order/orders" },
      { name: "Analytics", href: "/franchisee-purchase-order/analytics" },
      { name: "Settings", href: "/franchisee-purchase-order/settings" },
    ],
  },
  {
    name: "Delivery & Logistics",
    icon: Truck,
    children: [
      { name: "Delivery Scheduling", href: "/delivery-logistics/delivery" },
      { name: "GRN Management", href: "/delivery-logistics/grn" },
    ],
  },
  {
    name: "Notifications",
    icon: Bell,
    children: [
      {
        name: "Franchisee Notifications",
        href: "/notifications/franchisee/notifications",
      },
      {
        name: "Corporate Notifications",
        href: "/notifications/corporate/notifications",
      },
      {
        name: "Notification Preferences",
        href: "/notifications/franchisee/preferences",
      },
    ],
  },
  {
    name: "Channel Partners",
    icon: Handshake,
    children: [
      { name: "Overview", href: "/channel-partners/overview" },
      { name: "Partners", href: "/channel-partners/partners" },
      { name: "Commissions", href: "/channel-partners/commissions" },
      { name: "Lead Assignment", href: "/channel-partners/leads" },
      { name: "Territories", href: "/channel-partners/territories" },
      { name: "Training", href: "/channel-partners/training" },
      { name: "Analytics", href: "/channel-partners/analytics" },
    ],
  },
  {
    name: "Human Resources",
    icon: UserCheck,
    children: [
      { name: "Overview", href: "/human-resources" },
      { name: "Employee Management", href: "/human-resources/employee-management" },
      { name: "User & Access", href: "/human-resources/user-access" },
      { name: "Organization", href: "/human-resources/organization" },
      { name: "Workforce Operations", href: "/human-resources/workforce-operations" },
      { name: "Tenant HR", href: "/human-resources/tenant/overview" },
      { name: "Analytics & Reports", href: "/human-resources/analytics" },
      { name: "Settings", href: "/human-resources/settings" },
    ],
  },
  {
    name: "Inventory",
    icon: Package,
    children: [
      { name: "Inventory Overview", href: "/inventory" },
      { name: "Tenant Inventory", href: "/inventory/tenant/overview" },
      { name: "Materials", href: "/inventory/materials" },
      { name: "Equipment", href: "/inventory/equipment" },
      { name: "Suppliers", href: "/inventory/suppliers" },
      { name: "Purchase Orders", href: "/inventory/orders" },
    ],
  },
  {
    name: "Supply Chain",
    icon: Truck,
    children: [
      { name: "SCM Overview", href: "/supply-chain" },
      { name: "Tenant SCM", href: "/supply-chain/tenant/overview" },
      { name: "Supplier Management", href: "/supply-chain/suppliers" },
      { name: "Supplier Onboarding", href: "/supply-chain/onboarding" },
      { name: "Performance Analytics", href: "/supply-chain/performance" },
      { name: "Compliance & Audits", href: "/supply-chain/compliance" },
      { name: "Procurement", href: "/supply-chain/procurement" },
      { name: "Logistics", href: "/supply-chain/logistics" },
      { name: "Risk Management", href: "/supply-chain/risk" },
    ],
  },
  {
    name: "Safety",
    icon: HardHat,
    children: [
      { name: "Safety Reports", href: "/safety/reports" },
      { name: "Incidents", href: "/safety/incidents" },
      { name: "Training", href: "/safety/training" },
      { name: "Compliance", href: "/safety/compliance" },
    ],
  },
  {
    name: "Financial Management",
    icon: DollarSign,
    children: [
      { name: "Overview", href: "/financial-management" },
      { name: "Finance Operations", href: "/financial-management/finance" },
      { name: "Accounting", href: "/financial-management/accounting" },
      { name: "Payment Processing", href: "/financial-management/payments" },
      { name: "Tenant Finance", href: "/financial-management/tenant/overview" },
      { name: "Reports & Analytics", href: "/financial-management/reports" },
      { name: "Compliance", href: "/financial-management/compliance" },
      { name: "Settings", href: "/financial-management/settings" },
    ],
  },
  {
    name: "Communications",
    icon: MessageSquare,
    children: [
      { name: "Overview", href: "/communications/overview" },
      { name: "Chat & Teams", href: "/communications/chat" },
      { name: "Meetings", href: "/communications/meetings" },
      { name: "Circulars", href: "/communications/circulars" },
      { name: "Directory", href: "/communications/directory" },
    ],
  },
  {
    name: "Notifications & Workflows",
    icon: Bell,
    children: [
      { name: "Overview", href: "/notifications-workflows/overview" },
      { name: "Notifications", href: "/notifications-workflows/notifications" },
      { name: "Templates", href: "/notifications-workflows/templates" },
      { name: "Rules", href: "/notifications-workflows/rules" },
      { name: "Workflows", href: "/notifications-workflows/workflows" },
      { name: "Analytics", href: "/notifications-workflows/analytics" },
    ],
  },


  {
    name: "Admin Settings",
    icon: Settings,
    children: [
      { name: "Overview", href: "/admin-settings/overview" },
      { name: "Users & Roles", href: "/admin-settings/users" },
      { name: "Lead Sources", href: "/admin-settings/leads" },
      { name: "Tax & Charges", href: "/admin-settings/tax" },
      { name: "Templates", href: "/admin-settings/templates" },
    ],
  },
  {
    name: "Advanced Patterns",
    icon: Zap,
    children: [
      { name: "Overview", href: "/advanced-patterns" },
      { name: "Form Builder", href: "/form-builder" },
      { name: "Dashboard Builder", href: "/dashboard-builder" },
      { name: "AI Form Builder", href: "/ai-form-builder" },
      { name: "Visual Workflow Builder", href: "/visual-workflow-builder" },
      { name: "AI Agents & Automations", href: "/ai-agents" },
      { name: "Multi-Tenant Architecture", href: "/multi-tenant" },
      { name: "Third-Party Integrations", href: "/integrations" },
    ],
  },
  {
    name: "Reports",
    icon: BarChart3,
    children: [
      { name: "Reports Overview", href: "/reports" },
      {
        name: "Order & Inventory History",
        href: "/order-inventory-history/overview",
      },
    ],
  },
  {
    name: "Audit Trail",
    href: "/audit-trail",
    icon: Activity,
  },
  {
    name: "Account Management",
    href: "/account",
    icon: Settings,
  },
];

export function Sidebar({
  onClose,
  collapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (name: string) => {
    if (collapsed) return; // Don't expand when collapsed
    setExpandedItems((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    );
  };

  const isExpanded = (name: string) =>
    expandedItems.includes(name) && !collapsed;

  // Mobile-only close handler
  const handleMobileClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="flex h-full flex-col animate-slideInLeft">
      {/* Logo and close button */}
      <div className="flex items-center justify-between border-b border-sidebar-border p-4 animate-fadeInUp">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-primary to-construction-500 relative overflow-hidden group">
            <AnimatedIcon
              icon={Building2}
              animation="float"
              className="text-primary-foreground"
            />
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-semibold gradient-text">
                BuildPro ERP
              </h2>
              <div className="flex items-center gap-1">
                <p className="text-xs text-sidebar-foreground/70">
                  Construction Management
                </p>
                <GlowingOrb className="scale-50" />
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="hidden lg:flex hover-lift"
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <AnimatedIcon
                icon={ChevronDown}
                animation="bounce"
                size="sm"
                className={cn(
                  "transition-transform duration-300",
                  collapsed ? "rotate-90" : "-rotate-90",
                )}
              />
            </Button>
          )}
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden hover-lift"
            >
              <AnimatedIcon icon={X} animation="bounce" size="sm" />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navigation.map((item, index) => (
            <li
              key={item.name}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.children ? (
                collapsed ? (
                  // Collapsed state - use dropdown menu
                  <DropdownMenu>
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-center px-2 hover-lift transition-all duration-300",
                              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                              "group relative overflow-hidden h-10",
                            )}
                          >
                            <AnimatedIcon
                              icon={item.icon}
                              animation="float"
                              size="sm"
                              className="group-hover:text-primary transition-colors"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </Button>
                        </DropdownMenuTrigger>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        sideOffset={8}
                        className="font-medium bg-gray-900 text-white border-gray-700 z-[100]"
                      >
                        {item.name}
                      </TooltipContent>
                    </Tooltip>
                    <DropdownMenuContent side="right" className="w-56">
                      {item.children.map((child) => (
                        <DropdownMenuItem key={child.href} asChild>
                          <Link
                            to={child.href}
                            onClick={handleMobileClose}
                            className={cn(
                              "w-full cursor-pointer",
                              location.pathname === child.href &&
                                "bg-sidebar-primary text-sidebar-primary-foreground",
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <PulsingDot className="scale-50" />
                              {child.name}
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  // Expanded state - normal behavior
                  <div>
                    <Button
                      variant="ghost"
                      onClick={() => toggleExpanded(item.name)}
                      className={cn(
                        "w-full text-left font-normal hover-lift transition-all duration-300",
                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        "group relative overflow-hidden justify-between",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <AnimatedIcon
                          icon={item.icon}
                          animation="float"
                          size="sm"
                          className="group-hover:text-primary transition-colors"
                        />
                        {item.name}
                      </div>
                      <AnimatedIcon
                        icon={ChevronDown}
                        className={cn(
                          "transition-transform duration-300",
                          isExpanded(item.name) && "rotate-180",
                        )}
                        size="sm"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Button>
                    {isExpanded(item.name) && (
                      <ul className="ml-4 mt-2 space-y-1 border-l border-sidebar-border pl-4 animate-slideInDown">
                        {item.children.map((child, childIndex) => (
                          <li
                            key={child.href}
                            className="animate-fadeInUp"
                            style={{ animationDelay: `${childIndex * 0.05}s` }}
                          >
                            <Link
                              to={child.href}
                              onClick={handleMobileClose}
                              className={cn(
                                "block rounded-md px-3 py-2 text-sm transition-all duration-300 hover-lift relative group overflow-hidden",
                                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                location.pathname === child.href &&
                                  "bg-sidebar-primary text-sidebar-primary-foreground",
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <PulsingDot className="scale-50" />
                                {child.name}
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-r from-construction-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              ) : // Single navigation items
              collapsed ? (
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href!}
                      onClick={handleMobileClose}
                      className={cn(
                        "flex items-center justify-center rounded-md px-2 py-2 transition-all duration-300 hover-lift relative group overflow-hidden h-10",
                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        location.pathname === item.href &&
                          "bg-sidebar-primary text-sidebar-primary-foreground",
                      )}
                    >
                      <AnimatedIcon
                        icon={item.icon}
                        animation={
                          location.pathname === item.href ? "glow" : "float"
                        }
                        size="sm"
                        className="group-hover:text-primary transition-colors"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    sideOffset={8}
                    className="font-medium bg-gray-900 text-white border-gray-700 z-[100]"
                  >
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Link
                  to={item.href!}
                  onClick={handleMobileClose}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 transition-all duration-300 hover-lift relative group overflow-hidden gap-3",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    location.pathname === item.href &&
                      "bg-sidebar-primary text-sidebar-primary-foreground",
                  )}
                >
                  <AnimatedIcon
                    icon={item.icon}
                    animation={
                      location.pathname === item.href ? "glow" : "float"
                    }
                    size="sm"
                    className="group-hover:text-primary transition-colors"
                  />
                  {item.name}
                  {location.pathname === item.href && (
                    <GlowingOrb className="ml-auto scale-50" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4 animate-fadeInUp">
        <Button
          variant="ghost"
          className={cn(
            "w-full font-normal hover-lift transition-all duration-300 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground relative group overflow-hidden",
            collapsed ? "justify-center px-2" : "justify-start gap-3",
          )}
          title={collapsed ? "Settings" : undefined}
        >
          <AnimatedIcon
            icon={Settings}
            animation="bounce"
            size="sm"
            className="group-hover:text-primary transition-colors"
          />
          {!collapsed && "Settings"}
          {!collapsed && (
            <AnimatedIcon
              icon={Zap}
              animation="glow"
              size="sm"
              className="ml-auto opacity-50"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
      </div>
    </div>
  );
}
