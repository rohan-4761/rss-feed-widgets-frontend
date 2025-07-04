
const DoubleOption = ({value, label, onChange=()=>{}, options=[]}) => {
  return (
    <div className="w-full flex items-center justify-between gap-4">
          <div className=" text-gray-700 w-1/2">{label}</div>

          <button
            className={`text-sm px-2 py-2 rounded-md border transition-all duration-200 w-1/4
      ${
        value == options[0]
          ? "bg-blue-500 border-blue-700 text-white"
          : "bg-white border-blue-600 text-blue-600 hover:bg-blue-50"
      }`}
            onClick={() => onChange(options[0])}
          >
            {options[0]}
          </button>

          <button
            className={`text-sm px-2 py-2 rounded-md border transition-all duration-200 w-1/4
      ${
         value == options[1]
          ? "bg-blue-500 border-blue-700 text-white"
          : "bg-white border-blue-600 text-blue-600 hover:bg-blue-50"
      }`}
            onClick={() => onChange(options[1])}
          >
            {options[1]}
          </button>
        </div>
  )
}

export default DoubleOption