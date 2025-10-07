import { defineType, defineField } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "slug", type: "slug", title: "Slug", options: { source: "title" } }),
    defineField({ name: "body", type: "array", title: "Body", of: [{ type: "block" }] }),
    defineField({ name: "publishedAt", type: "datetime", title: "Published At" })
  ]
});
