import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Stethoscope, LayoutGrid, CalendarClock, ClipboardList, LogOut } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const nav = [
  { to: "/admin/services", label: "Services", icon: LayoutGrid },
  { to: "/admin/slots", label: "Availability", icon: CalendarClock },
  { to: "/admin/bookings", label: "Bookings", icon: ClipboardList },
] as const;

function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Stethoscope className="h-4 w-4" />
          </span>
          <span className="font-display font-bold">Sehaty <span className="text-sidebar-primary">Admin</span></span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground" }}
            >
              <n.icon className="h-4 w-4" /> {n.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-sidebar-border p-4">
          <Link to="/" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent">
            <LogOut className="h-4 w-4" /> Sign out
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3 md:hidden">
          <span className="font-display font-bold">Sehaty Admin</span>
          <nav className="flex gap-1">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="rounded-lg p-2 text-muted-foreground hover:bg-secondary" activeProps={{ className: "bg-secondary text-foreground" }}>
                <n.icon className="h-5 w-5" />
              </Link>
            ))}
          </nav>
        </div>
        <main className="flex-1 px-4 py-8 sm:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
