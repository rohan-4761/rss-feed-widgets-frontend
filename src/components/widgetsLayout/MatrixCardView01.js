const MatrixCardView01 = ({ feeds }) => {
  return (
    <div className="bg-white p-5 border rounded border-blue-600 h-[50vh] overflow-y-auto">
      <h2 className="text-xl font-semibold border-b pb-2 text-blue-800">
        Widgets Title
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Featured large item */}
        {feeds && feeds.length > 0 ? (
          renderFeeds(feeds)
        ) : (
          <div className="text-gray-500">No feeds available</div>
        )}
      </div>
    </div>
  );
};


const renderFeeds = (feeds) => {
    return feeds.map((feed, index) => (
        (index%3 === 0) ? (
            <div key={feed.id} className="lg:col-span-2 lg:row-span-2 relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <img
                    src={feed.image}
                    alt={feed.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                   <h3 className="text-md font-bold leading-tight bg-grey-400 bg-opacity-50">
              {feeds[0]?.title}
            </h3>
                </div>
            </div>
        ) : (
            <div key={feed.id} className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <img
                    src={feed.image}
                    alt={feed.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-md font-bold leading-tight bg-grey-400 bg-opacity-50">
                        {feed.title}
                    </h3>
                </div>
            </div>
        )


    ));
}


export default MatrixCardView01;
