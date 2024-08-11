import { z } from "zod";

export const hazardFormSchema = z.object({
    firstName: z.string().max(32, "Must be less than or equal to 32 characters.").optional(),
    lastName: z.string().max(32, "Must be less than or equal to 32 characters.").optional(),
    email: z.string().email("Not a valid email").or(z.literal('')).optional(),
    tel: z.string().min(10, "Number must be at least 10 digits").or(z.literal('')).optional(),
    date: z.date().optional(),
    details: z.string().max(5000).optional()
});

export type HazardFormType = z.infer<typeof hazardFormSchema>;