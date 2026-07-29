import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  id: string;
  author: string;
  role: string;
  body: string;
  rating: number;
}

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= n ? "text-white" : "text-white/15"}>
          ★
        </span>
      ))}
    </span>
  );
}

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [current, setCurrent] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then(setReviews)
      .catch(() => {});
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (reviews.length <= 1) return;
    timer.current = setInterval(() => {
      setCurrent((c) => (c + 1) % reviews.length);
    }, 6000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [reviews.length]);

  function goTo(i: number) {
    setCurrent(i);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setCurrent((c) => (c + 1) % reviews.length);
    }, 6000);
  }

  if (reviews.length === 0) return null; // Hide section if no reviews yet

  const review = reviews[current];

  return (
    <section id="reviews" className="py-28 px-6 bg-black border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
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

        {/* Carousel */}
        <div className="relative min-h-[260px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              className="text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Stars */}
              <div className="flex justify-center mb-6 text-lg">
                <Stars n={review.rating} />
              </div>

              {/* Quote */}
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light mb-8 italic">
                "{review.body}"
              </p>

              {/* Author */}
              <div>
                <p className="font-semibold text-sm tracking-wide">{review.author}</p>
                {review.role && (
                  <p className="text-white/30 text-xs mt-1 tracking-wide">{review.role}</p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        {reviews.length > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-white w-5" : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
