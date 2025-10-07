export type PortableTextBlock = {
  _type: string;
  [key: string]: unknown;
};

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface SiteSettings {
  title: string;
  title_en?: string;
  description?: string;
  description_en?: string;
  heroVideoUrl?: string;
  heroPoster?: SanityImage;
  contacts?: {
    email?: string;
    phone?: string;
  };
  socials?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}

export interface Work {
  _id: string;
  title: string;
  slug: string;
  year?: string;
  coverImage?: SanityImage;
  gallery?: SanityImage[];
  videoUrl?: string;
  credits?: string[];
  description?: PortableTextBlock[];
  featured?: boolean;
}

export interface StudioContent {
  _id: string;
  vision?: PortableTextBlock[];
  vision_en?: PortableTextBlock[];
  photos?: SanityImage[];
  bookingProvider?: "cal" | "calendly";
  bookingUrl?: string;
  address?: string;
  email?: string;
}

export interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  notes?: string;
}
