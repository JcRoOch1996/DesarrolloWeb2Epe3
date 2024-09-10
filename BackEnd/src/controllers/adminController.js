import { Admin } from "../models/adminEntity.js";
import bcrypt from "bcrypt";

// Función para iniciar sesión como administrador
export const Adminlogin = async (req, res) => {
    try {
        // Extrae email y password del cuerpo de la solicitud
        const { email, password } = req.body;

        // Verifica si se han proporcionado ambos datos requeridos
        if (!email || !password) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }

        // Busca al administrador en la base de datos por email
        const admin = await Admin.findOne({ where: { email } });

        // Verifica si el administrador existe y si la contraseña es correcta
        if (!admin || !await bcrypt.compare(password, admin.password)) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Responde con un mensaje de éxito si las credenciales son correctas
        res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        // Manejo de errores si ocurre algún problema durante el proceso de login
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los administradores
export const getAllAdmins = async (req, res) => {
    try {
        // Recupera todos los administradores de la base de datos
        const admins = await Admin.findAll();
        // Envia la lista de administradores como respuesta en formato JSON
        res.json(admins);
    } catch (error) {
        // Manejo de errores si ocurre algún problema al recuperar los administradores
        console.error(error);
        res.status(500).json({ error: "¡Error al obtener los administradores!" });
    }
};

// Obtener un administrador por ID
export const getAdminById = async (req, res) => {
    try {
        // Busca al administrador en la base de datos por su ID
        const admin = await Admin.findByPk(req.params.id);
        // Si el administrador no se encuentra, responde con un error 404
        if (!admin) return res.status(404).json({ error: "¡Administrador no encontrado!" });
        // Envia el administrador encontrado como respuesta en formato JSON
        res.json(admin);
    } catch (error) {
        // Manejo de errores si ocurre algún problema al recuperar el administrador
        res.status(500).json({ error: "¡Error al obtener el administrador!" });
    }
};

// Crear un nuevo administrador
export const createAdmin = async (req, res) => {
    try {
        // Extrae los datos del nuevo administrador del cuerpo de la solicitud
        const { rut, names, lastnames, birthdate, gender, email, password, role } = req.body;

        // Hash de la contraseña antes de guardarla en la base de datos
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea un nuevo administrador en la base de datos con los datos proporcionados
        const newAdmin = await Admin.create({
            rut,
            names,
            lastnames,
            birthdate,
            gender,
            email,
            password: hashedPassword,
            role
        });

        // Envia el nuevo administrador creado como respuesta en formato JSON
        res.status(201).json(newAdmin);
    } catch (error) {
        // Manejo de errores si ocurre algún problema al crear el nuevo administrador
        // Maneja errores de duplicado para campos únicos como rut y email
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({ error: "El rut o el email ya están en uso." });
        }
        res.status(500).json({ error: "¡Error al crear un nuevo administrador!" });
    }
};

// Actualizar un administrador existente
export const updateAdmin = async (req, res) => {
    try {
        // Extrae los datos actualizados del administrador del cuerpo de la solicitud
        const { rut, names, lastnames, birthdate, gender, email, password, role } = req.body;

        // Busca al administrador en la base de datos por su ID
        const admin = await Admin.findByPk(req.params.id);
        // Si el administrador no se encuentra, responde con un error 404
        if (!admin) return res.status(404).json({ error: "Administrador no encontrado" });

        // Si se proporciona una nueva contraseña, haz hash de la nueva contraseña
        if (password) {
            admin.password = await bcrypt.hash(password, 10);
        }

        // Actualiza los campos del administrador con los nuevos datos proporcionados
        admin.rut = rut;
        admin.names = names;
        admin.lastnames = lastnames;
        admin.birthdate = birthdate;
        admin.gender = gender;
        admin.email = email;
        admin.role = role;

        // Guarda los cambios en la base de datos
        await admin.save();
        // Envia el administrador actualizado como respuesta en formato JSON
        res.json(admin);
    } catch (error) {
        // Manejo de errores si ocurre algún problema al actualizar el administrador
        // Maneja errores de duplicado para campos únicos como rut y email
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({ error: "El rut o el email ya están en uso." });
        }
        res.status(500).json({ error: "¡Error al actualizar el administrador!" });
    }
};

// Eliminar un administrador
export const deleteAdmin = async (req, res) => {
    try {
        // Busca al administrador en la base de datos por su ID
        const admin = await Admin.findByPk(req.params.id);
        // Si el administrador no se encuentra, responde con un error 404
        if (!admin) return res.status(404).json({ error: "Administrador no encontrado" });

        // Elimina el administrador de la base de datos
        await admin.destroy();
        // Envia un mensaje de éxito como respuesta en formato JSON
        res.json({ message: "¡Administrador eliminado exitosamente!" });
    } catch (error) {
        // Manejo de errores si ocurre algún problema al eliminar el administrador
        res.status(500).json({ error: "¡Error al eliminar el administrador!" });
    }
};
