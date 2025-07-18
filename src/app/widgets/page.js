"use client";
import { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { route } from "@/constants/routes";
import { getWidgets, deleteWidget } from "@/utils/handleWidgets";
import WidgetEmbedModal from "@/components/modal/WidgetEmbedModal";
import Spinner from "@/components/ui/Spinner";

const Widget = () => {
  const [widgets, setWidgets] = useState([]);
  const [method, setMethod] = useState("GET");
  const [openModal, setOpenModal] = useState(false);
  const [openWidgetId, setOpenWidgetId] = useState();
  const [openWidgetData, setOpenWidgetData] = useState();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        setLoading(true);  
        const res = await getWidgets();
        if (res.success) {
          setWidgets(res.widgets);
        } else {
          toast.error("Failed to fetch widgets:", res.message);
        }
      } catch (error) {
        console.error("Error fetching widgets:", error);
      } finally{
        setLoading(false);
      }
    };
    setLoading(true);
    fetchWidgets();
    setLoading(false);
  }, [method]);

  const handleDelete = async (widgetId) => {
    try {
      setMethod("DELETE");
      const res = await deleteWidget(widgetId);
      console.log("Delete response:", res);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error("Failed to delete widget: " + res.message);
      }
    } catch (error) {
      console.error("Error deleting widget:", error);
      toast.error("Error deleting widget: " + error.message);
    } finally {
      setMethod("GET");
    }
  };

  const handleEmbedWidget = (widgetId, widgetData) => {
    setOpenWidgetId(widgetId);
    setOpenWidgetData(widgetData);
    setOpenModal(true);
  };
  const closeModal = () => setOpenModal(false);
  if (loading) {
    <Spinner />
  }

  return (
    <div className="px-6 py-10">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6">My Widgets</h1>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <Link
          href={route["CREATE_WIDGETS"]}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create New Widget
        </Link>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Learn More
        </button>
      </div>
      {openModal ? (
        <WidgetEmbedModal
          isOpen={openModal}
          onClose={closeModal}
          widgetId={openWidgetId}
          widgetData={openWidgetData}
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2 border-r">Widget Name</th>
                <th className="text-left px-4 py-2 border-r">Feed URL</th>
                <th className="text-left px-4 py-2">Options</th>
              </tr>
            </thead>
            <tbody>
              {widgets.map((widget) => (
                <tr key={widget.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 border-r">
                    {widget.widget_title}
                    <Pencil
                      size={16}
                      className="inline-block ml-2 text-blue-600 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-2 border-r">
                    <Link
                      href={"/widget/create"}
                      className="text-blue-600 hover:underline break-words"
                      target="_blank"
                    >
                      {widget.widget_data.rssFeed ??  widget.widget_data.feedURL}
                    </Link>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                      onClick={() => handleDelete(widget.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                      onClick={() => {
                        handleEmbedWidget(widget.id, widget.widget_data);
                      }}
                    >
                      Embed Code
                    </button>
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                      onClick={() =>
                        router.push(`${route["EDIT_WIDGET"]}/${widget.id}`)
                      }
                    >
                      Edit Widget
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Widget;
