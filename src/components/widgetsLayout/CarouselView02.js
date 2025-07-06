
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { useState, useEffect } from 'react';

const CarouselView01 = ({ feeds, autoPlay = false, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  useEffect(() => {
    if (isAutoPlaying && feeds.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === feeds.length - 1 ? 0 : prevIndex + 1
        );
      }, interval);
      return () => clearInterval(timer);
    }
  }, [isAutoPlaying, feeds.length, interval]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? feeds.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === feeds.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  if (!feeds || feeds.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto p-8 text-center">
        <p className="text-gray-500">No content available</p>
      </div>
    );
  }

  const currentFeed = feeds[currentIndex];

  return (
    <div className="bg-white shadow-lg overflow-hidden max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-white text-blue-600 p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Widget Title</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleAutoPlay}
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
          >
            {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <span className="text-sm opacity-80">
            {currentIndex + 1} / {feeds.length}
          </span>
        </div>
      </div>

      {/* Main Image Display */}
      <div className="relative aspect-video bg-gray-100">
        <img
          src={currentFeed.image}
          alt={currentFeed.title}
          className="w-full h-2/3 object-cover"
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
        >
          <ChevronRight size={24} />
        </button>

        {/* Article Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-600 to-gray-300 text-white p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{currentFeed.title}</h3>
          <div className="flex items-center justify-between text-sm text-gray-300">
            <span>{currentFeed.author}</span>
            <span>{currentFeed.source}</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {new Date(currentFeed.published_at).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      

      {/* Progress Indicators */}
      
    </div>
  );
};

export default CarouselView01;