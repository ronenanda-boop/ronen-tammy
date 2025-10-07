import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { isRateLimited } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  message: z.string().min(10).max(1000)
});

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  const identifier = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
  if (isRateLimited(`contact:${identifier}`)) {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }

  let data: unknown;
  try {
    data = await request.json();
  } catch (error) {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ message: "Validation failed", errors: parsed.error.flatten() }, { status: 400 });
  }

  if (resend) {
    try {
      await resend.emails.send({
        from: "studio@ronen-tammy.com",
        to: [parsed.data.email, "hello@ronen-tammy.com"],
        subject: `New contact from ${parsed.data.name}`,
        text: `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\nMessage: ${parsed.data.message}`
      });
    } catch (error) {
      console.error("Resend error", error);
    }
  }

  return NextResponse.json({ message: "ok" });
}
