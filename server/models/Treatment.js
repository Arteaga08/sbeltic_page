import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js';

const treatmentSchema = new mongoose.Schema(
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
    },
    shortDescription: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    images: [String],
    beforeAfterImages: [String],
    price: {
      type: Number,
      min: [0, 'El precio no puede ser negativo'],
    },
    compareAtPrice: {
      type: Number,
      min: [0, 'El precio original no puede ser negativo'],
    },
    duration: {
      type: String, // ej: "60 min"
    },
    sessions: {
      type: String, // ej: "4-6 sesiones"
    },
    downtime: {
      type: String, // ej: "Sin tiempo de inactividad"
    },
    resultsIn: {
      type: String, // ej: "Desde la primera sesión"
    },
    benefits: [String],
    howItWorks: {
      type: String,
    },
    preparation: {
      type: String,
    },
    aftercare: {
      type: String,
    },
    contraindications: [String],
    targetAreas: [String],
    skinTypes: [String],
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

treatmentSchema.pre('save', function () {
  if (this.isModified('name')) {
    this.slug = slugify(this.name);
  }
});

treatmentSchema.pre('findOneAndUpdate', function () {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name);
  }
});

const Treatment = mongoose.model('Treatment', treatmentSchema);

export default Treatment;
