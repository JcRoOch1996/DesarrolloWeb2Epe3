// Importación del modelo Subject que representa la entidad 'asignatura' en la base de datos.
import { Subject } from "../models/subjectEntity.js";

// Controlador para obtener todas las asignaturas.
export const getAllSubjects = async (req, res) => {
    try {
        // Busca todas las asignaturas en la base de datos.
        const subjects = await Subject.findAll();
        // Devuelve la lista de asignaturas en formato JSON.
        res.json(subjects);
    } catch (error) {
        // En caso de error, devuelve un estado 500 con un mensaje de error.
        res.status(500).json({ error: "Error al obtener las asignaturas" });
    }
};

// Controlador para obtener una asignatura específica por ID.
export const getSubjectById = async (req, res) => {
    try {
        // Busca una asignatura específica por ID.
        const subject = await Subject.findByPk(req.params.id);
        // Si no se encuentra la asignatura, devuelve un estado 404 con un mensaje de error.
        if (!subject) return res.status(404).json({ error: "Asignatura no encontrada" });
        // Devuelve la asignatura en formato JSON.
        res.json(subject);
    } catch (error) {
        // En caso de error, devuelve un estado 500 con un mensaje de error.
        res.status(500).json({ error: "Error al obtener la asignatura" });
    }
};

// Controlador para crear una nueva asignatura.
export const createSubject = async (req, res) => {
    try {
        // Obtiene los datos de la nueva asignatura desde el cuerpo de la solicitud.
        const { subject_code, subject_name, profesorId } = req.body;
        // Crea una nueva asignatura en la base de datos.
        const newSubject = await Subject.create({ subject_code, subject_name, profesorId });
        // Devuelve la nueva asignatura creada en formato JSON con un estado 201.
        res.status(201).json(newSubject);
    } catch (error) {
        // En caso de error, devuelve un estado 500 con un mensaje de error.
        res.status(500).json({ error: "Error al crear la asignatura" });
    }
};

// Controlador para actualizar una asignatura existente por ID.
export const updateSubject = async (req, res) => {
    try {
        // Obtiene los datos de la asignatura a actualizar desde el cuerpo de la solicitud.
        const { subject_code, subject_name, profesorId } = req.body;
        // Busca la asignatura específica por ID.
        const subject = await Subject.findByPk(req.params.id);
        // Si no se encuentra la asignatura, devuelve un estado 404 con un mensaje de error.
        if (!subject) return res.status(404).json({ error: "Asignatura no encontrada" });

        // Actualiza los campos de la asignatura con los nuevos datos.
        subject.subject_code = subject_code;
        subject.subject_name = subject_name;
        subject.profesorId = profesorId;

        // Guarda los cambios en la base de datos.
        await subject.save();

        // Devuelve la asignatura actualizada en formato JSON.
        res.json(subject);
    } catch (error) {
        // En caso de error, devuelve un estado 500 con un mensaje de error.
        res.status(500).json({ error: "Error al actualizar la asignatura" });
    }
};

// Controlador para eliminar una asignatura por ID.
export const deleteSubject = async (req, res) => {
    try {
        // Busca la asignatura específica por ID.
        const subject = await Subject.findByPk(req.params.id);
        // Si no se encuentra la asignatura, devuelve un estado 404 con un mensaje de error.
        if (!subject) return res.status(404).json({ error: "Asignatura no encontrada" });

        // Elimina la asignatura de la base de datos.
        await subject.destroy();
        // Devuelve un mensaje de confirmación en formato JSON.
        res.json({ message: "Asignatura eliminada correctamente" });
    } catch (error) {
        // En caso de error, devuelve un estado 500 con un mensaje de error.
        res.status(500).json({ error: "Error al eliminar la asignatura" });
    }
};
