import { useState } from "react";
import { X, Copy, Code } from "lucide-react";
import { toast } from "react-toastify";

import generateWidgetIframeHTML from '@/utils/iframeGenerator';

export default function WidgetEmbedModal({ isOpen, onClose, widgetId, widgetData }) {
  const jsCode = `<!-- start widget code --><script type="text/javascript" src="https://www.feedspot.com/widgets/Assets/js/wd-iframecontent.js" data-wd-id="V1xF625bf3ee"></script><!-- end widget code -->`;
  const height = widgetData.general.height;
  const width = widgetData.general.width;
  console.log(height, width, widgetId);
    const iframeCode = generateWidgetIframeHTML({widgetId, width, height});

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    toast.info("Widget Code has been copied.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Open Modal Button */}

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        {/* Modal Content */}
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 transform transition-all duration-300 scale-100">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 bg-blue-600 text-white rounded-t-lg">
            <h2 className="text-xl font-medium">Your widget code</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-full p-1"
            >
              <X size={24} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            {/* Code Block */}
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
              <textarea
                readOnly
                className="w-full h-24 bg-transparent border-none resize-none text-sm font-mono text-gray-700 focus:outline-none"
                value={jsCode}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => handleCopy(jsCode)}
                className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Copy Code
              </button>
              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Done
              </button>
            </div>

            {/* Get Iframe Version Section */}
            <div className="border-t pt-4">
              <button className="text-blue-600 hover:text-blue-800 font-medium mb-4 flex items-center">
                Get Iframe Version
                <span className="ml-2">▼</span>
              </button>

              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
                <textarea
                  readOnly
                  className="w-full h-20 bg-transparent border-none resize-none text-sm font-mono text-gray-700 focus:outline-none"
                  value={iframeCode}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleCopy(iframeCode)}
                  className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                  Copy iFrame code
                </button>
                <button
                  onClick={onClose}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
