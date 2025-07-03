"use client";

import RSSFeedURLSection from "./widgetsFormComponents/RSSFeedURLSection";
import GeneralSection from "./widgetsFormComponents/GeneralSection";
import FeedTitleSection from "./widgetsFormComponents/FeedTitleSection";
import FeedLayoutSection from "./widgetsFormComponents/FeedLayoutSection";
import FeedContentSection from "./widgetsFormComponents/FeedContentSection";

export default function CreateWidgetForm() {


  return (
    <>
      <RSSFeedURLSection />
      <FeedLayoutSection />
      <GeneralSection />
      <FeedTitleSection />
      <FeedContentSection />
    </>
  );
}
