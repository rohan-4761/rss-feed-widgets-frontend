

const MatrixGridView02 = ({feeds}) => {
  return (
     <div className="bg-white border rounded border-gray-300 h-[50vh] overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-700">Widget Title</h2>
      </div>
      
      {/* Grid Content */}
      <div className="p-4 h-full overflow-y-auto">
        <div className="grid grid-cols-3 gap-4">
          {feeds.map((feed) => (
            <div
              key={feed.id}
              className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer"
            >
              <div className="relative">
                <img
                  src={feed.image}
                  alt={feed.title}
                  className="w-full h-44 object-cover"
                />
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <h3 className="text-sm font-medium text-gray-800 leading-tight line-clamp-4">
                  {feed.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default MatrixGridView02