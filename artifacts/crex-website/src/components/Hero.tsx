import React, { useState, useRef, useEffect, useMemo, Component } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import * as THREE from "three";

/** Returns true only when the browser has a working WebGL context. */
function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// ── Error boundary so a WebGL failure doesn't crash the page ─────────────────
class WebGLErrorBoundary extends Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// ── CSS fallback head (when WebGL is unavailable) ─────────────────────────────
function FallbackHead() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        animate={{ rotateY: [-28, 28, -28] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", width: 200, height: 300 }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "8%",
            width: 160,
            height: 180,
            marginLeft: -80,
            background:
              "linear-gradient(145deg,#ebebf0 0%,#c2c8d4 18%,#e4e6ec 34%,#9ea6b4 50%,#cdd0d8 64%,#8b9099 78%,#b8bcc8 100%)",
            borderRadius: "48% 48% 43% 43%/54% 54% 46% 46%",
            boxShadow: "6px 10px 38px rgba(0,0,0,0.75)",
          }}
        />
      </motion.div>
    </div>
  );
}

// ── 3D Character (adapted from uploaded file) ─────────────────────────────────
function Character3D({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y +=
        (mousePosition.x * 0.5 - groupRef.current.rotation.y) * 0.08;
      groupRef.current.rotation.x +=
        (mousePosition.y * 0.3 - groupRef.current.rotation.x) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* Body */}
      <mesh position={[0, -0.5, 0]}>
        <capsuleGeometry args={[0.6, 2, 4, 16]} />
        <meshStandardMaterial color="#111111" metalness={0.15} roughness={0.75} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 0.3, 32]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshStandardMaterial color="#d4a574" metalness={0.0} roughness={0.9} />
      </mesh>

      {/* Hair – top */}
      <mesh position={[0, 1.65, 0]}>
        <sphereGeometry args={[0.52, 64, 64]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Hair – sides */}
      <mesh position={[-0.35, 1.4, -0.1]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.35, 1.4, -0.1]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Beard */}
      <mesh position={[0, 0.8, 0.4]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>

      {/* Left eye */}
      <mesh position={[-0.15, 1.35, 0.48]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[-0.15, 1.35, 0.52]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.15, 1.35, 0.545]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Right eye */}
      <mesh position={[0.15, 1.35, 0.48]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.15, 1.35, 0.52]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.15, 1.35, 0.545]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Eyebrows */}
      <mesh position={[-0.15, 1.5, 0.48]}>
        <boxGeometry args={[0.2, 0.05, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.15, 1.5, 0.48]}>
        <boxGeometry args={[0.2, 0.05, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 1.2, 0.48]}>
        <coneGeometry args={[0.08, 0.25, 16]} />
        <meshStandardMaterial color="#c99563" />
      </mesh>

      {/* Shoulders */}
      <mesh position={[-0.7, 0.3, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      <mesh position={[0.7, 0.3, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Arms */}
      <mesh position={[-1.1, -0.2, 0]}>
        <capsuleGeometry args={[0.2, 0.8, 4, 16]} />
        <meshStandardMaterial color="#c99563" />
      </mesh>
      <mesh position={[1.1, -0.2, 0]}>
        <capsuleGeometry args={[0.2, 0.8, 4, 16]} />
        <meshStandardMaterial color="#c99563" />
      </mesh>

      {/* White/silver accent panels (replace yellow from original) */}
      <mesh position={[0.8, 0.5, -1]}>
        <boxGeometry args={[1.5, 2, 0.1]} />
        <meshStandardMaterial
          color="#e0e0e8"
          emissive="#888899"
          emissiveIntensity={0.15}
          transparent
          opacity={0.18}
        />
      </mesh>
      <mesh position={[0.6, -0.5, -0.9]}>
        <boxGeometry args={[1.2, 1.5, 0.1]} />
        <meshStandardMaterial
          color="#ccccdd"
          emissive="#6666aa"
          emissiveIntensity={0.1}
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}

// ── Three.js Canvas wrapper ────────────────────────────────────────────────────
function Hero3DCanvas({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 48 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 6, 5]} intensity={1.4} />
      <directionalLight position={[-4, -3, 4]} intensity={0.5} color="#aabbff" />
      <pointLight position={[0, 0, 3]} intensity={0.4} color="#ffffff" />
      <Character3D mousePosition={mousePosition} />
      <fog attach="fog" args={["#000000", 5, 14]} />
    </Canvas>
  );
}

// ── Main Hero Export ──────────────────────────────────────────────────────────
export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const hasWebGL = useMemo(() => supportsWebGL(), []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePosition({ x, y });
    };
    const handleMouseLeave = () => setMousePosition({ x: 0, y: 0 });

    window.addEventListener("mousemove", handleMouseMove);
    containerRef.current?.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[100dvh] bg-black overflow-hidden pt-20"
    >
      {/* Subtle radial gradient backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 72% 55%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 min-h-[calc(100dvh-80px)] grid grid-cols-1 lg:grid-cols-2 gap-6 items-center py-12">
        {/* ── Left: Text ── */}
        <div className="relative z-10 flex flex-col justify-center">
          <motion.p
            className="text-white/40 text-xs font-mono uppercase tracking-widest mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Professional Website Development
          </motion.p>

          <motion.h1
            className="font-heading text-5xl md:text-6xl xl:text-7xl font-bold tracking-tighter text-white leading-[1.05] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Build Your Online
            <br />
            <span className="text-white/70">Presence</span> with
            <br />
            Crex
          </motion.h1>

          <motion.p
            className="text-gray-400 text-lg leading-relaxed max-w-md mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            We create modern websites that help businesses grow online — clean, fast, and built to impress.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.button
              onClick={scrollToContact}
              className="bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-all duration-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Get Started
            </motion.button>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-white/50 text-sm font-medium hover:text-white transition-colors tracking-wide"
            >
              View Services →
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex gap-10 mt-14 pt-10 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {[
              { label: "Websites Built", value: "10+" },
              { label: "Happy Clients", value: "10+" },
              { label: "Delivery", value: "1–2 wks" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-heading text-2xl font-bold text-white tracking-tight">{s.value}</p>
                <p className="text-white/35 text-xs font-mono uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: 3D Character ── */}
        <motion.div
          className="relative h-[520px] lg:h-[640px] rounded-sm overflow-hidden"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {hasWebGL ? (
            <WebGLErrorBoundary fallback={<FallbackHead />}>
              <React.Suspense fallback={<FallbackHead />}>
                <Hero3DCanvas mousePosition={mousePosition} />
              </React.Suspense>
            </WebGLErrorBoundary>
          ) : (
            <FallbackHead />
          )}

          {/* "Move cursor" hint — only shown when 3D is active */}
          {hasWebGL && (
            <motion.div
              className="absolute bottom-5 right-5 text-[10px] text-white/30 font-mono uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-2 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Move cursor to rotate →
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <span className="text-[9px] uppercase tracking-widest font-mono">Scroll</span>
        <motion.div
          className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent origin-top"
          animate={{ scaleY: [0, 1, 0], translateY: [0, 8, 18] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
