import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@/types/content";

const components = {
  block: {
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="leading-7 text-lg text-foreground/80">{children}</p>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-2xl font-semibold text-foreground">{children}</h2>
    )
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="ml-5 list-disc space-y-2 text-foreground/80">{children}</ul>
    )
  }
};

export default function RichText({ value }: { value?: PortableTextBlock[] }) {
  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <PortableText value={value} components={components} />
    </div>
  );
}
