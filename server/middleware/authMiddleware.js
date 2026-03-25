import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, message: 'No autorizado, inicia sesión' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await AdminUser.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
    }

    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Token inválido o expirado' });
  }
};

export { protect };
