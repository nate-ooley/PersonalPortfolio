import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ButtonLink } from "./ui/button-link";

export function About() {
  const skills = [
    "Front-end Development",
    "UX/UI Design",
    "React & Next.js",
    "Landscape Photography",
    "Sailing"
  ];

  const interests = [
    "Travel Photography",
    "Web Accessibility",
    "Coastal Sailing",
    "Open Source Contributing"
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
            Get to know more about me, my background, and what drives my passion for development and photography.
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
                <p className="font-bold text-primary">5+ Years Experience</p>
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
              I'm Nathan Ooley, a passionate developer and photographer with a keen eye for detail. With over 8 years of experience in web development, I specialize in creating responsive, user-friendly websites and applications that combine functionality with aesthetic appeal.
            </p>
            <p className="text-gray-700 mb-6">
              When I'm not coding, you'll find me exploring coastal waters through sailing or capturing moments through my camera lens. This combination of technical expertise and creative pursuits allows me to approach projects with both precision and vision.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-lg font-semibold mb-3">Skills</h4>
                <ul className="space-y-2">
                  {skills.map((skill, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-primary">
                        <Check className="h-5 w-5" />
                      </span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3">Interests</h4>
                <ul className="space-y-2">
                  {interests.map((interest, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-primary">
                        <Check className="h-5 w-5" />
                      </span>
                      <span>{interest}</span>
                    </li>
                  ))}
                </ul>
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
