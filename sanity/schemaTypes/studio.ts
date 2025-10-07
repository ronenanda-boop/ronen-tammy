import { defineType, defineField } from "sanity";

export default defineType({
  name: "studio",
  title: "Studio",
  type: "document",
  fields: [
    defineField({ name: "vision", type: "array", title: "Vision", of: [{ type: "block" }] }),
    defineField({ name: "vision_en", type: "array", title: "Vision (English)", of: [{ type: "block" }] }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }]
    }),
    defineField({
      name: "bookingProvider",
      title: "Booking Provider",
      type: "string",
      options: {
        list: [
          { title: "Cal.com", value: "cal" },
          { title: "Calendly", value: "calendly" }
        ]
      }
    }),
    defineField({ name: "bookingUrl", type: "url", title: "Booking URL" }),
    defineField({ name: "address", type: "string", title: "Address" }),
    defineField({ name: "email", type: "string", title: "Email" })
  ]
});
