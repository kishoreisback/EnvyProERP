import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export function AnimatedCounter({
  value,
  duration = 2000,
  prefix = "",
  suffix = "",
  className = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const requestRef = useRef<number>();

  useEffect(() => {
    const start = Date.now();
    const startValue = countRef.current;
    const endValue = value;

    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (endValue - startValue) * easeOutQuart;

      countRef.current = currentValue;
      setCount(currentValue);

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [value, duration]);

  const formatNumber = (num: number) => {
    if (decimals === 0) {
      return Math.floor(num).toLocaleString();
    }
    return num.toFixed(decimals);
  };

  return (
    <span className={className}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}
