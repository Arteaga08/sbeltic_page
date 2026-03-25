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

    // Crear el admin
    const admin = await AdminUser.create({
      name: 'Administrador',
      email: 'admin@sbeltic.com',
      password: 'Admin1234!',
    });

    console.log('✅ Usuario admin creado:');
    console.log('   Email:', admin.email);
    console.log('   Contraseña: Admin1234!');
    console.log('\n⚠️  Cambia la contraseña después del primer login.');

    process.exit(0);
  } catch (error) {
    console.error('Error en seed:', error.message);
    process.exit(1);
  }
};

seed();
