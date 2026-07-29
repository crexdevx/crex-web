import { motion } from "framer-motion";

/**
 * ─── HOW TO ADD YOUR VIDEO ───────────────────────────────────────────────────
 * 1. Upload your video file (MP4 recommended) to the `public/` folder inside
 *    this artifact:  artifacts/crex-website/public/hero-video.mp4
 * 2. Change the `VIDEO_SRC` value below to "/hero-video.mp4"
 * 3. The placeholder box will disappear and your real video will play.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const VIDEO_SRC = "/hero-video.mp4";

export function Hero() {
  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* ── Video / Placeholder background ── */}
      <div className="absolute inset-0 z-0">
        {VIDEO_SRC ? (
          <video
            src={VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          /* Placeholder shown until you add your video */
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 border border-dashed border-white/10 m-6 rounded-sm">
            {/* Animated shimmer lines to hint at a video feel */}
            <div className="relative w-full h-full overflow-hidden opacity-20">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  style={{ top: `${15 + i * 14}%` }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 3.5 + i * 0.4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
            <div className="absolute flex flex-col items-center gap-3 text-center px-6">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-white/25"
              >
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <polygon points="10,8 16,12 10,16" fill="currentColor" />
              </svg>
              <p className="text-white/20 text-xs font-mono uppercase tracking-widest">
                Hero Video — Upload your video file
              </p>
              <p className="text-white/12 text-[10px] font-mono text-white/15">
                Add your MP4 to public/hero-video.mp4, then set VIDEO_SRC in Hero.tsx
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Dark overlay so text is always readable ── */}
      <div className="absolute inset-0 z-10 bg-black/55 pointer-events-none" />

      {/* ── Hero text ── */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        <motion.span
          className="text-white/40 text-xs font-mono uppercase tracking-widest mb-6 block"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Professional Website Development
        </motion.span>

        <motion.h1
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.05] mb-6"
          style={{ textShadow: "0 2px 30px rgba(0,0,0,0.6)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Build Your Online
          <br />
          Presence with Crex
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed"
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.7)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.38 }}
        >
          We create modern websites that help businesses grow online — clean,
          fast, and built to impress.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.52 }}
        >
          <motion.button
            onClick={scrollToContact}
            className="bg-white text-black px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-all duration-300"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Get Started
          </motion.button>
          <button
            onClick={() =>
              document
                .querySelector("#services")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-white/55 text-sm font-medium hover:text-white transition-colors tracking-wide"
          >
            View Services →
          </button>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[9px] uppercase tracking-widest font-mono">
          Scroll
        </span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent origin-top"
          animate={{ scaleY: [0, 1, 0], translateY: [0, 8, 18] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
