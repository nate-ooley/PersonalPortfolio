import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/button-link";
import { Code, Anchor, Camera } from "lucide-react";

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
              Hi, I'm <span className="text-primary">Nathan Ooley</span>
            </h1>
            <div className="flex flex-wrap items-center gap-3 md:gap-5">
              <div className="flex items-center gap-1">
                <Code className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl md:text-2xl text-blue-600 font-medium">Developer</h2>
              </div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="flex items-center gap-1">
                <Anchor className="h-5 w-5 text-teal-600" />
                <h2 className="text-xl md:text-2xl text-teal-600 font-medium">Sailor</h2>
              </div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="flex items-center gap-1">
                <Camera className="h-5 w-5 text-amber-600" />
                <h2 className="text-xl md:text-2xl text-amber-600 font-medium">Photographer</h2>
              </div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h2 className="text-xl md:text-2xl text-purple-600 font-medium">Author</h2>
              </div>
            </div>
            <p className="text-lg text-gray-700 max-w-xl">
              I bring together technical expertise, a sense of adventure, and creative vision to every project. Currently focused on <span className="font-semibold text-blue-600">AI agent automation</span>, building intelligent systems for businesses that transform how they operate.
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
              src="/assets/IMG_5177.png" 
              alt="Nathan Ooley portrait" 
              className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover mx-auto border-4 border-white shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
