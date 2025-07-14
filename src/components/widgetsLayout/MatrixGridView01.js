import React from 'react';
import { useSelector } from 'react-redux';
import formatDate from '../../utils/formatDate';

const MatrixGridView01 = ({ feeds,widgetStateJSON=null  }) => {
  // Get styling properties from widget state
  const widgetState = widgetStateJSON && Object.keys(widgetStateJSON).length > 0 
  ? widgetStateJSON
  : useSelector(state => state.widget); 
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

  const displayFeeds = feeds?.slice(0, displayNoOfPost || feeds.length) || [];

  return (
    <div 
      className="overflow-y-auto mx-auto"
      style={{
        width: widthInPixels ? `${width}px` : `${width}%`,
        height: heightInPixels ? `${height}px` : `${height}%`,
        fontFamily: fontStyle,
        backgroundColor: contentbgColor,
        border: border ? `1px solid ${borderColor}` : 'none',
        borderRadius: corner == "Square"? '0' : '8px',
        padding: `${padding}px`,
      }}
    >
      {/* Header */}
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

      {/* Grid Content */}
      <div 
        className="grid grid-cols-3"
        style={{
          gap: `${spaceBetweenItems}px`,
          padding: `${padding}px`,
        }}
      >
        {displayFeeds.length > 0 ? (
          displayFeeds.map((feed) => (
            <div 
              key={feed.id} 
              className="relative group"
              style={{
                borderRadius: corner == "Square"? '0' : '8px',
                overflow: 'hidden',
              }}
            >
              <img
                src={feed.image}
                alt={feed.title}
                className="w-full h-28 object-cover"
                style={{
                  borderRadius: corner == "Square"? '0' : '8px',
                }}
              />
              {showContentTitle && (
                <div 
                  className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-center"
                  style={{
                    padding: `${padding}px`,
                    borderRadius: corner == "Square"? '0' : '8px',
                  }}
                >
                  <div className={getTextAlignmentClass()}>
                    <p 
                      className="line-clamp-3"
                      style={{
                        fontSize: `${contentTitleFontSize}px`,
                        fontWeight: contentTitleBold ? 'bold' : 'normal',
                        color: contentTitleColor,
                      }}
                    >
                      {feed.title}
                    </p>
                    {showAuthorAndDate && (
                      <div className="mt-2">
                        <p 
                          style={{
                            fontSize: `${contentDescFontSize}px`,
                            fontWeight: contentDescBold ? 'bold' : 'normal',
                            color: contentDescColor,
                          }}
                        >
                          {feed.author}
                        </p>
                        <p 
                          style={{
                            fontSize: `${contentDescFontSize - 2}px`,
                            color: contentDescColor,
                          }}
                        >
                          {formatDate(feed.published_at, dateFormat)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div 
            className={`col-span-3 text-center ${getTextAlignmentClass()}`}
            style={{
              fontSize: `${contentDescFontSize}px`,
              color: contentDescColor,
              padding: `${padding}px`,
            }}
          >
            No feeds available
          </div>
        )}
      </div>
    </div>
  );
};

export default MatrixGridView01;