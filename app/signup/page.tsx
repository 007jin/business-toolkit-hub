"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSignup = async () => {
    setMessage(null);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      setMessage("Account created — check your email for a verification link.");
      if (data.previewUrl) setPreviewUrl(data.previewUrl);
    } catch (e: any) {
      setMessage(e.message || "Signup failed");
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-[2rem] border border-slate-200 shadow-xl p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)] mb-4">
            Unlock premium tools
          </p>
          <h1 className="text-4xl font-bold text-[var(--color-text)] mb-4">
            Create your account
          </h1>
          <p className="text-[var(--color-subtext)] mb-10 leading-7">
            Sign up now and be first in line for premium business tools, saved calculations, and faster access.
          </p>

          <div className="space-y-6">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email address</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Create password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a secure password"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10"
              />
            </label>

            <button
              type="button"
              onClick={handleSignup}
              className="w-full rounded-full bg-[var(--color-primary)] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)]"
            >
              Create account
            </button>
          </div>

          {message && (
            <p className="mt-6 text-sm text-[var(--color-subtext)]">{message}</p>
          )}

          {previewUrl && (
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-700">Email preview (dev):</p>
              <a href={previewUrl} target="_blank" rel="noreferrer" className="text-sm text-[var(--color-primary)] underline">
                Open email preview
              </a>
            </div>
          )}

          <p className="mt-8 text-sm text-[var(--color-subtext)]">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-[var(--color-primary)] hover:underline">
              Sign in
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
