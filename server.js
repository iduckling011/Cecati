const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // para recibir JSON del frontend

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

const FormSchema = new mongoose.Schema({
  nombre: String,
  curp: String,
  fecha_nacimiento: Date,
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

const Inscripcion = mongoose.model('Inscripcion', FormSchema);

app.post('/api/inscribir', async (req, res) => {
  try {
    const nuevaInscripcion = new Inscripcion(req.body);
    await nuevaInscripcion.save();
    res.status(200).json({ mensaje: 'Inscripción guardada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
