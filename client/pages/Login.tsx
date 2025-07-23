import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  Shield,
  Users,
  Crown,
  Briefcase,
  Calculator,
  UserCheck,
  HardHat,
  TrendingUp,
} from "lucide-react";

// Developer credentials for different employee roles
const developerCredentials = [
  {
    id: "super_admin",
    title: "Super Administrator",
    email: "admin@company.com",
    password: "admin123",
    role: "super_admin",
    department: "Management",
    icon: Crown,
    color: "bg-purple-600",
    description: "Full system access",
    permissions: ["all"],
  },
  {
    id: "project_manager",
    title: "Project Manager",
    email: "pm@company.com",
    password: "project123",
    role: "project_manager",
    department: "Construction",
    icon: Building2,
    color: "bg-blue-600",
    description: "Project and team management",
    permissions: ["projects", "hrms", "communications", "finance"],
  },
  {
    id: "site_supervisor",
    title: "Site Supervisor",
    email: "supervisor@company.com",
    password: "site123",
    role: "site_supervisor",
    department: "Construction",
    icon: HardHat,
    color: "bg-orange-600",
    description: "On-site operations and safety",
    permissions: ["projects", "safety", "hrms", "communications"],
  },
  {
    id: "sales_manager",
    title: "Sales Manager",
    email: "sales@company.com",
    password: "sales123",
    role: "sales_manager",
    department: "Sales & Marketing",
    icon: TrendingUp,
    color: "bg-green-600",
    description: "Sales and lead management",
    permissions: ["crm", "communications", "finance", "projects"],
  },
  {
    id: "finance_manager",
    title: "Finance Manager",
    email: "finance@company.com",
    password: "finance123",
    role: "finance_manager",
    department: "Finance",
    icon: Calculator,
    color: "bg-emerald-600",
    description: "Financial management and accounting",
    permissions: ["finance", "accounting", "projects", "communications"],
  },
  {
    id: "hr_manager",
    title: "HR Manager",
    email: "hr@company.com",
    password: "hr123",
    role: "hr_manager",
    department: "Human Resources",
    icon: UserCheck,
    color: "bg-pink-600",
    description: "Employee and organizational management",
    permissions: ["hrms", "communications", "user-management"],
  },
  {
    id: "sales_executive",
    title: "Sales Executive",
    email: "exec@company.com",
    password: "exec123",
    role: "sales_executive",
    department: "Sales",
    icon: Users,
    color: "bg-cyan-600",
    description: "Customer relationship management",
    permissions: ["crm", "communications"],
  },
];

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("project_manager");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Find matching credentials
    const credential = developerCredentials.find(
      (cred) => cred.email === email && cred.password === password,
    );

    if (credential) {
      // Store user session
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: credential.id,
          email: credential.email,
          role: credential.role,
          department: credential.department,
          name: credential.title,
          permissions: credential.permissions,
          loginTime: new Date().toISOString(),
        }),
      );

      // Navigate to dashboard
      setTimeout(() => {
        navigate("/");
        window.location.reload(); // Refresh to update auth state
      }, 1000);
    } else {
      setError("Invalid email or password. Please use developer credentials.");
    }

    setIsLoading(false);
  };

  const handleQuickLogin = (credential: any) => {
    setEmail(credential.email);
    setPassword(credential.password);
    setSelectedRole(credential.role);
  };

  const handleRegister = () => {
    // Placeholder for registration logic
    alert("Registration functionality would be implemented here.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid gap-8 lg:grid-cols-3">
        {/* Left side - Development Credentials */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Development Credentials
                  </CardTitle>
                  <CardDescription>
                    Use these pre-configured accounts to test different employee
                    roles and access levels
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {developerCredentials.map((credential) => {
                  const IconComponent = credential.icon;
                  return (
                    <div
                      key={credential.id}
                      className="p-4 border rounded-lg hover:border-blue-300 transition-colors cursor-pointer group"
                      onClick={() => handleQuickLogin(credential)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 ${credential.color} rounded-lg`}>
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm">
                              {credential.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {credential.department}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {credential.role.replace("_", " ")}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="font-mono text-xs">
                            {credential.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Lock className="h-3 w-3 text-muted-foreground" />
                          <span className="font-mono text-xs">
                            {credential.password}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {credential.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-3 border-t">
                        <div className="flex flex-wrap gap-1">
                          {credential.permissions
                            .slice(0, 3)
                            .map((permission) => (
                              <Badge
                                key={permission}
                                variant="secondary"
                                className="text-xs"
                              >
                                {permission}
                              </Badge>
                            ))}
                          {credential.permissions.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{credential.permissions.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full text-xs"
                        >
                          Click to auto-fill credentials
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right side - Login Form */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your employee account to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label>Login As</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {developerCredentials.map((credential) => (
                        <SelectItem key={credential.id} value={credential.role}>
                          <div className="flex items-center gap-2">
                            <credential.icon className="h-4 w-4" />
                            Employee - {credential.title}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Signing In...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </div>
                  )}
                </Button>

                <Separator />

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={handleRegister}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Register here
                    </button>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
