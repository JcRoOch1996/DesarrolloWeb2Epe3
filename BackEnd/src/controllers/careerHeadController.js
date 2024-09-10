import { CareerHead } from "../models/careerHeadEntity.js";
import bcrypt from "bcrypt";

// Manejar el inicio de sesión de un jefe de carrera
export const CareerHeadlogin = async (req, res) => {
  try {
    // Extrae el email y la contraseña del cuerpo de la solicitud
    const { email, password } = req.body;

    // Verifica que se proporcionen ambos datos
    if (!email || !password) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    // Busca al jefe de carrera en la base de datos por su email
    const career_head = await CareerHead.findOne({ where: { email } });

    // Verifica si el jefe de carrera existe y si la contraseña es correcta
    if (!career_head || !await bcrypt.compare(password, career_head.password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Obtener el RUT del jefe de carrera
    const { rut } = career_head;

    // Envia una respuesta exitosa con el RUT del jefe de carrera
    res.status(200).json({
      message: 'Login successful',
      rut // Incluye el RUT en la respuesta
    });

  } catch (error) {
    // Manejo de errores si ocurre algún problema durante el proceso de inicio de sesión
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los jefes de carrera
export const getAllCareerHeads = async (req, res) => {
  try {
    // Recupera todos los jefes de carrera de la base de datos
    const career_heads = await CareerHead.findAll();
    // Envia la lista de jefes de carrera como respuesta
    res.json(career_heads);
  } catch (error) {
    // Manejo de errores si ocurre algún problema al recuperar la lista
    res.status(500).json({ error: "¡Error al obtener los jefes de carrera!" });
  }
};

// Obtener un jefe de carrera por ID
export const getCareerHeadById = async (req, res) => {
  try {
    // Busca al jefe de carrera en la base de datos por su ID
    const career_head = await CareerHead.findByPk(req.params.id);
    if (!career_head) return res.status(404).json({ error: "¡Jefe de carrera no encontrado!" });
    // Envia el jefe de carrera encontrado como respuesta
    res.json(career_head);
  } catch (error) {
    // Manejo de errores si ocurre algún problema al recuperar el jefe de carrera
    res.status(500).json({ error: "¡Error al obtener el jefe de carrera!" });
  }
};

// Crear un nuevo jefe de carrera
export const createCareerHead = async (req, res) => {
  try {
    // Extrae los datos del nuevo jefe de carrera del cuerpo de la solicitud
    const { rut, names, lastnames, birthdate, gender, email, password, role, careerId } = req.body;

    // Hash de la contraseña antes de guardar en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo jefe de carrera en la base de datos
    const newCareerHead = await CareerHead.create({
      rut,
      names,
      lastnames,
      birthdate,
      gender,
      email,
      password: hashedPassword,
      role,
      careerId
    });

    // Envia el nuevo jefe de carrera creado como respuesta
    res.status(201).json(newCareerHead);
  } catch (error) {
    // Manejo de errores si ocurre algún problema al crear el nuevo jefe de carrera
    // Especialmente para manejar duplicados en campos únicos como rut y email
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "El rut o el email ya están en uso." });
    }
    res.status(500).json({ error: "¡Error al crear un nuevo jefe de carrera!" });
  }
};

// Actualizar un jefe de carrera existente
export const updateCareerHead = async (req, res) => {
  try {
    // Extrae los datos actualizados del cuerpo de la solicitud
    const { rut, names, lastnames, birthdate, gender, email, password, role, careerId } = req.body;

    // Busca al jefe de carrera en la base de datos por su ID
    const career_head = await CareerHead.findByPk(req.params.id);
    if (!career_head) return res.status(404).json({ error: "Jefe de carrera no encontrado" });

    // Si se proporciona una nueva contraseña, hacer hash de la nueva
    if (password) {
      career_head.password = await bcrypt.hash(password, 10);
    }

    // Actualiza los campos del jefe de carrera con los nuevos datos
    career_head.rut = rut;
    career_head.names = names;
    career_head.lastnames = lastnames;
    career_head.birthdate = birthdate;
    career_head.gender = gender;
    career_head.email = email;
    career_head.role = role;
    career_head.careerId = careerId;

    // Guarda los cambios en la base de datos
    await career_head.save();
    // Envia el jefe de carrera actualizado como respuesta
    res.json(career_head);
  } catch (error) {
    // Manejo de errores si ocurre algún problema al actualizar el jefe de carrera
    // Especialmente para manejar duplicados en campos únicos como rut y email
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "El rut o el email ya están en uso." });
    }
    res.status(500).json({ error: "¡Error al actualizar el jefe de carrera!" });
  }
};

// Eliminar un jefe de carrera
export const deleteCareerHead = async (req, res) => {
  try {
    // Busca al jefe de carrera en la base de datos por su ID
    const career_head = await CareerHead.findByPk(req.params.id);
    if (!career_head) return res.status(404).json({ error: "Jefe de carrera no encontrado" });

    // Elimina al jefe de carrera de la base de datos
    await career_head.destroy();
    // Envia un mensaje de éxito como respuesta
    res.json({ message: "¡Jefe de carrera eliminado exitosamente!" });
  } catch (error) {
    // Manejo de errores si ocurre algún problema al eliminar el jefe de carrera
    res.status(500).json({ error: "¡Error al eliminar el jefe de carrera!" });
  }
};
