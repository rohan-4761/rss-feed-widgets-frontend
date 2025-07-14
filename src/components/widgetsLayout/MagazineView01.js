import { useSelector } from 'react-redux';
import formatDate from '../../utils/formatDate';

const MagazineView01 = ({ feeds, widgetStateJSON=null }) => {
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

  if (!feeds || feeds.length === 0) {
    return (
      <div 
        className="text-gray-500 mx-auto"
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
        Loading...
      </div>
    );
  }

  return (
    <div 
      className="mx-auto"
      style={{
        width: widthInPixels ? `${width}px` : `${width}%`,
        height: heightInPixels ? `${height}px` : `${height}%`,
        fontFamily: fontStyle,
        backgroundColor: contentbgColor,
        border: border ? `1px solid ${borderColor}` : 'none',
        borderRadius: corner == "Square"? '0' : '8px',
        padding: `${padding}px`,
        overflowY: 'scroll',
      
      }}
    >
      {/* Header */}
      <h2 
        className={`border-b pb-2 mb-4 ${getTextAlignmentClass()}`}
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

      {feeds.slice(0, displayNoOfPost).map((feed) => (
        <div
          key={feed.id}
          className={`flex flex-row items-center justify-between w-full h-full p-4 ${getTextAlignmentClass()}`}
          style={{
            marginBottom: `${spaceBetweenItems}px`,
            borderRadius: corner == "Square"? '0' : '8px',
          }}
        >
          <img 
            className="h-full w-1/3" 
            src={feed.image} 
            alt={feed.title}
            style={{
              borderRadius: corner == "Square"? '0' : '8px',
            }}
          />
          
          <div className="flex flex-col justify-center ml-4">
            {showContentTitle && (
              <div 
                className="mb-4"
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
                className="text-sm mt-2"
                style={{
                  fontSize: `${contentDescFontSize - 2}px`,
                  color: contentDescColor,
                }}
              >
                {formatDate(feed.published_at, dateFormat)}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MagazineView01;