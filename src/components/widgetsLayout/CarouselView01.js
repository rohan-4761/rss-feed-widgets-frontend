import { useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import formatDate from '../../utils/formatDate';
import getTextAlignmentClass from '@/utils/getTextAlignmentClass';

const CarouselView01 = ({ feeds, widgetStateJSON=null }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const widgetState = widgetStateJSON && Object.keys(widgetStateJSON).length > 0 
  ? widgetStateJSON
  : useSelector(state => state.widget); 
  const {
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
        contentDescBold,
        contentDescFontSize,
        contentDescColor,
      },
    },
  } = widgetState;

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? feeds.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === feeds.length - 1 ? 0 : currentIndex + 1);
  };

  if (!feeds || feeds.length === 0) {
    return (
      <div
        className="bg-white overflow-hidden mx-auto text-center"
        style={{
          width: widthInPixels ? `${width}px` : `${width}%`,
          height: heightInPixels ? `${height}px` : `${height}%`,
          fontFamily: fontStyle,
          backgroundColor: contentbgColor,
          border: border ? `1px solid ${borderColor}` : 'none',
          borderRadius: corner === "Square" ? '0' : '8px',
          padding: `${padding}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p className="text-gray-500">No content available</p>
      </div>
    );
  }

  const currentFeed = feeds[currentIndex];

  return (
    <div
      className="flex flex-col overflow-hidden mx-auto"
      style={{
        width: widthInPixels ? `${width}px` : `${width}%`,
        height: heightInPixels ? `${height}px` : `${height}%`,
        fontFamily: fontStyle,
        backgroundColor: contentbgColor,
        border: border ? `1px solid ${borderColor}` : 'none',
        borderRadius: corner === "Square" ? '0' : '8px',
        padding: `${padding}px`,
      }}
    >
      {/* Image Area (85%) */}
      <div
        className="relative"
        style={{
          flex: '0 0 85%',
          borderRadius: corner === "Square" ? '0' : '8px',
          overflow: 'hidden',
        }}
      >
        <img
          src={currentFeed.image}
          alt={currentFeed.title}
          className="w-full h-full object-cover"
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
      </div>

      {/* Text Info Area (15%) */}
      <div
        className={`flex flex-col justify-center ${getTextAlignmentClass(textAlignment)}`}
        style={{
          flex: '0 0 15%',
          backgroundColor: contentbgColor,
          padding: `${padding}px`,
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
          <div className="flex justify-between text-sm">
            <span
              style={{
                color: contentDescColor,
                fontSize: `${contentDescFontSize}px`,
                fontWeight: contentDescBold ? 'bold' : 'normal',
              }}
            >
              {currentFeed.author}
            </span>
            <span
              style={{
                color: contentDescColor,
                fontSize: `${contentDescFontSize}px`,
                fontWeight: contentDescBold ? 'bold' : 'normal',
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
  );
};

export default CarouselView01;
