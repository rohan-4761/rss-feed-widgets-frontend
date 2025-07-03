import {  useState } from "react";
import ToggleButton from "../ToggleButton";
import ColorPicker from "../ColorPicker";

const FeedContentSection = () => {
  const [displayLink, setDisplayLink] = useState(false);
  const [showAuthor, setAhowAuthor] = useState(false);
  const [monthFirst, setMonthFirst] = useState(false);
  const [showTitle, setShowTitle] = useState(true);
  const [bold, setBold] = useState(false)
  const [color, setColor] = useState("#000000")
  return (
    <section className="bg-white p-6 shadow rounded-lg space-y-6 mt-6">
      <h2 className="text-xl font-semibold border-b pb-2 text-blue-800 ">
        Feed Content
      </h2>
      <div className="space-y-4">
        <ToggleButton
          value={displayLink}
          onToggle={setDisplayLink}
          text="Display link to original content"
        />
        <ToggleButton
          value={showAuthor}
          onToggle={setAhowAuthor}
          text="Show Author & Date"
        />
        <div className="w-full flex items-center justify-between gap-4">
          <div className=" text-gray-700 w-1/2">Date Format</div>

          <button
            className={`text-sm px-2 py-2 rounded-md border transition-all duration-200 w-1/4
      ${
        monthFirst
          ? "bg-blue-500 border-blue-700 text-white"
          : "bg-white border-blue-600 text-blue-600 hover:bg-blue-50"
      }`}
            onClick={() => setMonthFirst(true)}
          >
            Month, DD YYYY
          </button>

          <button
            className={`text-sm px-2 py-2 rounded-md border transition-all duration-200 w-1/4
      ${
        !monthFirst
          ? "bg-blue-500 border-blue-700 text-white"
          : "bg-white border-blue-600 text-blue-600 hover:bg-blue-50"
      }`}
            onClick={() => setMonthFirst(false)}
          >
            DD-MM-YYYY
          </button>
        </div>
        <h2 className="text-xl font-semibold border-b pb-2 border-dashed text-blue-800">
      </h2>
        <ToggleButton value={showTitle} onToggle={setShowTitle} text="Show Title" />

    
        <ToggleButton value={bold} onToggle={setBold} text="Bold Title" />
        <div className="flex justify-between">
          <label className="w-2/3">Title Size</label>
          <input
            type="number"
            className="border ml-2 p-1 w-1/5 rounded"
            defaultValue={10}
            />
        </div>
        <ColorPicker color={color} onPick={setColor} text="Title Color"/>
      </div>

    </section>
  );
};

export default FeedContentSection;
