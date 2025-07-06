import React from "react";

const ListView = ({feeds}) => {
  return <div className="bg-white p-5 border rounded border-blue-600 h-[50vh] overflow-y-auto">
    <h2 className="text-xl font-semibold border-b pb-2 text-blue-800">
        Widgets Title
      </h2>
    {feeds && feeds.length > 0 ? (
      feeds.map((feed) => (
        <div
          key={feed.id}
          className="flex flex-col items-start justify-start w-full h-1/3 p-4 rounded-lg mb-4"
        >
          <div className="text-md font-semibold text-blue-800 mb-1">
            {feed.title}
          </div>
          <p className="text-gray-700 text-xs mb-1">{feed.source} - {feed.author}</p>
          <span className="text-sm text-gray-500">
            By {feed.link}-{new Date(feed.published_at).toLocaleDateString()}{" "}
          </span>
        </div>
      ))
    ) : (
      <div className="text-gray-500">No feeds available</div>
    )}
  </div>;
};

export default ListView;
