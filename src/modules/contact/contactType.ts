import { z } from 'zod';

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .max(32, 'Must be less than or equal to 32 characters.')
    .optional(),
  lastName: z
    .string()
    .max(32, 'Must be less than or equal to 32 characters.')
    .optional(),
  email: z.string().email('Not a valid email'),
  tel: z
    .string()
    .optional()
    .refine((value) => value === undefined || value === '' || value.length >= 10, {
      message: 'Number must be at least 10 digits',
    }),
  date: z.date(),
  details: z
    .string()
    .min(1, 'Details are required')
    .max(5000, 'Details must be 5000 characters or less'),
  isContact: z.boolean().optional().nullable(),
});

export type ContactFormType = z.infer<typeof contactFormSchema>;

export interface ContactType {
  id: number;
  address: string;
  airportNumber: string;
  copyright: string;
  headNumber: string;
  latitude: string;
  longitude: string;
  inquiry1: string;
  inquiry2: string;
  inquiry3: string;
  bookingEmail: string;
  bookingInquiry: string;
}
export interface SocialLinkType {
  id: number;
  instagram: string;
  facebook: string;
  youtube: string;
  twitter: string;
}
export interface GeneralType {
  id: number;
  siteTitle: string;
  favIcon: string;
  QRcode: string;
  VideoUrl: string;
  PDF: string;
}
