"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  Filter,
  X,
  AlignJustify,
  LayoutList,
  LayoutGrid,
  House,
} from "lucide-react";
import { useSelector } from "react-redux";

import GridViewList from "@/components/articleComponents/GridViewList";
import UserModal from "@/components/modal/UserModal";
import CompactList from "@/components/articleComponents/CompactList";
import CardViewList from "@/components/articleComponents/CardViewList";
import { sources, topics } from "@/constants/metadata";
import { handleFeeds } from "@/utils/handleFeeds";
import timeAgo from "@/utils/timeAgo";
import Sidebar from "@/components/Sidebar";

const Home = () => {
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [source, setSource] = useState("");
  const [topic, setTopic] = useState("");
  const [filters, setFilters] = useState({});
  const [viewStyle, setViewStyle] = useState("Compact");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.user);

  const filterOptions = {
    sources,
    topics,
  };

  // Fixed useEffect with proper dependency array
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        const articles = await handleFeeds({ search, ...filters });
        setArticles(articles);
      } catch (err) {
        setError("Error fetching articles: " + err.message);
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [search, filters]);
  // Changed from object to array

  // Fixed checkbox handlers to handle single selection properly
  const handleSourceChange = (sourceItem) => {
    setSource(source === sourceItem ? "" : sourceItem);
  };

  const handleTopicChange = (topicItem) => {
    setTopic(topic === topicItem ? "" : topicItem);
  };

  const applyFilters = () => {
    setIsFilterOpen(false);
    setFilters({ source, topic });
  };

  const clearFilters = () => {
    setSource("");
    setTopic("");
    setFilters({});
  };

  const renderArticles = () => {
  switch (viewStyle) {
    case "Card":
      return <CardViewList articles={articles} timeCalculator={timeAgo} />;
    case "Compact":
      return <CompactList articles={articles} timeCalculator={timeAgo} />
    case "Grid":
      return <GridViewList articles={articles} timeCalculator={timeAgo} />
    default:
      return null;
  }
};


  return (
    <>
      <nav className="bg-white shadow-sm px-6 py-3 flex items-center justify-between z-40 fixed top-0 w-full">
        <div className="flex-1 w-1/2 mx-auto flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-50 transition ${
                  source || topic
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : "bg-white"
                }`}
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filters</span>
                {(source || topic) && (
                  <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 min-w-5 h-5 flex items-center justify-center">
                    {(source ? 1 : 0) + (topic ? 1 : 0)}
                  </span>
                )}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Filter Dropdown Menu */}
              {isFilterOpen && (
                <div className="absolute top-full left-0 mt-2 w-96 bg-white border rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Filters</h3>
                    <div className="flex items-center gap-2">
                      {(source || topic) && (
                        <button
                          onClick={clearFilters}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Clear all
                        </button>
                      )}
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 divide-x max-h-80">
                    {/* Sources */}
                    <div className="p-3">
                      <h4 className="font-medium text-gray-900 mb-3 sticky top-0 bg-white">
                        Sources {source && "(1)"}
                      </h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {filterOptions.sources.map((sourceItem) => (
                          <label
                            key={sourceItem}
                            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                          >
                            <input
                              type="checkbox"
                              checked={source === sourceItem}
                              onChange={() => handleSourceChange(sourceItem)}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">
                              {sourceItem}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Topics */}
                    <div className="p-3">
                      <h4 className="font-medium text-gray-900 mb-3 sticky top-0 bg-white">
                        Topics {topic && "(1)"}
                      </h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {filterOptions.topics.map((topicItem) => (
                          <label
                            key={topicItem}
                            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                          >
                            <input
                              type="checkbox"
                              checked={topic === topicItem}
                              onChange={() => handleTopicChange(topicItem)}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">
                              {topicItem}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Apply Filters Button */}
                  <div className="p-4 border-t bg-gray-50">
                    <button
                      onClick={applyFilters}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right-aligned Login Button */}
        {!user.isLoggedIn ? (
                <button
                  onClick={() => router.push(route["LOGIN"])}
                  className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Login
                </button>
              ) : (
                <>
                  <button
                    className="mr-20 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
                    onClick={() => setIsModalOpen(true)}
                  >
                    {user?.user?.user_name[0] || "Guest"}
                  </button>
                  <UserModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                  />
                </>
              )}
      </nav>

      <div className="max-w-4xl mx-auto p-4 bg-white mt-20">
        {/* Header */}
        <div className="mb-6 flex flex-col">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <span className="mr-2">
              <House />
            </span>
            <span>:</span>
            <span className="ml-2 text-black text-lg "> View Style : </span>
            <button onClick={()=>{setViewStyle("Compact")}}  className={`ml-4 ${viewStyle == "Compact"? "text-blue-600":"text-black" }`}> <AlignJustify /> </button>
            <button onClick={()=>{setViewStyle("Card")}}  className={`ml-4 ${viewStyle == "Card"? "text-blue-600":"text-black" }`}>  <LayoutList /> </button>
            <button onClick={()=>{setViewStyle("Grid")}}  className={`ml-4 ${viewStyle == "Grid"? "text-blue-600":"text-black" }`}> <LayoutGrid /> </button>
          </div>
          {loading && <span className="ml-2 text-blue-600">Loading...</span>}
          {error && <span className="ml-2 text-red-600">Error: {error}</span>}
        </div>
              <Sidebar />
        {articles.length > 0 ? (
          renderArticles()  
        ) : (
          !loading && (
            <div className="text-center py-8 text-gray-500">
              No articles found. Try adjusting your search or filters.
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Home;
