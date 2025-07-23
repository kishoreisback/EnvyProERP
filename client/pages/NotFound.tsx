import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-6xl font-bold text-muted-foreground">
              404
            </CardTitle>
            <p className="text-xl text-muted-foreground mt-4">Page not found</p>
            <p className="text-sm text-muted-foreground mt-2">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default NotFound;
