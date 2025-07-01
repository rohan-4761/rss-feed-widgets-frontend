'use client';

import { Pencil, Trash } from 'lucide-react'
import Link from 'next/link'

const Widget = () => {
  const widgets = [
    {
      name: 'Widget 01',
      feedUrl: 'http://rss.feedspot.com/u/3e1bb...',
    },
    {
      name: 'Widget 02',
      feedUrl: 'http://rss.feedspot.com/u/3e1bb...',
    },
  ]
  return (
<div className="ml-16 px-6 py-10">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6">My Widgets</h1>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Create New widget
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Learn More
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border-r">Widget Name</th>
              <th className="text-left px-4 py-2 border-r">Feed URL</th>
              <th className="text-left px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {widgets.map((widget, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 border-r">
                  {widget.name}
                  <Pencil size={16} className="inline-block ml-2 text-blue-600 cursor-pointer" />
                </td>
                <td className="px-4 py-2 border-r">
                  <Link
                    href={widget.feedUrl}
                    className="text-blue-600 hover:underline break-words"
                    target="_blank"
                  >
                    {widget.feedUrl}
                  </Link>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                    Delete
                  </button>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                    Embed Code
                  </button>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                    Edit Widget
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>  )
}

export default Widget