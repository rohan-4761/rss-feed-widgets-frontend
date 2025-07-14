import { useSelector } from 'react-redux';
import formatDate from '../../utils/formatDate';

const MatrixCardView02 = ({ feeds, widgetStateJSON=null }) => {
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

  return (
    <div 
      className="overflow-hidden mx-auto"
      style={{
        width: widthInPixels ? `${width}px` : `${width}%`,
        height: heightInPixels ? `${height}px` : `${height}%`,
        fontFamily: fontStyle,
        backgroundColor: contentbgColor,
        border: border ? `1px solid ${borderColor}` : 'none',
        borderRadius: corner == "Square"? '0' : '8px',
      }}
    >
      {/* Header */}
      <div 
        className="px-4 py-3 border-b"
        style={{
          backgroundColor: feedTitleBgColor,
          borderColor: borderColor,
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
      </div>

      {/* Grid Content */}
      <div 
        className="p-4 h-full overflow-y-auto"
        style={{
          padding: `${padding}px`,
        }}
      >
        <div 
          className="grid grid-cols-2"
          style={{
            gap: `${spaceBetweenItems}px`,
          }}
        >
          {feeds.slice(0, displayNoOfPost).map((feed) => (
            <div
              key={feed.id}
              className={`shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200 ${getTextAlignmentClass()}`}
              style={{
                backgroundColor: contentbgColor,
                border: border ? `1px solid ${borderColor}` : 'none',
                borderRadius: corner == "Square"? '0' : '8px',
              }}
            >
              <img
                src={feed.image}
                alt={feed.title}
                className="w-full h-32 object-cover"
              />
              <div 
                className="p-2"
                style={{
                  padding: `${padding}px`,
                }}
              >
                {showContentTitle && (
                  <h3 
                    className="line-clamp-2"
                    style={{
                      fontSize: `${contentTitleFontSize}px`,
                      fontWeight: contentTitleBold ? 'bold' : 'normal',
                      color: contentTitleColor,
                    }}
                  >
                    {feed.title}
                  </h3>
                )}
                
                {showAuthorAndDate && (
                  <p 
                    className="mt-1"
                    style={{
                      fontSize: `${contentDescFontSize}px`,
                      fontWeight: contentDescBold ? 'bold' : 'normal',
                      color: contentDescColor,
                    }}
                  >
                    {feed.source} - {formatDate(feed.published_at, dateFormat)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatrixCardView02;