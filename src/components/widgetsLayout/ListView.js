import React from "react";
import { useSelector } from "react-redux";
import formatDate from "../../utils/formatDate";
import getTextAlignmentClass from "@/utils/getTextAlignmentClass";
import truncateText from "@/utils/truncateText";

const ListView = ({ feeds, widgetStateJSON=null }) => {
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
      mainTitle,
      feedTitleFontSize,
      feedTitleBold,
      feedTitleBgColor,
      feedTitleFontColor,
    },
    feedContent: {
      contentbgColor,
      showAuthorAndDate,
      displayLink,
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

  return (
    <div
      className="overflow-y-auto mx-auto"
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
      <h2
        className={`border-b pb-2 ${getTextAlignmentClass(textAlignment)}`}
        style={{
          fontSize: `${feedTitleFontSize}px`,
          fontWeight: feedTitleBold ? "bold" : "normal",
          color: feedTitleFontColor,
          backgroundColor: feedTitleBgColor,
          marginBottom: `${spaceBetweenItems}px`,
          padding: `${padding}px`,
        }}
      >
        {mainTitle ? mainTitle : widgetTitle}
      </h2>

      {feeds && feeds.length > 0 ? (
        feeds.slice(0, displayNoOfPost).map((feed) => (
          <div
            key={feed.id}
            className={`flex flex-col items-start justify-start w-full p-4 rounded-lg ${getTextAlignmentClass(
              textAlignment
            )}`}
            style={{
              marginBottom: `${spaceBetweenItems}px`,
              borderRadius: corner == "Square" ? "0" : "8px",
            }}
          >
            {showContentTitle && (
              <div
                className="mb-1"
                style={{
                  fontSize: `${contentTitleFontSize}px`,
                  fontWeight: contentTitleBold ? "bold" : "normal",
                  color: contentTitleColor,
                }}
              >
                {truncateText(feed.title, 50)}
              </div>
            )}
            {showContentDesc && (
              <p
                className="mb-1"
                style={{
                  fontSize: `${contentDescFontSize}px`,
                  fontWeight: contentDescBold ? "bold" : "normal",
                  color: contentDescColor,
                }}
              >
                {truncateText(feed.description, 80)}
              </p>
            )}
            {showAuthorAndDate && (
              <p
                className="mb-1"
                style={{
                  fontSize: `${contentDescFontSize}px`,
                  fontWeight: contentDescBold ? "bold" : "normal",
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
                {displayLink? `By ${feed.link} -` : "" } {formatDate(feed.published_at, dateFormat)}
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
