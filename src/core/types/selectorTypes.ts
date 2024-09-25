import { z } from 'zod';
import { nonempty } from '../utils/formUtils';

export const selectorDataSchema = z.object({
    value: z.string().pipe(nonempty),
    label: z.string().pipe(nonempty),
    extra: z.string().optional(),
    __isNew__: z.boolean().optional(),
});

export type SelectorDataType = z.infer<typeof selectorDataSchema>;
