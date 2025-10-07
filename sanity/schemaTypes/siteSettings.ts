import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "title_en", type: "string", title: "Title (English)" }),
    defineField({ name: "description", type: "text", title: "Description" }),
    defineField({ name: "description_en", type: "text", title: "Description (English)" }),
    defineField({ name: "heroVideoUrl", type: "url", title: "Hero Video URL" }),
    defineField({ name: "heroPoster", type: "image", title: "Hero Poster" }),
    defineField({
      name: "contacts",
      title: "Contacts",
      type: "object",
      fields: [
        defineField({ name: "email", type: "string", title: "Email" }),
        defineField({ name: "phone", type: "string", title: "Phone" })
      ]
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "instagram", type: "url", title: "Instagram" }),
        defineField({ name: "facebook", type: "url", title: "Facebook" }),
        defineField({ name: "youtube", type: "url", title: "YouTube" })
      ]
    })
  ]
});
