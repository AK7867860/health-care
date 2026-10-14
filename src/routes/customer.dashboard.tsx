import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { StatusBadge } from "@/components/status-badge";
import { patientBookings, formatSar } from "@/lib/data";
import { Video, CalendarPlus, Clock3, BellRing } from "lucide-react";

export const Route = createFileRoute("/customer/dashboard")({
  head: () => ({
    meta: [
      { title: "My Dashboard — Sehaty Virtual Clinic" },
      { name: "description", content: "View your upcoming consultations, join video calls, and review your booking history." },
      { property: "og:title", content: "My Dashboard — Sehaty" },
      { property: "og:description", content: "Patient dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const upcoming = patientBookings.filter((b) => b.status === "CONFIRMED");
  const past = patientBookings.filter((b) => b.status !== "CONFIRMED");

  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="bg-navy-deep">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-12 sm:px-6">
          <div>
            <h1 className="font-display text-3xl font-bold text-primary-foreground">Assalamu alaikum, Sara</h1>
            <p className="mt-1 text-primary-foreground/70">Your consultations at a glance.</p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
          >
            <CalendarPlus className="h-4 w-4" /> New booking
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="font-display text-xl font-bold">Upcoming consultations</h2>
        <div className="mt-5 space-y-4">
          {upcoming.map((b) => (
            <div key={b.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-accent/30 bg-mint/50 p-6">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <Video className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-display font-bold">{b.service}</p>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock3 className="h-3.5 w-3.5" /> {b.date} · {b.time} (GMT+3)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={b.status} />
                <a
                  href={b.meetingUrl}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  <Video className="h-4 w-4" /> Join call
                </a>
              </div>
            </div>
          ))}
          {upcoming.length === 0 && (
            <p className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              No upcoming consultations — book one from the services page.
            </p>
          )}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
          <BellRing className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          You'll receive an SMS reminder one hour before each consultation, and your
          video link is always available here and in your confirmation email.
        </div>

        <h2 className="mt-12 font-display text-xl font-bold">Booking history</h2>
        <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3.5 font-semibold">Service</th>
                <th className="px-5 py-3.5 font-semibold">Date</th>
                <th className="px-5 py-3.5 font-semibold">Amount</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {past.map((b) => (
                <tr key={b.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-4 font-medium">{b.service}</td>
                  <td className="px-5 py-4 text-muted-foreground">{b.date} · {b.time}</td>
                  <td className="px-5 py-4">{formatSar(b.priceSar)}</td>
                  <td className="px-5 py-4"><StatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
