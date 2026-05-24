import { z } from 'zod';

export const hazardFormSchema = z.object({
  firstName: z.string().max(32, 'Must be less than or equal to 32 characters.').nullable().optional(),
  lastName: z.string().max(32, 'Must be less than or equal to 32 characters.').nullable().optional(),
  email: z.union([z.literal(''), z.string().email('Not a valid email')]).nullable().optional(),
  tel: z
    .string()
    .nullable()
    .optional()
    .refine((value) => value === null || value === undefined || value === '' || value.length >= 10, {
      message: 'Number must be at least 10 digits',
    }),
  date: z
    .date()
    .nullable()
    .optional(),
  details: z
    .string()
    .max(5000, 'Details must be 5000 characters or less')
    .nullable()
    .optional(),
  isContact: z.boolean().nullable().optional(),
});

export type HazardFormType = z.infer<typeof hazardFormSchema>;

export interface VountaryType {
  status: string;
  data: string;
}
