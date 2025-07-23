import { z } from "zod";

// Enums
const widgetLayoutEnum = z.enum([
  "MagazineView01",
  "MagazineView02",
  "ListView",
  "MatrixCardView01",
  "MatrixCardView02",
  "MatrixGridView01",
  "MatrixGridView02",
  "CarouselView01",
  "CarouselView02",
]);

const textAlignmentEnum = z.enum([
  "AlignLeft",
  "AlignRight",
  "AlignJustify",
  "AlignCenter",
]);

// Reusable HEX color validator
const hexColor = z
  .string()
  .regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
    message: "Invalid hex color code",
  })
  .trim();

// General Schema
const generalSchema = z.object({
  widthInPixels: z.boolean(),
  width: z.number().gte(1, { message: "Width cannot be below 1." }),
  heightInPixels: z.boolean(),
  height: z.number().gte(1, { message: "Height cannot be below 1." }),
  openLinksInNewTab: z.boolean(),
  fontStyle: z.string().min(1, { message: "Select a Font Style." }).trim(),
  textAlignment: textAlignmentEnum,
  border: z.boolean(),
  borderColor: hexColor,
  corner: z.enum(["Square", "Rounded"]),
  padding: z.number().gte(0, { message: "Negative Padding not allowed." }),
  spaceBetweenItems: z.number().gte(0, {
    message: "Space between Items cannot be negative",
  }),
});

// Feed Title Schema
const feedTitleSchema = z.object({
  custom: z.boolean(),
  mainTitle: z
    .string()
    .max(25, { message: "Widget Title cannot exceed 25 character length." })
    .trim()
    .optional()
    .or(z.literal("")),
  feedTitleFontSize: z
    .number()
    .gte(1, { message: "Title Font Size at minimum can only be 1" }),
  feedTitleBold: z.boolean(),
  feedTitleBgColor: hexColor,
  feedTitleFontColor: hexColor,
});

// Feed Content Title & Desc Schema
const contentTitleSchema = z.object({
  showContentTitle: z.boolean(),
  contentTitleBold: z.boolean(),
  contentTitleMaxChars: z.number().gte(1, {
    message: "Content title cannot be displayed as empty",
  }),
  contentTitleFontSize: z.number().gte(1, {
    message: "Font Size cannot be Zero",
  }),
  contentTitleColor: hexColor,
});

const contentDescSchema = z.object({
  showContentDesc: z.boolean(),
  contentDescBold: z.boolean(),
  contentDescMaxChars: z.number().gte(1, {
    message: "Content Description cannot be displayed as empty",
  }),
  contentDescFontSize: z.number().gte(1, {
    message: "Font Size cannot be Zero",
  }),
  contentDescColor: hexColor,
});

// Feed Content Schema
const feedContentSchema = z.object({
  displayNoOfPost: z.number().gte(1, {
    message: "Display at least One Post",
  }),
  displayLink: z.boolean(),
  contentbgColor: hexColor,
  showAuthorAndDate: z.boolean(),
  dateFormat: z.enum(["Month, DD YYYY", "DD-MM-YYYY"]),
  title: contentTitleSchema,
  description: contentDescSchema,
});

// Main Widget Form Schema

const widgetFormSchema = z
  .strictObject({
    widgetTitle: z
      .string()
      .min(1, { message: "Title is required." })
      .max(25, { message: "Maximum Title Size is 25 characters." })
      .trim(),

    topic: z
      .string()
      .max(25, {
        message: "Topic length cannot exceed 25 characters",
      })
      .trim()
      .optional(),

    feedURL: z.string().url({ message: "Enter a valid feed URL" }).trim(),

    rssFeed: z
      .string()
      .url({ message: "Enter a valid RSS Feed URL" })
      .trim()
      .optional()
      .or(z.literal("")),

    widgetLayout: widgetLayoutEnum,
    general: generalSchema,
    feedTitle: feedTitleSchema,
    feedContent: feedContentSchema,
  })
  .refine((data) => data.rssFeed || data.topic, {
    message: "Either RSS Feed or Feed Topic must be provided",
    path: ["rssFeed"],
  });

export default widgetFormSchema;
