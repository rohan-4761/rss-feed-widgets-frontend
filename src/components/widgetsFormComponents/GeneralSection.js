import { useState } from "react";

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Link,
} from "lucide-react";

import { webSafeFonts } from "@/constants/webSafeFonts";
import NumberInput from "@/components/ui/NumberInput";
import ToggleButton from "@/components/ui/ToggleButton";
import ColorPicker from "@/components/ui/ColorPicker";
import DoubleOption from "@/components/ui/DoubleOption";

const GeneralSection = () => {
  const [widthInPixel, setWidthInPixel] = useState(true);
  const [width, setWidth] = useState(350);
  const [heightInPixel, setHeightInPixel] = useState(true);
  const [height, setHeight] = useState(600);
  const [autoScroll, setAutoScroll] = useState(false);
  const [sameWindow, setSameWindow] = useState(false);
  const [fontFamily, setFontFamily] = useState("Arial, sans-serif");
  const [textAlignment, setTextAlignment] = useState("AlignLeft");
  const [border, setBorder] = useState(true);
  const [borderColor, setBorderColor] = useState("#ffffff");
  const [squareCorner, setSquareCorner] = useState("Square");
  const [padding, setPadding] = useState(5);
  const [spaceBetweenItems, setSpaceBetweenItems] = useState(10);

  const allFonts = [
    ...webSafeFonts.sansSerif,
    ...webSafeFonts.serif,
    ...webSafeFonts.monospace,
    ...webSafeFonts.cursiveFantasy,
    ...webSafeFonts.systemStack,
  ];
  return (
    <section className="bg-white p-6 shadow rounded-lg space-y-6 flex flex-col mt-6">
      <h2 className="text-xl font-semibold border-b pb-2 text-blue-800 ">
        General
      </h2>

      <div className="space-y-4">
        <label className="block font-medium text-sm">Width</label>
        <div className="flex flex-col space-y-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-blue-600"
              name="widthOption"
              onClick={() => setWidthInPixel(true)}
              defaultChecked
            />
            <span className="ml-2">In Pixels</span>
          </label>
          {widthInPixel ? (
            <NumberInput
              label="Width in Pixels"
              min={150}
              max={9999}
              value={width}
              onChange={setWidth}
            />
          ) : (
            <></>
          )}
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-blue-600"
              name="widthOption"
              onClick={() => setWidthInPixel(false)}
            />
            <span className="ml-2">Responsive</span>
          </label>
        </div>

        <label className="block font-medium text-sm">Height</label>
        <div className="flex flex-col space-y-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-blue-600"
              name="heightOption"
              onClick={() => setHeightInPixel(true)}
              defaultChecked
            />
            <span className="ml-2">In Pixels</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-blue-600"
              name="heightOption"
              onClick={() => setHeightInPixel(false)}
            />
            <span className="ml-2">In Posts</span>
          </label>
          <NumberInput
            label={`Height in ${heightInPixel ? "Pixels" : "Posts"}`}
            min={150}
            max={9999}
            value={height}
            onChange={setHeight}
          />
        </div>
        <ToggleButton
          value={autoScroll}
          onToggle={setAutoScroll}
          text="Autoscroll"
        />

        <div className="flex justify-between">
          <label className="w-7/10 text-sm">Open Links</label>
          <select
            className="w-3/10 border p-1 rounded"
            value={sameWindow ? "same" : "new"}
            onChange={(e) => setSameWindow(e.target.value === "same")}
          >
            <option value="new">New window</option>
            <option value="same">Same window</option>
          </select>
        </div>

        <div className="flex justify-between">
          <label className="w-7/10 text-sm">Font Style</label>
          <select
            className="w-3/10 border p-1 rounded"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          >
            {allFonts.map((font) => (
              <option value={font} key={font}>
                {font}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <label className="text-sm">Text Alignment</label>
          <div className="flex gap-2 justify-around">
            <button
              className={"border px-2 py-1 rounded"}
              onClick={() => setTextAlignment("AlignLeft")}
            >
              <AlignLeft
                color={textAlignment === "AlignLeft" ? "blue" : "black"}
              />
            </button>
            <button
              className={"border px-2 py-1 rounded"}
              onClick={() => setTextAlignment("AlignRight")}
            >
              <AlignRight
                color={textAlignment === "AlignRight" ? "blue" : "black"}
              />
            </button>
            <button
              className={"border px-2 py-1 rounded"}
              onClick={() => setTextAlignment("AlignCenter")}
            >
              <AlignCenter
                color={textAlignment === "AlignCenter" ? "blue" : "black"}
              />
            </button>
            <button
              className={"border px-2 py-1 rounded"}
              onClick={() => setTextAlignment("AlignJustify")}
            >
              <AlignJustify
                color={textAlignment === "AlignJustify" ? "blue" : "black"}
              />
            </button>
          </div>
        </div>
        <ToggleButton value={border} onToggle={setBorder} text="Border" />
        {border ? (
          <ColorPicker
            value={borderColor}
            onChange={setBorderColor}
            label={"Border Colour"}
          />
        ) : (
          <></>
        )}
        <DoubleOption
          value={squareCorner}
          onChange={setSquareCorner}
          options={["Square", "Rounded"]}
          label="Corner"
        />

        <label className="block text-sm font-medium text-gray-700">
          Custom CSS Link
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter RSS Feed Url"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            <Link />
          </button>
        </div>
        <NumberInput value={padding} onChange={setPadding} label={"Padding"} min={0} max={9999}/>
        <NumberInput value={spaceBetweenItems} onChange={setSpaceBetweenItems} label={"Space Between Items"} min={0} max={9999}/>
        
      </div>
    </section>
  );
};

export default GeneralSection;
