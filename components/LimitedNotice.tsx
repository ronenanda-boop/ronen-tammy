"use client";

import Link from "next-intl/link";
import { useTranslations } from "next-intl";

interface LimitedNoticeProps {
  href: string;
}

export default function LimitedNotice({ href }: LimitedNoticeProps) {
  const t = useTranslations("limited");
  return (
    <div className="rounded-2xl border border-dashed border-accent/40 bg-accent/5 p-4 text-sm text-foreground/70">
      <p>
        {t("enNotice")} {" "}
        <Link href={href} locale="he" className="font-semibold text-accent underline">
          {t("viewInHebrew")}
        </Link>
      </p>
    </div>
  );
}
