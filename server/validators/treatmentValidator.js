import { z } from 'zod';

export const createTreatmentSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').trim(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  category: z.string().optional(), // ObjectId como string
  images: z.array(z.string()).optional(),
  beforeAfterImages: z.array(z.string()).optional(),
  price: z.number().min(0).optional(),
  compareAtPrice: z.number().min(0).optional(),
  duration: z.string().optional(),
  sessions: z.string().optional(),
  downtime: z.string().optional(),
  resultsIn: z.string().optional(),
  benefits: z.array(z.string()).optional(),
  howItWorks: z.string().optional(),
  preparation: z.string().optional(),
  aftercare: z.string().optional(),
  contraindications: z.array(z.string()).optional(),
  targetAreas: z.array(z.string()).optional(),
  skinTypes: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
  active: z.boolean().optional(),
});

export const updateTreatmentSchema = createTreatmentSchema.partial();
