import { useSelector, useDispatch } from "react-redux";

import { updateWidgetState } from "@/lib/features/widgetSlice";
import { defaultWidgetState } from "@/lib/features/widgetSlice";
import ToggleButton from "@/components/ui/ToggleButton";
import NumberInput from "@/components/ui/NumberInput";
import ColorPicker from "../ui/ColorPicker";

const FeedTitleSection = () => {
  const dispatch = useDispatch();
  const widgetTitleState = useSelector((state) => state.widget.feedTitle);
  const { feedTitle } = defaultWidgetState;
  const handleCustom = (custom) => {
    dispatch(
      updateWidgetState({
        path: "feedTitle.custom",
        value: custom,
      })
    );
    if (!custom) {
      for (const key in feedTitle) {
        if (key != "custom") {
          dispatch(
            updateWidgetState({
              path: `feedTitle.${key}`,
              value: feedTitle[key],
            })
          );
        }
      }
    }
  };
  return (
    <section className="bg-white p-6 shadow rounded-lg space-y-6 mt-6">
      <h2 className="text-xl font-semibold border-b pb-2 text-blue-800">
        Feed Title
      </h2>
      <div className="space-y-4">
        <ToggleButton
          value={widgetTitleState.custom}
          onToggle={(value) => handleCustom(value)}
          text="Custom"
        />
        {widgetTitleState.custom && (
          <>
            <div className="flex flex-row">
              <label className="block text-sm font-medium text-gray-700 w-1/3 mt-2.5">
                Main Title
              </label>
              <div className="items-center gap-2 w-2/3">
                <input
                  type="text"
                  value={widgetTitleState.mainTitle}
                  onChange={(e) =>
                    dispatch(
                      updateWidgetState({
                        path: "feedTitle.mainTitle",
                        value: e.target.value,
                      })
                    )
                  }
                  placeholder="Example..."
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
            </div>
            <NumberInput
              value={widgetTitleState.feedTitleFontSize}
              onChange={(value) =>
                dispatch(
                  updateWidgetState({
                    path: "feedTitle.feedTitleFontSize",
                    value: value,
                  })
                )
              }
              label="Font Size"
              min={8}
              max={250}
            />
            <ToggleButton
              value={widgetTitleState.feedTitleBold}
              onToggle={(value) =>
                dispatch(
                  updateWidgetState({
                    path: "feedTitle.feedTitleBold",
                    value: value,
                  })
                )
              }
              text="Font Weight"
            />
            <h2 className="text-xl font-semibold border-b pb-2 border-dashed text-blue-800"></h2>
            <div className="font-medium text-gray-700 text-lg">Colors</div>
            <ColorPicker
              value={widgetTitleState.feedTitleFontColor}
              onChange={(value) =>
                dispatch(
                  updateWidgetState({
                    path: "feedTitle.feedTitleFontColor",
                    value: value,
                  })
                )
              }
              label={"Font Color"}
            />
            <ColorPicker
              value={widgetTitleState.feedTitleBgColor}
              onChange={(value) =>
                dispatch(
                  updateWidgetState({
                    path: "feedTitle.feedTitleBgColor",
                    value: value,
                  })
                )
              }
              label={"Background Color"}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default FeedTitleSection;
