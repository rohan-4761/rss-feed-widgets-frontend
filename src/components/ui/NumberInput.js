import { Minus, Plus } from "lucide-react";

const NumberInput = ({
  label,
  value,
  onChange,
  min = 1,
  max = 1000
}) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-700">{label}</label>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
        >
          <Minus size={16} className="text-gray-600" />
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) =>
            onChange(
              Math.max(min, Math.min(max, parseInt(e.target.value) || 0))
            )
          }
          className="w-16 h-8 text-center border border-gray-300 rounded px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          min={min}
          max={max}
        />
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors"
        >
          <Plus size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
};


export default NumberInput;
