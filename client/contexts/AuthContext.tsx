import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useLogger } from "../hooks/useLogger";

interface User {
  id: string;
  email: string;
  role: string;
  department: string;
  name: string;
  permissions: string[];
  loginTime: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { logUserAction, logSecurityEvent } = useLogger();

  useEffect(() => {
    // Check for existing session on app load
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("currentUser");
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("currentUser", JSON.stringify(userData));

    // Log successful login
    logUserAction("login_success", "AuthContext", {
      userId: userData.id,
      email: userData.email,
      role: userData.role,
      department: userData.department,
    });

    logSecurityEvent({
      type: "login_success",
      userId: userData.id,
      severity: "info",
      details: {
        email: userData.email,
        role: userData.role,
        loginTime: userData.loginTime,
      },
    });
  };

  const logout = () => {
    const currentUser = user;

    // Log logout before clearing user data
    if (currentUser) {
      logUserAction("logout", "AuthContext", {
        userId: currentUser.id,
        email: currentUser.email,
        role: currentUser.role,
        sessionDuration: Date.now() - new Date(currentUser.loginTime).getTime(),
      });

      logSecurityEvent({
        type: "logout",
        userId: currentUser.id,
        severity: "info",
        details: {
          email: currentUser.email,
          logoutTime: new Date().toISOString(),
        },
      });
    }

    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("currentUser");
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return (
      user.permissions.includes("all") || user.permissions.includes(permission)
    );
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
