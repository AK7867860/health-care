import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ServiceImage } from "@/components/service-image";
import { ServiceIcon } from "@/components/service-icon";
import { getService, services, slots, formatSar } from "@/lib/data";
import { ArrowLeft, ArrowRight, Clock3, CalendarCheck, ShieldCheck, Video } from "lucide-react";

export const Route = createFileRoute("/service/$id")({
  loader: ({ params }) => {
    const service = getService(params.id);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.service.name ?? "Service"} — Health Care Virtual Clinic` },
      { name: "description", content: loaderData?.service.description ?? "" },
      { property: "og:title", content: `${loaderData?.service.name ?? "Service"} — Health Care` },
      { property: "og:description", content: loaderData?.service.tagline ?? "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const related = services.filter((s) => s.category === service.category && s.id !== service.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="bg-navy-deep">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-foreground/60 hover:text-accent">
            <ArrowLeft className="h-4 w-4" /> All services
          </Link>
          <div className="mt-6 flex items-start gap-5">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
              <ServiceIcon icon={service.icon} className="h-8 w-8" />
            </span>
            <div>
              <h1 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl">{service.name}</h1>
              <p className="mt-2 max-w-2xl text-primary-foreground/70">{service.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3">
        {/* Booking panel */}
        <div className="lg:col-span-2">
          <h2 className="font-display text-xl font-bold">Available slots</h2>
          <p className="mt-1 text-sm text-muted-foreground">Times shown in Saudi Arabia time (GMT+3). Synced live with the provider's calendar.</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {slots.map((slot) => (
              <button
                key={slot.id}
                disabled={slot.booked}
                className={`rounded-xl border px-4 py-3.5 text-left transition-all ${
                  slot.booked
                    ? "cursor-not-allowed border-border bg-secondary/50 text-muted-foreground/50 line-through"
                    : "border-border bg-card hover:border-accent hover:bg-mint"
                }`}
              >
                <p className="text-xs font-medium text-muted-foreground">{slot.date}</p>
                <p className="mt-0.5 font-display font-bold">{slot.time}</p>
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Video, t: "Video consultation", d: "Private link generated after payment" },
              { icon: ShieldCheck, t: "Secure payment", d: "mada, Visa & Mastercard supported" },
              { icon: CalendarCheck, t: "Free rescheduling", d: "Up to 24 hours before your slot" },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl border border-border bg-card p-5">
                <f.icon className="h-5 w-5 text-accent" />
                <p className="mt-3 text-sm font-semibold">{f.t}</p>
                <p className="mt-1 text-xs text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Price card */}
        <aside className="h-fit rounded-3xl border border-border bg-card p-7 shadow-lg shadow-primary/5 lg:sticky lg:top-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{service.category}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-4xl font-bold text-primary">{formatSar(service.priceSar)}</span>
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock3 className="h-4 w-4" /> {service.durationMin} minute session
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-2"><Video className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> Live video consultation with your provider</li>
            <li className="flex gap-2"><CalendarCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> Confirmation email + SMS reminder 1 hour before</li>
            <li className="flex gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> No card data stored — tokenized by the payment gateway</li>
          </ul>
          <Link
            to="/checkout"
            search={{ service: service.slug }}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-transform hover:scale-[1.02]"
          >
            Book this service <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-center text-xs text-muted-foreground">Sign-in required to complete booking</p>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <h2 className="font-display text-xl font-bold">Related services</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {related.map((s) => (
              <Link
                key={s.id}
                to="/service/$id"
                params={{ id: s.slug }}
                className="rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <ServiceImage id={s.id} name={s.name} />
                <p className="mt-3 font-display font-semibold">{s.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{formatSar(s.priceSar)} · {s.durationMin} min</p>
              </Link>
            ))}
          </div>
        </section>
      )}
      <SiteFooter />
    </div>
  );
}
