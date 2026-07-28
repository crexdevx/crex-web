import { motion } from "framer-motion";

function SilverHead() {
  const rings = [
    { w: 320, h: 110, opacity: 0.55, dur: 3.0, delay: 0.0, offsetY: -10 },
    { w: 390, h: 135, opacity: 0.44, dur: 3.4, delay: 0.3, offsetY:  -4 },
    { w: 460, h: 158, opacity: 0.34, dur: 3.8, delay: 0.6, offsetY:   4 },
    { w: 530, h: 182, opacity: 0.24, dur: 4.3, delay: 0.9, offsetY:  10 },
    { w: 600, h: 206, opacity: 0.15, dur: 4.8, delay: 1.2, offsetY:  16 },
  ];

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
      {/* Subtle radial glow behind the head */}
      <div
        className="absolute rounded-full"
        style={{
          width: 480,
          height: 480,
          background: "radial-gradient(circle, rgba(180,190,210,0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -58%)",
        }}
      />

      {/* 3D perspective container */}
      <div style={{ perspective: "700px", perspectiveOrigin: "50% 42%" }}>
        <motion.div
          animate={{ rotateY: [-30, 30, -30] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            transformStyle: "preserve-3d",
            position: "relative",
            width: 260,
            height: 420,
          }}
        >
          {/* ── Wave rings (horizontal halos around the head) ── */}
          {rings.map((ring, i) => (
            <motion.div
              key={i}
              animate={{ y: [ring.offsetY, -ring.offsetY, ring.offsetY] }}
              transition={{ duration: ring.dur, repeat: Infinity, ease: "easeInOut", delay: ring.delay }}
              style={{
                position: "absolute",
                left: "50%",
                top: "46%",
                width: ring.w,
                height: ring.h,
                marginLeft: -(ring.w / 2),
                marginTop: -(ring.h / 2),
                border: `1px solid rgba(192, 198, 220, ${ring.opacity})`,
                borderRadius: "50%",
                boxShadow: `0 0 ${6 - i}px rgba(210,215,235,${ring.opacity * 0.6})`,
              }}
            />
          ))}

          {/* ── Cranium ── */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "4%",
              width: 190,
              height: 215,
              marginLeft: -95,
              background: `
                radial-gradient(ellipse at 32% 28%, rgba(255,255,255,0.55) 0%, transparent 45%),
                linear-gradient(145deg,
                  #ebebf0 0%,
                  #c2c8d4 18%,
                  #e4e6ec 34%,
                  #9ea6b4 50%,
                  #cdd0d8 64%,
                  #8b9099 78%,
                  #b8bcc8 100%
                )
              `,
              borderRadius: "48% 48% 43% 43% / 54% 54% 46% 46%",
              boxShadow: "6px 10px 38px rgba(0,0,0,0.75), inset 2px 2px 6px rgba(255,255,255,0.25), inset -2px -3px 8px rgba(0,0,0,0.3)",
            }}
          />

          {/* ── Ear (left side visible on rotation) ── */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "28%",
              width: 24,
              height: 36,
              marginLeft: -107,
              background: "linear-gradient(90deg, #8b9099 0%, #c2c8d4 60%, #9ea6b4 100%)",
              borderRadius: "50% 30% 35% 50% / 50% 50% 50% 50%",
              boxShadow: "2px 2px 6px rgba(0,0,0,0.5)",
            }}
          />
          {/* Ear right */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "28%",
              width: 24,
              height: 36,
              marginLeft: 83,
              background: "linear-gradient(270deg, #8b9099 0%, #c2c8d4 60%, #9ea6b4 100%)",
              borderRadius: "30% 50% 50% 35% / 50% 50% 50% 50%",
              boxShadow: "-2px 2px 6px rgba(0,0,0,0.5)",
            }}
          />

          {/* ── Jaw / lower face taper ── */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "44%",
              width: 148,
              height: 120,
              marginLeft: -74,
              background: `
                linear-gradient(160deg,
                  #d0d4dc 0%,
                  #9ea6b4 30%,
                  #c8ccd4 55%,
                  #8b9099 75%,
                  #b0b4bc 100%
                )
              `,
              borderRadius: "45% 45% 50% 50% / 30% 30% 55% 55%",
              boxShadow: "0 8px 20px rgba(0,0,0,0.6)",
            }}
          />

          {/* ── Neck ── */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "72%",
              width: 62,
              height: 72,
              marginLeft: -31,
              background: "linear-gradient(180deg, #b0b4bc 0%, #8b9099 50%, #9ea6b4 100%)",
              borderRadius: "6px 6px 10px 10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.55)",
            }}
          />

          {/* ── Shoulders ── */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "86%",
              width: 240,
              height: 54,
              marginLeft: -120,
              background: "linear-gradient(180deg, #9ea6b4 0%, #7a8090 60%, #868c98 100%)",
              borderRadius: "55% 55% 0 0 / 85% 85% 0 0",
              boxShadow: "0 6px 18px rgba(0,0,0,0.6)",
            }}
          />

          {/* ── Specular highlight (glossy white sheen across cranium) ── */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "5%",
              width: 90,
              height: 80,
              marginLeft: -65,
              background: "radial-gradient(ellipse at 40% 30%, rgba(255,255,255,0.38) 0%, transparent 70%)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export function Hero() {
  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 bg-black"
    >
      {/* 3D Silver Head */}
      <SilverHead />

      {/* Bottom gradient so text reads clearly */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/70" />

      {/* Hero Text */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">
        <motion.h1
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 leading-[1.1] max-w-5xl"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.8)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Build Your Online Presence with Crex
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl font-light tracking-wide leading-relaxed"
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.7)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          We create modern websites that help businesses grow online.
        </motion.p>

        <motion.button
          onClick={handleScroll}
          className="bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-widest font-mono">Scroll</span>
        <motion.div
          className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent origin-top"
          animate={{ scaleY: [0, 1, 0], translateY: [0, 10, 20] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
