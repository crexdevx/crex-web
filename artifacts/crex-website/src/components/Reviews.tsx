import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  id: string;
  author: string;
  role: string;
  body: string;
  rating: number;
}

function Stars({ n, interactive = false, onSet }: { n: number; interactive?: boolean; onSet?: (v: number) => void }) {
  return (
    <span className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type={interactive ? "button" : undefined}
          onClick={interactive && onSet ? () => onSet(i) : undefined}
          className={`text-lg transition-opacity ${interactive ? "cursor-pointer hover:opacity-80" : "cursor-default"} ${i <= n ? "text-white" : "text-white/15"}`}
        >
          ★
        </button>
      ))}
    </span>
  );
}

// ── Public carousel ──────────────────────────────────────────────────────────
function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const [current, setCurrent] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (reviews.length <= 1) return;
    timer.current = setInterval(() => setCurrent((c) => (c + 1) % reviews.length), 6000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [reviews.length]);

  function goTo(i: number) {
    setCurrent(i);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setCurrent((c) => (c + 1) % reviews.length), 6000);
  }

  const review = reviews[current];

  return (
    <div>
      <div className="relative min-h-[240px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={review.id}
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex justify-center mb-6">
              <Stars n={review.rating} />
            </div>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light mb-8 italic">
              "{review.body}"
            </p>
            <div>
              <p className="font-semibold text-sm tracking-wide">{review.author}</p>
              {review.role && (
                <p className="text-white/30 text-xs mt-1 tracking-wide">{review.role}</p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {reviews.length > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-white w-5" : "bg-white/20 w-1.5 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Public "Write a Review" form ──────────────────────────────────────────────
function WriteReviewForm({ onSubmitted }: { onSubmitted: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ author: "", role: "", body: "", rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.author.trim() || !form.body.trim()) {
      setError("Please fill in your name and review.");
      return;
    }
    setSubmitting(true);
    const res = await fetch("/api/reviews/public", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSubmitting(false);
    if (res.ok) {
      setDone(true);
      onSubmitted();
    } else {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <motion.div
      className="mt-16 border-t border-white/10 pt-14"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="text-center mb-8">
        <p className="text-white/40 text-sm tracking-wide mb-3">
          Worked with us?
        </p>
        <button
          onClick={() => setOpen((o) => !o)}
          className="text-white font-semibold text-lg hover:opacity-70 transition-opacity underline underline-offset-4 decoration-white/30"
        >
          {open ? "Cancel" : "Leave a Review →"}
        </button>
      </div>

      <AnimatePresence>
        {open && !done && (
          <motion.form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto flex flex-col gap-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="Your name *"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="bg-white/5 border border-white/10 text-white placeholder-white/25 px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
              />
              <input
                placeholder="Role / Company (optional)"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="bg-white/5 border border-white/10 text-white placeholder-white/25 px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <textarea
              placeholder="Your experience with Crex *"
              rows={4}
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              className="bg-white/5 border border-white/10 text-white placeholder-white/25 px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors resize-none"
            />
            <div className="flex items-center gap-3">
              <span className="text-white/40 text-sm">Rating:</span>
              <Stars n={form.rating} interactive onSet={(v) => setForm({ ...form, rating: v })} />
            </div>
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="bg-white text-black py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {submitting ? "Submitting…" : "Submit Review"}
            </button>
          </motion.form>
        )}

        {done && (
          <motion.p
            className="text-center text-white/60 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Thank you! Your review has been published.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main section export ───────────────────────────────────────────────────────
export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  function load() {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then(setReviews)
      .catch(() => {});
  }

  useEffect(() => { load(); }, []);

  if (reviews.length === 0) return (
    /* Still show the "leave a review" form even when empty */
    <section id="reviews" className="py-20 px-6 bg-black border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <WriteReviewForm onSubmitted={load} />
      </div>
    </section>
  );

  return (
    <section id="reviews" className="py-28 px-6 bg-black border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-white/25 text-xs font-mono uppercase tracking-widest block mb-3">
            What clients say
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Reviews</h2>
        </motion.div>

        <ReviewCarousel reviews={reviews} />
        <WriteReviewForm onSubmitted={load} />
      </div>
    </section>
  );
}
