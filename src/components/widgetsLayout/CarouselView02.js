import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import getTextAlignmentClass from "@/utils/getTextAlignmentClass";
import formatDate from "../../utils/formatDate";

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
      corner,
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

  if (!feeds || feeds.length === 0) {
    return (
      <div
        className={`shadow-lg overflow-hidden mx-auto text-center ${getTextAlignmentClass(
          textAlignment
        )}`}
        style={{
          width: widthInPixels ? `${width}px` : `${width}%`,
          height: heightInPixels ? `${height}px` : `${height}%`,
          fontFamily: fontStyle,
          backgroundColor: contentbgColor,
          border: border ? `1px solid ${borderColor}` : "none",
          borderRadius: corner == "Square" ? "0" : "8px",
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
        border: border ? `1px solid ${borderColor}` : "none",
        borderRadius: corner == "Square" ? "0" : "8px",
      }}
    >
      {/* Header */}
      
      {/* Main Image Display */}
      <div
        className="relative bg-gray-100"
        style={{
          borderRadius: corner == "Square" ? "0" : "16px",
          margin: `0 ${padding}px`,
          height: heightInPixels ? `${height}px` : `${height}%`,
        }}
      >
        <img
          src={currentFeed.image}
          alt={currentFeed.title}
          className="w-full h-full object-cover"
          style={{
            borderRadius: corner == "Square" ? "0" : "8px",
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

        {/* Overlay */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent text-white ${getTextAlignmentClass(
            textAlignment
          )}`}
          style={{
            padding: `${padding}px`,
            // bottom: '45px',
            borderRadius: corner == "Square" ? "0" : "0 0 8px 8px",
          }}
        >
          {showContentTitle && (
            <h3
              className="mb-2 line-clamp-2"
              style={{
                fontSize: `${contentTitleFontSize}px`,
                fontWeight: contentTitleBold ? "bold" : "normal",
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
                  fontWeight: contentDescBold ? "bold" : "normal",
                  color: contentDescColor,
                }}
              >
                {currentFeed.author}
              </span>
              <span
                style={{
                  fontSize: `${contentDescFontSize}px`,
                  fontWeight: contentDescBold ? "bold" : "normal",
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
    </div>
  );
};

export default CarouselView02;
