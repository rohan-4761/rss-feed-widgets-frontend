
const MatrixCardView02 = ({feeds}) => {
  return (
    <div className="bg-white p-5 border rounded border-blue-600 h-[60vh] overflow-y-auto">
      <h2 className="text-xl font-semibold border-b pb-2 text-blue-800">
        Widgets Title
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {feeds.map((feed) => (
          <div
            key={feed.id}
            className="bg-white border shadow-sm overflow-hidden"
          >
            <img
              src={feed.image}
              alt={feed.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-2">
              <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                {feed.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatrixCardView02