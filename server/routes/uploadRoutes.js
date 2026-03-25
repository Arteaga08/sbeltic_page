import { Router } from 'express';
import { uploadImages, deleteImage } from '../controllers/uploadController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../config/multerConfig.js';

const router = Router();

const VALID_ENTITIES = ['categories', 'treatments', 'products'];

// Middleware que valida la entidad y aplica Multer dinámicamente
const handleUpload = (req, res, next) => {
  const { entity } = req.params;

  if (!VALID_ENTITIES.includes(entity)) {
    return res.status(400).json({
      success: false,
      message: `Entidad no válida. Usa: ${VALID_ENTITIES.join(', ')}`,
    });
  }

  upload(entity).array('images', 10)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

router.post('/:entity', protect, handleUpload, uploadImages);
router.delete('/', protect, deleteImage);

export default router;
