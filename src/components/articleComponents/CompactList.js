import { Star, Bookmark, Share, MoreHorizontal } from 'lucide-react';

const CompactList = ({articles}) => {
  return (
    <div className="space-y-4 mb-8">
        {articles.map((article) => (
          <div key={article.id} className="flex items-center space-x-4 py-2 hover:bg-gray-50 rounded-lg px-2 transition-colors">
            <Star className="w-4 h-4 text-gray-400 hover:text-yellow-500 cursor-pointer flex-shrink-0" />
            <div className="flex-grow min-w-0">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                <span className="font-medium">{article.publication}</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 truncate">
                {article.title}
              </h3>
              <p className="text-xs text-gray-600 truncate">
                {article.subtitle}
              </p>
            </div>
            <div className="text-xs text-gray-500 flex-shrink-0">
              {article.timeAgo}
            </div>
          </div>
        ))}
      </div>
  )
}

export default CompactList