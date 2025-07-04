

const ToggleButton = ({value = true, text="", onToggle = () => {}}) => {
  return (
    <div className="flex flex-row justify-between">
          <span className="block text-sm font-medium text-gray-700 w-1/3">{text}</span>
          <label className="left-15 relative inline-flex items-center cursor-pointer w-1/5">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={value}
              onChange={() => onToggle(!value)}
            />
            <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-300"></div>
            <div className="absolute w-6 h-6 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
          </label>
        </div>
  )
}

export default ToggleButton