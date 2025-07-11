import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error de conexión:', err));

/* ===========================
   📝 Esquema de Inscripción
   =========================== */
const InscripcionSchema = new mongoose.Schema({
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
}, { collection: 'inscripcion' }); // 👈 Nombre exacto

const Inscripcion = mongoose.model('Inscripcion', InscripcionSchema);

/* ==========================
   📬 Esquema de Mensajes
   ========================== */
const MensajeSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  mensaje: String
}, { collection: 'Mensajes' }); // 👈 Con M mayúscula como pediste

const Mensaje = mongoose.model('Mensaje', MensajeSchema);

/* ==============================
   🚀 Ruta POST para inscripciones
   ============================== */
app.post('/api/contacto', async (req, res) => {
  try {
    const nuevaInscripcion = new Inscripcion(req.body);
    await nuevaInscripcion.save();
    res.status(200).json({ message: '✅ Inscripción guardada exitosamente' });
  } catch (err) {
    res.status(500).json({ message: '❌ Error al guardar inscripción', error: err });
  }
});

/* ============================
   📥 Ruta POST para mensajes
   ============================ */
app.post('/api/mensaje', async (req, res) => {
  try {
    const nuevoMensaje = new Mensaje(req.body);
    await nuevoMensaje.save();
    res.status(200).json({ message: '✅ Mensaje guardado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: '❌ Error al guardar mensaje', error: err });
  }
});

// 🟢 Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor escuchando en el puerto ${PORT}`));
