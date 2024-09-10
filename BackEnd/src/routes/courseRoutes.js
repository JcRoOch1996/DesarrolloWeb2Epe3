// Importación del módulo Express para la gestión de rutas.
import express from 'express';

// Importación de los controladores que manejan la lógica de negocio para las rutas de 'course'.
import {
    getAllCourses,    // Controlador para obtener todos los cursos.
    getCourseById,    // Controlador para obtener un curso específico por ID.
    createCourse,     // Controlador para crear un nuevo curso.
    updateCourse,     // Controlador para actualizar un curso existente por ID.
    deleteCourse      // Controlador para eliminar un curso existente por ID.
} from '../controllers/courseController.js';

// Creación de un enrutador Express para definir las rutas específicas para los cursos.
const router = express.Router();

// Ruta para obtener todos los cursos.
// Mapea la solicitud GET en '/courses' al controlador 'getAllCourses'.
router.get('/courses', getAllCourses);

// Ruta para obtener un curso específico por ID.
// Mapea la solicitud GET en '/courses/:id' al controlador 'getCourseById'.
// ':id' es un parámetro de ruta que representa el identificador del curso.
router.get('/courses/:id', getCourseById);

// Ruta para crear un nuevo curso.
// Mapea la solicitud POST en '/courses' al controlador 'createCourse'.
router.post('/courses', createCourse);

// Ruta para actualizar un curso existente por ID.
// Mapea la solicitud PUT en '/courses/:id' al controlador 'updateCourse'.
// ':id' es un parámetro de ruta que representa el identificador del curso a actualizar.
router.put('/courses/:id', updateCourse);

// Ruta para eliminar un curso existente por ID.
// Mapea la solicitud DELETE en '/courses/:id' al controlador 'deleteCourse'.
// ':id' es un parámetro de ruta que representa el identificador del curso a eliminar.
router.delete('/courses/:id', deleteCourse);

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación.
export default router;
