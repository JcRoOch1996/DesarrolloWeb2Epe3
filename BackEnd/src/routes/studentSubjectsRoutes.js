// Importación del módulo Router de Express para la gestión de rutas.
import { Router } from 'express';
// Importación de los controladores que manejan la lógica de negocio para las operaciones relacionadas con la inscripción de estudiantes en asignaturas.
import {
    enrollStudentInSubject, // Controlador para inscribir un estudiante en una asignatura.
    getSubjectsByStudent,   // Controlador para obtener las asignaturas en las que está inscrito un estudiante.
    getStudentsBySubject,   // Controlador para obtener los estudiantes inscritos en una asignatura.
    deleteStudentEnrollment  // Controlador para eliminar la inscripción de un estudiante en una asignatura.
} from '../controllers/studentSubjectsController.js';

// Creación de un enrutador Express para definir las rutas específicas para las inscripciones de estudiantes en asignaturas.
const router = Router();

// Ruta para inscribir un estudiante en una asignatura.
// Mapea la solicitud POST en '/enroll' al controlador 'enrollStudentInSubject'.
router.post('/enroll', enrollStudentInSubject);

// Ruta para obtener las asignaturas en las que está inscrito un estudiante.
// Mapea la solicitud GET en '/student/:studentId/subjects' al controlador 'getSubjectsByStudent'.
// ':studentId' es un parámetro de ruta que representa el identificador del estudiante.
router.get('/student/:studentId/subjects', getSubjectsByStudent);

// Ruta para obtener los estudiantes inscritos en una asignatura.
// Mapea la solicitud GET en '/subject/:subjectId/students' al controlador 'getStudentsBySubject'.
// ':subjectId' es un parámetro de ruta que representa el identificador de la asignatura.
router.get('/subject/:subjectId/students', getStudentsBySubject);

// Ruta para eliminar la inscripción de un estudiante en una asignatura.
// Mapea la solicitud DELETE en '/enroll/:studentId/:subjectId' al controlador 'deleteStudentEnrollment'.
// ':studentId' y ':subjectId' son parámetros de ruta que representan el identificador del estudiante y de la asignatura, respectivamente.
router.delete('/enroll/:studentId/:subjectId', deleteStudentEnrollment);

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación.
export default router;
