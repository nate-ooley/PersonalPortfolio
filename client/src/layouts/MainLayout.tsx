import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLocation } from "wouter";

interface MainLayoutProps {
  children: ReactNode;
  activeSection?: string;
}

export default function MainLayout({ children, activeSection = "" }: MainLayoutProps) {
  const [location] = useLocation();
  
  // This component is used for the blog page and other pages outside the main
  // single-page app, so we don't have an activeSection from scroll tracking
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header activeSection={activeSection} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
