import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [secretDialogOpen, setSecretDialogOpen] = useState(false);
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
    
    // Position the confetti at the logo's position
    if (logoRef.current) {
      const rect = logoRef.current.getBoundingClientRect();
      const x = (rect.left + rect.right) / 2 / window.innerWidth;
      const y = (rect.top + rect.bottom) / 2 / window.innerHeight;
      
      // Create a fancier confetti burst
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
      
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
      
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        
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
    }
    
    // Reset after animation
    setTimeout(() => {
      setShowEasterEgg(false);
      setClickCount(0);
    }, 3000);
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
    // Special Easter egg animation for Konami code
    confetti({
      particleCount: 200,
      spread: 160,
      origin: { y: 0.6 }
    });
    
    // Open the secret dialog
    setSecretDialogOpen(true);
    
    // Reset konami activation after a while
    setTimeout(() => {
      setKonamiActivated(false);
    }, 5000);
  };
  
  return (
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
                Achievement unlocked: Digital Explorer! 🏆
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}