import { Star, Bookmark, Share, MoreHorizontal } from "lucide-react";

const GridViewList = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {articles.map((article) => (
        <div
          key={`grid-${article.id}`}
          className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="h-48 bg-gray-200 overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 text-base leading-tight mb-3 line-clamp-3">
              {article.title}
            </h3>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{article.publication}</span>
                <span>by</span>
                <span className="text-blue-600">{article.author}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{article.timeAgo}</span>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-gray-400 hover:text-yellow-500 cursor-pointer" />
                <Bookmark className="w-4 h-4 text-gray-400 hover:text-blue-500 cursor-pointer" />
                <Share className="w-4 h-4 text-gray-400 hover:text-green-500 cursor-pointer" />
                <MoreHorizontal className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridViewList;
