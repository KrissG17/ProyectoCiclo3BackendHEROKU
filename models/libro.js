import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const libroSchema = new Schema({
 nombre: {type: String, required: [true, 'Nombre obligatorio']},
 categoria: String,
 autor: String,
 libroId: String,
 date:{type: Date, default: Date.now},
 activo: {type: Boolean, default: true}
});

// Convertir a modelo
const Libro = mongoose.model('Libro', libroSchema);
export default Libro;