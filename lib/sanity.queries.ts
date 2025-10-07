import { groq } from "next-sanity";
import type { Locale } from "@/lib/i18n";
import type { SiteSettings, StudioContent, Work } from "@/types/content";
import { sanityClient, hasSanityCredentials } from "./sanity.client";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  title,
  title_en,
  description,
  description_en,
  heroVideoUrl,
  heroPoster,
  contacts,
  socials
}`;

export const featuredWorksQuery = groq`*[_type == "work" && featured == true] | order(coalesce(year, "9999") desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  year,
  coverImage,
  videoUrl,
  credits,
  description
}`;

export const worksListQuery = groq`*[_type == "work"] | order(coalesce(year, "9999") desc){
  _id,
  title,
  "slug": slug.current,
  year,
  coverImage,
  videoUrl,
  credits,
  description,
  featured
}`;

export const workBySlugQuery = groq`*[_type == "work" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  year,
  coverImage,
  videoUrl,
  credits,
  description,
  gallery
}`;

export const studioQuery = groq`*[_type == "studio"][0]{
  _id,
  vision,
  vision_en,
  photos,
  bookingProvider,
  bookingUrl,
  address,
  email
}`;

function fallbackSiteSettings(locale: Locale): SiteSettings {
  const title = locale === "he" ? "רונן וטמי איצ׳אקי" : "Ronen & Tammy Izhaki";
  const description =
    locale === "he"
      ? "סטודיו יוצר לתוכן חזותי, וידאו וחוויות רב תחומיות."
      : "A boutique visual studio crafting films and cross-media experiences.";
  return {
    title,
    title_en: "Ronen & Tammy Izhaki",
    description,
    description_en: "A boutique visual studio crafting films and cross-media experiences.",
    heroVideoUrl: "https://player.vimeo.com/video/76979871?h=8272103f6e",
    contacts: {
      email: "hello@ronen-tammy.com",
      phone: "+972-50-000-0000"
    },
    socials: {
      instagram: "https://instagram.com",
      youtube: "https://youtube.com"
    }
  };
}

function fallbackWorks(): Work[] {
  return [
    {
      _id: "fallback-1",
      title: "Nebula Motion",
      slug: "nebula-motion",
      year: "2024",
      coverImage: undefined,
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      credits: ["Direction: Ronen Izhaki", "Design: Tammy Izhaki"],
      description: []
    },
    {
      _id: "fallback-2",
      title: "Aurora Soundscapes",
      slug: "aurora-soundscapes",
      year: "2023",
      coverImage: undefined,
      videoUrl: "https://vimeo.com/1084537",
      credits: ["Sound: Studio Team"],
      description: []
    }
  ];
}

function fallbackStudio(): StudioContent {
  return {
    _id: "fallback-studio",
    vision: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "הסטודיו של רונן וטמי איצ׳אקי מחבר בין קול, תנועה וטכנולוגיה ליצירת חוויות עשירות וחכמות."
          }
        ]
      }
    ],
    vision_en: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "The studio unites motion, sound and technology to craft layered experiences."
          }
        ]
      }
    ],
    photos: [],
    bookingProvider: (process.env.BOOKING_PROVIDER as StudioContent["bookingProvider"]) || "cal",
    bookingUrl: process.env.BOOKING_URL,
    address: "Tel Aviv, Israel",
    email: "studio@ronen-tammy.com"
  };
}

export async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  if (!hasSanityCredentials || !sanityClient) {
    return fallbackSiteSettings(locale);
  }
  const data = await sanityClient.fetch<SiteSettings>(siteSettingsQuery);
  return data ?? fallbackSiteSettings(locale);
}

export async function getFeaturedWorks(): Promise<Work[]> {
  if (!hasSanityCredentials || !sanityClient) {
    return fallbackWorks();
  }
  const data = await sanityClient.fetch<Work[]>(featuredWorksQuery);
  if (!data || data.length === 0) {
    return fallbackWorks();
  }
  return data;
}

export async function getWorks(): Promise<Work[]> {
  if (!hasSanityCredentials || !sanityClient) {
    return fallbackWorks();
  }
  const data = await sanityClient.fetch<Work[]>(worksListQuery);
  if (!data || data.length === 0) {
    return fallbackWorks();
  }
  return data;
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
  if (!hasSanityCredentials || !sanityClient) {
    const fallback = fallbackWorks().find((work) => work.slug === slug);
    return fallback ?? null;
  }
  const data = await sanityClient.fetch<Work | null>(workBySlugQuery, { slug });
  return data;
}

export async function getStudio(): Promise<StudioContent> {
  if (!hasSanityCredentials || !sanityClient) {
    return fallbackStudio();
  }
  const data = await sanityClient.fetch<StudioContent | null>(studioQuery);
  return data ?? fallbackStudio();
}
