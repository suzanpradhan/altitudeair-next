// count: formState.peopelCount.traveller_count,
//       travelDate:
//       service: formState.destination.service,
//       currentLatitude: formState.destination.pickup[1],
//       currentLongitude: formState.destination.pickup[0],
//       destinationLatitude: formState.destination.destination[0],
//       destinationLongitude: formState.destination.destination[1],
//       minbudget: formState.budget.min_budget,
//       maxbudget: formState.budget.max_budget,
//       firstName: values.firstName,
//       lastName: values.lastName,
//       email: values.email,
//       phone: values.tel,
//       details: values.details,

import { nonempty } from '@/core/utils/formUtils';
import { z } from 'zod';

export const enquirySchema = z.object({
  countForm: z.object({
    count: z
      .number()
      .max(6, 'Must be 6 at max')
      .min(1, 'Group should have atleast 2 members'),
  }),

  dateForm: z.object({
    travelDate: z
      .date()
      .min(new Date(), 'Date should be at least as of today')
      .optional()
      .nullable(),
  }),
  destinationForm: z.object({
    service: z.string().pipe(nonempty),
    currentLatitude: z.string().pipe(nonempty),
    currentLongitude: z.string().pipe(nonempty),
    destinationLatitude: z.string().pipe(nonempty),
    destinationLongitude: z.string().pipe(nonempty),
  }),
  budgetForm: z.object({
    minbudget: z
      .number()
      .min(0, 'The value cannot be less than zero.')
      .max(1500000, 'Max budget cannot exceed 15 lakh.'),
    maxbudget: z
      .number()
      .min(0, 'The value cannot be less than zero.')
      .max(1500000, 'Max budget cannot exceed 15 lakh.'),
  }),
  infosForm: z.object({
    firstName: z
      .string()
      .max(32, 'Must be less than or equal to 32 characters'),
    lastName: z.string().max(32, 'Must be less than or equal to 32 characters'),
    email: z.string().email('Not a valid email'),
    phone: z.string().min(10, 'Number must be at least 10 digits'),
    details: z.string().max(5000),
  }),
});

export type EnquirySchemaType = z.infer<typeof enquirySchema>;
