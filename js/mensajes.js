// mensajes.js

import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Definir el esquema del mensaje
const mensajeSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  mensaje: String,
  fecha: { type: Date, default: Date.now }
});

// Crear el modelo
const Mensaje = mongoose.model('Mensaje', mensajeSchema);

// Ruta POST para guardar el mensaje
router.post('/mensaje', async (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  if (!nombre || !correo || !mensaje) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const nuevoMensaje = new Mensaje({ nombre, correo, mensaje });
    await nuevoMensaje.save();
    res.json({ message: '✅ Mensaje enviado correctamente' });
  } catch (error) {
    console.error('❌ Error al guardar el mensaje:', error);
    res.status(500).json({ message: 'Error del servidor al guardar el mensaje' });
  }
});

export default router;
