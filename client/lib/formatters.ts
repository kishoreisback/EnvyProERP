/**
 * Format currency in Indian format
 */
export function formatCurrency(
  amount: number,
  options?: {
    showSymbol?: boolean;
    precision?: number;
    compact?: boolean;
  },
): string {
  const { showSymbol = true, precision = 0, compact = false } = options || {};

  if (compact) {
    // Convert to lakhs/crores format
    if (amount >= 10000000) {
      // 1 crore
      return `${showSymbol ? "₹" : ""}${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      // 1 lakh
      return `${showSymbol ? "₹" : ""}${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
      // 1 thousand
      return `${showSymbol ? "₹" : ""}${(amount / 1000).toFixed(1)}K`;
    }
  }

  return new Intl.NumberFormat("en-IN", {
    style: showSymbol ? "currency" : "decimal",
    currency: "INR",
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(amount);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, precision: number = 1): string {
  return `${value.toFixed(precision)}%`;
}

/**
 * Format date in Indian format
 */
export function formatDate(
  date: string | Date,
  options?: {
    includeTime?: boolean;
    format?: "short" | "medium" | "long";
  },
): string {
  const { includeTime = false, format = "medium" } = options || {};

  const dateObj = typeof date === "string" ? new Date(date) : date;

  const formatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month:
      format === "short" ? "numeric" : format === "medium" ? "short" : "long",
    day: "numeric",
    ...(includeTime && {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  return new Intl.DateTimeFormat("en-IN", formatOptions).format(dateObj);
}

/**
 * Format numbers with Indian number system
 */
export function formatNumber(
  num: number,
  options?: {
    precision?: number;
    compact?: boolean;
  },
): string {
  const { precision = 0, compact = false } = options || {};

  if (compact) {
    if (num >= 10000000) {
      return `${(num / 10000000).toFixed(1)}Cr`;
    } else if (num >= 100000) {
      return `${(num / 100000).toFixed(1)}L`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
  }

  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(num);
}

/**
 * Calculate percentage change
 */
export function calculatePercentageChange(
  current: number,
  previous: number,
): {
  value: number;
  isPositive: boolean;
  formatted: string;
} {
  if (previous === 0) {
    return {
      value: 0,
      isPositive: true,
      formatted: "0%",
    };
  }

  const change = ((current - previous) / previous) * 100;
  const isPositive = change >= 0;

  return {
    value: Math.abs(change),
    isPositive,
    formatted: `${isPositive ? "+" : "-"}${Math.abs(change).toFixed(1)}%`,
  };
}

/**
 * Get relative time (e.g., "2 days ago", "in 3 hours")
 */
export function getRelativeTime(date: string | Date): string {
  const now = new Date();
  const targetDate = typeof date === "string" ? new Date(date) : date;
  const diffInMs = targetDate.getTime() - now.getTime();
  const diffInSeconds = Math.floor(Math.abs(diffInMs) / 1000);
  const isPast = diffInMs < 0;

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      const suffix = count === 1 ? interval.label : `${interval.label}s`;
      return isPast ? `${count} ${suffix} ago` : `in ${count} ${suffix}`;
    }
  }

  return "just now";
}

/**
 * Generate initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
