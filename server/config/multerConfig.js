import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const VALID_ENTITIES = ['categories', 'treatments', 'products'];

const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, webp)'), false);
  }
};

// Limpia el nombre del archivo: sin espacios ni caracteres raros
const sanitizeFilename = (name) => {
  const ext = path.extname(name);
  const base = path.basename(name, ext).replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase();
  return `${Date.now()}-${base}${ext}`;
};

export const upload = (entity) => {
  if (!VALID_ENTITIES.includes(entity)) {
    throw new Error(`Entidad no válida: ${entity}`);
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', 'uploads', entity));
    },
    filename: (req, file, cb) => {
      cb(null, sanitizeFilename(file.originalname));
    },
  });

  return multer({ storage, fileFilter, limits: { fileSize: MAX_SIZE } });
};
