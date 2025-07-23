import Image from "next/image";
import { useState, useEffect } from "react";
import {
  AlignJustify,
  GalleryHorizontal,
  Grid3x3,
  LayoutGrid,
  List,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { updateWidgetState } from "@/lib/features/widgetSlice";

import MagazineView01 from "../../../public/magazine-view-1.png";
import MagazineView02 from "../../../public/magazine-view-2.png";
import MatrixCardView01 from "../../../public/matrix-card-view-1.png";
import MatrixCardView02 from "../../../public/matrix-card-view-2.png";
import MatrixGridView01 from "../../../public/matrix-grid-view-1.png";
import MatrixGridView02 from "../../../public/matrix-grid-view-2.png";
import CarouselView01 from "../../../public/carousel-1.png";
import CarouselView02 from "../../../public/carousel-2.png";
import ListViewImage from "../../../public/list-view.png";
import Spinner from "../ui/Spinner";

const FeedLayoutSection = () => {
  const dispatch = useDispatch();
  const widgetLayoutState = useSelector((state) => state.widget.widgetLayout);

  const viewExamples = {
    MagazineView: [
      { name: "MagazineView01", image: MagazineView01 },
      { name: "MagazineView02", image: MagazineView02 },
    ],
    ListView: [{ name: "ListView", image: ListViewImage }],
    MatrixCardView: [
      { name: "MatrixCardView01", image: MatrixCardView01 },
      { name: "MatrixCardView02", image: MatrixCardView02 },
    ],
    MatrixGridView: [
      { name: "MatrixGridView01", image: MatrixGridView01 },
      { name: "MatrixGridView02", image: MatrixGridView02 },
    ],
    CarouselView: [
      { name: "CarouselView01", image: CarouselView01 },
      { name: "CarouselView02", image: CarouselView02 },
    ],
  };

  const getLayoutCategory = (layoutName) => {
    return Object.entries(viewExamples).find(([_, layouts]) =>
      layouts.some((layout) => layout.name === layoutName)
    )?.[0];
  };

  const [view, setView] = useState(() => getLayoutCategory(widgetLayoutState) || "MagazineView");

  const renderViewLayouts = (viewLayouts) => {
    const layouts = viewExamples[viewLayouts];
    if (!layouts || layouts.length === 0) return null;

    if (!layouts.some((layout) => layout.name === widgetLayoutState)) {
      dispatch(
        updateWidgetState({
          path: "widgetLayout",
          value: layouts[0].name,
        })
      );
    }

    return layouts.map((layout) => (
      <Image
        onClick={() => {
          dispatch(
            updateWidgetState({
              path: "widgetLayout",
              value: layout.name,
            })
          );
        }}
        className={
          widgetLayoutState === layout.name
            ? "border-2 border-solid border-blue-800"
            : "border border-white"
        }
        key={layout.name}
        src={layout.image}
        width={350}
        height={600}
        alt={layout.name}
      />
    ));
  };

  return (
    <section className="bg-white p-6 shadow rounded-lg space-y-6 mt-6">
      <h2 className="text-xl font-semibold border-b pb-2 text-blue-800">
        Widgets Layout
      </h2>
      <div className="flex w-full justify-between">
        <div className="text-blue-800 text-lg font-semibold w-2/3">
          Following Views:
        </div>
        <div className="text-black text-lg font-semibold w-1/3 flex justify-around">
          <button onClick={() => setView("MagazineView")}>
            <List
              color={view === "MagazineView" ? "blue" : "black"}
              size={view === "MagazineView" ? 32 : 28}
            />
          </button>
          <button onClick={() => setView("ListView")}>
            <AlignJustify
              color={view === "ListView" ? "blue" : "black"}
              size={view === "ListView" ? 32 : 28}
            />
          </button>
          <button onClick={() => setView("MatrixCardView")}>
            <LayoutGrid
              color={view === "MatrixCardView" ? "blue" : "black"}
              size={view === "MatrixCardView" ? 32 : 28}
            />
          </button>
          <button onClick={() => setView("MatrixGridView")}>
            <Grid3x3
              color={view === "MatrixGridView" ? "blue" : "black"}
              size={view === "MatrixGridView" ? 32 : 28}
            />
          </button>
          <button onClick={() => setView("CarouselView")}>
            <GalleryHorizontal
              color={view === "CarouselView" ? "blue" : "black"}
              size={view === "CarouselView" ? 32 : 28}
            />
          </button>
        </div>
      </div>
      <div className="flex w-full justify-around">
        {renderViewLayouts(view)}
      </div>
    </section>
  );
};

export default FeedLayoutSection;
