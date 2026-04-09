import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { login, logout, getMe, changePassword } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Demasiados intentos de login, intenta de nuevo más tarde.' },
});

router.post('/login', loginLimiter, login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.put('/change-password', protect, changePassword);

export default router;
