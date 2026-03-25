import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, RefreshCcw, Target, AlertTriangle } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, PresentationControls } from '@react-three/drei';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Simplified Elevator Model for Visualization
const VirtualLift = ({ type }) => {
  const meshRef = useRef();
  
  const colors = {
    residential: '#D4AF37', // Gold
    commercial: '#0070F3', // Blue
    hospital: '#10B981', // Green
  };

  const color = colors[type] || '#D4AF37';

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 3.5, 2.5]} />
        <meshStandardMaterial color="#0A1F44" metalness={0.8} roughness={0.2} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.6, 3.6, 2.6]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
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
  const [detailedError, setDetailedError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
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
        video: { facingMode: 'environment', width: 1280, height: 720 } 
      });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch (err) {
      console.error("Camera access denied:", err);
      setError("CAMERA_PERMISSION_DENIED");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const scanSpace = async () => {
    if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
      setError("MISSING_API_KEY");
      return;
    }

    setIsScanning(true);
    setRecommendation(null);
    setError(null);
    setDetailedError(null);
    setPreviewImage(null);

    try {
      if (!videoRef.current || videoRef.current.videoWidth === 0) {
        throw new Error("Camera not ready. Please wait a moment.");
      }

      // Capture Frame
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setPreviewImage(dataUrl);
      const base64Image = dataUrl.split(',')[1];

      // Gemini Vision API Call
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `Analyze this room/space for elevator installation. 
      Determine if it is 'residential', 'commercial', or 'hospital'.
      Provide a specific product title and a professional 2-sentence description of why this lift fits.
      
      IMPORTANT: Return ONLY a raw JSON object with this structure:
      {
        "type": "residential" | "commercial" | "hospital",
        "title": "Product Name Here",
        "desc": "Analysis description here"
      }
      Do not include any other text, markdown blocks, or explanations outside the JSON.`;

      const result = await model.generateContent([
        prompt,
        { inlineData: { data: base64Image, mimeType: "image/jpeg" } }
      ]);
      
      const response = await result.response;
      const rawText = response.text();
      console.log("Gemini Raw Response:", rawText);

      // Robust extraction of JSON
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("AI returned invalid data format. Check console for raw response.");
      }
      
      const data = JSON.parse(jsonMatch[0]);
      setRecommendation(data);
    } catch (err) {
      console.error("Gemini Scan Error:", err);
      setError("AI_SCAN_FAILED");
      setDetailedError(err.message);
    } finally {
      setIsScanning(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] bg-black flex flex-col overflow-hidden"
    >
      {/* HUD Header */}
      <div className="absolute top-0 left-0 right-0 z-30 p-6 md:p-10 flex justify-between items-start pointer-events-none">
        <div className="glass p-4 rounded-2xl flex items-center gap-3 backdrop-blur-xl pointer-events-auto">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <span className="font-mono text-xs md:text-sm tracking-[0.3em] font-bold">GEMINI AI VISION</span>
        </div>
        <button 
          onClick={onClose}
          className="w-14 h-14 glass rounded-full flex items-center justify-center hover:bg-white/20 transition-all border border-white/10 pointer-events-auto"
        >
          <X size={28} />
        </button>
      </div>

      {/* Camera Feed */}
      <div className="absolute inset-0 z-0 bg-neutral-900 flex items-center justify-center">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="w-full h-full object-cover"
        />
        {!stream && !error && (
           <div className="text-accent/50 font-mono text-center animate-pulse">
             <p className="text-xl">INITIATING CAMERA...</p>
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
            <VirtualLift type={recommendation?.type} />
          </PresentationControls>
        </Canvas>
      </div>

      {/* Main UI Layer */}
      <div className="relative z-20 flex flex-col h-full items-center justify-center p-6 text-center">
        <AnimatePresence mode="wait">
          {error ? (
            <motion.div 
              key="error"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass px-8 py-10 rounded-3xl max-w-sm border-red-500/30"
            >
              <AlertTriangle className="text-red-500 mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-2">SCAN ERROR</h3>
              <p className="text-white/60 mb-6 italic">
                {error === "MISSING_API_KEY" ? "Please provide a valid Gemini API Key in .env file." : 
                 error === "AI_SCAN_FAILED" ? "AI failed to analyze the space. Try again with better lighting." : 
                 "Could not access camera feed."}
              </p>
              {detailedError && (
                <p className="text-red-400 text-xs font-mono mb-6 break-words uppercase">
                  ERROR: {detailedError}
                </p>
              )}
              {previewImage && (
                <div className="mb-6 rounded-xl overflow-hidden border border-white/10">
                  <p className="text-[10px] text-white/40 mb-1">LAST CAPTURED FRAME:</p>
                  <img src={previewImage} alt="Captured" className="w-full h-32 object-cover opacity-50 grayscale" />
                </div>
              )}
              <button onClick={() => window.location.reload()} className="text-accent underline font-bold">RELOAD APP</button>
            </motion.div>
          ) : isScanning ? (
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
              <p className="font-black text-3xl tracking-[0.2em] italic text-accent drop-shadow-2xl">SCANNING WITH GEMINI AI...</p>
            </motion.div>
          ) : recommendation ? (
            <motion.div 
              key="result"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-20 glass-dark p-8 md:p-10 rounded-[3rem] w-full max-w-lg border border-accent/20 shadow-2xl backdrop-blur-3xl"
            >
              <div className="flex items-center gap-4 mb-4 text-accent">
                <CheckCircle size={32} />
                <span className="font-black tracking-[0.2em] uppercase italic text-sm">REAL-TIME AI MATCH</span>
              </div>
              <h3 className="text-4xl font-black mb-4 leading-none">{recommendation.title}</h3>
              <p className="text-lg text-white/70 mb-8 leading-relaxed font-medium line-clamp-3">
                {recommendation.desc}
              </p>
              <div className="flex gap-4">
                <button className="flex-1 bg-accent text-primary font-black py-5 rounded-2xl hover:bg-white transition-all uppercase tracking-widest text-xl">
                  ENQUIRE NOW
                </button>
                <button 
                  onClick={() => setRecommendation(null)}
                  className="w-20 glass flex items-center justify-center rounded-2xl hover:bg-white/10"
                >
                  <RefreshCcw size={24} />
                </button>
              </div>
            </motion.div>
          ) : (
            <button 
              onClick={scanSpace}
              className="group flex flex-col items-center gap-4 mt-auto mb-20"
            >
              <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center text-primary shadow-[0_0_50px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-all duration-500 pulse-glow">
                <Target size={40} />
              </div>
              <span className="font-black tracking-[0.3em] text-xs uppercase opacity-70">ANALYZE SPACE WITH AI</span>
            </button>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full border-[30px] border-white/5 opacity-10" />
        <div className="absolute bottom-10 left-10 font-mono text-[10px] text-accent/40 space-y-1 bg-black/20 p-2 rounded">
          <p>ENGINE: GEMINI-1.5-FLASH</p>
          <p>OBJECT_DETECTION: ON</p>
          <p>COORD: {Math.random().toFixed(4)}, {Math.random().toFixed(4)}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AIVisualizer;
