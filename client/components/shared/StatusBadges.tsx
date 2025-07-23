import { Badge } from "@/components/ui/badge";

export type StatusType =
  | "active"
  | "inactive"
  | "pending"
  | "suspended"
  | "approved"
  | "rejected"
  | "completed"
  | "in-progress"
  | "not-started"
  | "delayed"
  | "on-hold"
  | "cancelled"
  | "paid"
  | "unpaid"
  | "overdue"
  | "draft"
  | "sent"
  | "delivered"
  | "open"
  | "closed"
  | "resolved"
  | "new"
  | "assigned"
  | "high"
  | "medium"
  | "low"
  | "urgent"
  | "critical"
  | "pass"
  | "fail"
  | "verified"
  | "unverified"
  | "submitted"
  | "pending_approval"
  | "confirmed"
  | "in_production"
  | "ready_to_ship"
  | "shipped"
  | "in_transit"
  | "out_for_delivery"
  | "partially_delivered"
  | "back_ordered"
  | "returned"
  | "partial";

interface StatusBadgeProps {
  status: StatusType;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const getStatusConfig = (status: StatusType) => {
    const statusMap: Record<StatusType, { label: string; className: string }> =
      {
        // General Status
        active: { label: "Active", className: "bg-green-500 text-white" },
        inactive: { label: "Inactive", className: "bg-gray-500 text-white" },
        pending: { label: "Pending", className: "bg-yellow-500 text-white" },
        suspended: { label: "Suspended", className: "bg-red-500 text-white" },
        approved: { label: "Approved", className: "bg-blue-500 text-white" },
        rejected: { label: "Rejected", className: "bg-red-500 text-white" },

        // Progress Status
        completed: { label: "Completed", className: "bg-green-500 text-white" },
        "in-progress": {
          label: "In Progress",
          className: "bg-blue-500 text-white",
        },
        "not-started": {
          label: "Not Started",
          className: "bg-gray-500 text-white",
        },
        delayed: { label: "Delayed", className: "bg-red-500 text-white" },
        "on-hold": { label: "On Hold", className: "bg-yellow-500 text-white" },
        cancelled: { label: "Cancelled", className: "bg-gray-600 text-white" },

        // Payment Status
        paid: { label: "Paid", className: "bg-green-500 text-white" },
        unpaid: { label: "Unpaid", className: "bg-red-500 text-white" },
        overdue: { label: "Overdue", className: "bg-red-600 text-white" },
        draft: { label: "Draft", className: "bg-gray-400 text-white" },
        sent: { label: "Sent", className: "bg-blue-500 text-white" },
        delivered: { label: "Delivered", className: "bg-green-500 text-white" },

        // Support Status
        open: { label: "Open", className: "bg-red-500 text-white" },
        closed: { label: "Closed", className: "bg-gray-500 text-white" },
        resolved: { label: "Resolved", className: "bg-green-500 text-white" },
        new: { label: "New", className: "bg-blue-500 text-white" },
        assigned: { label: "Assigned", className: "bg-purple-500 text-white" },

        // Priority Status
        high: { label: "High", className: "bg-orange-500 text-white" },
        medium: { label: "Medium", className: "bg-yellow-500 text-white" },
        low: { label: "Low", className: "bg-gray-500 text-white" },
        urgent: { label: "Urgent", className: "bg-red-600 text-white" },
        critical: { label: "Critical", className: "bg-red-700 text-white" },

        // Quality Status
        pass: { label: "Pass", className: "bg-green-500 text-white" },
        fail: { label: "Fail", className: "bg-red-500 text-white" },
        verified: { label: "Verified", className: "bg-green-500 text-white" },
        unverified: {
          label: "Unverified",
          className: "bg-yellow-500 text-white",
        },

        // Order Status
        submitted: { label: "Submitted", className: "bg-blue-400 text-white" },
        pending_approval: {
          label: "Pending Approval",
          className: "bg-yellow-600 text-white",
        },
        confirmed: { label: "Confirmed", className: "bg-blue-600 text-white" },
        in_production: {
          label: "In Production",
          className: "bg-purple-500 text-white",
        },
        ready_to_ship: {
          label: "Ready to Ship",
          className: "bg-cyan-500 text-white",
        },
        shipped: { label: "Shipped", className: "bg-indigo-500 text-white" },
        in_transit: {
          label: "In Transit",
          className: "bg-blue-700 text-white",
        },
        out_for_delivery: {
          label: "Out for Delivery",
          className: "bg-green-600 text-white",
        },
        partially_delivered: {
          label: "Partially Delivered",
          className: "bg-orange-600 text-white",
        },
        back_ordered: {
          label: "Back Ordered",
          className: "bg-red-400 text-white",
        },
        returned: { label: "Returned", className: "bg-gray-600 text-white" },
        partial: { label: "Partial", className: "bg-yellow-600 text-white" },
      };

    return (
      statusMap[status] || {
        label: status,
        className: "bg-gray-500 text-white",
      }
    );
  };

  const config = getStatusConfig(status);

  return (
    <Badge className={`${config.className} ${className}`}>{config.label}</Badge>
  );
}

export type TierType = "platinum" | "gold" | "silver" | "bronze";

interface TierBadgeProps {
  tier: TierType;
  className?: string;
}

export function TierBadge({ tier, className = "" }: TierBadgeProps) {
  const getTierConfig = (tier: TierType) => {
    const tierMap: Record<TierType, { label: string; className: string }> = {
      platinum: { label: "Platinum", className: "bg-purple-500 text-white" },
      gold: { label: "Gold", className: "bg-yellow-500 text-white" },
      silver: { label: "Silver", className: "bg-gray-400 text-white" },
      bronze: { label: "Bronze", className: "bg-amber-600 text-white" },
    };

    return tierMap[tier];
  };

  const config = getTierConfig(tier);

  return (
    <Badge className={`${config.className} ${className}`}>{config.label}</Badge>
  );
}

export type LeadStatusType =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "closed"
  | "lost"
  | "follow-up"
  | "site-visit";

interface LeadStatusBadgeProps {
  status: LeadStatusType;
  className?: string;
}

export function LeadStatusBadge({
  status,
  className = "",
}: LeadStatusBadgeProps) {
  const getLeadStatusConfig = (status: LeadStatusType) => {
    const statusMap: Record<
      LeadStatusType,
      { label: string; className: string }
    > = {
      new: { label: "New", className: "bg-blue-500 text-white" },
      contacted: { label: "Contacted", className: "bg-purple-500 text-white" },
      qualified: { label: "Qualified", className: "bg-indigo-500 text-white" },
      proposal: { label: "Proposal", className: "bg-orange-500 text-white" },
      negotiation: {
        label: "Negotiation",
        className: "bg-amber-500 text-white",
      },
      closed: { label: "Closed", className: "bg-green-500 text-white" },
      lost: { label: "Lost", className: "bg-red-500 text-white" },
      "follow-up": { label: "Follow-up", className: "bg-teal-500 text-white" },
      "site-visit": {
        label: "Site Visit",
        className: "bg-cyan-500 text-white",
      },
    };

    return statusMap[status];
  };

  const config = getLeadStatusConfig(status);

  return (
    <Badge className={`${config.className} ${className}`}>{config.label}</Badge>
  );
}
