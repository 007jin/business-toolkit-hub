import Link from "next/link";

export default function SignupPage() {
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

          <form className="space-y-6">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email address</span>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Create password</span>
              <input
                type="password"
                placeholder="Create a secure password"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10"
              />
            </label>

            <button
              type="button"
              className="w-full rounded-full bg-[var(--color-primary)] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)]"
            >
              Create account
            </button>
          </form>

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
