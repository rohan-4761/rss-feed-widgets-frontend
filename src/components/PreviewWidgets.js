import { useState, useEffect } from "react";
import { handleFeeds } from "@/utils/handleFeeds";

import MagazineView01 from "./widgetsLayout/MagazineView01";
import MagazineView02 from "./widgetsLayout/MagazineView02";
import ListView from "./widgetsLayout/ListView";
import MatrixCardView01 from "./widgetsLayout/MatrixCardView01";
import MatrixCardView02 from "./widgetsLayout/MatrixCardView02";
import MatrixGridView01 from "./widgetsLayout/MatrixGridView01";
import MatrixGridView02 from "./widgetsLayout/MatrixGridView02";
import CarouselView01 from "./widgetsLayout/CarouselView01";
import CarouselView02 from "./widgetsLayout/CarouselView02";
const PreviewWidgets = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        const articlesData = await handleFeeds();
        if (!articlesData || articlesData.length === 0) {
          throw new Error("No articles found");
        }
        console.log("Fetched articles:", articlesData[0]);
        setArticles(articlesData);
      } catch (err) {
        setError("Error fetching articles: " + err.message);
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };
    setInterval(fetchArticles, 10000); // Refresh every 60 seconds
    return () => clearInterval(fetchArticles); // Cleanup on unmount
  }, []);
  return (
    <section className="bg-white p-6 shadow rounded-lg space-y-6 mt-6">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Enter the widget name here"
          className="border border-gray-300 rounded-lg px-4 py-2 w-3/4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center w-1/4 justify-between">
          <button className="bg-blue-500 text-sm text-white px-4 py-2 rounded-lg ml-4 hover:bg-blue-700 transition-colors">
            Save
          </button>
          <button className="bg-gray-200 text-sm text-red-600 px-4 py-2 rounded-lg ml-2 hover:bg-red-700 hover:text-white transition-colors">
            Reset
          </button>
        </div>
      </div>
      {loading || error ? (
        <div className="text-center text-gray-500">{error?? "Loading Preview..."}</div>
      ) : (
        <CarouselView02 feeds = {articles}/>
      )}
    </section>
  );
};

export default PreviewWidgets;
