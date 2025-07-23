import React, { useState, useRef } from "react";
import { Button } from "./button";
import { Badge } from "./badge";
import { Progress } from "./progress";
import {
  Upload,
  File,
  X,
  CheckCircle,
  AlertCircle,
  Download,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label: string;
  description?: string;
  accept?: string;
  maxSize?: number; // in MB
  required?: boolean;
  multiple?: boolean;
  value?: File | File[];
  onChange: (file: File | File[] | undefined) => void;
  className?: string;
}

export function FileUpload({
  label,
  description,
  accept = "*/*",
  maxSize = 10,
  required = false,
  multiple = false,
  value,
  onChange,
  className,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const files = Array.isArray(value) ? value : value ? [value] : [];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }
    return null;
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles: File[] = [];
    const errors: string[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        newFiles.push(file);
      }
    }

    if (errors.length > 0) {
      setError(errors.join(", "));
      return;
    }

    setError(null);

    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          return null;
        }
        return prev + 20;
      });
    }, 200);

    if (multiple) {
      onChange([...files, ...newFiles]);
    } else {
      onChange(newFiles[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    if (multiple) {
      const newFiles = files.filter((_, i) => i !== index);
      onChange(newFiles.length > 0 ? newFiles : undefined);
    } else {
      onChange(undefined);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      {/* Upload Area */}
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer",
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400",
          error && "border-red-300 bg-red-50",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <p className="text-sm font-medium">
              Drop files here or click to upload
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {accept !== "*/*" && `Accepted formats: ${accept}. `}
              Max file size: {maxSize}MB
            </p>
          </div>
        </div>

        {uploadProgress !== null && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
            <div className="text-center">
              <div className="w-16 mx-auto mb-2">
                <Progress value={uploadProgress} className="h-2" />
              </div>
              <p className="text-sm font-medium">
                Uploading... {uploadProgress}%
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <div className="flex items-center gap-3">
                <File className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
