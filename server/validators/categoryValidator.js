import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').trim(),
  type: z.enum(['treatment', 'product'], { required_error: 'El tipo es requerido' }),
  description: z.string().trim().optional(),
  image: z.string().optional(),
  active: z.boolean().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();
