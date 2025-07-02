"use client";

import GridViewList from "@/components/articleComponents/GridViewList";
import HomeNavbar from "@/components/HomeNavbar";
import CompactList from "@/components/articleComponents/CompactList";
import CardViewList from "@/components/articleComponents/CardViewList";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Filter, X } from "lucide-react";
import { sources, topics } from "@/constants/metadata";
import { handleFeeds } from "@/utils/handleFeeds";

const Home = () => {
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [source, setSource] = useState("");
  const [topic, setTopic] = useState("");
  const [filters, setFilters] = useState({});
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

        const response = await handleFeeds({ search, ...filters });
        const result = await response.json();

        if (result.success) {
          setArticles(result.data);
        } else {
          setError("Failed to fetch articles");
        }
      } catch (err) {
        setError("Error fetching articles: " + err.message);
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [search, filters]); // Changed from object to array

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
        <Link href="/login" className="w-1/2 flex flex-row-reverse">
          <button className="mr-20 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            Login
          </button>
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto p-4 bg-white mt-20">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <span className="mr-2">🏠</span>
            <span className="mr-2">All Post</span>
            <span>:</span>
            {loading && <span className="ml-2 text-blue-600">Loading...</span>}
            {error && <span className="ml-2 text-red-600">Error: {error}</span>}
          </div>
        </div>

        {/* Articles Display */}
        {/* {articles.length > 0 ? (
          <CompactList articles={articles} />
        ) : (
          !loading && (
            <div className="text-center py-8 text-gray-500">
              No articles found. Try adjusting your search or filters.
            </div>
          )
        )} */}
        {/* {articles.length > 0 ? (
          <CardViewList articles={articles} />
        ) : (
          !loading && (
            <div className="text-center py-8 text-gray-500">
              No articles found. Try adjusting your search or filters.
            </div>
          )
        )} */}
        {/* Uncomment these for other views */}
                {articles.length > 0 ? (
        <GridViewList articles={articles} />
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
