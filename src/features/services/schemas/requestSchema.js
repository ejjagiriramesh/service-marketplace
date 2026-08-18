import { z } from "zod";

export const requestDetailsSchema = z.object({
  notes: z.string().max(300, "Keep it under 300 characters").optional().or(z.literal("")),
});

export const requestWizardSchema = z.object({
  service: z.object({ id: z.string(), name: z.string(), price: z.number(), duration: z.string() }),
  address: z.string().min(1, "Choose an address"),
  date: z.string().min(1, "Choose a date"),
  time: z.string().min(1, "Choose a time slot"),
  notes: z.string().max(300).optional().or(z.literal("")),
});
