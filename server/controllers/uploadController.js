import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc  Subir imágenes
// @route POST /api/upload/:entity
// @access Private
const uploadImages = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: 'No se recibieron archivos' });
  }

  const entity = req.params.entity;
  const urls = req.files.map((file) => `/uploads/${entity}/${file.filename}`);

  res.status(200).json({ success: true, urls });
};

// @desc  Eliminar imagen
// @route DELETE /api/upload
// @access Private
const deleteImage = (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ success: false, message: 'URL de imagen requerida' });
  }

  // Evitar path traversal: solo permitir rutas dentro de /uploads/
  if (!url.startsWith('/uploads/')) {
    return res.status(400).json({ success: false, message: 'URL no válida' });
  }

  const filePath = path.join(__dirname, '..', url);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: 'Imagen no encontrada' });
  }

  fs.unlinkSync(filePath);
  res.status(200).json({ success: true, message: 'Imagen eliminada' });
};

export { uploadImages, deleteImage };
