import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import MagazineView01 from "@/components/widgetsLayout/MagazineView01";
import MagazineView02 from "@/components/widgetsLayout/MagazineView02";
import ListView from "@/components/widgetsLayout/ListView";
import MatrixCardView01 from "@/components/widgetsLayout/MatrixCardView01";
import MatrixCardView02 from "@/components/widgetsLayout/MatrixCardView02";
import MatrixGridView01 from "@/components/widgetsLayout/MatrixGridView01";
import MatrixGridView02 from "@/components/widgetsLayout/MatrixGridView02";
import CarouselView01 from "@/components/widgetsLayout/CarouselView01";
import CarouselView02 from "@/components/widgetsLayout/CarouselView02";

import { route } from "@/constants/routes";

import widgetFormSchema from "@/lib/formSchema/widgetFormSchema";
import {
  updateWidgetState,
  resetWidget,
  setFullWidget,
} from "@/lib/features/widgetSlice";

import { handleFeeds } from "@/utils/handleFunctions/handleFeeds";
import {
  saveEditedWidgets,
  saveNewWidgets,
} from "@/utils/handleFunctions/handleWidgets";
import {
  loadFromLocalStorage,
  removeWidgetsFromLocalStorage,
} from "@/utils/localStorage";

const PreviewWidgets = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);
  const dispatch = useDispatch();
  const widgetTitle = useSelector((state) => state.widget.widgetTitle);
  const topic = useSelector((state) => state.widget.topic);
  const rssFeed = useSelector((state) => state.widget.rssFeed);
  const widgetLayout = useSelector((state) => state.widget.widgetLayout);
  const pathname = usePathname();
  const router = useRouter();

  const handleSave = async () => {
    try {
      const widget_data = loadFromLocalStorage("widget");
      console.log("widget_data before validation:", widget_data);
      const validationResult = widgetFormSchema.safeParse(widget_data);

      if (!validationResult.success) {
        const { fieldErrors, formErrors } = validationResult.error.flatten();

        if (formErrors?.length > 0) {
          toast.error(formErrors.join(", "));
          console.log("Form-level errors:", formErrors);
        }

        for (const key in fieldErrors) {
          const messages = fieldErrors[key];
          if (messages?.length > 0) {
            toast.error(`${key}: ${messages.join(", ")}`);
            console.warn(`${key}: ${messages.join(", ")}`);
          }
        }

        console.log(
          "Full error object for debug:",
          validationResult.error.format()
        );

        return;
      }

      const validWidgetData = validationResult.data;
      console.log("pathname", pathname);
      if (pathname.startsWith(route["EDIT_WIDGET"])) {
        const segments = pathname.split("/");
        const widget_id = segments[segments.length - 1];
        const savedWidgetData = loadFromLocalStorage("existingWidget");
        const res = await saveEditedWidgets(
          widget_id,
          validWidgetData,
          savedWidgetData
        );
        console.log(res);
        if (res.success) {
          toast.success(res.message);
          removeWidgetsFromLocalStorage(true);
          dispatch(resetWidget());
          router.push(route["MY_WIDGETS"]);
        } else {
          toast.error(res.message);
        }
      } else if (pathname.startsWith(route["CREATE_WIDGETS"])) {
        const res = await saveNewWidgets(validWidgetData);
        if (res.success) {
          toast.success(res.message);
          removeWidgetsFromLocalStorage();
          dispatch(resetWidget());
          router.push(route["MY_WIDGETS"]);
        } else {
          toast.error(res.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleResetWidget = () => {
    removeWidgetsFromLocalStorage();
    const storedWidget = loadFromLocalStorage("existingWidget");
    if (storedWidget) {
      dispatch(setFullWidget(storedWidget));
    } else {
      dispatch(resetWidget());
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(topic, rssFeed);
        const articlesData = await handleFeeds({
          topic: topic ?? "",
          rssFeed: rssFeed ?? "",
        });
        if (!articlesData || articlesData.length === 0) {
          throw new Error("No articles found");
        }
        setArticles(articlesData);
      } catch (err) {
        setError("Error fetching articles: " + err.message);
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    if (topic || rssFeed) {
      fetchArticles();
    } else {
      setLoading(false);
    }
  }, [topic, rssFeed]);

  useEffect(() => {
    if (widgetLayout) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [widgetLayout]);

  const renderPreview = (previewLayout) => {
    if (!previewLayout) {
      return <div>Loading Preview...</div>;
    }
    console.log(previewLayout);
    console.log("Article: ", articles[0]);
    switch (previewLayout) {
      case "MagazineView01":
        return <MagazineView01 feeds={articles} />;
      case "MagazineView02":
        return <MagazineView02 feeds={articles} />;
      case "ListView":
        return <ListView feeds={articles} />;
      case "MatrixCardView01":
        return <MatrixCardView01 feeds={articles} />;
      case "MatrixCardView02":
        return <MatrixCardView02 feeds={articles} />;
      case "MatrixGridView01":
        return <MatrixGridView01 feeds={articles} />;
      case "MatrixGridView02":
        return <MatrixGridView02 feeds={articles} />;
      case "CarouselView01":
        return <CarouselView01 feeds={articles} />;
      case "CarouselView02":
        return <CarouselView02 feeds={articles} />;
      default:
        return <div>Error Loading preview.....</div>;
    }
  };

  if (loading || error || !widgetLayout) {
    console.log(widgetLayout);
    return (
      <section className="bg-white p-6 shadow rounded-lg space-y-6 mt-6">
        <div className="text-center text-gray-500">
          {error ?? "Loading Preview..."}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white p-6 shadow rounded-lg space-y-6 mt-6">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Enter the widget name here"
          value={widgetTitle}
          onChange={(e) =>
            dispatch(
              updateWidgetState({
                path: "widgetTitle",
                value: e.target.value,
              })
            )
          }
          className="border border-gray-300 rounded-lg px-4 py-2 w-3/4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center w-1/4 justify-between">
          <button
            className="bg-blue-500 text-sm text-white px-4 py-2 rounded-lg ml-4 hover:bg-blue-700 transition-colors"
            onClick={() => handleSave()}
          >
            Save
          </button>
          <button
            className="bg-gray-200 text-sm text-red-600 px-4 py-2 rounded-lg ml-2 hover:bg-red-700 hover:text-white transition-colors"
            onClick={() => handleResetWidget()}
          >
            Reset
          </button>
        </div>
      </div>
      {renderPreview(widgetLayout)}
    </section>
  );
};

export default PreviewWidgets;
