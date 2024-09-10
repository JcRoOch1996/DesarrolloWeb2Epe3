import { Profesor } from "../models/profesorEntity.js";
import bcrypt from "bcrypt";

// Iniciar sesión como profesor
export const Profesorlogin = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Verificar que se proporcionaron tanto el email como la contraseña
      if (!email || !password) {
          return res.status(400).json({ error: 'Faltan datos requeridos' });
      }

      // Buscar al profesor en la base de datos por su email
      const profesor = await Profesor.findOne({ where: { email } });

      // Verificar si el profesor existe y si la contraseña es correcta
      if (!profesor || !await bcrypt.compare(password, profesor.password)) {
          return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Solo se verifica la autenticación aquí; no se emite un token
      res.status(200).json({ message: 'Login successful' });

  } catch (error) {
      // Manejo de errores en caso de excepción
      res.status(400).json({ error: error.message });
  }
};

// Obtener todos los profesores
export const getAllProfesors = async (req, res) => {
  try {
    // Recupera todos los profesores de la base de datos
    const profesores = await Profesor.findAll();
    res.json(profesores);
  } catch (error) {
    // Manejo de errores en caso de fallo al recuperar los datos
    res.status(500).json({ error: "¡Error al obtener los profesores!" });
  }
};

// Obtener un profesor por ID
export const getProfesorById = async (req, res) => {
  try {
    // Buscar al profesor por ID en la base de datos
    const profesor = await Profesor.findByPk(req.params.id);
    if (!profesor) return res.status(404).json({ error: "¡Profesor no encontrado!" });
    res.json(profesor);
  } catch (error) {
    // Manejo de errores en caso de fallo al recuperar el profesor
    res.status(500).json({ error: "¡Error al obtener el profesor!" });
  }
};

// Crear un nuevo profesor
export const createProfesor = async (req, res) => {
  try {
    const { rut, names, lastnames, birthdate, gender, email, password, role } = req.body;

    // Hashear la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo profesor con los datos proporcionados
    const newProfesor = await Profesor.create({
      rut,
      names,
      lastnames,
      birthdate,
      gender,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json(newProfesor);
  } catch (error) {
    // Manejo de errores por duplicados en los campos únicos (rut, email)
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "El rut o el email ya están en uso." });
    }
    // Manejo de errores generales en caso de fallo al crear el profesor
    res.status(500).json({ error: "¡Error al crear un nuevo profesor!" });
  }
};

// Actualizar un profesor existente
export const updateProfesor = async (req, res) => {
  try {
    const { rut, names, lastnames, birthdate, gender, email, password, role } = req.body;

    // Buscar al profesor por ID en la base de datos
    const profesor = await Profesor.findByPk(req.params.id);
    if (!profesor) return res.status(404).json({ error: "Profesor no encontrado" });

    // Si se proporciona una nueva contraseña, hacer hash de la nueva
    if (password) {
      profesor.password = await bcrypt.hash(password, 10);
    }

    // Actualizar los campos del profesor con los nuevos datos
    profesor.rut = rut;
    profesor.names = names;
    profesor.lastnames = lastnames;
    profesor.birthdate = birthdate;
    profesor.gender = gender;
    profesor.email = email;
    profesor.role = role;

    await profesor.save();
    res.json(profesor);
  } catch (error) {
    // Manejo de errores por duplicados en los campos únicos (rut, email)
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "El rut o el email ya están en uso." });
    }
    // Manejo de errores generales en caso de fallo al actualizar el profesor
    res.status(500).json({ error: "¡Error al actualizar el profesor!" });
  }
};

// Eliminar un profesor
export const deleteProfesor = async (req, res) => {
  try {
    // Buscar al profesor por ID en la base de datos
    const profesor = await Profesor.findByPk(req.params.id);
    if (!profesor) return res.status(404).json({ error: "Profesor no encontrado" });

    // Eliminar el profesor de la base de datos
    await profesor.destroy();
    res.json({ message: "¡Profesor eliminado exitosamente!" });
  } catch (error) {
    // Manejo de errores generales en caso de fallo al eliminar el profesor
    res.status(500).json({ error: "¡Error al eliminar el profesor!" });
  }
};
