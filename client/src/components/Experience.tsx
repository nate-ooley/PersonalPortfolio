import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import { ButtonLink } from "./ui/button-link";
import { data } from "@/data/data";

export function Experience() {
  const { experiences } = data;

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">A timeline of my professional journey and key milestones.</p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 h-full w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
          
          {experiences.map((experience, index) => (
            <motion.div 
              key={index}
              className={cn(
                "relative", 
                index !== experiences.length - 1 ? "mb-12 md:mb-20" : ""
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="hidden md:block absolute top-5 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow"></div>
              
              <div className={cn(
                "md:w-5/12",
                index % 2 === 0 ? "md:ml-auto md:pl-8" : "md:mr-auto md:pr-8"
              )}>
                <div className="bg-white rounded-lg shadow-md p-6 transform transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{experience.title}</h3>
                      <p className="text-primary font-medium">{experience.company}</p>
                    </div>
                    {experience.isCurrent && (
                      <span className="bg-blue-100 text-primary text-sm font-medium py-1 px-3 rounded-full">Current</span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3">{experience.period}</p>
                  <p className="text-gray-700">
                    {experience.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ButtonLink href="#" className="inline-flex items-center gap-2 bg-white text-primary font-medium px-6 py-3 rounded-lg shadow hover:bg-blue-50 transition-colors">
            <Download className="h-5 w-5" />
            Download Full Resume
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
