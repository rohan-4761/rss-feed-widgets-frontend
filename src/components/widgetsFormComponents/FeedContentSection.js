import { useState } from "react";
import ToggleButton from "@/components/ui/ToggleButton";
import ColorPicker from "@/components/ui/ColorPicker";
import NumberInput from "@/components/ui/NumberInput";
import DoubleOption from "@/components/ui/DoubleOption";

const FeedContentSection = () => {
  const [displayNoOfPost, setDisplayNoOfPost] = useState(10);
  const [displayLink, setDisplayLink] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [showAuthor, setAhowAuthor] = useState(false);
  const [backgroundColor ,setBackgroundColor] = useState("#ffffff");
  const [showTitle, setShowTitle] = useState(true);
  const [showDesc, setShowDesc] = useState(true);
  const [boldTitle, setBoldTitle] = useState(false);
  const [boldDesc, setBoldDesc] = useState(false);
  const [titleColor, setTitleColor] = useState("#000000");
  const [fontColor, setFontColor] = useState("#000000");
  const [maxChars, setMaxChars] = useState(100);
  const [descFontSize, setDescFontSize] = useState(12);
  const [titleSize, setTitleSize] = useState(18);
  const [dateFormat, setDateFormat] = useState("Month, DD YYYY");
  return (
    <section className="bg-white p-6 shadow rounded-lg space-y-6 mt-6">
      <h2 className="text-xl font-semibold border-b pb-2 text-blue-800 ">
        Feed Content
      </h2>
      <div className="space-y-4">
        <NumberInput label="Display No. of Post" value={displayNoOfPost} onChange={setDisplayNoOfPost} max={250} />
        <ToggleButton
          value={displayLink}
          onToggle={setDisplayLink}
          text="Display link to original content"
        />
        <ToggleButton
          value={readMore}
          onToggle={setReadMore}
          text="Display Read more."
        />
        <ColorPicker
              value={backgroundColor}
              onChange={setBackgroundColor}
              label="Background Color"
        />
        <ToggleButton
          value={showAuthor}
          onToggle={setAhowAuthor}
          text="Show Author & Date"
        />
        <DoubleOption
          label="Date Format"
          value={dateFormat}
          onChange={setDateFormat}
          options={["Month, DD YYYY", "DD-MM-YYYY"]}
        />

        <h2 className="text-xl font-semibold border-b pb-2 border-dashed text-blue-800"></h2>
        <ToggleButton
          value={showTitle}
          onToggle={setShowTitle}
          text="Show Title"
        />
        {showTitle ? (
          <>
            <ToggleButton
              value={boldTitle}
              onToggle={setBoldTitle}
              text="Bold Title"
            />
            <NumberInput
              label="Title Size"
              value={titleSize}
              onChange={setTitleSize}
              min={1}
              max={250}
            />
            <ColorPicker
              value={titleColor}
              onChange={setTitleColor}
              label="Title Color"
            />
          </>
        ) : (
          <></>
        )}
        <h2 className="text-xl font-semibold border-b pb-2 border-dashed text-blue-800"></h2>
        <ToggleButton
          value={showDesc}
          onToggle={setShowDesc}
          text="Show Description"
        />
        {showDesc ? (
          <>
            <ToggleButton
              value={boldDesc}
              onToggle={setBoldDesc}
              text="Bold Description"
            />
            <NumberInput
              label="Max characters Description"
              value={maxChars}
              onChange={setMaxChars}
              min={3}
            />
            <NumberInput
              label="Font Size"
              value={descFontSize}
              onChange={setDescFontSize}
              max={250}
            />
            <ColorPicker
              value={fontColor}
              onChange={setFontColor}
              label="Font Color"
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default FeedContentSection;
