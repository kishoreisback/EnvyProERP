import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateRange {
  from: Date;
  to: Date;
}

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  className?: string;
  placeholder?: string;
}

// Main DateRangePicker component using simple date inputs
export function DateRangePicker({
  value,
  onChange,
  className,
}: DateRangePickerProps) {
  const handleFromChange = (date: string) => {
    if (value?.to) {
      onChange?.({ from: new Date(date), to: value.to });
    } else {
      onChange?.({ from: new Date(date), to: new Date(date) });
    }
  };

  const handleToChange = (date: string) => {
    if (value?.from) {
      onChange?.({ from: value.from, to: new Date(date) });
    } else {
      onChange?.({ from: new Date(date), to: new Date(date) });
    }
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <div className={cn("grid grid-cols-2 gap-2", className)}>
      <div>
        <Label htmlFor="from-date" className="text-xs text-gray-500">
          From
        </Label>
        <Input
          id="from-date"
          type="date"
          value={value?.from ? formatDate(value.from) : ""}
          onChange={(e) => handleFromChange(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="to-date" className="text-xs text-gray-500">
          To
        </Label>
        <Input
          id="to-date"
          type="date"
          value={value?.to ? formatDate(value.to) : ""}
          onChange={(e) => handleToChange(e.target.value)}
        />
      </div>
    </div>
  );
}
