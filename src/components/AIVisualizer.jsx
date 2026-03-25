import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, RefreshCcw, Target } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, PresentationControls } from '@react-three/drei';

// Simplified Elevator Model for Visualization
const VirtualLift = ({ type }) => {
  const meshRef = useRef();
  
  // Custom colors based on type
  const colors = {
    residential: '#D4AF37', // Gold
    commercial: '#0070F3', // blue
    hospital: '#10B981', // green
    freight: '#6B7280' // gray
  };

  const color = colors[type] || '#D4AF37';

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Box */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 3.5, 2.5]} />
        <meshStandardMaterial 
          color="#0A1F44" 
          metalness={0.8} 
          roughness={0.2} 
          transparent 
          opacity={0.8}
        />
      </mesh>
      {/* Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.6, 3.6, 2.6]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
      {/* Doors */}
      <mesh position={[0, 0, 1.26]}>
        <planeGeometry args={[1.8, 3.0]} />
        <meshStandardMaterial color={color} metalness={1} roughness={0.1} transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

const AIVisualizer = ({ isOpen, onClose }) => {
  const [stream, setStream] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const scanSpace = () => {
    setIsScanning(true);
    setRecommendation(null);
    
    // Simulate AI Scan Logic
    setTimeout(() => {
      setIsScanning(false);
      const types = [
        { id: 'residential', title: 'Residential Glass Lift', desc: 'Sleek design, energy efficient, perfect for modern homes.' },
        { id: 'commercial', title: 'High-Speed Commercial', desc: 'Large capacity, heavy-duty durability for busy offices.' },
        { id: 'hospital', title: 'Medical Grade Lift', desc: 'Extra wide doors and smooth acceleration for patient care.' }
      ];
      setRecommendation(types[Math.floor(Math.random() * types.length)]);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] bg-black flex flex-col overflow-hidden"
    >
      {/* Camera Feed Backdrop */}
      <div className="absolute inset-0 z-0 bg-neutral-900 flex items-center justify-center">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="w-full h-full object-cover opacity-60 grayscale-[40%]"
        />
        {!stream && (
           <div className="text-white/40 font-mono text-center px-10">
             <p className="text-xl mb-4">WAITING FOR CAMERA ACCESS...</p>
             <p className="text-xs">Please allow camera permissions to use AI Visualizer</p>
           </div>
        )}
      </div>

      {/* 3D Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <PresentationControls
            global
            config={{ mass: 1, tension: 500 }}
            snap={{ mass: 2, tension: 1500 }}
            rotation={[0, 0, 0]}
          >
            <VirtualLift type={recommendation?.id} />
          </PresentationControls>
        </Canvas>
      </div>

      {/* UI Controls */}
      <div className="relative z-20 flex flex-col h-full p-6 md:p-12 justify-between">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="glass p-4 rounded-2xl flex items-center gap-3 backdrop-blur-xl">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="font-mono text-sm tracking-[0.3em] font-bold">AI VISION ENABLED</span>
          </div>
          <button 
            onClick={onClose}
            className="w-14 h-14 glass rounded-full flex items-center justify-center hover:bg-white/20 transition-all border border-white/10"
          >
            <X size={28} />
          </button>
        </div>

        {/* AI HUB / Results */}
        <div className="flex flex-col items-center gap-8 mb-12">
          <AnimatePresence mode="wait">
            {isScanning ? (
              <motion.div 
                key="scanning"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="relative w-32 h-32">
                   <div className="absolute inset-0 border-4 border-accent rounded-full animate-ping opacity-20" />
                   <div className="absolute inset-0 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                </div>
                <p className="font-black text-3xl tracking-[0.2em] italic text-accent drop-shadow-lg">ANALYZING SPACE...</p>
              </motion.div>
            ) : recommendation ? (
              <motion.div 
                key="result"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass-dark p-8 md:p-10 rounded-[3rem] w-full max-w-lg border border-accent/20 shadow-2xl backdrop-blur-2xl"
              >
                <div className="flex items-center gap-4 mb-6 text-accent">
                  <CheckCircle size={32} />
                  <span className="font-black tracking-[0.2em] uppercase italic text-sm">AI MATCH FOUND</span>
                </div>
                <h3 className="text-4xl font-black mb-4 leading-none">{recommendation.title}</h3>
                <p className="text-lg text-white/60 mb-8 leading-relaxed font-medium">
                  {recommendation.desc}
                </p>
                <button className="w-full bg-accent text-primary font-black py-5 rounded-[1.5rem] hover:bg-white transition-all uppercase tracking-widest text-xl shadow-lg shadow-accent/20">
                  GET A QUOTE
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Bottom Bar Controls */}
          <div className="flex items-center gap-6 w-full justify-center">
             {!isScanning && !recommendation && (
               <button 
                onClick={scanSpace}
                className="group flex flex-col items-center gap-4 mt-12"
               >
                 <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center text-primary shadow-[0_0_50px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-all duration-500 pulse-glow">
                   <Target size={40} />
                 </div>
                 <span className="font-black tracking-[0.3em] text-xs uppercase opacity-70">ALIGN AREA & SCAN</span>
               </button>
             )}
             
             {recommendation && (
               <button 
                onClick={() => setRecommendation(null)}
                className="glass px-8 py-4 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-all border border-white/5 active:scale-95"
               >
                 <RefreshCcw size={24} className="text-accent" />
                 <span className="font-black text-sm tracking-widest uppercase">RE-SCAN SPACE</span>
               </button>
             )}
          </div>
        </div>
      </div>

      {/* Futuristic HUD overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full border-[30px] border-accent/5 opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-dashed border-accent/20 rounded-3xl" />
        <div className="absolute bottom-10 left-10 font-mono text-[10px] text-accent/40 space-y-1">
          <p>DEPTH_SENSOR: ACTIVE</p>
          <p>PLANE_DETECTION: MAPPED</p>
          <p>COORD: {Math.random().toFixed(4)}, {Math.random().toFixed(4)}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AIVisualizer;
