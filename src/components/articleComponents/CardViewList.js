import { Star, Bookmark, Share, MoreHorizontal } from 'lucide-react';


const CardViewList = ({articles}) => {
  return (
    <div className="space-y-6 mb-8">
        {articles.map((article) => (
          <div key={`detailed-${article.id}`} className="flex space-x-4 hover:bg-gray-50 rounded-lg p-3 transition-colors">
            <div className="w-24 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow min-w-0">
              <h3 className="font-semibold text-gray-900 text-base leading-tight mb-2 line-clamp-2">
                {article.title}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <span className="font-medium">{article.publication}</span>
                <span>by</span>
                <span className="text-blue-600">{article.author}</span>
                <span>-</span>
                <span>{article.timeAgo}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {article.subtitle}
              </p>
            </div>
            <div className="flex-shrink-0">
              <Star className="w-5 h-5 text-gray-400 hover:text-yellow-500 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
  )
}

export default CardViewList