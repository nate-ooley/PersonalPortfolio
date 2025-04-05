import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";

interface HeaderProps {
  activeSection: string;
}

export function Header({ activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const isHomePage = location === "/";
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Experience", href: "#experience" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Photography", href: "#photography" },
    { name: "Playlist", href: "#playlist" },
    { name: "Sailing", href: "#sailing" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  // This helps us handle both SPA navigation for the home page
  // and multi-page navigation for blog and other pages
  const getNavLinkUrl = (link: { name: string; href: string }) => {
    return isHomePage ? link.href : `/${link.href}`;
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 bg-white bg-opacity-95 z-50 transition-all duration-300",
        isScrolled ? "shadow-sm" : ""
      )}
    >
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Logo className="text-xl" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {isHomePage ? (
            // When on the home page, use anchor links
            navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "font-medium transition-colors",
                  activeSection === link.href.substring(1)
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                )}
              >
                {link.name}
              </a>
            ))
          ) : (
            // When not on the home page, use the root link
            <Link 
              href="/" 
              className="font-medium text-gray-700 hover:text-primary transition-colors"
            >
              Home
            </Link>
          )}
          <Link 
            href="/blog" 
            className={cn(
              "font-medium transition-colors",
              location === "/blog" ? "text-primary" : "text-gray-700 hover:text-primary"
            )}
          >
            Blog
          </Link>
          {user ? (
            <Link 
              href="/dashboard" 
              className={cn(
                "font-medium transition-colors",
                location === "/dashboard" ? "text-primary" : "text-gray-700 hover:text-primary"
              )}
            >
              Dashboard
            </Link>
          ) : (
            <Link 
              href="/auth" 
              className={cn(
                "font-medium transition-colors",
                location === "/auth" ? "text-primary" : "text-gray-700 hover:text-primary"
              )}
            >
              Client Login
            </Link>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white overflow-hidden"
          >
            <div className="container mx-auto px-4 py-3 space-y-3">
              {isHomePage ? (
                // When on the home page, use anchor links
                navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    className={cn(
                      "block font-medium py-2 transition-colors",
                      activeSection === link.href.substring(1)
                        ? "text-primary"
                        : "text-gray-700 hover:text-primary"
                    )}
                  >
                    {link.name}
                  </a>
                ))
              ) : (
                // When not on the home page, use the root link
                <Link 
                  href="/" 
                  className="block font-medium py-2 text-gray-700 hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  Home
                </Link>
              )}
              <Link 
                href="/blog" 
                className={cn(
                  "block font-medium py-2 transition-colors",
                  location === "/blog" ? "text-primary" : "text-gray-700 hover:text-primary"
                )}
                onClick={closeMenu}
              >
                Blog
              </Link>
              {user ? (
                <Link 
                  href="/dashboard" 
                  className={cn(
                    "block font-medium py-2 transition-colors",
                    location === "/dashboard" ? "text-primary" : "text-gray-700 hover:text-primary"
                  )}
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
              ) : (
                <Link 
                  href="/auth" 
                  className={cn(
                    "block font-medium py-2 transition-colors",
                    location === "/auth" ? "text-primary" : "text-gray-700 hover:text-primary"
                  )}
                  onClick={closeMenu}
                >
                  Client Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
