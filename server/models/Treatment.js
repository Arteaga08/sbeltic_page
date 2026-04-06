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
    beforeImages: [String],
    afterImages: [String],
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
    benefitsText: {
      type: String, // Párrafo introductorio de la sección de beneficios
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
    // — Nuevas secciones de detalle —
    whySbeltic: {
      type: String, // Sección: ¿Por qué en Sbeltic?
    },
    aboutTreatment: {
      type: String, // Sección: De qué trata el tratamiento
    },
    aboutTreatmentImage: {
      type: String, // Imagen junto al texto de aboutTreatment
    },
    procedureSteps: [String], // Sección: Procedimiento (pasos numerados)
    procedureIntroText: {
      type: String, // Texto introductorio que aparece antes de los pasos del procedimiento
    },
    procedureBackgroundImage: {
      type: String, // Imagen de fondo full-bleed del procedimiento
    },
    candidatesText: {
      type: String, // Sección: Tipo de candidatos (párrafo intro)
    },
    candidatesBullets: [String], // Viñetas de candidatos ideales
    candidatesImage: {
      type: String, // Imagen izquierda de candidatos
    },
    recoveryText: {
      type: String, // Sección: Recuperación (párrafo intro)
    },
    recoveryBullets: [String], // Viñetas de cuidados post-tratamiento
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
