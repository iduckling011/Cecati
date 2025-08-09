import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'; // ✅ añadido para enviar correo

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Conexión a MongoDB Atlas (solo para inscripciones)
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
}, { collection: 'Inscripcion' });

const Inscripcion = mongoose.model('Inscripcion', InscripcionSchema);

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
   📬 Ruta POST para mensajes (solo email)
   ============================ */
app.post('/api/mensaje', async (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.CORREO_RECEPTOR,
        pass: process.env.CORREO_CLAVE
      }
    });

    const mailOptions = {
      from: correo,
      to: process.env.CORREO_RECEPTOR,
      subject: `📬 Nuevo mensaje de contacto de ${nombre}`,
      text: `Nombre: ${nombre}\nCorreo: ${correo}\n\nMensaje:\n${mensaje}`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: '✅ Tu mensaje fue enviado por correo' });
  } catch (err) {
    console.error('❌ Error al enviar el correo:', err);
    res.status(500).json({ message: 'Hubo un problema al enviar el mensaje' });
  }
});

// 🟢 Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor escuchando en el puerto ${PORT}`));
