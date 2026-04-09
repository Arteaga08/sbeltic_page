import mongoose from 'mongoose';
import Product from '../models/Product.js';
import { createProductSchema, updateProductSchema } from '../validators/productValidator.js';
import { buildQuery } from '../utils/apiFeatures.js';

// @desc  Listar productos
// @route GET /api/products
// @access Public
const getProducts = async (req, res, next) => {
  try {
    const extraFilters = {};
    if (req.query.category) {
      if (!mongoose.isValidObjectId(req.query.category)) {
        return res.status(400).json({ success: false, message: 'ID de categoría no válido' });
      }
      extraFilters.category = req.query.category;
    }
    if (req.query.isPackage !== undefined) extraFilters.isPackage = req.query.isPackage === 'true';
    if (req.query.skinType) {
      if (!mongoose.isValidObjectId(req.query.skinType)) {
        return res.status(400).json({ success: false, message: 'ID de tipo de piel no válido' });
      }
      extraFilters.skinTypes = req.query.skinType;
    }
    if (req.query.skinConcern) {
      if (!mongoose.isValidObjectId(req.query.skinConcern)) {
        return res.status(400).json({ success: false, message: 'ID de condición no válido' });
      }
      extraFilters.skinConcerns = req.query.skinConcern;
    }

    const { filter, skip, limit, page } = buildQuery(req.query, extraFilters);
    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('category', 'name slug')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc  Obtener producto por ID o slug
// @route GET /api/products/:id
// @access Public
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filter = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id };
    const product = await Product.findOne(filter)
      .populate('category', 'name slug')
      .populate('packageItems.product', 'name slug price images');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc  Crear producto
// @route POST /api/products
// @access Private
const createProduct = async (req, res, next) => {
  try {
    const parsed = createProductSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error.flatten().fieldErrors });
    }

    const product = await Product.create(parsed.data);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc  Actualizar producto
// @route PUT /api/products/:id
// @access Private
const updateProduct = async (req, res, next) => {
  try {
    const parsed = updateProductSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error.flatten().fieldErrors });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, parsed.data, {
      new: true,
      runValidators: true,
    }).populate('category', 'name slug');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc  Eliminar producto
// @route DELETE /api/products/:id
// @access Private
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }

    res.json({ success: true, message: 'Producto eliminado' });
  } catch (error) {
    next(error);
  }
};

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
