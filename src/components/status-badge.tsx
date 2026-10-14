import type { BookingStatus } from "@/lib/data";

const styles: Record<BookingStatus, string> = {
  CONFIRMED: "bg-accent/15 text-accent-foreground border-accent/30",
  COMPLETED: "bg-secondary text-secondary-foreground border-border",
  PENDING: "bg-chart-4/15 text-chart-4 border-chart-4/30",
  CANCELLED: "bg-destructive/10 text-destructive border-destructive/30",
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[status]}`}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
