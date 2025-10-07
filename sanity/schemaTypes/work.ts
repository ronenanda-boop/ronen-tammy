import { defineType, defineField } from "sanity";

export default defineType({
  name: "work",
  title: "Work",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "slug", type: "slug", title: "Slug", options: { source: "title" } }),
    defineField({ name: "year", type: "string", title: "Year" }),
    defineField({ name: "coverImage", type: "image", title: "Cover Image", options: { hotspot: true } }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }]
    }),
    defineField({ name: "videoUrl", type: "url", title: "Video URL" }),
    defineField({
      name: "credits",
      type: "array",
      title: "Credits",
      of: [{ type: "string" }]
    }),
    defineField({ name: "description", type: "array", title: "Description", of: [{ type: "block" }] }),
    defineField({ name: "featured", type: "boolean", title: "Featured" })
  ]
});
