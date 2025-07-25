"use client";

import { use, useEffect, useState } from "react";

import { getWidgets } from "@/utils/handleFunctions/handleWidgets";
import { handleFeeds } from "@/utils/handleFunctions/handleFeeds";
import Spinner from "@/components/ui/Spinner";

import MagazineView01 from "@/components/widgetsLayout/MagazineView01";
import MagazineView02 from "@/components/widgetsLayout/MagazineView02";
import ListView from "@/components/widgetsLayout/ListView";
import MatrixCardView01 from "@/components/widgetsLayout/MatrixCardView01";
import MatrixCardView02 from "@/components/widgetsLayout/MatrixCardView02";
import MatrixGridView01 from "@/components/widgetsLayout/MatrixGridView01";
import MatrixGridView02 from "@/components/widgetsLayout/MatrixGridView02";
import CarouselView01 from "@/components/widgetsLayout/CarouselView01";
import CarouselView02 from "@/components/widgetsLayout/CarouselView02";

const EmbedWidgetPage = ({ params }) => {
  const resolvedParams = use(params);
  const [widgetState, setWidgetState] = useState();
  const [widgetLayout, setWidgetLayout] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  const widget_id = resolvedParams.widget_id;

  useEffect(() => {
    const getWidgetById = async (widgetId) => {
      try {
        const res = await getWidgets(widgetId);
        if (res.success) {
          const { id, userId, ...widgetObject } = res.widget;
          if (typeof widgetObject === "string") {
            widgetObject = JSON.parse(widgetObject);
          }
          try {
            console.log(widgetObject);
            delete widgetObject.createdAt;
            delete widgetObject.updatedAt;
            setWidgetState(widgetObject);
            setWidgetLayout(widgetObject.widgetLayout);
            console.log(widgetState);
          } catch (err) {
            setError("Error fetching articles: " + err.message);
          }
        }
      } catch (err) {
        setError("Error fetching articles: " + err.message);
      }
    };
    getWidgetById(widget_id);
  }, [widget_id]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const topic = widgetState.topic;
        const rssFeed = widgetState.rssFeed;
        const articlesData = await handleFeeds({
          topic: topic ?? "",
          rssFeed: rssFeed ?? "",
        });
        if (!articlesData || articlesData.length === 0) {
          setError("No articles found");
        }
        setArticles(articlesData);
      } catch (err) {
        setError("Error fetching articles: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (widgetState) {
      fetchArticles();
    } else {
      setLoading(false);
    }
  }, [widgetState]);

  const renderWidgets = (previewLayout) => {
    if (!previewLayout) {
      return <div>Loading Widgets...</div>;
    }
    console.log(previewLayout);
    switch (previewLayout) {
      case "MagazineView01":
        return (
          <MagazineView01 feeds={articles} widgetStateJSON={widgetState} />
        );
      case "MagazineView02":
        return (
          <MagazineView02 feeds={articles} widgetStateJSON={widgetState} />
        );
      case "ListView":
        return <ListView feeds={articles} widgetStateJSON={widgetState} />;
      case "MatrixCardView01":
        return (
          <MatrixCardView01 feeds={articles} widgetStateJSON={widgetState} />
        );
      case "MatrixCardView02":
        return (
          <MatrixCardView02 feeds={articles} widgetStateJSON={widgetState} />
        );
      case "MatrixGridView01":
        return (
          <MatrixGridView01 feeds={articles} widgetStateJSON={widgetState} />
        );
      case "MatrixGridView02":
        return (
          <MatrixGridView02 feeds={articles} widgetStateJSON={widgetState} />
        );
      case "CarouselView01":
        return (
          <CarouselView01 feeds={articles} widgetStateJSON={widgetState} />
        );
      case "CarouselView02":
        return (
          <CarouselView02 feeds={articles} widgetStateJSON={widgetState} />
        );
      default:
        return <div>Error Loading Widgets.....</div>;
    }
  };
  if (loading || error || !widgetLayout) {
    console.log(widgetLayout);
    return (
      <section className="bg-white p-6 shadow rounded-lg space-y-6 mt-6">
        {error ? (
          <div className="text-center text-gray-500">{error}</div>
        ) : (
          <Spinner />
        )}
      </section>
    );
  }
  return <div>{renderWidgets(widgetLayout)}</div>;
};

export default EmbedWidgetPage;
