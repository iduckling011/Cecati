import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error de conexión:', err));

// Esquema actualizado
const Contacto = mongoose.model('Contacto', {
  nombre: String,
  curp: String,
  fecha_nacimiento: String,
  sexo: String,
  telefono: String,
  correo: String,
  domicilio: String,
  municipio: String,
  estado: String,
  curso: String,
  escolaridad: String,
  difusion: String
});

// Ruta para guardar el formulario
app.post('/api/contacto', async (req, res) => {
  try {
    const nuevo = new Contacto(req.body);
    await nuevo.save();
    res.status(200).json({ message: '✅ Formulario guardado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: '❌ Error al guardar', error: err });
  }
});

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor escuchando en el puerto ${PORT}`));
