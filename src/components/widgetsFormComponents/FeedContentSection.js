import { useSelector, useDispatch } from "react-redux";

import { updateWidgetState } from "@/lib/features/widgetSlice";
import ToggleButton from "@/components/ui/ToggleButton";
import ColorPicker from "@/components/ui/ColorPicker";
import NumberInput from "@/components/ui/NumberInput";
import DoubleOption from "@/components/ui/DoubleOption";

const FeedContentSection = () => {
  const dispatch = useDispatch();
  const widgetContentState = useSelector((state) => state.widget.feedContent);

  return (
    <section className="bg-white p-6 shadow rounded-lg space-y-6 mt-6">
      <h2 className="text-xl font-semibold border-b pb-2 text-blue-800 ">
        Feed Content
      </h2>
      <div className="space-y-4">
        <NumberInput
          label="Display No. of Post"
          value={widgetContentState.displayNoOfPost}
          onChange={(value) =>
            dispatch(
              updateWidgetState({
                path: "feedContent.displayNoOfPost",
                value: value,
              })
            )
          }
          max={250}
        />
        <ToggleButton
          value={widgetContentState.displayLink}
          onToggle={(value) =>
            dispatch(
              updateWidgetState({
                path: "feedContent.displayLink",
                value: value,
              })
            )
          }
          text="Display link to original content"
        />
        <ToggleButton
          value={widgetContentState.displayReadMore}
          onToggle={(value) =>
            dispatch(
              updateWidgetState({
                path: "feedContent.displayReadMore",
                value: value,
              })
            )
          }
          text="Display Read more."
        />
        <ColorPicker
          value={widgetContentState.contentbgColor}
          onChange={(value) =>
            dispatch(
              updateWidgetState({
                path: "feedContent.contentbgColor",
                value: value,
              })
            )
          }
          label="Background Color"
        />
        <ToggleButton
          value={widgetContentState.showAuthorAndDate}
          onToggle={(value) =>
            dispatch(
              updateWidgetState({
                path: "feedContent.showAuthorAndDate",
                value: value,
              })
            )
          }
          text="Show Author & Date"
        />
        {widgetContentState.showAuthorAndDate && (
          <DoubleOption
            label="Date Format"
            value={widgetContentState.dateFormat}
            onChange={(value) =>
              dispatch(
                updateWidgetState({
                  path: "feedContent.dateFormat",
                  value: value,
                })
              )
            }
            options={["Month, DD YYYY", "DD-MM-YYYY"]}
          />
        )}

        <h2 className="text-xl font-semibold border-b pb-2 border-dashed text-blue-800"></h2>
        <ToggleButton
          value={widgetContentState.title.showContentTitle}
          onToggle={(value) =>
            dispatch(
              updateWidgetState({
                path: "feedContent.title.showContentTitle",
                value: value,
              })
            )
          }
          text="Show Title"
        />
        {widgetContentState.title.showContentTitle ? (
          <>
            <ToggleButton
              value={widgetContentState.title.contentTitleBold}
              onToggle={(value) =>
                dispatch(
                  updateWidgetState({
                    path: "feedContent.title.contentTitleBold",
                    value: value,
                  })
                )
              }
              text="Bold Title"
            />
            <NumberInput
              label="Title Size"
              value={widgetContentState.title.contentTitleFontSize}
              onChange={(value) => {
                dispatch(
                  updateWidgetState({
                    path: "feedContent.title.contentTitleFontSize",
                    value: value,
                  })
                );
              }}
              min={1}
              max={250}
            />
            <ColorPicker
              value={widgetContentState.title.contentTitleColor}
              onChange={(value) =>
                dispatch(
                  updateWidgetState({
                    path: "feedContent.title.contentTitleColor",
                    value: value,
                  })
                )
              }
              label="Title Color"
            />
          </>
        ) : (
          <></>
        )}
        <h2 className="text-xl font-semibold border-b pb-2 border-dashed text-blue-800"></h2>
        <ToggleButton
          value={widgetContentState.description.showContentDesc}
          onToggle={(value) =>
            dispatch(
              updateWidgetState({
                path: "feedContent.description.showContentDesc",
                value: value,
              })
            )
          }
          text="Show Description"
        />
        {widgetContentState.description.showContentDesc ? (
          <>
            <ToggleButton
              value={widgetContentState.description.contentDescBold}
              onToggle={(values) =>
                dispatch(
                  updateWidgetState({
                    path: "feedContent.description.contentDescBold",
                    value: values,
                  })
                )
              }
              text="Bold Description"
            />
            <NumberInput
              label="Max characters Description"
              value={widgetContentState.description.contentDescMaxChars}
              onChange={(values) =>
                dispatch(
                  updateWidgetState({
                    path: "feedContent.description.contentDescMaxChars",
                    value: values,
                  })
                )
              }
              min={3}
            />
            <NumberInput
              label="Font Size"
              value={widgetContentState.description.contentDescFontSize}
              onChange={(value) => {
                dispatch(
                  updateWidgetState({
                    path: "feedContent.description.contentDescFontSize",
                    value: value,
                  })
                );
              }}
              max={250}
            />
            <ColorPicker
              value={widgetContentState.description.contentDescColor}
              onChange={(value) =>
                dispatch(
                  updateWidgetState({
                    path: "feedContent.description.contentDescColor",
                    value: value,
                  })
                )
              }
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
