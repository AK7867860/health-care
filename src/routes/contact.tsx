import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Mail, Phone, MapPin, Clock3, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sehaty Virtual Clinic" },
      { name: "description", content: "Get in touch with Sehaty Virtual Clinic — questions about services, bookings, or payments. We reply within one business day." },
      { property: "og:title", content: "Contact — Sehaty Virtual Clinic" },
      { property: "og:description", content: "Questions about services or bookings? Contact the clinic." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const inputCls =
  "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/20";

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="bg-navy-deep">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h1 className="font-display text-4xl font-bold text-primary-foreground">We're here to help</h1>
          <p className="mt-3 max-w-xl text-primary-foreground/70">
            Questions about a service, a booking, or a payment? Send us a message —
            we reply within one business day.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          {[
            { icon: Mail, t: "Email", d: "care@sehaty.example" },
            { icon: Phone, t: "Phone / WhatsApp", d: "+966 5X XXX XXXX" },
            { icon: MapPin, t: "Location", d: "Riyadh, Saudi Arabia (virtual-first)" },
            { icon: Clock3, t: "Support hours", d: "Sun–Thu, 9:00–21:00 (GMT+3)" },
          ].map((c) => (
            <div key={c.t} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint text-accent">
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{c.t}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{c.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 lg:col-span-3">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mint text-accent">
                <Send className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-xl font-bold">Message sent</h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Thank you — we'll get back to you within one business day.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">Full name</label>
                  <input required className={inputCls} placeholder="Your name" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">Email</label>
                  <input required type="email" className={inputCls} placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold">Subject</label>
                <input required className={inputCls} placeholder="e.g. Question about diabetes remission program" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold">Message</label>
                <textarea required rows={5} className={inputCls} placeholder="How can we help?" />
              </div>
              <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-accent-foreground transition-transform hover:scale-[1.02]">
                Send message <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
