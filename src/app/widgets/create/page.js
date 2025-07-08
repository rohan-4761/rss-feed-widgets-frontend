"use client";

import { useState } from "react";
import {Provider} from "react-redux";

import  {widgetStore} from "@/lib/store";
import VideoModal from "@/components/VideoModal";
import CreateWidgetForm from "@/components/CreateWidgetForm";
import {
  ADD_OR_FOLLOW_BLOG_DEMO,
  CREATE_AND_EMBED_WIDGET_DEMO,
} from "@/constants/video-sources";
import PreviewWidgets from "@/components/PreviewWidgets";

const Create = () => {
  const [showModal, setShowModal] = useState(false);
  const [video, setVideo] = useState(null);

  const watchVideoHandler = (video_source) => {
    setVideo(video_source);
    setShowModal(true);
  };

  return (
    <Provider store={widgetStore}>
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">
          Feedspot Widgets
        </h1>
        <p className="text-xl text-center text-gray-600 mb-10">
          Embed RSS Widget on your Website
        </p>

        {showModal && (
          <VideoModal video={video} onClose={() => setShowModal(false)} />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-800">
          <div className="text-lg space-y-4">
            <p>
              Feedspot Widget is a handy widget which lets you embed and display
              latest updates from your favourite sources (Blogs, News Websites,
              Podcasts, Youtube Channels, RSS Feeds, etc) on your website.{" "}
              <button
                onClick={() => watchVideoHandler(CREATE_AND_EMBED_WIDGET_DEMO)}
                className="text-blue-600 hover:underline"
              >
                Watch Video
              </button>
            </p>
          </div>

          <div className="text-lg space-y-4">
            <p>
              <span className="font-semibold">Step 1</span> - Get started by
              adding your favourite websites to your account as content source
              for widget.{" "}
              <button
                onClick={() => watchVideoHandler(ADD_OR_FOLLOW_BLOG_DEMO)}
                className="text-blue-600 hover:underline"
              >
                Watch Video
              </button>
            </p>
            <p>
              <span className="font-semibold">Step 2</span> - Customize the look
              and feel of the widget to match your website style.
            </p>
            <p>
              <span className="font-semibold">Step 3</span> - Click on "Save and
              Get Code" button, copy the embed code and paste on your website.
            </p>
            <p>
              <span className="font-semibold">Step 4</span> - Widget updates
              automatically when new content is available.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <CreateWidgetForm />
        </div>
        <div className="w-full md:w-1/2">
          <div className="sticky top-24">
            <PreviewWidgets />
          </div>
        </div>
      </div>
    </div>
    </Provider>
  );
};

export default Create;
