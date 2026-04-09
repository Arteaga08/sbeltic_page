import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js';

const categorySchema = new mongoose.Schema(
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
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String, // ruta local: /uploads/categories/foto.jpg
    },
    type: {
      type: String,
      enum: ['treatment', 'product'],
      required: [true, 'El tipo es requerido'],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

categorySchema.pre('save', function () {
  if (this.isModified('name')) {
    this.slug = slugify(this.name);
  }
});

categorySchema.pre('findOneAndUpdate', function () {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name);
  }
});

categorySchema.index({ active: 1, type: 1 });

const Category = mongoose.model('Category', categorySchema);

export default Category;
