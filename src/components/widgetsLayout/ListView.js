import React from "react";
import { useSelector } from 'react-redux';
import formatDate from '../../utils/formatDate';

const ListView = ({ feeds }) => {
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

  return (
    <div 
      className="overflow-y-auto mx-auto"
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
      <h2 
        className={`border-b pb-2 ${getTextAlignmentClass()}`}
        style={{
          fontSize: `${feedTitleFontSize}px`,
          fontWeight: feedTitleBold ? 'bold' : 'normal',
          color: feedTitleFontColor,
          backgroundColor: feedTitleBgColor,
          marginBottom: `${spaceBetweenItems}px`,
          padding: `${padding}px`,
        }}
      >
        {widgetTitle}
      </h2>
      
      {feeds && feeds.length > 0 ? (
        feeds.slice(0, displayNoOfPost).map((feed) => (
          <div
            key={feed.id}
            className={`flex flex-col items-start justify-start w-full p-4 rounded-lg ${getTextAlignmentClass()}`}
            style={{
              marginBottom: `${spaceBetweenItems}px`,
              borderRadius: squareCorner ? '0' : '8px',
            }}
          >
            {showContentTitle && (
              <div 
                className="mb-1"
                style={{
                  fontSize: `${contentTitleFontSize}px`,
                  fontWeight: contentTitleBold ? 'bold' : 'normal',
                  color: contentTitleColor,
                }}
              >
                {feed.title}
              </div>
            )}
            
            {showAuthorAndDate && (
              <p 
                className="mb-1"
                style={{
                  fontSize: `${contentDescFontSize}px`,
                  fontWeight: contentDescBold ? 'bold' : 'normal',
                  color: contentDescColor,
                }}
              >
                {feed.source} - {feed.author}
              </p>
            )}
            
            {showAuthorAndDate && (
              <span 
                className="text-sm"
                style={{
                  fontSize: `${contentDescFontSize - 2}px`,
                  color: contentDescColor,
                }}
              >
                By {feed.link} - {formatDate(feed.published_at, dateFormat)}
              </span>
            )}
          </div>
        ))
      ) : (
        <div className="text-gray-500">No feeds available</div>
      )}
    </div>
  );
};

export default ListView;