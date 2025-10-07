import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "./sanity.client";

const builder = sanityClient
  ? createImageUrlBuilder({ projectId: sanityClient.config().projectId, dataset: sanityClient.config().dataset })
  : null;

export function urlForImage(source: SanityImageSource) {
  if (!builder) return null;
  return builder.image(source).auto("format").fit("max");
}
