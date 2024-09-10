// Importación del módulo Express para la gestión de rutas.
import express from 'express';

// Importación de los controladores que manejan la lógica de negocio para las rutas de 'student'.
import {
    getAllStudents,   // Controlador para obtener todos los estudiantes.
    getStudentById,   // Controlador para obtener un estudiante específico por ID.
    createStudent,    // Controlador para crear un nuevo estudiante.
    updateStudent,    // Controlador para actualizar un estudiante existente por ID.
    deleteStudent,    // Controlador para eliminar un estudiante existente por ID.
    Studentlogin      // Controlador para el inicio de sesión de un estudiante.
} from '../controllers/studentController.js';

// Creación de un enrutador Express para definir las rutas específicas para los estudiantes.
const router = express.Router();

// Ruta para obtener todos los estudiantes.
// Mapea la solicitud GET en '/students' al controlador 'getAllStudents'.
router.get('/students', getAllStudents);

// Ruta para obtener un estudiante específico por ID.
// Mapea la solicitud GET en '/students/:id' al controlador 'getStudentById'.
// ':id' es un parámetro de ruta que representa el identificador del estudiante.
router.get('/students/:id', getStudentById);

// Ruta para crear un nuevo estudiante.
// Mapea la solicitud POST en '/students' al controlador 'createStudent'.
router.post('/students', createStudent);

// Ruta para el inicio de sesión de un estudiante.
// Mapea la solicitud POST en '/students/login' al controlador 'Studentlogin'.
router.post('/students/login', Studentlogin);

// Ruta para actualizar un estudiante existente por ID.
// Mapea la solicitud PUT en '/students/:id' al controlador 'updateStudent'.
// ':id' es un parámetro de ruta que representa el identificador del estudiante a actualizar.
router.put('/students/:id', updateStudent);

// Ruta para eliminar un estudiante existente por ID.
// Mapea la solicitud DELETE en '/students/:id' al controlador 'deleteStudent'.
// ':id' es un parámetro de ruta que representa el identificador del estudiante a eliminar.
router.delete('/students/:id', deleteStudent);

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación.
export default router;
