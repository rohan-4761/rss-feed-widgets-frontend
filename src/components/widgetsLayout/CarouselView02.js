import { useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { useState, useEffect } from 'react';

import formatDate from '../../utils/formatDate'; // Adjust the import path as necessary

const CarouselView02 = ({ feeds, autoPlay = false, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  // Get styling properties from widget state
  const widgetState = useSelector((state) => state.widget);
  const {
    widgetTitle,
    general: {
      width,
      height,
      widthInPixels,
      heightInPixels,
      fontStyle,
      textAlignment,
      border,
      borderColor,
      squareCorner,
      padding,
      spaceBetweenItems,
    },
    feedTitle: {
      feedTitleFontSize,
      feedTitleBold,
      feedTitleBgColor,
      feedTitleFontColor,
    },
    feedContent: {
      contentbgColor,
      showAuthorAndDate,
      dateFormat,
      title: {
        showContentTitle,
        contentTitleBold,
        contentTitleFontSize,
        contentTitleColor,
      },
      description: {
        showContentDesc,
        contentDescBold,
        contentDescFontSize,
        contentDescColor,
      },
    },
  } = widgetState;

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

  // Helper function to format date based on widget settings
  

  // Helper function to get text alignment class
  const getTextAlignmentClass = () => {
    switch (textAlignment) {
      case 'AlignLeft':
        return 'text-left';
      case 'AlignCenter':
        return 'text-center';
      case 'AlignRight':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  if (!feeds || feeds.length === 0) {
    return (
      <div 
        className="bg-white rounded-lg shadow-lg overflow-hidden mx-auto p-8 text-center"
        style={{
          width: widthInPixels ? `${width}px` : `${width}%`,
          height: heightInPixels ? `${height}px` : `${height}%`,
          fontFamily: fontStyle,
          backgroundColor: contentbgColor,
          border: border ? `1px solid ${borderColor}` : 'none',
          borderRadius: squareCorner ? '0' : '8px',
          padding: `${padding}px`,
        }}
      >
        <p className="text-gray-500">No content available</p>
      </div>
    );
  }

  const currentFeed = feeds[currentIndex];

  return (
    <div 
      className="shadow-lg overflow-hidden mx-auto"
      style={{
        width: widthInPixels ? `${width}px` : `${width}%`,
        height: heightInPixels ? `${height}px` : `${height}%`,
        fontFamily: fontStyle,
        backgroundColor: contentbgColor,
        border: border ? `1px solid ${borderColor}` : 'none',
        borderRadius: squareCorner ? '0' : '8px',
        padding: `${padding}px`,
      }}
    >
      {/* Header */}
      <div 
        className="p-4 flex justify-between items-center"
        style={{
          backgroundColor: feedTitleBgColor,
          color: feedTitleFontColor,
          marginBottom: `${spaceBetweenItems}px`,
        }}
      >
        <h2 
          className={`${getTextAlignmentClass()}`}
          style={{
            fontSize: `${feedTitleFontSize}px`,
            fontWeight: feedTitleBold ? 'bold' : 'normal',
            color: feedTitleFontColor,
          }}
        >
          {widgetTitle}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleAutoPlay}
            className="p-2 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
            style={{ color: feedTitleFontColor }}
          >
            {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <span 
            className="text-sm opacity-80"
            style={{ color: feedTitleFontColor }}
          >
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
          {showContentTitle && (
            <h3 
              className={`mb-2 line-clamp-2 ${getTextAlignmentClass()}`}
              style={{
                fontSize: `${contentTitleFontSize}px`,
                fontWeight: contentTitleBold ? 'bold' : 'normal',
                color: contentTitleColor,
              }}
            >
              {currentFeed.title}
            </h3>
          )}
          
          {showAuthorAndDate && (
            <div className={`flex items-center justify-between text-sm ${getTextAlignmentClass()}`}>
              <span style={{ color: contentDescColor, fontSize: `${contentDescFontSize}px` }}>
                {currentFeed.author}
              </span>
              <span style={{ color: contentDescColor, fontSize: `${contentDescFontSize}px` }}>
                {currentFeed.source}
              </span>
            </div>
          )}
          
          {showAuthorAndDate && (
            <div 
              className={`text-xs mt-1 ${getTextAlignmentClass()}`}
              style={{ 
                color: contentDescColor, 
                fontSize: `${contentDescFontSize - 2}px`,
                fontWeight: contentDescBold ? 'bold' : 'normal',
              }}
            >
              {formatDate(currentFeed.published_at, dateFormat)}
            </div>
          )}
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center py-4 space-x-2">
        {feeds.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'bg-blue-500 scale-110'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            style={{
              backgroundColor: index === currentIndex ? contentTitleColor : '#d1d5db',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselView02;