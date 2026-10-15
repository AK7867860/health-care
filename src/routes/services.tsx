import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ServiceImage } from "@/components/service-image";
import { services, formatSar, type Service } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Health Care Virtual Clinic" },
      { name: "description", content: "Explore 14 telehealth consultation services: nutrition, exercise, sleep, stress, mental health, weight loss, diabetes remission, children & elderly care, and more." },
      { property: "og:title", content: "Services — Health Care Virtual Clinic" },
      { property: "og:description", content: "14 specialized online consultations with transparent SAR pricing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

const categories = ["All", "Wellness", "Programs", "Care", "Diagnostics"] as const;

function ServiceCard({ s }: { s: Service }) {
  return (
    <Link
      to="/service/$id"
      params={{ id: s.slug }}
      className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
    >
      <ServiceImage id={s.id} name={s.name} />
      <div className="mt-4 flex items-start justify-between">
        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">{s.category}</span>
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold">{s.name}</h3>
      <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">{s.tagline}</p>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm">
        <div>
          <span className="font-bold text-primary">{formatSar(s.priceSar)}</span>
          <span className="ml-2 text-muted-foreground">· {s.durationMin} min</span>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
      </div>
    </Link>
  );
}

function Services() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const list = cat === "All" ? services : services.filter((s) => s.category === cat);

  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="bg-navy-deep">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h1 className="font-display text-4xl font-bold text-primary-foreground">Consultation services</h1>
          <p className="mt-3 max-w-xl text-primary-foreground/70">
            Fourteen specialized services, transparent pricing in SAR, and video
            consultations from anywhere in the Kingdom.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                cat === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground border border-border hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <ServiceCard key={s.id} s={s} />
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
