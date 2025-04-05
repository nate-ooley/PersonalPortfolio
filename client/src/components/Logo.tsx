import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DimensionShift } from './DimensionShift';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [secretDialogOpen, setSecretDialogOpen] = useState(false);
  const [dimensionShiftActive, setDimensionShiftActive] = useState(false);
  const [konamiDimensionActive, setKonamiDimensionActive] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);
  
  const handleClick = () => {
    // Increment the click counter
    setClickCount(prev => prev + 1);
    
    // Activate easter egg when clicked 5 times
    if (clickCount === 4) {
      triggerEasterEgg();
    }
  };
  
  const triggerEasterEgg = () => {
    setShowEasterEgg(true);
    
    // Activate the dimension shift effect
    setDimensionShiftActive(true);
    
    // Position the confetti at the logo's position
    if (logoRef.current) {
      const rect = logoRef.current.getBoundingClientRect();
      const x = (rect.left + rect.right) / 2 / window.innerWidth;
      const y = (rect.top + rect.bottom) / 2 / window.innerHeight;
      
      // Create a fancier confetti burst
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
      
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
      
      // Slight delay to let dimension shift start first
      setTimeout(() => {
        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now() - 500; // Adjust for the delay
          
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }
          
          const particleCount = 50 * (timeLeft / duration);
          
          // Randomly assign confetti colors
          confetti({
            ...defaults,
            particleCount,
            origin: { x, y },
            colors: ['#0070f3', '#ff0080', '#00bcd4', '#ffaa00', '#00c853'],
            shapes: ['circle', 'square'],
            scalar: randomInRange(0.4, 1)
          });
          
          confetti({
            ...defaults,
            particleCount,
            origin: { x, y },
            colors: ['#ffffff'],
            shapes: ['circle']
          });
          
        }, 250);
      }, 200);
    }
    
    // Reset after animation
    setTimeout(() => {
      setShowEasterEgg(false);
      setDimensionShiftActive(false);
      setClickCount(0);
    }, 4000);
  };
  
  // Konami code detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add the key to our sequence
      const newSequence = [...konamiSequence, e.key.toLowerCase()];
      
      // Keep only the last 10 keys (the length of the Konami code)
      if (newSequence.length > konamiCode.length) {
        newSequence.shift();
      }
      
      setKonamiSequence(newSequence);
      
      // Check if the sequence matches the Konami code
      const match = konamiCode.every((key, index) => {
        return key.toLowerCase() === newSequence[index]?.toLowerCase();
      });
      
      if (match && newSequence.length === konamiCode.length && !konamiActivated) {
        setKonamiActivated(true);
        triggerKonamiEasterEgg();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiSequence, konamiActivated]);
  
  const triggerKonamiEasterEgg = () => {
    // Activate the konami dimension shift effect 
    setKonamiDimensionActive(true);
    
    // Special Easter egg animation for Konami code
    setTimeout(() => {
      confetti({
        particleCount: 300,
        spread: 180,
        origin: { y: 0.6 },
        zIndex: 9999,
        colors: ['#ffcc00', '#ff00cc', '#00ccff', '#cc00ff']
      });
      
      // Lots of extra confetti bursts at random positions
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          const xPos = 0.1 + Math.random() * 0.8;
          const yPos = 0.1 + Math.random() * 0.5;
          
          confetti({
            particleCount: 100,
            spread: 120,
            origin: { x: xPos, y: yPos },
            zIndex: 9999,
            colors: ['#ffcc00', '#ff00cc', '#00ccff', '#cc00ff']
          });
        }
      }, 300);
    }, 1200);
    
    // Open the secret dialog after the dimension effect starts
    setTimeout(() => {
      setSecretDialogOpen(true);
    }, 2000);
    
    // Reset konami activation after a while
    setTimeout(() => {
      setKonamiActivated(false);
      setKonamiDimensionActive(false);
    }, 6000);
  };
  
  return (
    <>
      {/* Dimension shift effects */}
      <DimensionShift isActive={dimensionShiftActive} onComplete={() => setDimensionShiftActive(false)} />
      
      {/* Konami code dimension shift - more intense */}
      {konamiDimensionActive && (
        <motion.div 
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Spinning vortex */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 10, 20, 0],
              rotate: [0, 720, 1440, 0]
            }}
            transition={{ duration: 5, ease: "easeInOut" }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-800 via-pink-500 to-orange-400 opacity-70 blur-lg" />
          </motion.div>

          {/* Page twist effect */}
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-indigo-900/60 to-fuchsia-600/60"
            initial={{ opacity: 0, skewX: 0, skewY: 0 }}
            animate={{ 
              opacity: [0, 0.7, 0],
              skewX: [0, 15, -15, 0],
              skewY: [0, -10, 10, 0]
            }}
            transition={{ duration: 3, times: [0, 0.3, 0.7, 1] }}
          />
          
          {/* Floating elements */}
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 opacity-60 mix-blend-screen"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0
              }}
              animate={{ 
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth
                ],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight
                ],
                scale: [0, 1.5, 0],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 4,
                times: [0, 0.5, 1],
                ease: "easeInOut",
                delay: i * 0.05
              }}
            />
          ))}
        </motion.div>
      )}
      
      <div 
        ref={logoRef}
        onClick={handleClick} 
        className={`cursor-pointer relative ${className}`}
        title="Click me repeatedly for a surprise"
      >
        <AnimatePresence>
          {showEasterEgg && (
            <motion.div
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
            >
              !
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.span
          className="text-primary font-bold"
          animate={showEasterEgg || konamiActivated ? {
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 10, 0],
            color: ['#0070f3', '#ff0080', '#0070f3'],
          } : {}}
          transition={{ duration: 1 }}
        >
          Nathan Ooley
        </motion.span>
        
        {/* Hidden counter for debugging */}
        <span className="sr-only">Clicks: {clickCount}</span>
        
        {/* Secret Konami Code Dialog */}
        <Dialog open={secretDialogOpen} onOpenChange={setSecretDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold">🎮 You found the secret!</DialogTitle>
              <DialogDescription className="text-center">Your journey through dimensions has been rewarded</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h3 className="font-semibold text-amber-700 mb-2">Konami Code Activated!</h3>
                <p className="text-amber-700">
                  You've discovered the hidden easter egg by using the legendary Konami Code: 
                  ↑↑↓↓←→←→BA
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-700 mb-2">
                  Thanks for exploring my website so thoroughly! As a reward for your curiosity, here's a fun fact:
                </p>
                <p className="text-blue-700 font-medium">
                  I hide easter eggs like this in all my projects. It's my way of adding a personal touch and rewarding the naturally curious.
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-purple-700 font-bold">
                  Achievement unlocked: Dimension Traveler! 🏆
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}