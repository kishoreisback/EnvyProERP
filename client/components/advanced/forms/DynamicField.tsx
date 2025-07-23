import React from "react";
import { FieldSchema, FieldType } from "./types";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Checkbox } from "../../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Switch } from "../../ui/switch";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";
import { Calendar } from "../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { cn } from "../../../lib/utils";
import { CalendarIcon, Upload, Star, Palette, Type, Minus } from "lucide-react";
import { format } from "date-fns";

interface DynamicFieldProps {
  field: FieldSchema;
  value: any;
  error?: string;
  touched?: boolean;
  onChange: (value: any) => void;
  onBlur: () => void;
  disabled?: boolean;
  readonly?: boolean;
}

export function DynamicField({
  field,
  value,
  error,
  touched,
  onChange,
  onBlur,
  disabled = false,
  readonly = false,
}: DynamicFieldProps) {
  const hasError = touched && error;
  const isDisabled = disabled || field.disabled || readonly;

  // Handle different field types
  const renderField = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "url":
      case "phone":
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            disabled={isDisabled}
            className={cn(hasError && "border-red-500")}
            min={field.min}
            max={field.max}
            pattern={field.pattern}
          />
        );

      case "number":
      case "range":
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            value={value || ""}
            onChange={(e) => onChange(Number(e.target.value))}
            onBlur={onBlur}
            disabled={isDisabled}
            className={cn(hasError && "border-red-500")}
            min={field.min}
            max={field.max}
            step={field.step}
          />
        );

      case "currency":
        return (
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              ₹
            </span>
            <Input
              type="number"
              placeholder={field.placeholder || "0.00"}
              value={value || ""}
              onChange={(e) => onChange(Number(e.target.value))}
              onBlur={onBlur}
              disabled={isDisabled}
              className={cn("pl-8", hasError && "border-red-500")}
              min={field.min || 0}
              max={field.max}
              step={field.step || 0.01}
            />
          </div>
        );

      case "textarea":
        return (
          <Textarea
            placeholder={field.placeholder}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            disabled={isDisabled}
            className={cn(hasError && "border-red-500")}
            rows={field.rows || 3}
          />
        );

      case "select":
        return (
          <Select
            value={value || ""}
            onValueChange={onChange}
            disabled={isDisabled}
          >
            <SelectTrigger className={cn(hasError && "border-red-500")}>
              <SelectValue
                placeholder={field.placeholder || "Select an option"}
              />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem
                  key={option.value}
                  value={String(option.value)}
                  disabled={option.disabled}
                >
                  {option.label}
                  {option.description && (
                    <span className="text-xs text-muted-foreground block">
                      {option.description}
                    </span>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "multiselect":
        const selectedValues = value || [];
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${field.id}-${option.value}`}
                  checked={selectedValues.includes(option.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onChange([...selectedValues, option.value]);
                    } else {
                      onChange(
                        selectedValues.filter((v: any) => v !== option.value),
                      );
                    }
                  }}
                  disabled={isDisabled || option.disabled}
                />
                <Label
                  htmlFor={`${field.id}-${option.value}`}
                  className="text-sm"
                >
                  {option.label}
                  {option.description && (
                    <span className="text-xs text-muted-foreground block">
                      {option.description}
                    </span>
                  )}
                </Label>
              </div>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={Boolean(value)}
              onCheckedChange={onChange}
              disabled={isDisabled}
            />
            <Label htmlFor={field.id} className="text-sm">
              {field.label}
            </Label>
          </div>
        );

      case "radio":
        return (
          <RadioGroup
            value={value || ""}
            onValueChange={onChange}
            disabled={isDisabled}
            className="space-y-2"
          >
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={String(option.value)}
                  id={`${field.id}-${option.value}`}
                  disabled={option.disabled}
                />
                <Label
                  htmlFor={`${field.id}-${option.value}`}
                  className="text-sm"
                >
                  {option.label}
                  {option.description && (
                    <span className="text-xs text-muted-foreground block">
                      {option.description}
                    </span>
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "switch":
        return (
          <div className="flex items-center space-x-2">
            <Switch
              id={field.id}
              checked={Boolean(value)}
              onCheckedChange={onChange}
              disabled={isDisabled}
            />
            <Label htmlFor={field.id} className="text-sm">
              {field.label}
            </Label>
          </div>
        );

      case "date":
      case "datetime":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !value && "text-muted-foreground",
                  hasError && "border-red-500",
                )}
                disabled={isDisabled}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value
                  ? format(new Date(value), "PPP")
                  : field.placeholder || "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={value ? new Date(value) : undefined}
                onSelect={(date) => onChange(date?.toISOString())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );

      case "time":
        return (
          <Input
            type="time"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            disabled={isDisabled}
            className={cn(hasError && "border-red-500")}
          />
        );

      case "file":
        return (
          <div className="space-y-2">
            <Input
              type="file"
              onChange={(e) => onChange(e.target.files?.[0])}
              onBlur={onBlur}
              disabled={isDisabled}
              className={cn(hasError && "border-red-500")}
              accept={field.accept}
              multiple={field.multiple}
            />
            {value && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Upload className="h-4 w-4" />
                <span>{typeof value === "string" ? value : value.name}</span>
              </div>
            )}
          </div>
        );

      case "rating":
        const maxRating = field.max || 5;
        return (
          <div className="flex space-x-1">
            {Array.from({ length: maxRating }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onChange(index + 1)}
                disabled={isDisabled}
                className="p-1"
              >
                <Star
                  className={cn(
                    "h-5 w-5",
                    index < (value || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground",
                  )}
                />
              </button>
            ))}
          </div>
        );

      case "color":
        return (
          <div className="flex items-center space-x-2">
            <Input
              type="color"
              value={value || "#000000"}
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              disabled={isDisabled}
              className="w-12 h-10 p-1 border rounded"
            />
            <Input
              type="text"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              disabled={isDisabled}
              placeholder="#000000"
              className={cn("flex-1", hasError && "border-red-500")}
            />
          </div>
        );

      case "richtext":
        return (
          <Textarea
            placeholder={field.placeholder || "Enter rich text content..."}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            disabled={isDisabled}
            className={cn("min-h-32", hasError && "border-red-500")}
            rows={field.rows || 6}
          />
        );

      case "address":
        const addressValue = value || {};
        return (
          <div className="space-y-3">
            <Input
              placeholder="Street Address"
              value={addressValue.street || ""}
              onChange={(e) =>
                onChange({ ...addressValue, street: e.target.value })
              }
              disabled={isDisabled}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="City"
                value={addressValue.city || ""}
                onChange={(e) =>
                  onChange({ ...addressValue, city: e.target.value })
                }
                disabled={isDisabled}
              />
              <Input
                placeholder="State"
                value={addressValue.state || ""}
                onChange={(e) =>
                  onChange({ ...addressValue, state: e.target.value })
                }
                disabled={isDisabled}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Postal Code"
                value={addressValue.postalCode || ""}
                onChange={(e) =>
                  onChange({ ...addressValue, postalCode: e.target.value })
                }
                disabled={isDisabled}
              />
              <Input
                placeholder="Country"
                value={addressValue.country || "India"}
                onChange={(e) =>
                  onChange({ ...addressValue, country: e.target.value })
                }
                disabled={isDisabled}
              />
            </div>
          </div>
        );

      case "signature":
        return (
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <div className="space-y-2">
              <Type className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Signature field - Integration with signature pad needed
              </p>
              {value && (
                <div className="text-xs text-muted-foreground">
                  Signed: {new Date(value.timestamp).toLocaleString()}
                </div>
              )}
            </div>
          </div>
        );

      case "section":
        return (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{field.label}</h3>
            {field.description && (
              <p className="text-sm text-muted-foreground">
                {field.description}
              </p>
            )}
          </div>
        );

      case "divider":
        return <Separator className="my-4" />;

      default:
        return (
          <div className="p-4 border border-dashed border-muted-foreground/25 rounded">
            <p className="text-sm text-muted-foreground">
              Unsupported field type: {field.type}
            </p>
          </div>
        );
    }
  };

  // Don't render label and description for checkbox, switch, section, divider
  const noLabelTypes: FieldType[] = [
    "checkbox",
    "switch",
    "section",
    "divider",
  ];
  const showLabel = !noLabelTypes.includes(field.type);

  return (
    <div className={cn("space-y-2", getFieldWidth(field.width))}>
      {showLabel && (
        <Label htmlFor={field.id} className="text-sm font-medium">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      {field.description && field.type !== "section" && (
        <p className="text-xs text-muted-foreground">{field.description}</p>
      )}

      {renderField()}

      {hasError && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function getFieldWidth(width?: string): string {
  switch (width) {
    case "half":
      return "col-span-6";
    case "quarter":
      return "col-span-3";
    case "third":
      return "col-span-4";
    case "two-thirds":
      return "col-span-8";
    case "full":
    default:
      return "col-span-12";
  }
}
