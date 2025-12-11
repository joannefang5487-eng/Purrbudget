import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CatMood, CatStage, CatId, HatId } from '../types';

interface ThreeDCatProps {
  stage: CatStage;
  mood: CatMood;
  catId: CatId;
  hatId: HatId;
  onClick?: () => void;
}

export const ThreeDCat: React.FC<ThreeDCatProps> = ({ stage, mood, catId, hatId, onClick }) => {
  // Scale based on stage
  const scale = stage === 'kitten' ? 0.6 : stage === 'teen' ? 0.8 : 1;

  // --- BLINKING LOGIC ---
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150); // Blink duration
      
      // Random interval between 2s and 6s
      const nextInterval = Math.random() * 4000 + 2000; 
      timeoutId = setTimeout(triggerBlink, nextInterval);
    };

    timeoutId = setTimeout(triggerBlink, 3000);
    return () => clearTimeout(timeoutId);
  }, []);


  // --- COAT STYLES ---
  
  // 1. PERTTI (Ragdoll - White body, brown ears/patches)
  const isPertti = catId === 'pertti';
  // 2. NANA (Pure White)
  const isNana = catId === 'nana';
  // 3. NINI (Calico - White with High Contrast Orange/Black patches)
  const isNini = catId === 'nini';
  // 4. SHNUPI (Li Hua - Brown Tabby with White chest)
  const isShnupi = catId === 'shnupi';

  // Base Gradients
  let furBodyBg = "";
  let furHeadBg = "";
  let earColor = "";
  
  if (isPertti) {
    furBodyBg = "radial-gradient(circle at 30% 30%, #ffffff, #f0f0f0, #d1d5db)";
    furHeadBg = "radial-gradient(circle at 30% 30%, #ffffff, #f0f0f0, #d1d5db)";
    earColor = "linear-gradient(135deg, #8D6E63, #5D4037)";
  } else if (isNana) {
    furBodyBg = "radial-gradient(circle at 30% 30%, #ffffff, #f8fafc, #e2e8f0)";
    furHeadBg = "radial-gradient(circle at 30% 30%, #ffffff, #f8fafc, #e2e8f0)";
    earColor = "#f1f5f9"; // White ears (with pink inner later)
  } else if (isNini) {
    // Calico: Pure White base
    furBodyBg = "#ffffff";
    furHeadBg = "#ffffff";
    earColor = "#333"; // Placeholder, overridden by patches
  } else if (isShnupi) {
    // Li Hua: Brown Mackerel Tabby
    // Body: Dark brown top fading to white belly
    furBodyBg = "linear-gradient(to bottom, #5D4037 0%, #8D6E63 40%, #A1887F 60%, #FFFFFF 90%)";
    // Head: Brown top, white muzzle
    furHeadBg = "linear-gradient(to bottom, #5D4037 0%, #8D6E63 50%, #FFFFFF 50%)";
    earColor = "#4E342E";
  }

  // Eye Colors
  let leftEyeColor = "radial-gradient(circle at 50% 70%, #4ade80, #166534)"; // Green (Default)
  let rightEyeColor = "radial-gradient(circle at 50% 70%, #4ade80, #166534)"; // Green (Default)

  if (isNana) {
    // Odd Eye
    leftEyeColor = "radial-gradient(circle at 50% 70%, #60A5FA, #1E3A8A)"; // Blue
    rightEyeColor = "radial-gradient(circle at 50% 70%, #4ade80, #166534)"; // Green
  }

  // --- DYNAMIC PATTERN LAYERS (For Calico/Nini) ---
  const renderCalicoPatches = () => (
    <>
      {/* High Contrast Orange Patch Head Left */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-[#E65100] rounded-full opacity-90 mix-blend-multiply blur-[8px]" />
      {/* High Contrast Black Patch Head Right */}
      <div className="absolute top-2 right-4 w-20 h-20 bg-[#1a1a1a] rounded-full opacity-90 blur-[6px]" />
      
      {/* Body Patches */}
      <div className="absolute bottom-10 left-[-10px] w-28 h-28 bg-[#E65100] rounded-full opacity-90 blur-[10px]" />
      <div className="absolute top-10 right-0 w-20 h-24 bg-[#1a1a1a] rounded-full opacity-80 blur-[8px]" />
    </>
  );

  // --- DYNAMIC PATTERN LAYERS (For Shnupi/Li Hua) ---
  const renderTabbyStripes = () => (
    <>
      {/* Head: The "M" Marking */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-12 pointer-events-none opacity-80 z-10">
         {/* Center stroke */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-[#3E2723] rounded-full" />
         {/* Left V */}
         <div className="absolute top-2 left-4 w-1 h-6 bg-[#3E2723] rotate-[-20deg] rounded-full" />
         {/* Right V */}
         <div className="absolute top-2 right-4 w-1 h-6 bg-[#3E2723] rotate-[20deg] rounded-full" />
      </div>

      {/* Head: Side Stripes */}
      <div className="absolute top-6 left-2 w-4 h-12 bg-[#3E2723] opacity-40 blur-[2px] rotate-12 rounded-full" />
      <div className="absolute top-6 right-2 w-4 h-12 bg-[#3E2723] opacity-40 blur-[2px] -rotate-12 rounded-full" />

      {/* White Muzzle Area Override */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-20 bg-white blur-lg rounded-full opacity-90" />

      {/* Body: Darker Spine */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-full bg-[#3E2723] opacity-30 blur-xl" />
      
      {/* Body: Side Mackerel Stripes */}
      <div className="absolute top-10 left-4 w-3 h-16 bg-[#271c19] opacity-40 blur-[1px] rotate-[-10deg] rounded-full" />
      <div className="absolute top-20 left-6 w-3 h-16 bg-[#271c19] opacity-40 blur-[1px] rotate-[-5deg] rounded-full" />
      <div className="absolute top-10 right-4 w-3 h-16 bg-[#271c19] opacity-40 blur-[1px] rotate-[10deg] rounded-full" />
      <div className="absolute top-20 right-6 w-3 h-16 bg-[#271c19] opacity-40 blur-[1px] rotate-[5deg] rounded-full" />
    </>
  );

  // Dynamic Eye Expressions
  // Return fully defined polygons for smooth interpolation
  const getLeftEyeShape = () => {
    if (mood === 'angry') return "polygon(0% 0%, 100% 20%, 100% 100%, 0% 100%)"; // Top-Right down (Inner)
    if (mood === 'worried') return "polygon(0% 20%, 100% 0%, 100% 100%, 0% 100%)"; // Top-Left down (Outer)
    return "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"; // Normal Rect
  };

  const getRightEyeShape = () => {
    if (mood === 'angry') return "polygon(0% 20%, 100% 0%, 100% 100%, 0% 100%)"; // Top-Left down (Inner)
    if (mood === 'worried') return "polygon(0% 0%, 100% 20%, 100% 100%, 0% 100%)"; // Top-Right down (Outer)
    return "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"; // Normal Rect
  };

  const getMouthPath = () => {
    if (mood === 'happy') return "M 35 45 Q 50 60 65 45";
    if (mood === 'angry') return "M 35 55 Q 50 40 65 55";
    if (mood === 'worried') return "M 35 55 Q 50 50 65 55";
    return "M 35 45 Q 50 55 65 45";
  };

  return (
    <motion.div 
      className="relative w-64 h-72 flex items-center justify-center select-none cursor-pointer" 
      animate={{ scale: scale }}
      whileTap={{ scale: scale * 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
    >
      
      {/* --- TAIL (Behind Body) --- */}
      <motion.div 
        className="absolute bottom-4 left-4 w-20 h-32 rounded-full origin-bottom-right -z-10"
        style={{ 
          background: isPertti ? "linear-gradient(135deg, #8D6E63, #5D4037)" : 
                      isNini ? "#1a1a1a" : 
                      isShnupi ? "linear-gradient(to right, #3E2723, #5D4037)" : "#f1f5f9",
          boxShadow: 'inset -5px 0 10px rgba(0,0,0,0.3)'
        }}
        animate={mood === 'happy' ? { rotate: [-5, 10, -5] } : mood === 'angry' ? { rotate: [0, 20, 0], transition: { duration: 0.2 } } : { rotate: 0 }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        {isShnupi && (
             // Tail Rings
             <div className="w-full h-full relative overflow-hidden rounded-full">
                 <div className="absolute top-4 w-full h-4 bg-black/20" />
                 <div className="absolute top-12 w-full h-4 bg-black/20" />
                 <div className="absolute top-20 w-full h-4 bg-black/20" />
             </div>
        )}
      </motion.div>

      {/* --- BODY --- */}
      <div 
        className="absolute bottom-0 w-40 h-48 rounded-[50%_50%_45%_45%_/_60%_60%_40%_40%] z-10 shadow-xl overflow-hidden"
        style={{ background: furBodyBg }}
      >
        {/* Shadow Overlay */}
        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-t from-gray-500/20 to-transparent pointer-events-none" />
        
        {isNini && renderCalicoPatches()}
        {isShnupi && (
            <>
                {renderTabbyStripes()}
                {/* White Chest Patch */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-white blur-xl rounded-full opacity-90" />
            </>
        )}

        {/* Front Paws */}
        <div className="absolute bottom-0 left-8 w-10 h-14 bg-white rounded-t-full rounded-b-xl shadow-md z-20"
             style={{ background: isShnupi ? '#FFFFFF' : 'linear-gradient(to bottom, #fff, #e5e7eb)' }} />
        <div className="absolute bottom-0 right-8 w-10 h-14 bg-white rounded-t-full rounded-b-xl shadow-md z-20"
             style={{ background: isShnupi ? '#FFFFFF' : 'linear-gradient(to bottom, #fff, #e5e7eb)' }} />
      </div>

      {/* --- HEAD GROUP --- */}
      <motion.div 
        className="absolute top-10 z-30"
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        {/* Head Shape */}
        <div 
          className="relative w-48 h-40 rounded-[45%] shadow-2xl overflow-hidden-safe"
        >   
            {/* Main Head Fur Background */}
            <div className="absolute inset-0 rounded-[45%]" style={{ background: furHeadBg }}>
                {isNini && renderCalicoPatches()}
                {isShnupi && renderTabbyStripes()}
            </div>

            {/* --- EARS (Positioned behind head shape visually) --- */}
            {/* Left Ear */}
            <div className="absolute -top-4 left-2 w-16 h-20 rounded-tl-3xl rounded-tr-lg transform -rotate-12 -z-10 shadow-lg overflow-hidden"
                 style={{ background: isNini ? '#E65100' : earColor }}>
                 <div className="absolute top-4 left-3 w-10 h-12 bg-pink-200 rounded-full opacity-60 blur-[2px]" />
            </div>

            {/* Right Ear */}
            <div className="absolute -top-4 right-2 w-16 h-20 rounded-tr-3xl rounded-tl-lg transform rotate-12 -z-10 shadow-lg overflow-hidden"
                 style={{ background: isNini ? '#1a1a1a' : earColor }}>
                 <div className="absolute top-4 right-3 w-10 h-12 bg-pink-200 rounded-full opacity-60 blur-[2px]" />
            </div>

            {/* --- HAT (Layered on top of head/ears) --- */}
            <HatOverlay hatId={hatId} />

            {/* --- HEAD PATCHES (Specific to Pertti) --- */}
            {isPertti && (
                <>
                    <div className="absolute top-0 left-0 w-20 h-20 rounded-tl-[40%] bg-stone-700 opacity-90 blur-[1px]"
                        style={{ background: earColor, borderRadius: '50% 0 40% 0', transform: 'rotate(-10deg) translate(5px, -5px)' }} />
                    <div className="absolute top-0 right-0 w-20 h-20 rounded-tr-[40%] bg-stone-700 opacity-90 blur-[1px]"
                        style={{ background: earColor, borderRadius: '0 50% 0 40%', transform: 'rotate(10deg) translate(-5px, -5px)' }} />
                </>
            )}

            {/* --- FACE --- */}
            
            {/* Eyes Container */}
            <div className="absolute top-12 left-0 w-full flex justify-center space-x-8 px-4 z-20">
                {/* Left Eye */}
                <motion.div 
                    className="relative w-12 h-14 bg-white rounded-full overflow-hidden shadow-inner border-2 border-gray-100" 
                    animate={{ clipPath: getLeftEyeShape() }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <motion.div 
                        className="absolute inset-0"
                        animate={{ scaleY: isBlinking ? 0.1 : 1 }}
                        transition={{ duration: 0.1 }}
                    >
                        <div className="absolute inset-1 rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)]"
                             style={{ background: leftEyeColor }}>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-5 bg-black rounded-full" />
                            <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full opacity-90" />
                            <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-white rounded-full opacity-60" />
                        </div>
                        {mood === 'worried' && (
                            <motion.div 
                                className="absolute bottom-0 left-2 w-3 h-4 bg-blue-300 rounded-full opacity-60 blur-[1px]"
                                animate={{ y: [0, 10], opacity: [0.6, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            />
                        )}
                    </motion.div>
                </motion.div>

                {/* Right Eye */}
                <motion.div 
                    className="relative w-12 h-14 bg-white rounded-full overflow-hidden shadow-inner border-2 border-gray-100" 
                    animate={{ clipPath: getRightEyeShape() }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <motion.div 
                        className="absolute inset-0"
                        animate={{ scaleY: isBlinking ? 0.1 : 1 }}
                        transition={{ duration: 0.1 }}
                    >
                        <div className="absolute inset-1 rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)]"
                             style={{ background: rightEyeColor }}>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-5 bg-black rounded-full" />
                            <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full opacity-90" />
                            <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-white rounded-full opacity-60" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Nose & Muzzle */}
            <div className="absolute top-[5.5rem] left-1/2 transform -translate-x-1/2 z-20">
                <div className="relative z-20">
                    <div className="w-4 h-3 bg-pink-400 rounded-b-lg shadow-sm" />
                </div>
            </div>

            {/* Mouth */}
            <svg className="absolute top-[6rem] left-1/2 transform -translate-x-1/2 w-24 h-12 pointer-events-none z-20" viewBox="0 0 100 60">
                <motion.path 
                    animate={{ d: getMouthPath() }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    fill="none" 
                    stroke="#5D4037" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                />
            </svg>

            {/* Cheeks */}
            <div className="absolute top-24 left-4 w-6 h-4 bg-pink-200 blur-md rounded-full opacity-40 z-10" />
            <div className="absolute top-24 right-4 w-6 h-4 bg-pink-200 blur-md rounded-full opacity-40 z-10" />

        </div>
      </motion.div>

      {/* --- SHADOW --- */}
      <div className="absolute -bottom-2 w-48 h-8 bg-black/10 blur-xl rounded-[50%]" />

    </div>
  );
};

const HatOverlay: React.FC<{ hatId: HatId }> = ({ hatId }) => {
    if (hatId === 'none') return null;

    const hatColors: Record<string, string> = {
        red: '#FFAB91', // Pastel Red
        blue: '#90CAF9', // Pastel Blue
        orange: '#FFCC80', // Pastel Orange
        purple: '#CE93D8', // Pastel Purple
    };

    if (hatId === 'crown') {
         return (
             <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-40">
                 {/* Gold Crown */}
                 <div className="relative w-20 h-16">
                     <div className="absolute bottom-0 w-full h-8 bg-yellow-400 rounded-b-lg border-2 border-yellow-600" />
                     <div className="absolute top-0 left-0 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[40px] border-b-yellow-400" />
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[40px] border-b-yellow-400" />
                     <div className="absolute top-0 right-0 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[40px] border-b-yellow-400" />
                     {/* Jewels */}
                     <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full border border-red-700 shadow-inner" />
                 </div>
             </div>
         )
    }

    // Beanie Style
    const color = hatColors[hatId] || '#999';

    return (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-40">
            {/* Beanie Body */}
            <div className="w-28 h-24 rounded-t-full rounded-b-xl shadow-lg relative" style={{ backgroundColor: color }}>
                {/* Texture/Ribs */}
                <div className="absolute inset-0 rounded-t-full rounded-b-xl border-b-8 border-black/10" 
                     style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 12px)' }} />
                {/* Pom Pom */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full shadow-md" style={{ backgroundColor: color }} />
            </div>
        </div>
    );
};