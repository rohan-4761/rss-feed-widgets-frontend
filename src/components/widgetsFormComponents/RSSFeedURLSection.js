import { ExternalLink } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

import { updateWidgetState } from "@/lib/features/widgetSlice";
import { topics } from "@/constants/metadata";

const RSSFeedURLSection = () => {
  const dispatch = useDispatch();
  const rssFeedUrl = useSelector((state) => state.widget.feedURL);
  const topic = useSelector((state) => state.widget.topic);

  return (
    <section className="bg-white p-6 shadow rounded-lg mt-6">
      <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-blue-800">
        RSS Feed URL
      </h2>
      <div className="space-y-4 ">
        <label className="block text-sm font-medium text-gray-700">
          Enter Feed URL
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter RSS Feed Url"
            value={rssFeedUrl}
            onChange={(e) =>
              dispatch(
                updateWidgetState({
                  path: "feedURL",
                  value: e.target.value,
                })
              )
            }
            className="w-full border border-gray-300 p-2 rounded"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            <ExternalLink />
          </button>
        </div>

        <label className="block text-sm font-medium text-gray-700">
          OR Select Feedspot Folder
        </label>
        <select
          value={topic}
          onChange={(e) =>
            dispatch(
              updateWidgetState({
                path: "topic",
                value: e.target.value,
              })
            )
          }
          className="w-full border p-2 rounded"
        >
          {  topics.map((topic) => (
            <option key={topic} value={topic}> {topic}</option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default RSSFeedURLSection;
