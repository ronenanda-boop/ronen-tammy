"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

const bookingSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  phone: z.string().min(5).max(40),
  date: z.string().min(1),
  timeFrom: z.string().min(1),
  timeTo: z.string().min(1),
  notes: z.string().max(500).optional().or(z.literal(""))
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const tStudio = useTranslations("studio");
  const tCommon = useTranslations("common");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      timeFrom: "",
      timeTo: "",
      notes: ""
    }
  });

  const onSubmit = async (values: BookingFormValues) => {
    setStatus("idle");
    setMessage("");
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Failed to send");
      }
      setStatus("success");
      setMessage(tStudio("formSuccess"));
      reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage(tStudio("formError"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-3xl border border-foreground/10 bg-white/70 p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-foreground">{tStudio("formTitle")}</h3>
      <div className="grid gap-4 md:grid-cols-2">
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
          <span className="font-medium text-foreground">{tCommon("phone")}</span>
          <input
            type="tel"
            {...register("phone")}
            className="rounded-lg border border-foreground/20 bg-white px-3 py-2 text-base text-foreground focus:border-accent focus:outline-none"
          />
          {errors.phone?.message && <span className="text-xs text-red-500">{errors.phone.message}</span>}
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-foreground">{tCommon("date")}</span>
          <input
            type="date"
            {...register("date")}
            className="rounded-lg border border-foreground/20 bg-white px-3 py-2 text-base text-foreground focus:border-accent focus:outline-none"
          />
          {errors.date?.message && <span className="text-xs text-red-500">{errors.date.message}</span>}
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-foreground">{tCommon("from")}</span>
          <input
            type="time"
            {...register("timeFrom")}
            className="rounded-lg border border-foreground/20 bg-white px-3 py-2 text-base text-foreground focus:border-accent focus:outline-none"
          />
          {errors.timeFrom?.message && <span className="text-xs text-red-500">{errors.timeFrom.message}</span>}
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-foreground">{tCommon("to")}</span>
          <input
            type="time"
            {...register("timeTo")}
            className="rounded-lg border border-foreground/20 bg-white px-3 py-2 text-base text-foreground focus:border-accent focus:outline-none"
          />
          {errors.timeTo?.message && <span className="text-xs text-red-500">{errors.timeTo.message}</span>}
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-foreground">
          {tCommon("notes")}
          <span className="ml-1 text-foreground/50">({tCommon("optional")})</span>
        </span>
        <textarea
          rows={4}
          {...register("notes")}
          className="rounded-lg border border-foreground/20 bg-white px-3 py-2 text-base text-foreground focus:border-accent focus:outline-none"
        />
        {errors.notes?.message && <span className="text-xs text-red-500">{errors.notes.message}</span>}
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2 text-sm font-semibold text-background transition hover:bg-foreground/90 disabled:opacity-50"
      >
        {isSubmitting ? "..." : tCommon("submit")}
      </button>
      {status !== "idle" && (
        <p className={status === "success" ? "text-sm text-green-600" : "text-sm text-red-500"}>{message}</p>
      )}
    </form>
  );
}
