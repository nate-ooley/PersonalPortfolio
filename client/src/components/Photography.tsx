import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./ui/button-link";
import { data } from "@/data/data";

export function Photography() {
  const { photos, photoCategories } = data;
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const lightboxRef = useRef<HTMLDivElement>(null);
  
  const filteredPhotos = activeCategory === "all" 
    ? photos 
    : photos.filter(photo => photo.category === activeCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const showPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + filteredPhotos.length) % filteredPhotos.length
    );
  };

  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % filteredPhotos.length
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex - 1 + filteredPhotos.length) % filteredPhotos.length
        );
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % filteredPhotos.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, filteredPhotos.length]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (lightboxRef.current === e.target) {
        closeLightbox();
      }
    };

    if (lightboxOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [lightboxOpen]);

  return (
    <section id="photography" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Photography</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Capturing moments and telling stories through my lens. A collection of my favorite photographs.
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
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              )}
            >
              All Photos
            </button>
            {photoCategories.map((category, index) => (
              <button 
                key={index}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  activeCategory === category.id 
                    ? "bg-primary text-white" 
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>
        
        <div className="masonry">
          {filteredPhotos.map((photo, index) => (
            <motion.div 
              key={index}
              className="masonry-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 % 0.5 }}
            >
              <div 
                className="group relative rounded-lg overflow-hidden cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img 
                  src={photo.src} 
                  alt={photo.title} 
                  className="w-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-lg">{photo.title}</h3>
                  <p className="text-gray-200 text-sm">{photo.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Lightbox modal */}
        {lightboxOpen && filteredPhotos.length > 0 && (
          <div 
            ref={lightboxRef}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white z-10"
              aria-label="Close lightbox"
            >
              <X className="h-8 w-8" />
            </button>
            <button 
              onClick={showPrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
            
            <motion.img 
              key={currentImageIndex}
              src={filteredPhotos[currentImageIndex].src} 
              alt={filteredPhotos[currentImageIndex].title}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
            
            <button 
              onClick={showNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-10 w-10" />
            </button>
            <div className="absolute bottom-6 left-0 right-0 text-center text-white">
              <h3 className="text-xl font-bold">{filteredPhotos[currentImageIndex].title}</h3>
              <p className="text-sm text-gray-300">{filteredPhotos[currentImageIndex].caption}</p>
            </div>
          </div>
        )}
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ButtonLink href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-medium rounded-lg shadow-md hover:bg-gray-100 transition-colors">
            View Full Gallery
            <ChevronRight className="h-5 w-5" />
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
