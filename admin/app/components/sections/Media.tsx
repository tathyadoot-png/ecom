"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { mediaData } from '@/app/data/media';
import { X, Maximize2, Plus } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader'; 
import { useLanguage } from "@/app/context/LanguageContext";

const Media = () => {
  const { lang } = useLanguage();
  const [selectedImg, setSelectedImg] = useState<null | any>(null);
  const [visibleCount, setVisibleCount] = useState(8); 

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4); 
  };

  return (
    <section id='media' className="relative w-full bg-[#FDFCF0] py-20 overflow-hidden">
      {/* Full Width Heading Section */}
      <div className="w-full px-6 md:px-12 lg:px-5 mb-16">
        <SectionHeader 
          title={lang === 'hi' ? "मीडिया गैलरी" : "Media Gallery"} 
          subtitle="Moments & Milestones" 
        />
      </div>

      {/* Full Width Bento Grid */}
      <div className="w-full px-4 md:px-10">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {mediaData.slice(0, visibleCount).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              onClick={() => setSelectedImg(item.src)}
              className="relative group cursor-pointer overflow-hidden rounded-xl border border-[#001F3F]/5"
            >
              <Image
                src={item.src}
                alt={item.title}
                placeholder="blur"
                className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 grayscale-[0.3]"
              />
              
              {/* Overlay: Navy Blue with low opacity */}
              <div className="absolute inset-0 bg-[#001F3F]/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <div className="p-3 rounded-full bg-[#001F3F] scale-50 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                  <Maximize2 className="text-[#FDFCF0] w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button: Navy Blue Theme */}
        {visibleCount < mediaData.length && (
          <div className="flex justify-center mt-20">
            <button
              onClick={loadMore}
              className="group relative flex items-center gap-3 px-8 py-4 bg-transparent border border-[#001F3F]/20 rounded-full text-[#001F3F] overflow-hidden transition-all hover:border-[#001F3F]"
            >
              <span className="relative z-10 font-black uppercase text-xs tracking-widest">
                {lang === 'hi' ? 'और देखें' : 'Load More'}
              </span>
              <Plus className="relative z-10 w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#001F3F] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
              {/* Text color change on hover via a span if needed, but Navy on Beige works well */}
              <style jsx>{`
                button:hover span, button:hover :global(svg) {
                  color: #FDFCF0;
                  transition: color 0.5s;
                }
              `}</style>
            </button>
          </div>
        )}
      </div>

      {/* Premium Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-[#001F3F]/95 backdrop-blur-2xl p-4"
            onClick={() => setSelectedImg(null)}
          >
            <motion.button 
              className="absolute top-8 right-8 text-[#FDFCF0]/50 hover:text-[#FDFCF0] z-[1000]"
              whileHover={{ rotate: 90 }}
            >
              <X size={40} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-6xl aspect-video md:aspect-auto md:h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImg}
                alt="Enlarged view"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Media;