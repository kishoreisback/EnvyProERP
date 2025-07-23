import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimatedIcon, PulsingDot } from "@/components/ui/animated-icons";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Menu,
  Search,
  Settings,
  User,
  LogOut,
  PanelLeftOpen,
  PanelLeft,
  Shield,
  CircleDot,
} from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  onSidebarToggle?: () => void;
  sidebarCollapsed?: boolean;
}

export function Header({
  onMenuClick,
  onSidebarToggle,
  sidebarCollapsed,
}: HeaderProps) {
  const navigate = useNavigate();

  // Get current user from localStorage
  const getCurrentUser = () => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
    return null;
  };

  const currentUser = getCurrentUser();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleProfile = () => {
    // Navigate to profile page (would be implemented)
    navigate("/profile");
  };

  const handleSettings = () => {
    // Navigate to settings page
    navigate("/settings");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusColor = () => {
    return "bg-green-500"; // Online status
  };
  return (
    <header className="border-b bg-card px-4 py-3 lg:px-6 animate-slideInDown">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden hover-lift"
          >
            <AnimatedIcon icon={Menu} animation="bounce" />
          </Button>

          {onSidebarToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSidebarToggle}
              className="hidden lg:flex hover-lift"
              title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <AnimatedIcon
                icon={sidebarCollapsed ? PanelLeftOpen : PanelLeft}
                animation="bounce"
              />
            </Button>
          )}

          <div className="relative hidden md:block animate-slideInLeft">
            <AnimatedIcon
              icon={Search}
              animation="pulse"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search projects, tasks, clients..."
              className="w-96 pl-10 hover:shadow-lg transition-shadow duration-300"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 animate-slideInRight">
          <Button variant="ghost" size="sm" className="relative hover-lift">
            <AnimatedIcon icon={Bell} animation="bounce" />
            <PulsingDot className="absolute -top-1 -right-1" />
          </Button>

          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full hover-lift"
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="/placeholder.svg"
                        alt={currentUser.name}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-blue-500 text-white">
                        {getInitials(currentUser.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor()} rounded-full border-2 border-white`}
                    />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 animate-scaleIn"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium leading-none">
                        {currentUser.name}
                      </p>
                      <CircleDot className="h-2 w-2 text-green-500" />
                    </div>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser.department}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {currentUser.role.replace("_", " ").toUpperCase()}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs flex items-center gap-1"
                      >
                        <Shield className="h-3 w-3" />
                        {currentUser.permissions.includes("all")
                          ? "Full Access"
                          : `${currentUser.permissions.length} Modules`}
                      </Badge>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={handleProfile}
                >
                  <AnimatedIcon
                    icon={User}
                    animation="float"
                    className="mr-2"
                    size="sm"
                  />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={handleSettings}
                >
                  <AnimatedIcon
                    icon={Settings}
                    animation="bounce"
                    className="mr-2"
                    size="sm"
                  />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                  onClick={handleLogout}
                >
                  <AnimatedIcon
                    icon={LogOut}
                    animation="pulse"
                    className="mr-2"
                    size="sm"
                  />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/login")}
            >
              <User className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
