import React from "react";
import { useSelector } from "react-redux";
import formatDate from "../../utils/formatDate";
import getTextAlignmentClass from "@/utils/getTextAlignmentClass";

const MatrixGridView02 = ({ feeds, widgetStateJSON=null }) => {
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
      title: {
        showContentTitle,
        mainTitle,
        contentTitleBold,
        contentTitleFontSize,
        contentTitleColor,
      },
      description: {
        showContentDesc,
        contentDescBold,
        contentDescMaxChars,
        contentDescFontSize,
        contentDescColor,
      },
    },
  } = widgetState;

  
  const displayFeeds = feeds?.slice(0, 3) || [];

  return (
    <div
      className="overflow-hidden mx-auto"
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
      <div
        className={`border-b ${getTextAlignmentClass(textAlignment)}`}
        style={{
          backgroundColor: feedTitleBgColor,
          borderColor: borderColor,
          padding: `${padding}px`,
        }}
      >
        <h2
          style={{
            fontSize: `${feedTitleFontSize}px`,
            fontWeight: feedTitleBold ? "bold" : "normal",
            color: feedTitleFontColor,
          }}
        >
          {mainTitle ? mainTitle : widgetTitle}
        </h2>
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-3"
        style={{
          gap: `${spaceBetweenItems}px`,
          height: `calc(100% - ${padding * 2}px)`,
          padding: `${padding}px`,
        }}
      >
        {displayFeeds.map((feed) => (
          <div
            key={feed.id}
            className="flex flex-col w-full overflow-hidden cursor-pointer"
            style={{
              border: border ? `1px solid ${borderColor}` : "1px solid #e5e7eb",
              borderRadius: corner === "Square" ? "0" : "8px",
              backgroundColor: contentbgColor,
            }}
          >
            {/* IMAGE */}
            <img
              src={feed.image}
              alt={feed.title}
              className="w-full object-cover"
              style={{
                height: "200px", // ← Adjust as you prefer
                borderRadius: corner === "Square" ? "0" : "8px 8px 0 0",
              }}
            />

            {/* TEXT */}
            {showContentTitle && (
              <div
                className={`px-2 py-1 ${getTextAlignmentClass(textAlignment)}`}
                style={{
                  fontSize: `${contentTitleFontSize}px`,
                  fontWeight: contentTitleBold ? "bold" : "normal",
                  color: contentTitleColor,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {feed.title}
              </div>
            )}

            {showContentDesc && (
              <div
                className={`p-2 ${getTextAlignmentClass(textAlignment)}`}
                style={{
                  fontSize: `${contentDescFontSize}px`,
                  fontWeight: contentDescBold ? "bold" : "normal",
                  color: contentDescColor,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {feed.description}
              </div>
            )}
            {showAuthorAndDate && (
              <>
                <div
                  className={`p-2 ${getTextAlignmentClass(textAlignment)}`}
                  style={{
                    fontSize: `${contentDescFontSize}px`,
                    fontWeight: "normal",
                    color: contentDescColor,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {feed.author ? `By ${feed.author}` : ``}
                </div>
                <div
                  className={`p-2 ${getTextAlignmentClass(textAlignment)}`}
                  style={{
                    fontSize: `${contentDescFontSize}px`,
                    fontWeight: "normal",
                    color: contentDescColor,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {!feed.author ? `By ${feed.source}` : `${feed.source}`}
                </div>
                                <div
                  className={`p-2 ${getTextAlignmentClass(textAlignment)}`}
                  style={{
                    fontSize: `${contentDescFontSize}px`,
                    fontWeight: "normal",
                    color: contentDescColor,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatDate(feed.published_at, dateFormat)}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatrixGridView02;
