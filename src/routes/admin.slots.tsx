import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, RefreshCw, Ban, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/slots")({
  head: () => ({
    meta: [
      { title: "Availability — Health Care Admin" },
      { name: "description", content: "Manage weekly availability, buffers, and blockout periods synced with Calendly." },
      { property: "og:title", content: "Availability — Health Care Admin" },
      { property: "og:description", content: "Admin scheduling." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminSlots,
});

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

// state per cell: 0 = unavailable, 1 = available, 2 = booked
function cellState(d: number, h: number) {
  if (d === 5) return 0; // Friday off
  if (h === 4) return 0; // lunch buffer
  if ((d * 3 + h) % 7 === 0) return 2;
  if (d === 6 && h > 6) return 0;
  return 1;
}

function AdminSlots() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Availability</h1>
          <p className="mt-1 text-sm text-muted-foreground">Week of Oct 18 – Oct 24 · synced with Calendly</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:bg-secondary">
            <Ban className="h-4 w-4" /> Block time
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground">
            <Plus className="h-4 w-4" /> Add slots
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Open slots this week</p>
          <p className="mt-1 font-display text-3xl font-bold">52</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Booked</p>
          <p className="mt-1 font-display text-3xl font-bold text-accent">11</p>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-5">
          <div>
            <p className="text-sm text-muted-foreground">Calendly sync</p>
            <p className="mt-1 flex items-center gap-2 font-semibold"><span className="h-2 w-2 rounded-full bg-accent" /> Connected</p>
          </div>
          <button className="rounded-lg p-2 text-muted-foreground hover:bg-secondary" aria-label="Sync now"><RefreshCw className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card p-5">
        <div className="grid min-w-[640px] grid-cols-[64px_repeat(7,1fr)] gap-1.5">
          <div />
          {days.map((d) => (
            <div key={d} className="pb-2 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">{d}</div>
          ))}
          {hours.map((h, hi) => (
            <>
              <div key={h} className="flex items-center text-xs font-medium text-muted-foreground">{h}</div>
              {days.map((d, di) => {
                const s = cellState(di, hi);
                return (
                  <button
                    key={`${d}-${h}`}
                    className={`h-9 rounded-lg text-[10px] font-bold transition-colors ${
                      s === 2
                        ? "bg-primary text-primary-foreground"
                        : s === 1
                          ? "bg-mint text-accent hover:bg-accent/30"
                          : "bg-secondary/60 text-muted-foreground/40"
                    }`}
                  >
                    {s === 2 ? "Booked" : ""}
                  </button>
                );
              })}
            </>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-5 text-xs text-muted-foreground">
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-mint" /> Available</span>
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-primary" /> Booked</span>
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-secondary" /> Unavailable / buffer</span>
          <span className="flex items-center gap-2"><CalendarClock className="h-3.5 w-3.5" /> 15 min buffer between sessions</span>
        </div>
      </div>
    </div>
  );
}
