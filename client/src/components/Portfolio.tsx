import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, ChevronRight, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./ui/button-link";
import { data } from "@/data/data";

export function Portfolio() {
  const { projects, categories } = data;
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Portfolio</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A selection of my best development projects showcasing my skills and expertise.
          </p>
        </motion.div>
        
        <motion.div 
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-wrap gap-2 md:gap-4">
            <button 
              onClick={() => setActiveCategory("all")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeCategory === "all" 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              All Projects
            </button>
            {categories.map((category, index) => (
              <button 
                key={index}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  activeCategory === category.id 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={index}
              className="rounded-lg overflow-hidden shadow-md bg-white border border-gray-100 transform transition duration-300 hover:-translate-y-2 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a href={project.demoLink} className="bg-white text-primary p-2 rounded-full" aria-label="View project">
                    <Eye className="h-6 w-6" />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                  <span className={cn(
                    "text-xs font-medium py-1 px-2 rounded-full",
                    project.categoryColor
                  )}>
                    {project.categoryName}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <a href={project.demoLink} className="text-primary font-medium hover:underline flex items-center gap-1">
                    View Project
                    <ChevronRight className="h-4 w-4" />
                  </a>
                  <a href={project.codeLink} className="text-gray-500 hover:text-gray-700">
                    <Code className="h-5 w-5" />
                  </a>
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
          <ButtonLink href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition-colors">
            View All Projects
            <ChevronRight className="h-5 w-5" />
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
