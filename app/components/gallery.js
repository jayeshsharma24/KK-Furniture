// components/ProductGallery.js
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const products = [
  {
    id: 1,
    src: '/home1.jpg',
    title: 'Comfort Linen Sofa',
    description: 'Experience ultimate comfort with our plush linen sofa, perfect for any living space.',
  },
  {
    id: 2,
    src: '/home2.jpg',
    title: 'Minimalist Dining Set',
    description: 'Sleek design meets practicality in this modern dining set, ideal for contemporary homes.',
  },
  {
    id: 3,
    src: '/home3.jpg',
    title: 'Wooden Accent Chair',
    description: 'A beautifully crafted wooden chair that adds a touch of natural elegance to your decor.',
  },
  {
    id: 4,
    src: '/home4.jpg',
    title: 'Bedroom Vanity Table',
    description: 'Stylish and functional, this vanity table is a chic addition to any bedroom setup.',
  },
];

export default function ProductGallery() {
  const router = useRouter();
  const [zoomedImage, setZoomedImage] = useState(null);

  const openZoom = useCallback((product) => {
    setZoomedImage(product);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeZoom = useCallback(() => {
    setZoomedImage(null);
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeZoom();
      }
    };

    if (zoomedImage) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [zoomedImage, closeZoom]);

  return (
    <section className="px-4 py-8 bg-amber-100">
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-gray-800">
        Discover Our Products
      </h2>

      {/* Optimized Grid with smaller card sizes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col
                       transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
            onClick={() => openZoom(product)}
          >
            {/* Smaller image container */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
              <Image
                src={product.src}
                alt={product.title}
                fill
                className="object-cover transition-opacity duration-300 hover:opacity-90"
                sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 23vw"
                priority={product.id <= 2}
              />
            </div>

            {/* Compact card content */}
            <div className="p-3 sm:p-4 text-center flex flex-col">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                {product.description}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/products/${product.id}`);
                }}
                className="mt-auto mx-auto px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Optimized Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-2 sm:p-4 animate-fadeIn"
          onClick={closeZoom}
        >
          <div
            className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col animate-zoomIn shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeZoom}
              className="absolute top-2 right-2 text-gray-800 hover:text-gray-600 rounded-full p-1 transition-colors z-50"
              aria-label="Close image view"
            >
              <XCircle size={28} className="stroke-2" />
            </button>

            <div className="relative flex-grow flex items-center justify-center p-2 sm:p-4">
              <Image
                src={zoomedImage.src}
                alt={zoomedImage.title}
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {/* Added product info in modal */}
            <div className="p-3 sm:p-4 border-t border-gray-200">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                {zoomedImage.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mt-1">
                {zoomedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}