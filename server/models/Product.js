import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    sku: {
      type: String,
      unique: true,
      sparse: true, // permite múltiples documentos sin sku
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    shortDescription: {
      type: String,
    },
    images: [String],
    price: {
      type: Number,
      min: [0, 'El precio no puede ser negativo'],
    },
    compareAtPrice: {
      type: Number,
      min: [0, 'El precio original no puede ser negativo'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    skinTypes: [String],
    skinConcerns: [String],
    ingredients: {
      type: String,
    },
    keyIngredients: [
      {
        name: { type: String, required: true },
        description: { type: String },
      },
    ],
    howToUse: {
      type: String,
    },
    howWeUseIt: {
      type: String, // cómo lo usa la clínica en sus tratamientos
    },
    benefits: [String],
    bestFor: [String],
    variants: [
      {
        title: { type: String, required: true },
        price: { type: Number, min: 0 },
        sku: { type: String },
        stock: { type: Number, min: 0, default: 0 },
      },
    ],
    isPackage: {
      type: Boolean,
      default: false,
    },
    packageItems: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, min: 1, default: 1 },
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

productSchema.pre('save', function () {
  if (this.isModified('name')) {
    this.slug = slugify(this.name);
  }
});

productSchema.pre('findOneAndUpdate', function () {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name);
  }
});

productSchema.index({ active: 1, category: 1 });
productSchema.index({ active: 1, createdAt: -1 });
productSchema.index({ active: 1, isFeatured: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
