import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Award, HeartHandshake, ShieldCheck, Stethoscope, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Health Care Virtual Clinic" },
      { name: "description", content: "Learn about Health Care and personalized online consultations across Saudi Arabia." },
      { property: "og:title", content: "About — Health Care Virtual Clinic" },
      { property: "og:description", content: "Personalized online consultation services in Saudi Arabia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const values = [
  { icon: HeartHandshake, title: "Consultations with continuity", text: "Your consultations build on your health history, goals, and previous follow-ups for a consistent care journey." },
  { icon: ShieldCheck, title: "Privacy by design", text: "Consultations are confidential, payment data is never stored on our servers, and records are retained per Saudi healthcare guidelines." },
  { icon: Award, title: "Evidence-based care", text: "Every program — from diabetes remission to sleep support — follows current clinical guidelines and measurable outcomes." },
];

function About() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="bg-navy-deep">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h1 className="font-display text-4xl font-bold text-primary-foreground">Care that knows your name</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/70">
            Health Care brings personalized consultations, follow-ups, and wellness
            programs together — supporting your health journey from the comfort
            of your home.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-primary p-10 text-primary-foreground">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
            <Stethoscope className="h-7 w-7" />
          </span>
          <h2 className="mt-6 font-display text-2xl font-bold">Your consultation, one step away</h2>
          <p className="mt-1 text-sm font-medium text-accent">Personalized support for your wellbeing</p>
          <p className="mt-4 leading-relaxed text-primary-foreground/75">
            Health Care makes continuous, personalized consultations accessible
            anywhere in the Kingdom — with support for your nutrition, lifestyle,
            and wellbeing, without waiting rooms or travel.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-primary-foreground/15 pt-6 text-center">
            <div><p className="font-display text-2xl font-bold text-accent">Online</p><p className="text-xs text-primary-foreground/60">Consultations</p></div>
            <div><p className="font-display text-2xl font-bold text-accent">14</p><p className="text-xs text-primary-foreground/60">Specializations</p></div>
            <div><p className="font-display text-2xl font-bold text-accent">Private</p><p className="text-xs text-primary-foreground/60">Support</p></div>
          </div>
        </div>

        <div className="space-y-5">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint text-accent">
                <v.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="rounded-3xl border border-border bg-card p-10 text-center">
          <h2 className="font-display text-2xl font-bold">Start your care journey</h2>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">Choose from 14 services and book a video consultation in minutes.</p>
          <Link to="/services" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-accent-foreground transition-transform hover:scale-[1.02]">
            Browse services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
