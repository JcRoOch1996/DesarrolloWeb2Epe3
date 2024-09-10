// Importación del módulo Express para la gestión de rutas.
import express from 'express';

// Importación de los controladores que manejan la lógica de negocio para las consultas relacionadas con los estudiantes y carreras.
import {
  getStudentsByCourse,          // Controlador para obtener todos los estudiantes de un curso específico.
  getStudentsByCareer,          // Controlador para obtener todos los estudiantes de una carrera específica.
  getStudentsBySubject,         // Controlador para obtener todos los estudiantes de una asignatura específica.
  getStudentsByProfessor,       // Controlador para obtener todos los estudiantes de un profesor específico.
  getStudentsByCareerHead,      // Controlador para obtener todos los estudiantes de un jefe de carrera específico.
  getCareerOfCareerHead         // Controlador para obtener la carrera de un jefe de carrera específico.
} from '../controllers/queryController.js';

// Creación de un enrutador Express para definir las rutas específicas para las consultas de estudiantes y carreras.
const router = express.Router();

// Ruta para obtener todos los estudiantes de un curso específico.
// Mapea la solicitud GET en '/students/course/:courseCode' al controlador 'getStudentsByCourse'.
// ':courseCode' es un parámetro de ruta que representa el código del curso.
router.get('/students/course/:courseCode', getStudentsByCourse);

// Ruta para obtener todos los estudiantes de una asignatura específica.
// Mapea la solicitud GET en '/students/subject/:subjectCode' al controlador 'getStudentsBySubject'.
// ':subjectCode' es un parámetro de ruta que representa el código de la asignatura.
router.get('/students/subject/:subjectCode', getStudentsBySubject);

// Ruta para obtener todos los estudiantes de una carrera específica.
// Mapea la solicitud GET en '/students/career/:careerCode' al controlador 'getStudentsByCareer'.
// ':careerCode' es un parámetro de ruta que representa el código de la carrera.
router.get('/students/career/:careerCode', getStudentsByCareer);

// Ruta para obtener todos los estudiantes de un profesor específico.
// Mapea la solicitud GET en '/students/professor/:professorRut' al controlador 'getStudentsByProfessor'.
// ':professorRut' es un parámetro de ruta que representa el RUT del profesor.
router.get('/students/professor/:professorRut', getStudentsByProfessor);

// Ruta para obtener todos los estudiantes de un jefe de carrera específico.
// Mapea la solicitud GET en '/students/careerhead/:careerHeadRut' al controlador 'getStudentsByCareerHead'.
// ':careerHeadRut' es un parámetro de ruta que representa el RUT del jefe de carrera.
router.get('/students/careerhead/:careerHeadRut', getStudentsByCareerHead);

// Ruta para obtener la carrera de un jefe de carrera específico.
// Mapea la solicitud GET en '/careerhead/career/:careerHeadRut' al controlador 'getCareerOfCareerHead'.
// ':careerHeadRut' es un parámetro de ruta que representa el RUT del jefe de carrera.
router.get('/careerhead/career/:careerHeadRut', getCareerOfCareerHead);

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación.
export default router;
