import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  id: string;
  author: string;
  role: string;
  body: string;
  rating: number;
  createdAt: string;
}

const API = "/api/reviews";

function Stars({ n }: { n: number }) {
  return (
    <span className="text-white/50 text-sm">
      {"★".repeat(n)}{"☆".repeat(5 - n)}
    </span>
  );
}

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("crex_admin"));
  const [authError, setAuthError] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ author: "", role: "", body: "", rating: 5 });
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const storedPw = () => sessionStorage.getItem("crex_admin") ?? "";

  async function fetchReviews() {
    setLoading(true);
    try {
      const res = await fetch(API);
      const data = await res.json();
      setReviews(data);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authed) fetchReviews();
  }, [authed]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    // Validate by attempting a POST with the password (server rejects bad pw with 401)
    const res = await fetch(API + "/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
    });
    if (res.ok) {
      sessionStorage.setItem("crex_admin", password);
      setAuthed(true);
    } else {
      setAuthError("Wrong password.");
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("crex_admin");
    setAuthed(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setSuccessMsg("");
    if (!form.author.trim() || !form.body.trim()) {
      setFormError("Name and review text are required.");
      return;
    }
    setSubmitting(true);
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": storedPw() },
      body: JSON.stringify(form),
    });
    setSubmitting(false);
    if (res.ok) {
      setForm({ author: "", role: "", body: "", rating: 5 });
      setSuccessMsg("Review added!");
      fetchReviews();
    } else {
      setFormError("Failed to add review.");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this review?")) return;
    await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: { "x-admin-password": storedPw() },
    });
    fetchReviews();
  }

  // ── Login screen ────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-8 text-center">
            Crex Admin
          </p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border border-white/10 text-white placeholder-white/25 px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
              autoFocus
            />
            {authError && (
              <p className="text-red-400 text-xs">{authError}</p>
            )}
            <button
              type="submit"
              className="bg-white text-black py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors"
            >
              Enter
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ── Admin dashboard ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reviews</h1>
          <p className="text-white/30 text-sm mt-1">Manage what visitors see on the site</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-white/30 text-xs hover:text-white/60 transition-colors"
        >
          Log out
        </button>
      </div>

      {/* ── Add review form ── */}
      <section className="border border-white/10 p-6 mb-10">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-5">
          Add a Review
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Client name *"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="bg-white/5 border border-white/10 text-white placeholder-white/25 px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors col-span-1"
            />
            <input
              placeholder="Role / Company (optional)"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="bg-white/5 border border-white/10 text-white placeholder-white/25 px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors col-span-1"
            />
          </div>
          <textarea
            placeholder="Review text *"
            rows={4}
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            className="bg-white/5 border border-white/10 text-white placeholder-white/25 px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors resize-none"
          />
          <div className="flex items-center gap-3">
            <span className="text-white/40 text-sm">Rating:</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setForm({ ...form, rating: n })}
                className={`text-xl transition-opacity ${n <= form.rating ? "opacity-100" : "opacity-20"}`}
              >
                ★
              </button>
            ))}
          </div>
          {formError && <p className="text-red-400 text-xs">{formError}</p>}
          {successMsg && <p className="text-green-400 text-xs">{successMsg}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="bg-white text-black py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors disabled:opacity-50 self-start px-8"
          >
            {submitting ? "Adding…" : "Add Review"}
          </button>
        </form>
      </section>

      {/* ── Existing reviews ── */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-5">
          Published Reviews ({reviews.length})
        </h2>
        {loading && <p className="text-white/30 text-sm">Loading…</p>}
        <AnimatePresence>
          {reviews.map((r) => (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="border border-white/10 p-5 mb-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-sm">{r.author}</span>
                    {r.role && <span className="text-white/30 text-xs">{r.role}</span>}
                    <Stars n={r.rating} />
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed">{r.body}</p>
                  <p className="text-white/20 text-xs mt-2">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="text-white/20 hover:text-red-400 transition-colors text-xs shrink-0"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {!loading && reviews.length === 0 && (
          <p className="text-white/20 text-sm">No reviews yet. Add one above.</p>
        )}
      </section>
    </div>
  );
}
