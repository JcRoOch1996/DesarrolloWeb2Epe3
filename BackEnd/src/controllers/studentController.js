import { Student } from "../models/studentEntity.js";
import bcrypt from "bcrypt";

// Controlador para el inicio de sesión de un estudiante.
export const Studentlogin = async (req, res) => {
  try {
    // Extrae el email y la contraseña del cuerpo de la solicitud.
    const { email, password } = req.body;

    // Verifica que se hayan proporcionado ambos campos.
    if (!email || !password) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    // Busca el estudiante en la base de datos usando el email proporcionado.
    const student = await Student.findOne({ where: { email } });

    // Verifica que el estudiante exista y que la contraseña proporcionada sea correcta.
    if (!student || !await bcrypt.compare(password, student.password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Si las credenciales son correctas, devuelve un mensaje de éxito.
    res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    // Manejo de errores, devuelve un estado 400 con el mensaje de error.
    res.status(400).json({ error: error.message });
  }
};

// Controlador para obtener todos los estudiantes.
export const getAllStudents = async (req, res) => {
  try {
    // Busca todos los estudiantes en la base de datos.
    const student = await Student.findAll();
    // Devuelve la lista de estudiantes en formato JSON.
    res.json(student);
  } catch (error) {
    // En caso de error, devuelve un estado 500 con un mensaje de error.
    res.status(500).json({ error: "¡Error al obtener los estudiantes!" });
  }
};

// Controlador para obtener un estudiante por ID.
export const getStudentById = async (req, res) => {
  try {
    // Busca el estudiante en la base de datos usando el ID proporcionado.
    const student = await Student.findByPk(req.params.id);
    // Devuelve un estado 404 si el estudiante no se encuentra.
    if (!student) return res.status(404).json({ error: "¡Estudiante no encontrado!" });
    // Devuelve los detalles del estudiante en formato JSON.
    res.json(student);
  } catch (error) {
    // En caso de error, devuelve un estado 500 con un mensaje de error.
    res.status(500).json({ error: "¡Error al obtener el estudiante!" });
  }
};

// Controlador para crear un nuevo estudiante.
export const createStudent = async (req, res) => {
  try {
    // Extrae los detalles del estudiante del cuerpo de la solicitud.
    const { rut, names, lastnames, birthdate, gender, email, password, role, courseId } = req.body;

    // Hash de la contraseña antes de guardarla en la base de datos.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo estudiante en la base de datos con los datos proporcionados.
    const newStudent = await Student.create({
      rut,
      names,
      lastnames,
      birthdate,
      gender,
      email,
      password: hashedPassword,
      role,
      courseId,
    });

    // Devuelve el nuevo estudiante creado en formato JSON con un estado 201.
    res.status(201).json(newStudent);
  } catch (error) {
    // Manejo de errores por duplicados en los campos únicos (rut, email).
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "El rut o el email ya están en uso." });
    }
    // En caso de otros errores, devuelve un estado 500 con un mensaje de error.
    res.status(500).json({ error: "¡Error al crear un nuevo estudiante!" });
  }
};

// Controlador para actualizar un estudiante existente.
export const updateStudent = async (req, res) => {
  try {
    // Extrae los detalles del estudiante del cuerpo de la solicitud.
    const { rut, names, lastnames, birthdate, gender, email, password, role, courseId } = req.body;

    // Busca el estudiante en la base de datos usando el ID proporcionado.
    const student = await Student.findByPk(req.params.id);
    // Devuelve un estado 404 si el estudiante no se encuentra.
    if (!student) return res.status(404).json({ error: "Estudiante no encontrado" });

    // Si se proporciona una nueva contraseña, se hace hash de la nueva contraseña.
    if (password) {
      student.password = await bcrypt.hash(password, 10);
    }

    // Actualiza los detalles del estudiante en la base de datos.
    student.rut = rut;
    student.names = names;
    student.lastnames = lastnames;
    student.birthdate = birthdate;
    student.gender = gender;
    student.email = email;
    student.role = role;
    student.courseId = courseId;

    // Guarda los cambios en la base de datos.
    await student.save();
    // Devuelve el estudiante actualizado en formato JSON.
    res.json(student);
  } catch (error) {
    // Manejo de errores por duplicados en los campos únicos (rut, email).
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "El rut o el email ya están en uso." });
    }
    // En caso de otros errores, devuelve un estado 500 con un mensaje de error.
    res.status(500).json({ error: "¡Error al actualizar el estudiante!" });
  }
};

// Controlador para eliminar un estudiante.
export const deleteStudent = async (req, res) => {
  try {
    // Busca el estudiante en la base de datos usando el ID proporcionado.
    const student = await Student.findByPk(req.params.id);
    // Devuelve un estado 404 si el estudiante no se encuentra.
    if (!student) return res.status(404).json({ error: "Estudiante no encontrado" });

    // Elimina el estudiante de la base de datos.
    await student.destroy();
    // Devuelve un mensaje de éxito con un estado 200.
    res.json({ message: "¡Estudiante eliminado exitosamente!" });
  } catch (error) {
    // En caso de error, devuelve un estado 500 con un mensaje de error.
    res.status(500).json({ error: "¡Error al eliminar el estudiante!" });
  }
};
