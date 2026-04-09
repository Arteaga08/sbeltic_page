import { z } from 'zod';

const keyIngredientSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

const variantSchema = z.object({
  title: z.string().min(1),
  price: z.number().min(0).optional(),
  sku: z.string().optional(),
  stock: z.number().min(0).optional(),
});

const packageItemSchema = z.object({
  product: z.string(), // ObjectId como string
  quantity: z.number().min(1).optional(),
});

export const createProductSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').trim(),
  sku: z.string().trim().optional(),
  brand: z.string().trim().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  images: z.array(z.string()).optional(),
  price: z.number().min(0).optional(),
  compareAtPrice: z.number().min(0).optional(),
  category: z.string().optional(), // ObjectId como string
  skinTypes: z.array(z.string()).optional(),
  skinConcerns: z.array(z.string()).optional(),
  ingredients: z.string().optional(),
  keyIngredients: z.array(keyIngredientSchema).optional(),
  howToUse: z.string().optional(),
  howWeUseIt: z.string().optional(),
  benefits: z.array(z.string()).optional(),
  bestFor: z.array(z.string()).optional(),
  variants: z.array(variantSchema).optional(),
  isPackage: z.boolean().optional(),
  packageItems: z.array(packageItemSchema).optional(),
  active: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

export const updateProductSchema = createProductSchema.partial();
