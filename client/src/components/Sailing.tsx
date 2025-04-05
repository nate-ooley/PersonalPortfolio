import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Anchor, Wind, Compass, Map } from "lucide-react";
import { sailingData } from "@/data/content";

export default function Sailing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="sailing" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-3 py-1 text-sm font-medium rounded-full bg-blue-50 text-blue-700 border-blue-200">
            <Anchor className="w-4 h-4 mr-2" />
            Maritime Adventures
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Sailing Experience</h2>
          <p className="text-neutral max-w-2xl mx-auto">
            Navigating the seas has been my lifelong passion. From competitive racing to leisurely voyages, 
            here are some of my most memorable maritime experiences.
          </p>
        </motion.div>
        
        <div className="relative mb-20">
          <div className="absolute top-0 left-1/2 h-full w-1 bg-gradient-to-b from-blue-400 to-blue-600 transform -translate-x-1/2 hidden md:block"></div>
          
          <motion.div 
            ref={ref}
            className="space-y-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {sailingData.trips.map((trip, index) => (
              <motion.div 
                key={index}
                className="relative"
                variants={itemVariants}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:pr-12'} relative`}>
                  <span className="absolute top-0 hidden md:block md:left-0 md:right-auto w-4 h-4 rounded-full bg-blue-500 border-4 border-white transform -translate-x-1/2 translate-y-1/2"></span>
                  
                  <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-w-16 aspect-h-9 relative">
                      <img 
                        src={trip.image} 
                        alt={trip.title} 
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-6 text-white">
                          <Badge className="mb-2 bg-blue-600">{trip.type}</Badge>
                          <h3 className="text-xl font-bold">{trip.title}</h3>
                          <p className="text-sm text-slate-300">{trip.date}</p>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-4 mb-4 text-sm">
                        <div className="flex items-center">
                          <Map className="w-4 h-4 mr-2 text-blue-500" />
                          <span>{trip.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Compass className="w-4 h-4 mr-2 text-blue-500" />
                          <span>{trip.distance}</span>
                        </div>
                        <div className="flex items-center">
                          <Wind className="w-4 h-4 mr-2 text-blue-500" />
                          <span>{trip.conditions}</span>
                        </div>
                      </div>
                      
                      <p className="text-neutral mb-4">{trip.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {trip.highlights.map((highlight, hIndex) => (
                          <Badge key={hIndex} variant="secondary" className="bg-slate-100">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sailingData.stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center h-full border-blue-100 hover:border-blue-200 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    {stat.icon === 'anchor' && <Anchor className="w-6 h-6 text-blue-600" />}
                    {stat.icon === 'compass' && <Compass className="w-6 h-6 text-blue-600" />}
                    {stat.icon === 'map' && <Map className="w-6 h-6 text-blue-600" />}
                  </div>
                  <h3 className="text-3xl font-bold text-primary mb-2">{stat.value}</h3>
                  <p className="text-neutral">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}