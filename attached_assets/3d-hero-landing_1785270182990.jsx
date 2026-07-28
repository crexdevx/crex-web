import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// 3D Character Component
function Character3D({ mousePosition }) {
  const groupRef = useRef(null);
  const headRef = useRef(null);
  const bodyRef = useRef(null);

  useFrame(() => {
    if (groupRef.current) {
      // Smooth rotation based on mouse position
      groupRef.current.rotation.y = mousePosition.x * 0.5;
      groupRef.current.rotation.x = mousePosition.y * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Body - Black Shirt */}
      <mesh ref={bodyRef} position={[0, -0.5, 0]}>
        <capsuleGeometry args={[0.6, 2, 4, 16]} />
        <meshStandardMaterial color="#000000" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 0.3, 32]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>

      {/* Head */}
      <mesh ref={headRef} position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshStandardMaterial color="#d4a574" metalness={0.0} roughness={0.9} />
      </mesh>

      {/* Hair - Top */}
      <mesh position={[0, 1.65, 0]}>
        <sphereGeometry args={[0.52, 64, 64]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Hair - Sides and back for volume */}
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

      {/* Left Eye */}
      <mesh position={[-0.15, 1.35, 0.48]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Left Eye White */}
      <mesh position={[-0.15, 1.35, 0.52]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Left Pupil */}
      <mesh position={[-0.15, 1.35, 0.545]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Right Eye */}
      <mesh position={[0.15, 1.35, 0.48]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Right Eye White */}
      <mesh position={[0.15, 1.35, 0.52]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Right Pupil */}
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

      {/* Left Shoulder */}
      <mesh position={[-0.7, 0.3, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Right Shoulder */}
      <mesh position={[0.7, 0.3, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-1.1, -0.2, 0]}>
        <capsuleGeometry args={[0.2, 0.8, 4, 16]} />
        <meshStandardMaterial color="#c99563" />
      </mesh>

      {/* Right Arm */}
      <mesh position={[1.1, -0.2, 0]}>
        <capsuleGeometry args={[0.2, 0.8, 4, 16]} />
        <meshStandardMaterial color="#c99563" />
      </mesh>

      {/* Yellow Accent Background Brushstroke - Large */}
      <mesh position={[0.8, 0.5, -1]}>
        <boxGeometry args={[1.5, 2, 0.1]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.3} />
      </mesh>

      {/* Yellow Accent - Medium */}
      <mesh position={[0.6, -0.5, -0.9]}>
        <boxGeometry args={[1.2, 1.5, 0.1]} />
        <meshStandardMaterial color="#fcd34d" emissive="#fcd34d" emissiveIntensity={0.2} opacity={0.8} transparent />
      </mesh>

      {/* Light Yellow Accent - Soft */}
      <mesh position={[0.4, -1.2, -0.8]}>
        <boxGeometry args={[1, 1, 0.1]} />
        <meshStandardMaterial color="#fef3c7" emissive="#fef3c7" emissiveIntensity={0.1} opacity={0.6} transparent />
      </mesh>
    </group>
  );
}

// 3D Canvas Component
function Hero3DCanvas({ mousePosition }) {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, -5, 5]} intensity={0.4} />
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#fbbf24" />
      
      <Character3D mousePosition={mousePosition} />
      
      <fog attach="fog" args={['#f9fafb', 2, 8]} />
    </Canvas>
  );
}

// Main Component
export default function Hero3DLanding() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      setMousePosition({ x: x * 2, y: -y * 2 });
    };

    const handleTouchMove = (e) => {
      if (!containerRef.current || e.touches.length === 0) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.touches[0].clientX - rect.left) / rect.width - 0.5;
      const y = (e.touches[0].clientY - rect.top) / rect.height - 0.5;

      setMousePosition({ x: x * 2, y: -y * 2 });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    containerRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-yellow-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold">
          <span className="text-black">∆</span>
          <span className="text-yellow-400">4</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <a href="#" className="hover:text-black transition">HOME</a>
          <a href="#" className="hover:text-black transition">SERVICES</a>
          <a href="#" className="hover:text-black transition">GALLERY</a>
          <a href="#" className="hover:text-black transition">ABOUT US</a>
          <a href="#" className="hover:text-black transition">CONTACT</a>
        </div>
        <button className="px-6 py-2 bg-black text-yellow-400 rounded-full text-sm font-bold hover:bg-gray-900 transition">
          BOOK APPOINTMENT →
        </button>
      </nav>

      {/* Hero Section */}
      <div
        ref={containerRef}
        className="grid grid-cols-2 gap-8 items-center px-8 py-12 max-w-7xl mx-auto min-h-[calc(100vh-120px)]"
      >
        {/* Left Content */}
        <div className="z-10">
          <p className="text-gray-600 text-sm font-medium mb-4">
            DEFINE YOUR <span className="text-yellow-400 font-bold">STYLE</span>. OWN YOUR <span className="text-yellow-400 font-bold">LOOK.</span>
          </p>

          <h1 className="text-6xl font-black mb-6 leading-tight text-black">
            STYLE THAT
            <br />
            <span className="text-yellow-400">SPEAKS</span> YOU
          </h1>

          <p className="text-gray-600 text-lg mb-8 max-w-sm">
            Premium grooming, haircuts & styling for the modern man.
          </p>

          <div className="flex items-center gap-6 mb-16">
            <button className="px-6 py-3 bg-black text-yellow-400 rounded-full font-bold text-sm hover:bg-gray-900 transition">
              BOOK YOUR STYLE →
            </button>
            <button className="flex items-center gap-2 text-black font-bold hover:gap-3 transition">
              ▶ WATCH OUR WORK
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-3xl mb-2">✂️</div>
              <p className="font-bold text-sm text-black">EXPERT BARBERS</p>
              <p className="text-xs text-gray-600">Skilled professionals for your best look</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🧴</div>
              <p className="font-bold text-sm text-black">PREMIUM PRODUCTS</p>
              <p className="text-xs text-gray-600">Top quality products for healthy hair</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <p className="font-bold text-sm text-black">HYGIENE FIRST</p>
              <p className="text-xs text-gray-600">Clean tools safe environment</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⏱️</div>
              <p className="font-bold text-sm text-black">ON TIME</p>
              <p className="text-xs text-gray-600">Your time is our priority</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-12 text-gray-600">
            <span className="text-sm font-bold">FOLLOW US</span>
            <a href="#" className="hover:text-black transition">📷</a>
            <a href="#" className="hover:text-black transition">f</a>
            <a href="#" className="hover:text-black transition">𝕏</a>
          </div>
        </div>

        {/* Right - 3D Character */}
        <div className="relative h-[600px] rounded-lg overflow-hidden bg-gradient-to-b from-yellow-100/20 to-transparent">
          <Hero3DCanvas mousePosition={mousePosition} />
          
          {/* Helper Text */}
          <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-white/50 px-3 py-2 rounded-full backdrop-blur">
            Move your cursor to rotate →
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .grid-cols-2 {
            grid-template-columns: 1fr;
          }
          
          h1 {
            font-size: 3rem;
          }
        }
      `}</style>
    </div>
  );
}