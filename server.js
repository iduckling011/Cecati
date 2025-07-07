// server.js

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import inscripcionesRoutes from './inscripciones.js';
import mensajesRoutes from './mensajes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Usar las rutas
app.use('/api', inscripcionesRoutes);
app.use('/api', mensajesRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
});
