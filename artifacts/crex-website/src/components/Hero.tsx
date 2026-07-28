import { motion } from "framer-motion";
import { Video } from "lucide-react";

export function Hero() {
  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
      {/* Video Placeholder Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        
        {/* Animated background to simulate video feel */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{ 
            background: [
              "radial-gradient(circle at 0% 0%, #333 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, #333 0%, transparent 50%)",
              "radial-gradient(circle at 0% 100%, #333 0%, transparent 50%)",
              "radial-gradient(circle at 100% 0%, #333 0%, transparent 50%)",
              "radial-gradient(circle at 0% 0%, #333 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20 z-0 border border-white/5 m-4 rounded-xl overflow-hidden bg-white/[0.02]">
          <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')]"></div>
          <Video className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-sm font-mono tracking-widest uppercase opacity-70 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            [ Hero Video — Replace with your video file ]
          </p>
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">
        <motion.h1 
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 leading-[1.1] max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Build Your Online Presence with Crex
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-2xl text-gray-400 mb-10 max-w-2xl font-light tracking-wide leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          We create modern websites that help businesses grow online.
        </motion.p>
        
        <motion.button
          onClick={handleScroll}
          className="bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-all duration-300 transform hover:scale-[1.02]"
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
