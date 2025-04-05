import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle } from "lucide-react";
import { playlistData } from "@/data/content";

export default function Playlist() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="playlist" className="py-20 bg-gradient-to-b from-slate-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">Currently Listening</h2>
        <p className="text-center text-slate-300 mb-12 max-w-2xl mx-auto">Tracks that keep me inspired and focused throughout my creative process.</p>
        
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {playlistData.map((track: {
    title: string;
    artist: string;
    album: string;
    year: string;
    albumCover: string;
    isNowPlaying: boolean;
  }, index: number) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700 overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-all">
                <div className="aspect-square relative overflow-hidden bg-black/20">
                  <img 
                    src={track.albumCover} 
                    alt={track.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayCircle className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  
                  {track.isNowPlaying && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="default" className="bg-green-500 text-xs font-medium animate-pulse">
                        Now Playing
                      </Badge>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg mb-1 text-white">{track.title}</h3>
                  <p className="text-slate-400">{track.artist}</p>
                  <div className="flex items-center mt-3 text-xs text-slate-500">
                    <span>{track.album}</span>
                    <span className="mx-2">•</span>
                    <span>{track.year}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}