import mongoose from 'mongoose';
import Treatment from '../models/Treatment.js';
import { createTreatmentSchema, updateTreatmentSchema } from '../validators/treatmentValidator.js';
import { buildQuery } from '../utils/apiFeatures.js';

// @desc  Listar tratamientos
// @route GET /api/treatments
// @access Public
const getTreatments = async (req, res, next) => {
  try {
    const extraFilters = {};
    if (req.query.category) {
      if (!mongoose.isValidObjectId(req.query.category)) {
        return res.status(400).json({ success: false, message: 'ID de categoría no válido' });
      }
      extraFilters.category = req.query.category;
    }
    if (req.query.featured === 'true') extraFilters.isFeatured = true;

    const { filter, skip, limit, page } = buildQuery(req.query, extraFilters);
    const [treatments, total] = await Promise.all([
      Treatment.find(filter)
        .populate('category', 'name slug')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Treatment.countDocuments(filter),
    ]);

    res.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: treatments,
    });
  } catch (error) {
    next(error);
  }
};

// @desc  Obtener tratamiento por ID o slug
// @route GET /api/treatments/:id
// @access Public
const getTreatmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filter = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id };
    const treatment = await Treatment.findOne(filter).populate('category', 'name slug');

    if (!treatment) {
      return res.status(404).json({ success: false, message: 'Tratamiento no encontrado' });
    }

    res.json({ success: true, data: treatment });
  } catch (error) {
    next(error);
  }
};

// @desc  Crear tratamiento
// @route POST /api/treatments
// @access Private
const createTreatment = async (req, res, next) => {
  try {
    const parsed = createTreatmentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error.flatten().fieldErrors });
    }

    const treatment = await Treatment.create(parsed.data);
    res.status(201).json({ success: true, data: treatment });
  } catch (error) {
    next(error);
  }
};

// @desc  Actualizar tratamiento
// @route PUT /api/treatments/:id
// @access Private
const updateTreatment = async (req, res, next) => {
  try {
    const parsed = updateTreatmentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error.flatten().fieldErrors });
    }

    const treatment = await Treatment.findByIdAndUpdate(req.params.id, parsed.data, {
      new: true,
      runValidators: true,
    }).populate('category', 'name slug');

    if (!treatment) {
      return res.status(404).json({ success: false, message: 'Tratamiento no encontrado' });
    }

    res.json({ success: true, data: treatment });
  } catch (error) {
    next(error);
  }
};

// @desc  Eliminar tratamiento
// @route DELETE /api/treatments/:id
// @access Private
const deleteTreatment = async (req, res, next) => {
  try {
    const treatment = await Treatment.findByIdAndDelete(req.params.id);

    if (!treatment) {
      return res.status(404).json({ success: false, message: 'Tratamiento no encontrado' });
    }

    res.json({ success: true, message: 'Tratamiento eliminado' });
  } catch (error) {
    next(error);
  }
};

export { getTreatments, getTreatmentById, createTreatment, updateTreatment, deleteTreatment };
