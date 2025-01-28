import { nonempty } from "@/core/utils/formUtils";
import { z } from "zod";

export const contactFormSchema = z.object({
    firstName: z.string().pipe(nonempty),
    lastName: z.string().pipe(nonempty),
    email: z.string().email().pipe(nonempty),
    tel: z.string().pipe(nonempty),
    details: z.string().optional(),
    date: z.date(),

});

export type ContactFormType = z.infer<typeof contactFormSchema>;