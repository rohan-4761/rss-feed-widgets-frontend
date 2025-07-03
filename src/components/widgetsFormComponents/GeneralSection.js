
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

import { webSafeFonts } from "@/constants/webSafeFonts";

const GeneralSection = () => {
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
          <div>
            <label className="block font-medium text-sm">Width</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="width" /> In Pixels
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="width" defaultChecked /> Responsive
                (Mobile friendly)
              </label>
            </div>
          </div>

          <div>
            <label className="block font-medium text-sm">Height</label>
            <div className="flex justify-between gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="height" defaultChecked /> In Pixels
              </label>
              <input
                type="number"
                className="border p-1 w-24 rounded"
                defaultValue={600}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Autoscroll
            </label>

            <div>
              <label className="text-sm">Open links</label>
              <select className="w-full border p-1 rounded">
                <option>New window</option>
                <option>Same window</option>
              </select>
            </div>

            <div>
              <label className="text-sm">Font Style</label>
              <select className="w-full border p-1 rounded">
                {allFonts.map((font) => (
                  <option value={font} key={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm">Text Alignment</label>
              <div className="flex gap-2">
                <button className="border px-2 py-1 rounded">
                  <AlignLeft />
                </button>
                <button className="border px-2 py-1 rounded">
                  <AlignRight />
                </button>
                <button className="border px-2 py-1 rounded">
                  <AlignCenter />
                </button>
                <button className="border px-2 py-1 rounded">
                  <AlignJustify />
                </button>
              </div>
            </div>

            <div className="col-span-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked /> Border
              </label>
              <input
                type="text"
                className="border p-1 rounded mt-1"
                defaultValue="#dbdbdb"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm">Corner</label>
              <div className="flex gap-4 mt-1">
                <button className="border px-3 py-1 bg-blue-100">Square</button>
                <button className="border px-3 py-1 rounded-md">Rounded</button>
              </div>
            </div>

            <div className="col-span-2">
              <label className="text-sm">Custom CSS Link</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                placeholder="https://example.com/custom.css"
              />
            </div>
            <div className="flex justify-between">
              <div>
                <label>Padding</label>
                <input
                  type="number"
                  className="border p-1 rounded"
                  defaultValue={5}
                />
              </div>

              <div>
                <label>Space Between Items</label>
                <input
                  type="number"
                  className="border p-1  rounded"
                  defaultValue={10}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

  )
}

export default GeneralSection