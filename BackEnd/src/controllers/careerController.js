import { Career } from "../models/careerEntity.js";

// Obtener todas las carreras
export const getAllCareers = async (req, res) => {
  try {
    // Recupera todas las carreras de la base de datos
    const careers = await Career.findAll();
    // Envia la lista de carreras como respuesta en formato JSON
    res.json(careers);
  } catch (error) {
    // Manejo de errores si ocurre algún problema al recuperar las carreras
    res.status(500).json({ error: "Error al obtener las carreras" });
  }
};

// Obtener una carrera por ID
export const getCareerById = async (req, res) => {
  try {
    // Busca la carrera en la base de datos por su ID
    const career = await Career.findByPk(req.params.id);
    // Si la carrera no se encuentra, responde con un error 404
    if (!career) return res.status(404).json({ error: "Carrera no encontrada" });
    // Envia la carrera encontrada como respuesta en formato JSON
    res.json(career);
  } catch (error) {
    // Manejo de errores si ocurre algún problema al recuperar la carrera
    res.status(500).json({ error: "Error al obtener la carrera" });
  }
};

// Crear una nueva carrera
export const createCareer = async (req, res) => {
  try {
    // Extrae los datos de la nueva carrera del cuerpo de la solicitud
    const { career_code, career_name } = req.body;
    // Crea una nueva carrera en la base de datos con los datos proporcionados
    const newCareer = await Career.create({ career_code, career_name });
    // Envia la nueva carrera creada como respuesta en formato JSON
    res.status(201).json(newCareer);
  } catch (error) {
    // Manejo de errores si ocurre algún problema al crear la nueva carrera
    res.status(500).json({ error: "Error al crear la carrera" });
  }
};

// Actualizar una carrera existente
export const updateCareer = async (req, res) => {
  try {
    // Extrae los datos actualizados de la carrera del cuerpo de la solicitud
    const { career_code, career_name } = req.body;
    // Busca la carrera en la base de datos por su ID
    const career = await Career.findByPk(req.params.id);
    // Si la carrera no se encuentra, responde con un error 404
    if (!career) return res.status(404).json({ error: "Carrera no encontrada" });
    
    // Actualiza los campos de la carrera con los nuevos datos proporcionados
    career.career_code = career_code;
    career.career_name = career_name;
    // Guarda los cambios en la base de datos
    await career.save();
    
    // Envia la carrera actualizada como respuesta en formato JSON
    res.json(career);
  } catch (error) {
    // Manejo de errores si ocurre algún problema al actualizar la carrera
    res.status(500).json({ error: "Error al actualizar la carrera" });
  }
};

// Eliminar una carrera
export const deleteCareer = async (req, res) => {
  try {
    // Busca la carrera en la base de datos por su ID
    const career = await Career.findByPk(req.params.id);
    // Si la carrera no se encuentra, responde con un error 404
    if (!career) return res.status(404).json({ error: "Carrera no encontrada" });
    
    // Elimina la carrera de la base de datos
    await career.destroy();
    // Envia un mensaje de éxito como respuesta en formato JSON
    res.json({ message: "Carrera eliminada correctamente" });
  } catch (error) {
    // Manejo de errores si ocurre algún problema al eliminar la carrera
    res.status(500).json({ error: "Error al eliminar la carrera" });
  }
};
