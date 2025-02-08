require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Configuracion de la conexcion de MySQL desde .env
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/personas 🚀`);
});

// Conexion a la base de datos MySQL
db.connect(err => {
    if (err) {
        console.error('Error de conexión a MySQL ❌:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL✅');
});

// Obtener todas las personas
app.get('/personas', (req, res) => {
    db.query('SELECT * FROM persona', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Obtener una persona por ID
app.get('/personas/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM persona WHERE idpersona = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Persona no encontrada' });
        res.json(results[0]);
    });
});

// Crear una nueva persona
app.post('/personas', (req, res) => {
    const { cedula, nombre, apellido, telefono, email } = req.body;
    if (!cedula || !nombre || !apellido || !email) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }
    const query = 'INSERT INTO persona (cedula, nombre, apellido, telefono, email) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [cedula, nombre, apellido, telefono, email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, cedula, nombre, apellido, telefono, email });
    });
});

// Actualizar una persona por ID
app.put('/personas/:id', (req, res) => {
    const { id } = req.params;
    const { cedula, nombre, apellido, telefono, email } = req.body;
    const query = 'UPDATE persona SET cedula=?, nombre=?, apellido=?, telefono=?, email=? WHERE idpersona=?';
    db.query(query, [cedula, nombre, apellido, telefono, email, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Persona no encontrada' });
        res.json({ message: 'Persona actualizada correctamente' });
    });
});

// Eliminar una persona por ID
app.delete('/personas/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM persona WHERE idpersona = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Persona no encontrada' });
        res.json({ message: 'Persona eliminada correctamente' });
    });
});


