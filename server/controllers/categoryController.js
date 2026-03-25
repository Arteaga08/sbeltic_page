import mongoose from 'mongoose';
import Category from '../models/Category.js';
import { createCategorySchema, updateCategorySchema } from '../validators/categoryValidator.js';
import { buildQuery } from '../utils/apiFeatures.js';

// @desc  Listar categorías
// @route GET /api/categories
// @access Public
const getCategories = async (req, res, next) => {
  try {
    const { filter, skip, limit, page } = buildQuery(req.query);
    const [categories, total] = await Promise.all([
      Category.find(filter).skip(skip).limit(limit).sort({ name: 1 }),
      Category.countDocuments(filter),
    ]);

    res.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// @desc  Obtener categoría por ID o slug
// @route GET /api/categories/:id
// @access Public
const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filter = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id };
    const category = await Category.findOne(filter);

    if (!category) {
      return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
    }

    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// @desc  Crear categoría
// @route POST /api/categories
// @access Private
const createCategory = async (req, res, next) => {
  try {
    const parsed = createCategorySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error.flatten().fieldErrors });
    }

    const category = await Category.create(parsed.data);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// @desc  Actualizar categoría
// @route PUT /api/categories/:id
// @access Private
const updateCategory = async (req, res, next) => {
  try {
    const parsed = updateCategorySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error.flatten().fieldErrors });
    }

    const category = await Category.findByIdAndUpdate(req.params.id, parsed.data, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
    }

    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// @desc  Eliminar categoría
// @route DELETE /api/categories/:id
// @access Private
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
    }

    res.json({ success: true, message: 'Categoría eliminada' });
  } catch (error) {
    next(error);
  }
};

export { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
