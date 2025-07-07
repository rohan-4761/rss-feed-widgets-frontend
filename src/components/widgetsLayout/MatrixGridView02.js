import React from 'react';
import { useSelector } from 'react-redux';
import formatDate from '../../utils/formatDate';

const MatrixGridView02 = ({ feeds }) => {
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

  const displayFeeds = feeds?.slice(0, displayNoOfPost || feeds.length) || [];

  return (
    <div 
      className="overflow-hidden mx-auto"
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
        className={`border-b px-4 py-3 ${getTextAlignmentClass()}`}
        style={{
          backgroundColor: feedTitleBgColor,
          borderColor: borderColor,
          padding: `${padding}px`,
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
      </div>
      
      {/* Grid Content */}
      <div 
        className="h-full overflow-y-auto"
        style={{
          padding: `${padding}px`,
        }}
      >
        <div 
          className="grid grid-cols-3"
          style={{
            gap: `${spaceBetweenItems}px`,
          }}
        >
          {displayFeeds.length > 0 ? (
            displayFeeds.map((feed) => (
              <div
                key={feed.id}
                className="flex flex-col bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer h-full w-1/3"
                style={{
                  backgroundColor: contentbgColor,
                  border: border ? `1px solid ${borderColor}` : '1px solid #e5e7eb',
                  borderRadius: squareCorner ? '0' : '8px',
                }}
              >
                <div className="relative">
                  <img
                    src={feed.image}
                    alt={feed.title}
                    className="w-full h-1/2 object-cover"
                    style={{
                      borderRadius: squareCorner ? '0' : '8px 8px 0 0',
                    }}
                  />
                </div>
                
                <div 
                  className="flex-1 flex flex-col justify-between"
                  style={{
                    padding: `${padding}px`,
                  }}
                >
                  {showContentTitle && (
                    <h3 
                      className={`leading-tight line-clamp-4 ${getTextAlignmentClass()}`}
                      style={{
                        fontSize: `${contentTitleFontSize}px`,
                        fontWeight: contentTitleBold ? 'bold' : 'normal',
                        color: contentTitleColor,
                        marginBottom: showAuthorAndDate ? `${spaceBetweenItems}px` : '0',
                      }}
                    >
                      {feed.title}
                    </h3>
                  )}
                  
                  {showAuthorAndDate && (
                    <div className={`mt-2 ${getTextAlignmentClass()}`}>
                      <p 
                        style={{
                          fontSize: `${contentDescFontSize}px`,
                          fontWeight: contentDescBold ? 'bold' : 'normal',
                          color: contentDescColor,
                        }}
                      >
                        {feed.author} - {feed.source}
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
                  
                  {showContentDesc && feed.description && (
                    <p 
                      className={`mt-2 line-clamp-3 ${getTextAlignmentClass()}`}
                      style={{
                        fontSize: `${contentDescFontSize}px`,
                        fontWeight: contentDescBold ? 'bold' : 'normal',
                        color: contentDescColor,
                      }}
                    >
                      {feed.description}
                    </p>
                  )}
                </div>
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
    </div>
  );
};

export default MatrixGridView02;