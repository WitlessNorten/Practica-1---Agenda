const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

let contactos = [
    { id: 1, nombreCompleto: "Mario", telefono: "1234567890", correo: "mario@ejemplo.com" },
    { id: 2, nombreCompleto: "Luigi", telefono: "0987654321", correo: "lugi@ejemplo.com" },
    { id: 3, nombreCompleto: "Warrior", telefono: "5555555555", correo: "warrior@ejemplo.com" }
];

let siguienteId = contactos.length + 1;

app.get('/api/contactos', (req, res) => {
    res.json(contactos);
});

app.post('/api/contactos', (req, res) => {
    const { nombreCompleto, telefono, correo } = req.body;

    if (!nombreCompleto || !telefono || !correo) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const nuevoContacto = {
        id: siguienteId++,
        nombreCompleto,
        telefono,
        correo
    };
    contactos.push(nuevoContacto);

    res.status(201).json(nuevoContacto);
});

app.get('/api/contactos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'El ID debe ser un número' });
    }

    const contacto = contactos.find(c => c.id === id);

    if (!contacto) {
        return res.status(404).json({ error: 'Contacto no encontrado' });
    }

    res.json(contacto);
});

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
