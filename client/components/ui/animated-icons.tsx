import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface AnimatedIconProps {
  icon: LucideIcon;
  className?: string;
  animation?: "bounce" | "float" | "pulse" | "glow" | "none";
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
};

const animationClasses = {
  bounce: "icon-bounce",
  float: "animate-float",
  pulse: "animate-pulse-slow",
  glow: "animate-glow",
  none: "",
};

export function AnimatedIcon({
  icon: Icon,
  className,
  animation = "none",
  size = "md",
}: AnimatedIconProps) {
  return (
    <Icon
      className={cn(
        sizeClasses[size],
        animationClasses[animation],
        "transition-all duration-300",
        className,
      )}
    />
  );
}

export function PulsingDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-block", className)}>
      <span className="h-3 w-3 rounded-full bg-emerald-500 animate-ping absolute" />
      <span className="h-3 w-3 rounded-full bg-emerald-600 block" />
    </span>
  );
}

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClass = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }[size];

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-primary border-t-transparent",
        sizeClass,
      )}
    />
  );
}

export function GlowingOrb({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
      <div className="relative h-4 w-4 rounded-full bg-primary animate-pulse" />
    </div>
  );
}

export function ShimmerEffect({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
    </div>
  );
}
