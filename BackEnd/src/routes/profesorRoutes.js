// Importación del módulo Express para la gestión de rutas.
import express from 'express';

// Importación de los controladores que manejan la lógica de negocio para las rutas de 'profesor'.
import {
    getAllProfesors,   // Controlador para obtener todos los profesores.
    getProfesorById,   // Controlador para obtener un profesor específico por ID.
    createProfesor,    // Controlador para crear un nuevo profesor.
    updateProfesor,    // Controlador para actualizar un profesor existente por ID.
    deleteProfesor,    // Controlador para eliminar un profesor existente por ID.
    Profesorlogin      // Controlador para el inicio de sesión de un profesor.
} from '../controllers/profesorController.js';

// Creación de un enrutador Express para definir las rutas específicas para los profesores.
const router = express.Router();

// Ruta para obtener todos los profesores.
// Mapea la solicitud GET en '/professors' al controlador 'getAllProfesors'.
router.get('/professors', getAllProfesors);

// Ruta para obtener un profesor específico por ID.
// Mapea la solicitud GET en '/professors/:id' al controlador 'getProfesorById'.
// ':id' es un parámetro de ruta que representa el identificador del profesor.
router.get('/professors/:id', getProfesorById);

// Ruta para crear un nuevo profesor.
// Mapea la solicitud POST en '/professors' al controlador 'createProfesor'.
router.post('/professors', createProfesor);

// Ruta para el inicio de sesión de un profesor.
// Mapea la solicitud POST en '/professors/login' al controlador 'Profesorlogin'.
router.post('/professors/login', Profesorlogin);

// Ruta para actualizar un profesor existente por ID.
// Mapea la solicitud PUT en '/professors/:id' al controlador 'updateProfesor'.
// ':id' es un parámetro de ruta que representa el identificador del profesor a actualizar.
router.put('/professors/:id', updateProfesor);

// Ruta para eliminar un profesor existente por ID.
// Mapea la solicitud DELETE en '/professors/:id' al controlador 'deleteProfesor'.
// ':id' es un parámetro de ruta que representa el identificador del profesor a eliminar.
router.delete('/professors/:id', deleteProfesor);

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación.
export default router;
