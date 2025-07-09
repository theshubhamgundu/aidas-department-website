
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentCategory, setCurrentCategory] = useState('all');

  const galleryImages = [
    {
      id: 1,
      src: '/placeholder.svg',
      alt: 'AI Lab Equipment',
      category: 'infrastructure',
      title: 'State-of-the-art AI Laboratory'
    },
    {
      id: 2,
      src: '/placeholder.svg',
      alt: 'Student Presentation',
      category: 'events',
      title: 'Student Research Presentations'
    },
    {
      id: 3,
      src: '/placeholder.svg',
      alt: 'Faculty Meeting',
      category: 'faculty',
      title: 'Faculty Research Discussion'
    },
    {
      id: 4,
      src: '/placeholder.svg',
      alt: 'Hackathon Winner',
      category: 'achievements',
      title: 'National Hackathon Winners'
    },
    {
      id: 5,
      src: '/placeholder.svg',
      alt: 'Computer Vision Lab',
      category: 'infrastructure',
      title: 'Computer Vision Laboratory'
    },
    {
      id: 6,
      src: '/placeholder.svg',
      alt: 'Industry Visit',
      category: 'events',
      title: 'Industry Expert Lecture'
    },
    {
      id: 7,
      src: '/placeholder.svg',
      alt: 'Research Conference',
      category: 'events',
      title: 'International AI Conference'
    },
    {
      id: 8,
      src: '/placeholder.svg',
      alt: 'Student Projects',
      category: 'achievements',
      title: 'Final Year Project Exhibition'
    },
    {
      id: 9,
      src: '/placeholder.svg',
      alt: 'Data Science Lab',
      category: 'infrastructure',
      title: 'Advanced Data Science Lab'
    },
    {
      id: 10,
      src: '/placeholder.svg',
      alt: 'Awards Ceremony',
      category: 'achievements',
      title: 'Academic Excellence Awards'
    },
    {
      id: 11,
      src: '/placeholder.svg',
      alt: 'Faculty Research',
      category: 'faculty',
      title: 'Faculty Research Collaboration'
    },
    {
      id: 12,
      src: '/placeholder.svg',
      alt: 'Workshop Session',
      category: 'events',
      title: 'Machine Learning Workshop'
    }
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'infrastructure', name: 'Infrastructure' },
    { id: 'events', name: 'Events' },
    { id: 'achievements', name: 'Achievements' },
    { id: 'faculty', name: 'Faculty' }
  ];

  const filteredImages = currentCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === currentCategory);

  const openModal = (imageId: number) => {
    setSelectedImage(imageId);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex].id);
  };

  const selectedImageData = filteredImages.find(img => img.id === selectedImage);

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our vibrant campus life, state-of-the-art facilities, and memorable moments
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setCurrentCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                currentCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => openModal(image.id)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-sm leading-tight">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && selectedImageData && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image */}
              <img
                src={selectedImageData.src}
                alt={selectedImageData.alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />

              {/* Image Title */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <h3 className="text-white text-xl font-semibold bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
                  {selectedImageData.title}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
