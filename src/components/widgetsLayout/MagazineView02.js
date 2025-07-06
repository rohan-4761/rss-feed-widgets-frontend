const MagazineView02 = ({ feeds }) => {
  if (!feeds || feeds.length === 0) {
    return <div className="text-gray-500">Loading...</div>;
  }

  return (
    <div className="bg-white h-[50vh] overflow-y-auto p-5 border rounded border-blue-600">
      {feeds.slice(0, 3).map((feed) => (
        <div
          key={feed.id}
          className="flex flex-col items-start justify-center w-full p-4 mb-4 rounded-lg bg-gray-50 shadow-sm"
        >
          <img
            className="h-40 w-full object-cover rounded-md"
            src={feed.image}
            alt={feed.title}
          />
          <div className="flex flex-col justify-start mt-2">
            <div className="text-md font-semibold text-blue-800 mb-1">
              {feed.title}
            </div>
            <p className="text-gray-700 text-xs mb-1">
              {feed.source} - {feed.author}
            </p>
            <span className="text-sm text-gray-500">
              {new Date(feed.published_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MagazineView02;
