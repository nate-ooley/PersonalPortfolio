import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function AuthLogo({ className }: LogoProps) {
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  
  // Logo click handler
  const handleLogoClick = () => {
    setClickCount((prev) => prev + 1);
    
    // If clicked 5 times, show easter egg animation
    if (clickCount === 4) {
      setShowEasterEgg(true);
      
      // Reset after animation
      setTimeout(() => {
        setShowEasterEgg(false);
        setClickCount(0);
      }, 2000);
    }
  };
  
  return (
    <>
      <div 
        className={cn("relative inline-flex items-center text-2xl gap-1 cursor-pointer select-none", className)}
        onClick={handleLogoClick}
        onKeyDown={(e) => e.key === 'Enter' && handleLogoClick()}
        tabIndex={0}
        role="button"
        aria-label="Logo"
      >
        <motion.div
          className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          N
        </motion.div>
        
        <AnimatePresence>
          {showEasterEgg && (
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 text-yellow-900 rounded-full flex items-center justify-center font-bold text-xs"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              !
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Hidden counter for debugging */}
        <span className="sr-only">Clicks: {clickCount}</span>
      </div>
    </>
  );
}