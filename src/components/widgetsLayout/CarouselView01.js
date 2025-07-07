import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import formatDate from '../../utils/formatDate';

const CarouselView01 = ({ feeds, autoPlay = false, interval = 3000 }) => {
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
      displayNoOfPost,
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
        className={`shadow-lg overflow-hidden mx-auto text-center ${getTextAlignmentClass()}`}
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
        <p 
          style={{
            fontSize: `${contentDescFontSize}px`,
            color: contentDescColor,
          }}
        >
          No content available
        </p>
      </div>
    );
  }

  const currentFeed = feeds[currentIndex];
  const displayFeeds = feeds.slice(0, displayNoOfPost || feeds.length);

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
      }}
    >
      {/* Header */}
      <div 
        className={`flex justify-between items-center ${getTextAlignmentClass()}`}
        style={{
          backgroundColor: feedTitleBgColor,
          color: feedTitleFontColor,
          padding: `${padding}px`,
          marginBottom: `${spaceBetweenItems}px`,
        }}
      >
        <h2 
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
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
            style={{ color: feedTitleFontColor }}
          >
            {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <span 
            className="text-sm opacity-80"
            style={{
              color: feedTitleFontColor,
              fontSize: `${feedTitleFontSize - 4}px`,
            }}
          >
            {currentIndex + 1} / {displayFeeds.length}
          </span>
        </div>
      </div>

      {/* Main Image Display */}
      <div 
        className="relative aspect-video bg-gray-100"
        style={{
          borderRadius: squareCorner ? '0' : '8px',
          margin: `0 ${padding}px`,
        }}
      >
        <img
          src={currentFeed.image}
          alt={currentFeed.title}
          className="w-full h-full object-cover"
          style={{
            borderRadius: squareCorner ? '0' : '8px',
          }}
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
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent text-white ${getTextAlignmentClass()}`}
          style={{
            padding: `${padding}px`,
            borderRadius: squareCorner ? '0' : '0 0 8px 8px',
          }}
        >
          {showContentTitle && (
            <h3 
              className="mb-2 line-clamp-2"
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
            <div className="flex items-center justify-between text-sm">
              <span 
                style={{
                  fontSize: `${contentDescFontSize}px`,
                  fontWeight: contentDescBold ? 'bold' : 'normal',
                  color: contentDescColor,
                }}
              >
                {currentFeed.author}
              </span>
              <span 
                style={{
                  fontSize: `${contentDescFontSize}px`,
                  fontWeight: contentDescBold ? 'bold' : 'normal',
                  color: contentDescColor,
                }}
              >
                {currentFeed.source}
              </span>
            </div>
          )}
          
          {showAuthorAndDate && (
            <div 
              className="text-xs mt-1"
              style={{
                fontSize: `${contentDescFontSize - 2}px`,
                color: contentDescColor,
              }}
            >
              {formatDate(currentFeed.published_at, dateFormat)}
            </div>
          )}
        </div>
      </div>

      {/* Progress Indicators */}
      <div 
        className="flex justify-center space-x-2"
        style={{
          padding: `${padding}px`,
          marginTop: `${spaceBetweenItems}px`,
        }}
      >
        {displayFeeds.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'scale-110'
                : 'hover:bg-gray-400'
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

export default CarouselView01;