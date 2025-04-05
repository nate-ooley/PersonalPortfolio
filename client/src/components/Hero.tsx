import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/button-link";

export function Hero() {
  return (
    <section id="home" className="pt-28 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.div 
            className="md:w-3/5 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Hi, I'm <span className="text-primary">John Doe</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Developer & Photographer based in San Francisco
            </h2>
            <p className="text-lg text-gray-700 max-w-xl">
              I create meaningful digital experiences and capture moments through my lens. Passionate about clean code and beautiful imagery.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <ButtonLink href="#portfolio" variant="default">
                View My Work
              </ButtonLink>
              <ButtonLink href="#contact" variant="outlinePrimary">
                Get In Touch
              </ButtonLink>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-2/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="John Doe portrait" 
              className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover mx-auto border-4 border-white shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
