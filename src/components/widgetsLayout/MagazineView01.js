

const MagazineView01 = ({ feeds }) => {
  if (!feeds || feeds.length === 0) {
    return <div className="text-gray-500">Loading...</div>;
  }
  return (
    <div className="bg-white p-5 border rounded border-blue-600">
      {feeds.slice(0, 3).map((feed) => (
        <div
          key={feed.id}
          className="flex flex-row items-center justify-between w-full h-full p-4 rounded-lg"
        >
          <img className="h-full w-1/3" src={feed.image} alt={feed.title} />
          <div className="flex flex-col justify-center ml-4">
            <div className="text-md font-semibold text-blue-800 mb-4">
              {feed.title}
            </div>
            <p className="text-gray-700 text-xs ">{feed.source} - {feed.author}</p>
            <span className="text-sm text-gray-500 mt-2">
              {feed.published_at}{" "}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MagazineView01;
