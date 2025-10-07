interface StudioBookingEmbedProps {
  provider?: "cal" | "calendly" | null;
  url?: string | null;
}

export default function StudioBookingEmbed({ provider, url }: StudioBookingEmbedProps) {
  if (!url) {
    return null;
  }
  const title = provider === "calendly" ? "Calendly" : "Cal.com";
  return (
    <div className="w-full overflow-hidden rounded-3xl border border-foreground/10 bg-white/50 shadow-sm">
      <iframe
        src={url}
        title={`${title} Booking`}
        className="h-[720px] w-full"
        loading="lazy"
        allow="camera; microphone; autoplay; clipboard-read; clipboard-write"
      />
    </div>
  );
}
