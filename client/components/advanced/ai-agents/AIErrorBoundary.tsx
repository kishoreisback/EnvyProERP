import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface AIErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface AIErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class AIErrorBoundary extends React.Component<
  AIErrorBoundaryProps,
  AIErrorBoundaryState
> {
  constructor(props: AIErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): AIErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("AI Component Error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              <span>AI Component Error</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-red-700">
              An error occurred while loading the AI component. This might be
              due to:
            </p>
            <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
              <li>Data loading issues</li>
              <li>Network connectivity problems</li>
              <li>Invalid component state</li>
            </ul>

            {this.state.error && (
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-red-800">
                  Error Details
                </summary>
                <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}

            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={this.handleReset}
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Try Again
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.location.reload()}
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                Refresh Page
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}
