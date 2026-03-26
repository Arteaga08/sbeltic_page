import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';

// Genera y retorna un JWT
const sendToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// @desc  Login del admin
// @route POST /api/auth/login
// @access Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email y contraseña son requeridos' });
    }

    // Incluimos password explícitamente porque tiene select: false en el schema
    const user = await AdminUser.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }

    const token = sendToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc  Logout del admin
// @route POST /api/auth/logout
// @access Private
const logout = (req, res) => {
  res.status(200).json({ success: true, message: 'Sesión cerrada' });
};

// @desc  Obtener usuario actual
// @route GET /api/auth/me
// @access Private
const getMe = (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
};

// @desc  Cambiar contraseña
// @route PUT /api/auth/change-password
// @access Private
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Faltan campos requeridos' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'La nueva contraseña debe tener al menos 8 caracteres' });
    }
    const user = await AdminUser.findById(req.user.id).select('+password');
    const match = await user.comparePassword(currentPassword);
    if (!match) {
      return res.status(401).json({ success: false, message: 'La contraseña actual es incorrecta' });
    }
    user.password = newPassword;
    await user.save();
    res.json({ success: true, message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    next(error);
  }
};

export { login, logout, getMe, changePassword };
