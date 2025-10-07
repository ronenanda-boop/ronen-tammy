"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  message: z.string().min(10).max(1000)
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const tContact = useTranslations("contact");
  const tCommon = useTranslations("common");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("idle");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Failed to send");
      }
      setStatus("success");
      setMessage(tContact("formSuccess"));
      reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage(tContact("formError"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-3xl border border-foreground/10 bg-white/70 p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-foreground">{tContact("formTitle")}</h3>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-foreground">{tCommon("name")}</span>
        <input
          type="text"
          {...register("name")}
          className="rounded-lg border border-foreground/20 bg-white px-3 py-2 text-base text-foreground focus:border-accent focus:outline-none"
        />
        {errors.name?.message && <span className="text-xs text-red-500">{errors.name.message}</span>}
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-foreground">{tCommon("email")}</span>
        <input
          type="email"
          {...register("email")}
          className="rounded-lg border border-foreground/20 bg-white px-3 py-2 text-base text-foreground focus:border-accent focus:outline-none"
        />
        {errors.email?.message && <span className="text-xs text-red-500">{errors.email.message}</span>}
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-foreground">{tCommon("message")}</span>
        <textarea
          rows={5}
          {...register("message")}
          className="rounded-lg border border-foreground/20 bg-white px-3 py-2 text-base text-foreground focus:border-accent focus:outline-none"
        />
        {errors.message?.message && <span className="text-xs text-red-500">{errors.message.message}</span>}
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white transition hover:bg-accent/80 disabled:opacity-50"
      >
        {isSubmitting ? "..." : tCommon("submit")}
      </button>
      {status !== "idle" && (
        <p className={status === "success" ? "text-sm text-green-600" : "text-sm text-red-500"}>{message}</p>
      )}
    </form>
  );
}
