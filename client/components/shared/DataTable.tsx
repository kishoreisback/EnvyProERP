import { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Edit, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Column<T> {
  key: keyof T | "actions";
  label: string;
  render?: (value: any, item: T) => ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface ActionButton {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: (item: any) => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  show?: (item: any) => boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: ActionButton[];
  showDefaultActions?: boolean;
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  actions = [],
  showDefaultActions = true,
  onView,
  onEdit,
  onDelete,
  isLoading = false,
  emptyMessage = "No data available",
  className = "",
}: DataTableProps<T>) {
  const defaultActions: ActionButton[] = [
    {
      label: "View",
      icon: Eye,
      onClick: onView || (() => {}),
      variant: "ghost",
      show: () => !!onView,
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: onEdit || (() => {}),
      variant: "ghost",
      show: () => !!onEdit,
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: onDelete || (() => {}),
      variant: "ghost",
      show: () => !!onDelete,
    },
  ];

  const allActions = showDefaultActions
    ? [
        ...defaultActions.filter((action) => action.show?.(data[0]) !== false),
        ...actions,
      ]
    : actions;

  const renderCell = (column: Column<T>, item: T) => {
    if (column.key === "actions") {
      return (
        <div className="flex gap-1">
          {allActions.map((action, index) => {
            const shouldShow = action.show ? action.show(item) : true;
            if (!shouldShow) return null;

            return (
              <Button
                key={index}
                variant={action.variant || "ghost"}
                size="sm"
                onClick={() => action.onClick(item)}
              >
                <action.icon className="h-4 w-4" />
              </Button>
            );
          })}
          {allActions.length > 3 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {allActions.slice(3).map((action, index) => {
                  const shouldShow = action.show ? action.show(item) : true;
                  if (!shouldShow) return null;

                  return (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => action.onClick(item)}
                    >
                      <action.icon className="mr-2 h-4 w-4" />
                      {action.label}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      );
    }

    const value = item[column.key as keyof T];
    return column.render ? column.render(value, item) : value;
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="text-muted-foreground">{emptyMessage}</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>
                    {renderCell(column, item)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
