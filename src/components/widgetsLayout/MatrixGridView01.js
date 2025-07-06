import React from 'react'

const MatrixGridView01 = ({feeds}) => {
  return (
    <div className="h-[50vh] overflow-y-auto p-4  bg-white border border-blue-600 rounded-lg">
      <div className="grid grid-cols-3 gap-2">
        {feeds.map((feed) => (
          <div key={feed.id} className="relative group">
            <img
              src={feed.image}
              alt={feed.title}
              className="w-full h-28 object-cover rounded"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs text-center p-1">
              {feed.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatrixGridView01