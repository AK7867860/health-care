import { createFileRoute } from "@tanstack/react-router";
import { StatusBadge } from "@/components/status-badge";
import { bookings, formatSar, type BookingStatus } from "@/lib/data";
import { Download, TrendingUp, CalendarCheck, Wallet, Users, Video } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/bookings")({
  head: () => ({
    meta: [
      { title: "Bookings — Health Care Admin" },
      { name: "description", content: "View and manage patient bookings, revenue, and export CSV reports." },
      { property: "og:title", content: "Bookings — Health Care Admin" },
      { property: "og:description", content: "Admin booking management." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminBookings,
});

const filters: ("ALL" | BookingStatus)[] = ["ALL", "CONFIRMED", "COMPLETED", "PENDING", "CANCELLED"];

function exportCsv() {
  const header = "id,patient,service,date,time,status,price_sar\n";
  const rows = bookings.map((b) => [b.id, b.patient, b.service, b.date, b.time, b.status, b.priceSar].map((v) => `"${v}"`).join(",")).join("\n");
  const blob = new Blob([header + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "health-care-bookings-october-2026.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function AdminBookings() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("ALL");
  const list = filter === "ALL" ? bookings : bookings.filter((b) => b.status === filter);

  const stats = [
    { icon: Wallet, label: "Revenue (Oct)", value: "18,450 SAR", delta: "+12%" },
    { icon: CalendarCheck, label: "Completed", value: "64", delta: "+8%" },
    { icon: Users, label: "New patients", value: "21", delta: "+15%" },
    { icon: TrendingUp, label: "Avg. booking value", value: "288 SAR", delta: "+3%" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Bookings</h1>
          <p className="mt-1 text-sm text-muted-foreground">October 2026 · reconciled with Calendly & payment gateway</p>
        </div>
        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint text-accent">
                <s.icon className="h-5 w-5" />
              </span>
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-bold text-accent-foreground">{s.delta}</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{s.label}</p>
            <p className="font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              filter === f ? "bg-primary text-primary-foreground" : "border border-border bg-card text-muted-foreground hover:bg-secondary"
            }`}
          >
            {f === "ALL" ? "All" : f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-3.5 font-semibold">ID</th>
              <th className="px-5 py-3.5 font-semibold">Patient</th>
              <th className="px-5 py-3.5 font-semibold">Service</th>
              <th className="px-5 py-3.5 font-semibold">Date & time</th>
              <th className="px-5 py-3.5 font-semibold">Amount</th>
              <th className="px-5 py-3.5 font-semibold">Status</th>
              <th className="px-5 py-3.5 text-right font-semibold">Meeting</th>
            </tr>
          </thead>
          <tbody>
            {list.map((b) => (
              <tr key={b.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">#{b.id}</td>
                <td className="px-5 py-3.5 font-semibold">{b.patient}</td>
                <td className="px-5 py-3.5">{b.service}</td>
                <td className="px-5 py-3.5 text-muted-foreground">{b.date} · {b.time}</td>
                <td className="px-5 py-3.5 font-semibold">{formatSar(b.priceSar)}</td>
                <td className="px-5 py-3.5"><StatusBadge status={b.status} /></td>
                <td className="px-5 py-3.5 text-right">
                  {b.meetingUrl ? (
                    <a href={b.meetingUrl} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground">
                      <Video className="h-3.5 w-3.5" /> Start
                    </a>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
