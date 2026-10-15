import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ServiceIcon } from "@/components/service-icon";
import { getService, services, slots, formatSar } from "@/lib/data";
import { CreditCard, Lock, ShieldCheck, Timer, Video } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>): { service: string } => ({
    service: typeof search["service"] === "string" ? (search["service"] as string) : defaultService.slug,
  }),
  head: () => ({
    meta: [
      { title: "Checkout — Health Care Virtual Clinic" },
      { name: "description", content: "Confirm your slot and pay securely with mada, Visa, or Mastercard." },
      { property: "og:title", content: "Checkout — Health Care Virtual Clinic" },
      { property: "og:description", content: "Secure booking checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Checkout,
});

const defaultService = services[0]!;

function Checkout() {
  const { service: slug } = Route.useSearch();
  const service = getService(slug) ?? defaultService;
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("mada");
  const [paid, setPaid] = useState(false);

  if (paid) {
    return (
      <div className="min-h-screen">
        <SiteNav />
        <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-mint text-accent">
            <Video className="h-9 w-9" />
          </span>
          <h1 className="mt-7 font-display text-3xl font-bold">Booking confirmed!</h1>
          <p className="mt-3 max-w-md text-muted-foreground">
            Your <strong className="text-foreground">{service.name}</strong> consultation is booked.
            A confirmation email with your video link is on its way, and you'll get an
            SMS reminder one hour before.
          </p>
          <div className="mt-8 w-full rounded-2xl border border-border bg-card p-6 text-left">
            <p className="text-sm font-semibold text-muted-foreground">Meeting link</p>
            <p className="mt-1 break-all rounded-lg bg-secondary px-3 py-2 font-mono text-sm text-primary">
              https://meet.example.com/health-care-1043
            </p>
          </div>
          <Link
            to="/customer/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
          >
            Go to my dashboard
          </Link>
        </section>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-3xl font-bold">Complete your booking</h1>
        <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Timer className="h-4 w-4 text-accent" />
          Your selected slot is held for 10 minutes while you complete payment.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-5">
          <div className="space-y-8 lg:col-span-3">
            {/* Slot selection */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display font-bold">1. Choose your time</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {slots.map((slot) => (
                  <button
                    key={slot.id}
                    disabled={slot.booked}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`rounded-xl border px-3 py-3 text-left transition-all ${
                      slot.booked
                        ? "cursor-not-allowed border-border bg-secondary/50 text-muted-foreground/50 line-through"
                        : selectedSlot === slot.id
                          ? "border-accent bg-mint ring-2 ring-accent/30"
                          : "border-border bg-card hover:border-accent"
                    }`}
                  >
                    <p className="text-xs font-medium text-muted-foreground">{slot.date}</p>
                    <p className="mt-0.5 font-display font-bold">{slot.time}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display font-bold">2. Payment</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                You'll be redirected to our licensed Saudi payment gateway. No card
                data is stored on this site.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {["mada", "Visa", "Mastercard"].map((m) => (
                  <label key={m} className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3.5 text-sm font-bold transition-colors ${paymentMethod === m ? "border-accent bg-mint ring-2 ring-accent/30" : "border-border hover:border-accent"}`}>
                    <input
                      type="radio"
                      name="pay"
                      value={m}
                      checked={paymentMethod === m}
                      onChange={() => setPaymentMethod(m)}
                      className="sr-only"
                    />
                    <CreditCard className="h-4 w-4 text-accent" /> {m}
                  </label>
                ))}
              </div>
              <button
                disabled={selectedSlot === null}
                onClick={() => setPaid(true)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
              >
                <Lock className="h-4 w-4" /> Pay {formatSar(service.priceSar)} securely
              </button>
              {selectedSlot === null && (
                <p className="mt-2 text-center text-xs text-muted-foreground">Select a time slot above to continue</p>
              )}
            </div>
          </div>

          {/* Order summary */}
          <aside className="h-fit rounded-3xl border border-border bg-card p-7 lg:sticky lg:top-24 lg:col-span-2">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint text-accent">
                <ServiceIcon icon={service.icon} className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display font-bold">{service.name}</p>
                <p className="text-sm text-muted-foreground">{service.durationMin} min · video consultation</p>
              </div>
            </div>
            <div className="mt-6 space-y-2.5 border-t border-border pt-5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Consultation</span><span className="font-semibold">{formatSar(service.priceSar)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">VAT (15%)</span><span className="font-semibold">Included</span></div>
              <div className="flex justify-between border-t border-border pt-3 text-base"><span className="font-bold">Total</span><span className="font-display font-bold text-primary">{formatSar(service.priceSar)}</span></div>
            </div>
            <p className="mt-5 flex items-start gap-2 rounded-xl bg-secondary p-3 text-xs text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              PCI-compliant: all card details are tokenized and processed by the payment gateway only.
            </p>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
