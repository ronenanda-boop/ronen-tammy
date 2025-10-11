import Image from "next/image";
import Link from 'next/link';


interface LogoProps {
  href: string;
  locale?: string;
}

export default function Logo({ href, locale }: LogoProps) {
  return (
    <Link href={href} locale={locale} className="flex items-center gap-2 text-lg font-semibold tracking-wide text-foreground">
      <Image src="/logo.svg" alt="Ronen & Tammy Izhaki" width={180} height={32} priority />
    </Link>
  );
}
