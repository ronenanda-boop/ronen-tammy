"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

interface FooterProps {
  email?: string;
  phone?: string;
  socials?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}

export default function Footer({ email, phone, socials }: FooterProps) {
  const t = useTranslations("footer");
  return (
    <footer className="mt-auto border-t border-foreground/10 bg-background py-8">
      <div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1 text-sm text-foreground/60">
          {email && (
            <div>
              <span className="font-semibold text-foreground">Email:</span>{" "}
              <a href={`mailto:${email}`} className="hover:text-accent">
                {email}
              </a>
            </div>
          )}
          {phone && (
            <div>
              <span className="font-semibold text-foreground">Phone:</span>{" "}
              <a href={`tel:${phone}`} className="hover:text-accent">
                {phone}
              </a>
            </div>
          )}
          <p>{t("rights")}</p>
        </div>
        <div className="flex items-center gap-4 text-sm text-foreground/70">
          {socials?.instagram && (
            <Link href={socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              Instagram
            </Link>
          )}
          {socials?.facebook && (
            <Link href={socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              Facebook
            </Link>
          )}
          {socials?.youtube && (
            <Link href={socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              YouTube
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
