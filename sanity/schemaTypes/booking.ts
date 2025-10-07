import { defineType, defineField } from "sanity";

export default defineType({
  name: "booking",
  title: "Booking Request",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", title: "Name" }),
    defineField({ name: "email", type: "string", title: "Email" }),
    defineField({ name: "phone", type: "string", title: "Phone" }),
    defineField({ name: "date", type: "date", title: "Date" }),
    defineField({ name: "timeFrom", type: "string", title: "Time From" }),
    defineField({ name: "timeTo", type: "string", title: "Time To" }),
    defineField({ name: "notes", type: "text", title: "Notes" }),
    defineField({
      name: "createdAt",
      type: "datetime",
      title: "Created At",
      initialValue: () => new Date().toISOString()
    })
  ]
});
