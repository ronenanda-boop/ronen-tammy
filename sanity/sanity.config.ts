import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import schemaTypes from "./schemaTypes";

const projectId = process.env.SANITY_PROJECT_ID || "";
const dataset = process.env.SANITY_DATASET || "production";
const useVision = process.env.NODE_ENV !== "production";

export default defineConfig({
  name: "ronen-tammy",
  title: "Ronen & Tammy Izhaki",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [deskTool(), ...(useVision ? [visionTool()] : [])],
  schema: {
    types: schemaTypes
  }
});
