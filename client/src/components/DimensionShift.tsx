import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DimensionShiftProps {
  isActive: boolean;
  onComplete?: () => void;
}

export function DimensionShift({ isActive, onComplete }: DimensionShiftProps) {
  const [portalActive, setPortalActive] = useState(false);
  const [warpActive, setWarpActive] = useState(false);
  const [vortexActive, setVortexActive] = useState(false);
  
  useEffect(() => {
    if (isActive) {
      // Create a staggered effect of visual transformations
      setPortalActive(true);
      
      const timers = [
        setTimeout(() => setWarpActive(true), 600),
        setTimeout(() => setVortexActive(true), 1200),
        setTimeout(() => {
          setPortalActive(false);
          setWarpActive(false);
          setVortexActive(false);
          if (onComplete) onComplete();
        }, 3000)
      ];
      
      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [isActive, onComplete]);
  
  if (!isActive && !portalActive && !warpActive && !vortexActive) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Background portal effect */}
      <AnimatePresence>
        {portalActive && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      
      {/* Vortex effect */}
      <AnimatePresence>
        {vortexActive && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-40 h-40 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
              initial={{ scale: 0 }}
              animate={{ 
                scale: [0, 15, 20, 0],
                rotate: [0, 360, 720, 1080]
              }}
              transition={{ 
                duration: 2.5,
                times: [0, 0.3, 0.6, 1],
                ease: "easeInOut" 
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Reality warp effect */}
      <AnimatePresence>
        {warpActive && (
          <>
            {/* Top warp */}
            <motion.div 
              className="absolute top-0 left-0 right-0 h-screen bg-gradient-to-b from-blue-600 to-transparent"
              initial={{ height: 0 }}
              animate={{ height: "50vh" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            
            {/* Bottom warp */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-screen bg-gradient-to-t from-blue-600 to-transparent"
              initial={{ height: 0 }}
              animate={{ height: "50vh" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            
            {/* Left warp */}
            <motion.div 
              className="absolute left-0 top-0 bottom-0 w-screen bg-gradient-to-r from-purple-600 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: "50vw" }}
              exit={{ width: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            
            {/* Right warp */}
            <motion.div 
              className="absolute right-0 top-0 bottom-0 w-screen bg-gradient-to-l from-purple-600 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: "50vw" }}
              exit={{ width: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </>
        )}
      </AnimatePresence>
      
      {/* Floating elements */}
      <AnimatePresence>
        {warpActive && (
          <>
            {Array.from({ length: 20 }).map((_, index) => (
              <motion.div
                key={index}
                className="absolute w-8 h-8 rounded-full bg-white opacity-70"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 0
                }}
                animate={{ 
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: Math.random() * 2 + 0.5,
                  opacity: Math.random() * 0.7
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 1.5 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
      
      {/* Center burst */}
      <AnimatePresence>
        {portalActive && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative w-60 h-60"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-2 h-20 bg-blue-400"
                  style={{
                    originX: "50%",
                    originY: "0%",
                    rotate: `${i * 45}deg`,
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Screen flash */}
      <AnimatePresence>
        {vortexActive && (
          <motion.div 
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ 
              duration: 0.6, 
              times: [0, 0.5, 1],
              ease: "easeInOut" 
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}