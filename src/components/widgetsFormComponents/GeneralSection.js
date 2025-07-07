import { useSelector, useDispatch } from "react-redux";
import { updateWidgetState } from "@/lib/features/widgetSlice";
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
  const dispatch = useDispatch();
  const widgetGeneralState = useSelector((state) => state.widget.general);

  const {
    widthInPixels,
    width,
    heightInPixels,
    height,
    autoScroll,
    openLinksInNewTab,
    fontStyle,
    textAlignment,
    border,
    borderColor,
    squareCorner,
    padding,
    spaceBetweenItems,
  } = widgetGeneralState;

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
              checked={widthInPixels}
              onChange={() =>
                dispatch(
                  updateWidgetState({
                    path: "general.widthInPixels",
                    value: true,
                  })
                )
              }
            />
            <span className="ml-2">In Pixels</span>
          </label>
          {widthInPixels && (
            <NumberInput
              label="Width in Pixels"
              min={150}
              max={9999}
              value={width}
              onChange={(value) =>
                dispatch(
                  updateWidgetState({
                    path: "general.width",
                    value,
                  })
                )
              }
            />
          )}
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-blue-600"
              name="widthOption"
              checked={!widthInPixels}
              onChange={() =>
                dispatch(
                  updateWidgetState({
                    path: "general.widthInPixels",
                    value: false,
                  })
                )
              }
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
              checked={heightInPixels}
              onChange={() =>
                dispatch(
                  updateWidgetState({
                    path: "general.heightInPixels",
                    value: true,
                  })
                )
              }
            />
            <span className="ml-2">In Pixels</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-blue-600"
              name="heightOption"
              checked={!heightInPixels}
              onChange={() =>
                dispatch(
                  updateWidgetState({
                    path: "general.heightInPixels",
                    value: false,
                  })
                )
              }
            />
            <span className="ml-2">In Posts</span>
          </label>
          <NumberInput
            label={`Height in ${heightInPixels ? "Pixels" : "Posts"}`}
            min={150}
            max={9999}
            value={height}
            onChange={(value) =>
              dispatch(
                updateWidgetState({
                  path: "general.height",
                  value,
                })
              )
            }
          />
        </div>

        <ToggleButton
          value={autoScroll}
          onToggle={(value) =>
            dispatch(
              updateWidgetState({
                path: "general.autoScroll",
                value,
              })
            )
          }
          text="Autoscroll"
        />

        <div className="flex justify-between">
          <label className="w-7/10 text-sm">Open Links</label>
          <select
            className="w-3/10 border p-1 rounded"
            value={openLinksInNewTab ? "new" : "same"}
            onChange={(e) =>
              dispatch(
                updateWidgetState({
                  path: "general.openLinksInNewTab",
                  value: e.target.value === "new",
                })
              )
            }
          >
            <option value="new">New window</option>
            <option value="same">Same window</option>
          </select>
        </div>

        <div className="flex justify-between">
          <label className="w-7/10 text-sm">Font Style</label>
          <select
            className="w-3/10 border p-1 rounded"
            value={fontStyle}
            onChange={(e) =>
              dispatch(
                updateWidgetState({
                  path: "general.fontStyle",
                  value: e.target.value,
                })
              )
            }
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
              className="border px-2 py-1 rounded"
              onClick={() =>
                dispatch(
                  updateWidgetState({
                    path: "general.textAlignment",
                    value: "AlignLeft",
                  })
                )
              }
            >
              <AlignLeft
                color={textAlignment === "AlignLeft" ? "blue" : "black"}
              />
            </button>
            <button
              className="border px-2 py-1 rounded"
              onClick={() =>
                dispatch(
                  updateWidgetState({
                    path: "general.textAlignment",
                    value: "AlignRight",
                  })
                )
              }
            >
              <AlignRight
                color={textAlignment === "AlignRight" ? "blue" : "black"}
              />
            </button>
            <button
              className="border px-2 py-1 rounded"
              onClick={() =>
                dispatch(
                  updateWidgetState({
                    path: "general.textAlignment",
                    value: "AlignCenter",
                  })
                )
              }
            >
              <AlignCenter
                color={textAlignment === "AlignCenter" ? "blue" : "black"}
              />
            </button>
            <button
              className="border px-2 py-1 rounded"
              onClick={() =>
                dispatch(
                  updateWidgetState({
                    path: "general.textAlignment",
                    value: "AlignJustify",
                  })
                )
              }
            >
              <AlignJustify
                color={textAlignment === "AlignJustify" ? "blue" : "black"}
              />
            </button>
          </div>
        </div>

        <ToggleButton
          value={border}
          onToggle={(value) =>
            dispatch(
              updateWidgetState({
                path: "general.border",
                value,
              })
            )
          }
          text="Border"
        />

        {border && (
          <ColorPicker
            value={borderColor}
            onChange={(value) =>
              dispatch(
                updateWidgetState({
                  path: "general.borderColor",
                  value,
                })
              )
            }
            label="Border Colour"
          />
        )}

        <DoubleOption
          value={squareCorner}
          onChange={(value) =>
            dispatch(
              updateWidgetState({
                path: "general.squareCorner",
                value,
              })
            )
          }
          options={["Square", "Rounded"]}
          label="Corner"
        />

        <label className="block text-sm font-medium text-gray-700">
          Custom CSS Link
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter Custom CSS URL"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            <Link />
          </button>
        </div>

        <NumberInput
          value={padding}
          onChange={(value) =>
            dispatch(
              updateWidgetState({
                path: "general.padding",
                value,
              })
            )
          }
          label="Padding"
          min={0}
          max={9999}
        />

        <NumberInput
          value={spaceBetweenItems}
          onChange={(value) =>
            dispatch(
              updateWidgetState({
                path: "general.spaceBetweenItems",
                value,
              })
            )
          }
          label="Space Between Items"
          min={0}
          max={9999}
        />
      </div>
    </section>
  );
};

export default GeneralSection;
