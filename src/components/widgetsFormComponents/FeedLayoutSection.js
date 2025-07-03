import Image from "next/image";
import { useState } from "react";
import {
  AlignJustify,
  GalleryHorizontal,
  Grid3x3,
  LayoutGrid,
  List,
} from "lucide-react";

import MagazineView01 from "../../../public/magazine-view-1.png";
import MagazineView02 from "../../../public/magazine-view-2.png";
import MatrixCardView01 from "../../../public/matrix-card-view-1.png";
import MatrixCardView02 from "../../../public/matrix-card-view-2.png";
import MatrixGridView01 from "../../../public/matrix-grid-view-1.png";
import MatrixGridView02 from "../../../public/matrix-grid-view-2.png";
import CarouselView01 from "../../../public/carousel-1.png";
import CarouselView02 from "../../../public/carousel-2.png";
import ListView from "../../../public/list-view.png";

const FeedLayoutSection = () => {
  const [view, setView] = useState("MagazineView");
  const [layout, setLayout] = useState("MagazineView01");

  const viewExamples = {
    MagazineView: [MagazineView01, MagazineView02],
    ListView: [ListView],
    MatrixCardView: [MatrixCardView01, MatrixCardView02],
    MatrixGridView: [MatrixGridView01, MatrixGridView02],
    CarouselView: [CarouselView01, CarouselView02],
  };
  const renderViewLayouts = (viewLayouts) => {
    return viewExamples[viewLayouts].map((viewLayout, index) => (
      <Image 
        onClick={()=>setLayout(viewLayout)}
        className={layout == viewLayout ? "border-2 border-solid border-blue-800" : "border-1 border-white"}
        key={index} 
        src={viewLayout} 
        width={350} 
        height={600} 
        alt={viewLayout} />
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
        <div className="text-black text-lg font-semibold w-1/3 flex justify-around ">
          <button onClick={() => setView("MagazineView")}>
            {" "}
            <List
              color={view == "MagazineView" ? "blue" : "black"}
              size={view == "MagazineView" ? 32 : 28}
            />{" "}
          </button>
          <button onClick={() => setView("ListView")}>
            {" "}
            <AlignJustify
              color={view == "ListView" ? "blue" : "black"}
              size={view == "ListView" ? 32 : 28}
            />{" "}
          </button>
          <button onClick={() => setView("MatrixCardView")}>
            {" "}
            <LayoutGrid
              color={view == "MatrixCardView" ? "blue" : "black"}
              size={view == "MatrixCardView" ? 32 : 28}
            />{" "}
          </button>
          <button onClick={() => setView("MatrixGridView")}>
            {" "}
            <Grid3x3
              color={view == "MatrixGridView" ? "blue" : "black"}
              size={view == "MatrixGridView" ? 32 : 28}
            />{" "}
          </button>
          <button onClick={() => setView("CarouselView")}>
            {" "}
            <GalleryHorizontal
              color={view == "CarouselView" ? "blue" : "black"}
              size={view == "CarouselView" ? 32 : 28}
            />{" "}
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
