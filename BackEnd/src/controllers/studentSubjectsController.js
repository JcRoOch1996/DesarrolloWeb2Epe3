import { Student } from '../models/studentEntity.js';
import { Subject } from '../models/subjectEntity.js';
import { StudentSubjects } from '../models/studentsubjects.js';

// Controlador para inscribir a un estudiante en una asignatura.
export const enrollStudentInSubject = async (req, res) => {
    // Extrae los IDs del estudiante y la asignatura del cuerpo de la solicitud.
    const { studentId, subjectId } = req.body;
    try {
        // Verifica si el estudiante y la asignatura existen en la base de datos.
        const student = await Student.findByPk(studentId);
        const subject = await Subject.findByPk(subjectId);

        if (!student || !subject) {
            // Devuelve un estado 404 si el estudiante o la asignatura no se encuentran.
            return res.status(404).json({ message: 'Estudiante o asignatura no encontrada' });
        }

        // Crea una inscripción en la base de datos para el estudiante y la asignatura.
        await StudentSubjects.create({ studentId, subjectId });

        // Devuelve un mensaje de éxito con un estado 201.
        res.status(201).json({ message: 'Estudiante inscrito en la asignatura exitosamente' });
    } catch (error) {
        // En caso de error, devuelve un estado 500 con un mensaje de error.
        console.error(error);
        res.status(500).json({ message: 'Error al inscribir al estudiante en la asignatura' });
    }
};

// Controlador para obtener las asignaturas de un estudiante.
export const getSubjectsByStudent = async (req, res) => {
    // Extrae el ID del estudiante de los parámetros de la solicitud.
    const { studentId } = req.params;
    try {
        // Busca el estudiante en la base de datos e incluye las asignaturas asociadas.
        const student = await Student.findByPk(studentId, {
            include: { model: Subject, as: 'subjects' } // Incluye las asignaturas del estudiante.
        });

        if (!student) {
            // Devuelve un estado 404 si el estudiante no se encuentra.
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        // Devuelve las asignaturas del estudiante en formato JSON.
        res.status(200).json(student.subjects);
    } catch (error) {
        // En caso de error, devuelve un estado 500 con un mensaje de error.
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las asignaturas del estudiante' });
    }
};

// Controlador para obtener los estudiantes de una asignatura.
export const getStudentsBySubject = async (req, res) => {
    // Extrae el ID de la asignatura de los parámetros de la solicitud.
    const { subjectId } = req.params;
    try {
        // Busca la asignatura en la base de datos e incluye los estudiantes asociados.
        const subject = await Subject.findByPk(subjectId, {
            include: { model: Student, as: 'students' } // Incluye los estudiantes de la asignatura.
        });

        if (!subject) {
            // Devuelve un estado 404 si la asignatura no se encuentra.
            return res.status(404).json({ message: 'Asignatura no encontrada' });
        }

        // Devuelve los estudiantes de la asignatura en formato JSON.
        res.status(200).json(subject.students);
    } catch (error) {
        // En caso de error, devuelve un estado 500 con un mensaje de error.
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los estudiantes de la asignatura' });
    }
};

// Controlador para eliminar la inscripción de un estudiante en una asignatura.
export const deleteStudentEnrollment = async (req, res) => {
    // Extrae los IDs del estudiante y la asignatura de los parámetros de la solicitud.
    const { studentId, subjectId } = req.params;
    try {
        // Busca la inscripción específica en la base de datos.
        const studentSubject = await StudentSubjects.findOne({
            where: { studentId, subjectId }
        });

        if (!studentSubject) {
            // Devuelve un estado 404 si la inscripción no se encuentra.
            return res.status(404).json({ message: 'Inscripción no encontrada para eliminar' });
        }

        // Elimina la inscripción de la base de datos.
        await studentSubject.destroy();
        // Devuelve un mensaje de éxito con un estado 200.
        res.status(200).json({ message: 'Inscripción eliminada exitosamente' });
    } catch (error) {
        // En caso de error, devuelve un estado 500 con un mensaje de error.
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la inscripción del estudiante' });
    }
};
