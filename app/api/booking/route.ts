import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { isRateLimited } from "@/lib/rate-limit";
import { writeClient, hasSanityCredentials } from "@/lib/sanity.client";

const bookingSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  phone: z.string().min(5).max(40),
  date: z.string().min(1),
  timeFrom: z.string().min(1),
  timeTo: z.string().min(1),
  notes: z.string().max(500).optional().or(z.literal(""))
});

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  const identifier = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
  if (isRateLimited(`booking:${identifier}`)) {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }

  let data: unknown;
  try {
    data = await request.json();
  } catch (error) {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ message: "Validation failed", errors: parsed.error.flatten() }, { status: 400 });
  }

  if (hasSanityCredentials && writeClient) {
    try {
      await writeClient.create({
        _type: "booking",
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        date: parsed.data.date,
        timeFrom: parsed.data.timeFrom,
        timeTo: parsed.data.timeTo,
        notes: parsed.data.notes,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Sanity booking error", error);
    }
  }

  if (resend) {
    try {
      await resend.emails.send({
        from: "studio@ronen-tammy.com",
        to: ["hello@ronen-tammy.com"],
        subject: `New booking request from ${parsed.data.name}`,
        text: `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\nPhone: ${parsed.data.phone}\nDate: ${parsed.data.date}\nTime: ${parsed.data.timeFrom} - ${parsed.data.timeTo}\nNotes: ${parsed.data.notes || ""}`
      });
    } catch (error) {
      console.error("Resend error", error);
    }
  }

  return NextResponse.json({ message: "ok" });
}
