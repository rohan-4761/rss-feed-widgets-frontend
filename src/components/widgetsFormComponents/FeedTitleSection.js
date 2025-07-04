import { useState } from "react";
import ToggleButton from "@/components/ui/ToggleButton";
import NumberInput from "@/components/ui/NumberInput";
import ColorPicker from "../ui/ColorPicker";

const FeedTitleSection = () => {
  const [custom, setCustom] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [fontWeightBold, setFontWeightBold] = useState(false);
  const [fontColor,setFontColor ] = useState("#000000")
  const [bgColor,setBgColor ] = useState("#ffffff")

  return (
    <section className="bg-white p-6 shadow rounded-lg space-y-6 mt-6">
      <h2 className="text-xl font-semibold border-b pb-2 text-blue-800">
        Feed Title
      </h2>
      <div className="space-y-4">
        <ToggleButton value={custom} onToggle={setCustom} text="Custom" />
        {custom && (
          <>
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
            <NumberInput
              value={fontSize}
              onChange={setFontSize}
              label="Font Size"
              min={8}
              max={250}
            />
            <ToggleButton
              value={fontWeightBold}
              onToggle={setFontWeightBold}
              text="Font Weight"
            />
            <h2 className="text-xl font-semibold border-b pb-2 border-dashed text-blue-800"></h2>
            <div className="font-medium text-gray-700 text-lg">Colors</div>
            <ColorPicker value={fontColor} onChange={setFontColor} label={"Font Color"}/>
            <ColorPicker value={bgColor} onChange={setBgColor} label={"Background Color"}/>
          </>
        )}
      </div>
    </section>
  );
};

export default FeedTitleSection;
