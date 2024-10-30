import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

let users = [];

// Función para validar datos de usuario
function validateUserData({ nombre, edad, correo }) {
    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
        return { valid: false, message: 'El nombre es requerido y debe ser un string válido.' };
    }

    if (!edad || typeof edad !== 'number' || edad <= 0) {
        return { valid: false, message: 'La edad es requerida y debe ser un número positivo.' };
    }

    if (!correo || typeof correo !== 'string' || correo.trim() === '' || !/\S+@\S+\.\S+/.test(correo)) {
        return { valid: false, message: 'El correo es requerido y debe ser una dirección válida.' };
    }

    return { valid: true };
}

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.post('/api/users', (req, res) => {
    const { nombre, edad, correo } = req.body;

    const validation = validateUserData({ nombre, edad, correo });
    if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
    }

    const newUser = { id: users.length + 1, nombre, edad, correo };
    users.push(newUser);

    res.status(201).json(newUser);
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
