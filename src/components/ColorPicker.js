import { useState } from "react";
import { Info } from "lucide-react"; // or any icon lib you prefer

export default function ColorPicker({color = "#ffffff", onPick = () => {}, text}) {

  return (
    <div className="flex items-center justify-around w-full max-w-md ">
      {/* Label */}
      <label className="text-gray-700 font-medium flex items-center pr-20 min-w-max w-2/3">
        Color: {text}
        <div className="relative group">
          <Info size={16} className="text-gray-500 cursor-pointer" />
          <div className="absolute left-5 top-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap">
            Set the color for the {text}
          </div>  
        </div>
      </label>  
      <input
        type="color"
        value={color}
        onChange={(e) => onPick(e.target.value)}
        className="w-12 h-8 rounded border border-blue-300  cursor-pointer"
      />
      {/* Text input for HEX */}
      <input
        type="text"
        value={color}
        onChange={(e) => onPick(e.target.value)}
        className="border border-gray-300 px-3 py-1 ml-10 rounded w-full max-w-[120px] text-sm"
      />
    </div>
  );
}
