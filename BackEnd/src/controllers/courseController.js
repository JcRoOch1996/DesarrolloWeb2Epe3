import { Course } from "../models/courseEntity.js";

// Obtener todos los cursos
export const getAllCourses = async (req, res) => {
  try {
    // Recupera todos los cursos de la base de datos
    const courses = await Course.findAll();
    // Envia la lista de cursos como respuesta
    res.json(courses);
  } catch (error) {
    // Manejo de errores en caso de fallo al recuperar los cursos
    res.status(500).json({ error: "Error al obtener los cursos" });
  }
};

// Obtener un curso por ID
export const getCourseById = async (req, res) => {
  try {
    // Busca el curso en la base de datos por su ID
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ error: "Curso no encontrado" });
    // Envia el curso encontrado como respuesta
    res.json(course);
  } catch (error) {
    // Manejo de errores en caso de fallo al recuperar el curso
    res.status(500).json({ error: "Error al obtener el curso" });
  }
};

// Crear un nuevo curso
export const createCourse = async (req, res) => {
  try {
    // Extrae los datos del nuevo curso del cuerpo de la solicitud
    const { course_code, course_name, careerId } = req.body;
    // Crea un nuevo curso en la base de datos
    const newCourse = await Course.create({ course_code, course_name, careerId });
    // Envia el curso creado como respuesta
    res.status(201).json(newCourse);
  } catch (error) {
    // Manejo de errores en caso de fallo al crear el curso
    res.status(500).json({ error: "Error al crear el curso" });
  }
};

// Actualizar un curso existente
export const updateCourse = async (req, res) => {
  try {
    // Extrae los datos actualizados del cuerpo de la solicitud
    const { course_code, course_name, careerId } = req.body;
    // Busca el curso en la base de datos por su ID
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ error: "Curso no encontrado" });

    // Actualiza los campos del curso con los nuevos datos
    course.course_code = course_code;
    course.course_name = course_name;
    course.careerId = careerId;

    // Guarda los cambios en la base de datos
    await course.save();

    // Envia el curso actualizado como respuesta
    res.json(course);
  } catch (error) {
    // Manejo de errores en caso de fallo al actualizar el curso
    res.status(500).json({ error: "Error al actualizar el curso" });
  }
};

// Eliminar un curso
export const deleteCourse = async (req, res) => {
  try {
    // Busca el curso en la base de datos por su ID
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ error: "Curso no encontrado" });

    // Elimina el curso de la base de datos
    await course.destroy();
    // Envia un mensaje de éxito como respuesta
    res.json({ message: "Curso eliminado correctamente" });
  } catch (error) {
    // Manejo de errores en caso de fallo al eliminar el curso
    res.status(500).json({ error: "Error al eliminar el curso" });
  }
};
