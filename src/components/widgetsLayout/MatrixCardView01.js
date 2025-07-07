import { useSelector } from 'react-redux';
import formatDate from '../../utils/formatDate';

const MatrixCardView01 = ({ feeds }) => {
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

  const renderFeeds = (feeds) => {
    return feeds.slice(0, displayNoOfPost).map((feed, index) => (
      (index % 3 === 0) ? (
        <div 
          key={feed.id} 
          className="lg:col-span-2 lg:row-span-2 relative group cursor-pointer overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          style={{
            borderRadius: squareCorner ? '0' : '8px',
            marginBottom: `${spaceBetweenItems}px`,
          }}
        >
          <img
            src={feed.image}
            alt={feed.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            {showContentTitle && (
              <h3 
                className={`leading-tight bg-grey-400 bg-opacity-50 ${getTextAlignmentClass()}`}
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
                className="mt-2"
                style={{
                  fontSize: `${contentDescFontSize}px`,
                  color: contentDescColor,
                }}
              >
                {feed.source} - {formatDate(feed.published_at, dateFormat)}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div 
          key={feed.id} 
          className="relative group cursor-pointer overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          style={{
            borderRadius: squareCorner ? '0' : '8px',
            marginBottom: `${spaceBetweenItems}px`,
          }}
        >
          <img
            src={feed.image}
            alt={feed.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            {showContentTitle && (
              <h3 
                className={`leading-tight bg-grey-400 bg-opacity-50 ${getTextAlignmentClass()}`}
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
                className="mt-2"
                style={{
                  fontSize: `${contentDescFontSize}px`,
                  color: contentDescColor,
                }}
              >
                {feed.source} - {formatDate(feed.published_at, dateFormat)}
              </p>
            )}
          </div>
        </div>
      )
    ));
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
      
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        style={{
          gap: `${spaceBetweenItems}px`,
        }}
      >
        {feeds && feeds.length > 0 ? (
          renderFeeds(feeds)
        ) : (
          <div className="text-gray-500">No feeds available</div>
        )}
      </div>
    </div>
  );
};

export default MatrixCardView01;