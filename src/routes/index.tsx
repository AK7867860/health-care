import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ServiceIcon } from "@/components/service-icon";
import { services, formatSar } from "@/lib/data";
import {
  ArrowRight, Video, CalendarCheck, CreditCard, BellRing,
  ShieldCheck, Clock3, Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sehaty — Virtual Clinic & Telehealth Consultations in Saudi Arabia" },
      { name: "description", content: "Book online consultations across 14 health specializations — nutrition, sleep, mental health, diabetes remission and more. Secure mada/Visa payments, instant video links." },
      { property: "og:title", content: "Sehaty — Virtual Clinic" },
      { property: "og:description", content: "Specialist telehealth consultations from home. Book in minutes, pay securely, join by video." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const steps = [
  { icon: CalendarCheck, title: "Pick a service & time", text: "Browse 14 specializations and choose a slot that fits your day." },
  { icon: CreditCard, title: "Pay securely", text: "Checkout with mada, Visa, or Mastercard through a licensed Saudi payment gateway." },
  { icon: Video, title: "Join by video", text: "A private meeting link is generated instantly and sent to your email." },
  { icon: BellRing, title: "Get reminded", text: "An SMS reminder arrives one hour before your consultation." },
];

function Home() {
  const featured = services.slice(0, 6);
  return (
    <div className="min-h-screen">
      <SiteNav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-deep">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-primary/40 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              <Sparkles className="h-3.5 w-3.5" /> Licensed telehealth · Saudi Arabia
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              Your doctor, <span className="text-accent">one video call</span> away
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-primary-foreground/70">
              Personalized consultations across 14 health specializations — from
              nutrition and sleep to diabetes remission. Book in minutes, pay
              securely, and meet your provider from home.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-transform hover:scale-[1.02]"
              >
                Browse services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/20 px-6 py-3.5 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Meet your provider
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-primary-foreground/60">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> Private & confidential</span>
              <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-accent" /> Same-week appointments</span>
              <span className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-accent" /> mada · Visa · Mastercard</span>
            </div>
          </div>

          {/* Hero card mock */}
          <div className="relative hidden lg:block">
            <div className="rounded-3xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="font-display font-semibold text-primary-foreground">Next available slots</p>
                <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">Live calendar</span>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  { d: "Today", t: "18:00", s: "Nutrition Support" },
                  { d: "Tomorrow", t: "10:30", s: "Sleep Support" },
                  { d: "Thu, Oct 22", t: "09:00", s: "Health Coaching" },
                ].map((row) => (
                  <div key={row.t} className="flex items-center justify-between rounded-2xl bg-primary-foreground/5 px-4 py-3.5">
                    <div>
                      <p className="text-sm font-semibold text-primary-foreground">{row.s}</p>
                      <p className="text-xs text-primary-foreground/50">{row.d} · {row.t}</p>
                    </div>
                    <Link to="/services" className="rounded-lg bg-accent px-3.5 py-1.5 text-xs font-bold text-accent-foreground">
                      Book
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-accent/10 p-4 text-center text-xs font-medium text-accent">
                Video link & SMS reminder included with every booking
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-widest text-accent">How it works</p>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">From booking to consultation in four steps</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-primary/5">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint text-accent">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="font-display text-3xl font-bold text-border">{i + 1}</span>
              </div>
              <h3 className="mt-4 font-display font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured services */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-accent">Services</p>
              <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Care for every stage of life</h2>
            </div>
            <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent">
              View all 14 services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s) => (
              <Link
                key={s.id}
                to="/service/$id"
                params={{ id: s.slug }}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <ServiceIcon icon={s.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{s.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.tagline}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="font-bold text-primary">{formatSar(s.priceSar)}</span>
                  <span className="text-muted-foreground">{s.durationMin} min</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center sm:px-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <h2 className="relative font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
            Ready to feel better?
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-primary-foreground/70">
            Book your first consultation today — most patients are seen within 48 hours.
          </p>
          <Link
            to="/services"
            className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-transform hover:scale-[1.02]"
          >
            Book a consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
