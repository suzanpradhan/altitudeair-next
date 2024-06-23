import { nonempty } from "@/core/utils/formUtils";
import { z } from "zod";

export const bookingDetailSchema = z.object({
    package: z.number(),
    departureDate: z.date().optional(),
    noOfTravelers: z.number(),
    totalPrice: z.string().optional(),
    firstName: z.string().pipe(nonempty),
    lastName: z.string().pipe(nonempty),
    email: z.string().email().pipe(nonempty),
    phone: z.string().optional(),
    requirement: z.string().optional(),
});

export type BookingDetailSchemaType = z.infer<typeof bookingDetailSchema>;