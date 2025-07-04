import { useState, useEffect } from "react";
import { Info } from "lucide-react"; // or any icon lib you prefer

const ColorPicker = ({ label, value, onChange }) => {
    const [colorPickerRef, setColorPickerRef] = useState(null);
    const [inputValue, setInputValue] = useState(value);
    const [debounceTimer, setDebounceTimer] = useState(null);
    
    // Update input value when prop value changes
    useEffect(() => {
      setInputValue(value);
    }, [value]);

    // Normalize color value to hex format
    const normalizeColor = (color) => {
      if (!color) return '#000000';
      if (color.startsWith('#')) return color;
      return `#${color}`;
    };

    // Get display color (handle invalid hex)
    const getDisplayColor = (color) => {
      const normalized = normalizeColor(color);
      // Test if it's a valid hex color
      const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      return hexRegex.test(normalized) ? normalized : '#000000';
    };

    // Validate if color is complete and valid
    const isValidCompleteColor = (color) => {
      const normalized = normalizeColor(color);
      const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      return hexRegex.test(normalized) && (normalized.length === 7 || normalized.length === 4);
    };

    const handleTextChange = (textValue) => {
      // Allow typing without # prefix
      let cleanValue = textValue.replace(/[^A-Fa-f0-9#]/g, '');
      if (cleanValue && !cleanValue.startsWith('#')) {
        cleanValue = '#' + cleanValue;
      }
      
      setInputValue(cleanValue);

      // Clear existing timer
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      // Set new timer - only update parent state after user stops typing
      const newTimer = setTimeout(() => {
        if (isValidCompleteColor(cleanValue)) {
          onChange(cleanValue);
        }
      }, 500);

      setDebounceTimer(newTimer);
    };

    const handleTextBlur = () => {
      // Clear any pending timer
      if (debounceTimer) {
        clearTimeout(debounceTimer);
        setDebounceTimer(null);
      }
      
      // Update immediately on blur if valid
      if (isValidCompleteColor(inputValue)) {
        onChange(inputValue);
      } else {
        // Reset to original value if invalid
        setInputValue(value);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        // Clear any pending timer
        if (debounceTimer) {
          clearTimeout(debounceTimer);
          setDebounceTimer(null);
        }
        
        // Update immediately on enter if valid
        if (isValidCompleteColor(inputValue)) {
          onChange(inputValue);
          e.target.blur();
        }
      }
    };

    const handleColorPickerChange = (colorValue) => {
      setInputValue(colorValue);
      onChange(colorValue);
    };

    return (
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">{label}</label>
          
        </div>
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded border border-gray-300 cursor-pointer hover:border-gray-400 transition-colors"
            style={{ backgroundColor: getDisplayColor(value) }}
            onClick={() => colorPickerRef?.click()}
          />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleTextChange(e.target.value)}
            onBlur={handleTextBlur}
            onKeyDown={handleKeyDown}
            className="w-24 h-8 border border-gray-300 rounded px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="#acadae"
            maxLength={7}
          />
          <input
            ref={setColorPickerRef}
            type="color"
            value={getDisplayColor(value)}
            onChange={(e) => handleColorPickerChange(e.target.value)}
            className="w-0 h-0 opacity-0 absolute pointer-events-none"
          />
        </div>
      </div>
    );
  };


export default ColorPicker;