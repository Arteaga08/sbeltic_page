/**
 * Script para crear el usuario admin inicial.
 * Ejecutar una sola vez: node seed.js
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import AdminUser from './models/AdminUser.js';

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado');

    // Verificar si ya existe un admin
    const existing = await AdminUser.findOne({ role: 'admin' });
    if (existing) {
      console.log('⚠️  Ya existe un usuario admin:', existing.email);
      process.exit(0);
    }

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.error('❌ Define ADMIN_EMAIL y ADMIN_PASSWORD en el archivo .env antes de correr seed.');
      process.exit(1);
    }

    // Crear el admin
    const admin = await AdminUser.create({
      name: 'Administrador',
      email,
      password,
    });

    console.log('✅ Usuario admin creado:', admin.email);
    console.log('⚠️  Cambia la contraseña después del primer login.');

    process.exit(0);
  } catch (error) {
    console.error('Error en seed:', error.message);
    process.exit(1);
  }
};

seed();
