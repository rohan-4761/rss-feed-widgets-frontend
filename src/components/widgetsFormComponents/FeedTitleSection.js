import { useState } from "react";
import ToggleButton from "../ToggleButton";

const FeedTitleSection = () => {
  const [custom, setCustom] = useState(true);

  return (
    <section className="bg-white p-6 shadow rounded-lg space-y-6 mt-6">
      <h2 className="text-xl font-semibold border-b pb-2 text-blue-800">
        Feed Title
      </h2>
      <div className="space-y-4">
        <ToggleButton value={custom} onToggle={setCustom} text="Custom" /> 
        {custom && (<>
          <div className="flex flex-row">
          <label className="block text-sm font-medium text-gray-700 w-1/3 mt-2.5">
            Main Title
          </label>
          <div className="items-center gap-2 w-2/3">
            <input
              type="text"
              placeholder="Example..."
              className="w-full border border-gray-300 p-2 rounded"
              />
          </div>
        </div>
        <div className="flex flex-row">
          <label className="block text-sm font-medium text-gray-700 w-1/3 mt-2.5">
            Main Title link
          </label>
          <div className="flex items-center gap-2 w-2/3">
            <input
              type="text"
              placeholder="Example..."
              className="w-full border border-gray-300 p-2 rounded"
              />
          </div>
        </div>
        <div className="flex justify-between">
          <label className="w-2/3">Font Size</label>
          <input
            type="number"
            className="border ml-2 p-1 w-1/5 rounded"
            defaultValue={10}
            />
        </div>
        <div className="flex justify-between">
          <label className="w-2/3">Font Weight</label>
          <select className="w-1/5 border p-1 rounded ">
            <option>Normal</option>
            <option>Thin</option>
            <option>Regular</option>
            <option>Bold</option>
          </select>
        </div>
      </>)}
      </div>
    </section>
  );
};

export default FeedTitleSection;
