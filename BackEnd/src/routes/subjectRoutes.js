// Importación del módulo Express para la gestión de rutas.
import express from 'express';

// Importación de los controladores que manejan la lógica de negocio para las rutas de 'subject'.
import {
    getAllSubjects,    // Controlador para obtener todos los sujetos.
    getSubjectById,    // Controlador para obtener un sujeto específico por ID.
    createSubject,     // Controlador para crear un nuevo sujeto.
    updateSubject,     // Controlador para actualizar un sujeto existente por ID.
    deleteSubject      // Controlador para eliminar un sujeto existente por ID.
} from '../controllers/subjectController.js';

// Creación de un enrutador Express para definir las rutas específicas para los sujetos.
const router = express.Router();

// Definición de rutas para gestionar las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre 'subject'.

// Ruta para obtener todos los sujetos.
// Mapea la solicitud GET en '/subjects' al controlador 'getAllSubjects'.
router.get('/subjects', getAllSubjects);

// Ruta para obtener un sujeto específico por ID.
// Mapea la solicitud GET en '/subjects/:id' al controlador 'getSubjectById'.
// ':id' es un parámetro de ruta que representa el identificador del sujeto.
router.get('/subjects/:id', getSubjectById);

// Ruta para crear un nuevo sujeto.
// Mapea la solicitud POST en '/subjects' al controlador 'createSubject'.
router.post('/subjects', createSubject);

// Ruta para actualizar un sujeto existente por ID.
// Mapea la solicitud PUT en '/subjects/:id' al controlador 'updateSubject'.
// ':id' es un parámetro de ruta que representa el identificador del sujeto a actualizar.
router.put('/subjects/:id', updateSubject);

// Ruta para eliminar un sujeto existente por ID.
// Mapea la solicitud DELETE en '/subjects/:id' al controlador 'deleteSubject'.
// ':id' es un parámetro de ruta que representa el identificador del sujeto a eliminar.
router.delete('/subjects/:id', deleteSubject);

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación.
export default router;
