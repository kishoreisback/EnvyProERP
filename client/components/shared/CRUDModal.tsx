import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CRUDModalProps {
  trigger: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSave?: () => void;
  onCancel?: () => void;
  saveLabel?: string;
  cancelLabel?: string;
  saveDraftLabel?: string;
  showSaveDraft?: boolean;
  isLoading?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  maxHeight?: number;
}

export function CRUDModal({
  trigger,
  title,
  description,
  children,
  open,
  onOpenChange,
  onSave,
  onCancel,
  saveLabel = "Save",
  cancelLabel = "Cancel",
  saveDraftLabel = "Save as Draft",
  showSaveDraft = false,
  isLoading = false,
  maxWidth = "lg",
  maxHeight = 500,
}: CRUDModalProps) {
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case "sm":
        return "sm:max-w-[425px]";
      case "md":
        return "sm:max-w-[500px]";
      case "lg":
        return "sm:max-w-[600px]";
      case "xl":
        return "sm:max-w-[700px]";
      case "2xl":
        return "sm:max-w-[800px]";
      default:
        return "sm:max-w-[600px]";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={getMaxWidthClass()}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <ScrollArea className={`max-h-[${maxHeight}px]`}>
          <div className="grid gap-4 py-4 pr-4">{children}</div>
        </ScrollArea>

        <DialogFooter className="flex gap-2">
          {showSaveDraft && (
            <Button variant="outline" onClick={onCancel} disabled={isLoading}>
              {saveDraftLabel}
            </Button>
          )}
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button onClick={onSave} disabled={isLoading}>
            {isLoading ? "Saving..." : saveLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
