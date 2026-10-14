import { Link } from "@tanstack/react-router";
import { Stethoscope, Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-sidebar-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Stethoscope className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold">
              Sehaty<span className="text-accent">.</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-sidebar-foreground/70">
            A private virtual clinic offering 14 specialized consultation
            services — from nutrition and sleep to diabetes remission — all
            from the comfort of your home.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            Explore
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/services" className="hover:text-accent">Services</Link></li>
            <li><Link to="/about" className="hover:text-accent">About the clinic</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            <li><Link to="/auth" className="hover:text-accent">Patient portal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            Contact
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-sidebar-foreground/80">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> care@sehaty.example</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> +966 5X XXX XXXX</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Riyadh, Saudi Arabia</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-sidebar-border py-5 text-center text-xs text-sidebar-foreground/50">
        © 2026 Sehaty Virtual Clinic. Licensed telehealth provider. Payments secured via mada, Visa & Mastercard.
      </div>
    </footer>
  );
}
