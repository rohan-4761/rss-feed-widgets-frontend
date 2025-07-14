'use client'

export default function VideoModal({ video, onClose }) {
  if (!video.source) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-60">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full relative overflow-hidden">
        {/* Title */}
        <div className="px-4 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">{video.title}</h2>
        </div>

        {/* YouTube Video */}
        <div className="aspect-video w-full">
          <iframe
            src={video.source}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        {/* Close Button */}
        <div className="flex justify-end px-4 py-3 border-t">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 text-sm transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
