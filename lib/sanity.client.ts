import { createClient } from "next-sanity";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";
const apiVersion = "2024-03-01";

export const hasSanityCredentials = Boolean(projectId && dataset);

export const sanityClient = hasSanityCredentials
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
      token: process.env.SANITY_API_READ_TOKEN
    })
  : null;

export const writeClient = hasSanityCredentials
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_WRITE_TOKEN
    })
  : null;

export function getImageDimensions(image: { asset?: { _ref?: string } }) {
  if (!image?.asset?._ref) return null;
  const [, dimensions] = image.asset._ref.split("-");
  if (!dimensions) return null;
  const [width, height] = dimensions.split("x");
  return {
    width: Number(width),
    height: Number(height)
  };
}
