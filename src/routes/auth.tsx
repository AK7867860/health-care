import { createFileRoute, Link } from "@tanstack/react-router";
import { Stethoscope, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Sehaty Virtual Clinic" },
      { name: "description", content: "Sign in or create your Sehaty patient account to book consultations and manage appointments." },
      { property: "og:title", content: "Sign in — Sehaty Virtual Clinic" },
      { property: "og:description", content: "Access your patient portal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Auth,
});

const inputCls =
  "w-full rounded-xl border border-input bg-card py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/20";

function Auth() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="relative hidden w-1/2 overflow-hidden bg-navy-deep lg:block">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Stethoscope className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold text-primary-foreground">Sehaty<span className="text-accent">.</span></span>
          </Link>
          <div>
            <h1 className="font-display text-4xl font-bold leading-tight text-primary-foreground">
              Your health journey continues here
            </h1>
            <p className="mt-4 max-w-md text-primary-foreground/70">
              Sign in to book consultations, join your video calls, and track your
              progress across all 14 services.
            </p>
          </div>
          <p className="text-xs text-primary-foreground/40">Secure JWT sessions · bcrypt-protected credentials</p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Stethoscope className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold">Sehaty<span className="text-accent">.</span></span>
          </Link>

          <div className="grid grid-cols-2 gap-1 rounded-xl bg-secondary p-1">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-lg py-2.5 text-sm font-semibold transition-colors ${
                  mode === m ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                {m === "login" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          <h2 className="mt-8 font-display text-2xl font-bold">
            {mode === "login" ? "Welcome back" : "Create your patient account"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login"
              ? "Sign in to manage your bookings and join consultations."
              : "Takes less than a minute — then you can book right away."}
          </p>

          <form className="mt-7 space-y-4" onSubmit={(e) => e.preventDefault()}>
            {mode === "signup" && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input required className={inputCls} placeholder="Full name" />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input required type="email" className={inputCls} placeholder="Email address" />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input required type="password" className={inputCls} placeholder="Password" />
            </div>

            {mode === "login" && (
              <div className="text-right">
                <button type="button" className="text-sm font-medium text-primary hover:text-accent">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-transform hover:scale-[1.01]"
            >
              {mode === "login" ? "Sign in" : "Create account"} <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By continuing you agree to our terms and privacy policy. Your data is
            handled per Saudi healthcare regulations.
          </p>
        </div>
      </div>
    </div>
  );
}
