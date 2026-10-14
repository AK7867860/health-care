import { createFileRoute } from "@tanstack/react-router";
import { ServiceIcon } from "@/components/service-icon";
import { services as initial, formatSar } from "@/lib/data";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/services")({
  head: () => ({
    meta: [
      { title: "Manage Services — Sehaty Admin" },
      { name: "description", content: "Create, edit, and toggle consultation services, pricing, and durations." },
      { property: "og:title", content: "Manage Services — Sehaty Admin" },
      { property: "og:description", content: "Admin service management." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminServices,
});

function AdminServices() {
  const [active, setActive] = useState<Record<number, boolean>>(
    Object.fromEntries(initial.map((s) => [s.id, s.id !== 6 && s.id !== 14 ? true : s.id === 6])),
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Services</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage pricing, duration, and visibility for all 14 services.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]">
          <Plus className="h-4 w-4" /> Add service
        </button>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-3.5 font-semibold">Service</th>
              <th className="px-5 py-3.5 font-semibold">Category</th>
              <th className="px-5 py-3.5 font-semibold">Duration</th>
              <th className="px-5 py-3.5 font-semibold">Price</th>
              <th className="px-5 py-3.5 font-semibold">Active</th>
              <th className="px-5 py-3.5 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {initial.map((s) => (
              <tr key={s.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint text-accent">
                      <ServiceIcon icon={s.icon} className="h-4 w-4" />
                    </span>
                    <span className="font-semibold">{s.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-muted-foreground">{s.category}</td>
                <td className="px-5 py-3.5">{s.durationMin} min</td>
                <td className="px-5 py-3.5 font-semibold text-primary">{formatSar(s.priceSar)}</td>
                <td className="px-5 py-3.5">
                  <button
                    role="switch"
                    aria-checked={active[s.id]}
                    onClick={() => setActive({ ...active, [s.id]: !active[s.id] })}
                    className={`relative h-6 w-11 rounded-full transition-colors ${active[s.id] ? "bg-accent" : "bg-border"}`}
                  >
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-all ${active[s.id] ? "left-[22px]" : "left-0.5"}`} />
                  </button>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex justify-end gap-1">
                    <button className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                    <button className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
