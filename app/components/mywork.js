"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { XCircle } from 'lucide-react';
import Masonry from 'react-masonry-css';
import { motion, useAnimation, useInView } from 'framer-motion';

const galleryItems = [
  { id: 1, type: 'image', src: '/work3.jpg', aspectRatio: '16/9' },
  { id: 2, type: 'video', src: '/work1.mp4', aspectRatio: '9/16' },
  { id: 3, type: 'image', src: '/work4.jpg', aspectRatio: '3/4' },
  { id: 4, type: 'video', src: '/work8.mp4', aspectRatio: '9/16' },
  { id: 5, type: 'image', src: '/work5.jpg', aspectRatio: '4/3' },
  { id: 6, type: 'video', src: '/work2.mp4', aspectRatio: '9/16' },
  { id: 7, type: 'image', src: '/work9.jpg', aspectRatio: '4/3' },
  { id: 8, type: 'image', src: '/work11.jpg', aspectRatio: '2/3' },
  { id: 9, type: 'video', src: '/work7.mp4', aspectRatio: '9/16' },
  { id: 10, type: 'image', src: '/work10.jpg', aspectRatio: '3/2' },
  { id: 11, type: 'video', src: '/work6.mp4', aspectRatio: '9/16' },
  { id: 12, type: 'image', src: '/work12.jpg', aspectRatio: '3/2' },
  { id: 13, type: 'image', src: '/work13.jpg', aspectRatio: '3/2' },
];

const breakpointCols = {
  default: 4,
  1024: 3,
  640: 2,
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function Mywork() {
  const [zoomedItem, setZoomedItem] = useState(null);
  const videoRefs = useRef({});
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const openZoom = useCallback((item) => {
    setZoomedItem(item);
    document.body.style.overflow = 'hidden';
    Object.values(videoRefs.current).forEach((videoEl) => {
      if (videoEl && videoEl.id !== `video-${item.id}`) {
        videoEl.pause();
      }
    });
  }, []);

  const closeZoom = useCallback(() => {
    setZoomedItem(null);
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeZoom();
      }
    };

    if (zoomedItem) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [zoomedItem, closeZoom]);

  useEffect(() => {
    const currentRefs = { ...videoRefs.current };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoElement = currentRefs[entry.target.id];
          if (videoElement) {
            if (entry.isIntersecting) {
              videoElement.play().catch((error) =>
                console.error("Video autoplay failed:", error)
              );
            } else {
              videoElement.pause();
              videoElement.currentTime = 0;
            }
          }
        });
      },
      { threshold: 0.7 }
    );

    Object.values(currentRefs).forEach((videoEl) => {
      if (videoEl) {
        observer.observe(videoEl);
      }
    });

    return () => {
      Object.values(currentRefs).forEach((videoEl) => {
        if (videoEl) {
          observer.unobserve(videoEl);
        }
      });
      observer.disconnect();
    };
  }, []);

  return (
    <section className="px-4 py-8 bg-white" ref={ref}>
      <motion.h2 
        className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.6 }}
      >
        Our Visual Inspirations
      </motion.h2>

      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <Masonry
            breakpointCols={breakpointCols}
            className="flex w-auto -ml-4"
            columnClassName="pl-4 bg-clip-padding"
          >
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="mb-4 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02] cursor-pointer group"
                onClick={() => openZoom(item)}
                custom={index}
              >
                <div
                  className="relative w-full overflow-hidden bg-gray-100"
                  style={{
                    paddingTop: item.aspectRatio
                      ? `calc(100% / (${item.aspectRatio.split('/')[0]} / ${item.aspectRatio.split('/')[1]}))`
                      : '75%',
                  }}
                >
                  {item.type === 'image' ? (
                    <Image
                      src={item.src}
                      alt={`Gallery item ${item.id}`}
                      fill
                      className="object-cover transition-opacity duration-300 group-hover:opacity-85"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      priority={item.id <= 4}
                    />
                  ) : (
                    <video
                      id={`video-${item.id}`}
                      ref={(el) => (videoRefs.current[`video-${item.id}`] = el)}
                      src={item.src}
                      controls={false}
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-85"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </Masonry>
        </motion.div>
      </div>

      {zoomedItem && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[200] p-2 sm:p-4"
          onClick={closeZoom}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative bg-transparent backdrop-blur-md rounded-lg max-w-full max-h-[95vh] w-full h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={closeZoom}
              className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition-colors z-50 text-opacity-80 hover:text-opacity-100"
              aria-label="Close media view"
            >
              <XCircle size={36} />
            </button>

            <div
              className="relative flex-grow flex items-center justify-center p-0 md:p-2 overflow-hidden"
              style={{
                maxWidth: zoomedItem.type === 'image' ? '100%' : 'auto',
                maxHeight: '100%',
                aspectRatio: zoomedItem.aspectRatio
                  ? `${zoomedItem.aspectRatio.split('/')[0]} / ${zoomedItem.aspectRatio.split('/')[1]}`
                  : 'auto',
              }}
            >
              {zoomedItem.type === 'image' ? (
                <Image
                  src={zoomedItem.src}
                  alt={`Zoomed gallery item ${zoomedItem.id}`}
                  fill
                  className="object-contain"
                />
              ) : (
                <video
                  src={zoomedItem.src}
                  controls
                  autoPlay
                  loop
                  playsInline
                  muted={false}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}