import { motion } from "framer-motion";
import { Check, Code, Anchor, Camera } from "lucide-react";
import { ButtonLink } from "./ui/button-link";

export function About() {
  const developerSkills = [
    "Full-Stack Development",
    "Cloud Architecture",
    "Mobile App Development",
    "Network Security",
    "API Development"
  ];

  const photographySkills = [
    "Landscape Photography",
    "Portrait Photography",
    "Photo Editing",
    "Drone Photography",
    "Time-lapse Photography"
  ];
  
  const sailingSkills = [
    "Open Water Navigation",
    "Coastal Cruising",
    "Racing Techniques",
    "Weather Analysis",
    "Boat Maintenance"
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Developer. Sailor. Photographer. Three passions that define my approach to life and work.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            className="lg:w-2/5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <img 
                src="/assets/IMG_5177.png" 
                alt="Nathan Ooley portrait" 
                className="rounded-lg shadow-lg object-cover w-full"
              />
              <div className="absolute bottom-0 right-0 bg-white p-4 shadow-lg rounded-tl-lg rounded-br-lg transform translate-x-4 translate-y-4">
                <p className="font-bold text-primary">8+ Years Experience</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-3/5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-4">Who am I?</h3>
            <p className="text-gray-700 mb-4">
              I'm Nathan Ooley, a multifaceted professional who thrives at the intersection of technology, adventure, and visual storytelling. My career as a developer has given me the analytical mindset to solve complex problems, while my experiences as a sailor and photographer have taught me the value of patience, perspective, and an eye for detail.
            </p>
            <p className="text-gray-700 mb-6">
              This unique combination allows me to approach technical challenges with both precision and creativity, whether I'm developing secure network solutions, crafting intuitive mobile applications, or capturing meaningful moments through my lens.
            </p>
            
            <div className="space-y-8 mb-8">
              <div className="flex items-start gap-3">
                <span className="mt-1 p-2 rounded-full bg-blue-100 text-blue-600">
                  <Code className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Developer</h4>
                  <p className="text-gray-600 mb-2">Specializing in full-stack development, cloud solutions, and network security with over 8 years of professional experience.</p>
                  <div className="flex flex-wrap gap-2">
                    {developerSkills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="mt-1 p-2 rounded-full bg-teal-100 text-teal-600">
                  <Anchor className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Sailor</h4>
                  <p className="text-gray-600 mb-2">Passionate about exploring coastal waters and applying the discipline of sailing to both life and professional ventures.</p>
                  <div className="flex flex-wrap gap-2">
                    {sailingSkills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-teal-50 text-teal-700 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="mt-1 p-2 rounded-full bg-amber-100 text-amber-600">
                  <Camera className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Photographer</h4>
                  <p className="text-gray-600 mb-2">Capturing moments and perspectives that tell compelling visual stories through various photographic styles.</p>
                  <div className="flex flex-wrap gap-2">
                    {photographySkills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <ButtonLink href="#contact" variant="link" className="inline-flex items-center text-primary font-medium hover:underline gap-1">
              Let's work together
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </ButtonLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
