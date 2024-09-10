// Importación del módulo Express para la gestión de rutas.
import express from 'express';

// Importación de los controladores que manejan la lógica de negocio para las rutas de 'career'.
import {
    getAllCareers,    // Controlador para obtener todas las carreras.
    getCareerById,    // Controlador para obtener una carrera específica por ID.
    createCareer,     // Controlador para crear una nueva carrera.
    updateCareer,     // Controlador para actualizar una carrera existente por ID.
    deleteCareer      // Controlador para eliminar una carrera existente por ID.
} from '../controllers/careerController.js';

// Creación de un enrutador Express para definir las rutas específicas para las carreras.
const router = express.Router();

// Ruta para obtener todas las carreras.
// Mapea la solicitud GET en '/careers' al controlador 'getAllCareers'.
router.get('/careers', getAllCareers);

// Ruta para obtener una carrera específica por ID.
// Mapea la solicitud GET en '/careers/:id' al controlador 'getCareerById'.
// ':id' es un parámetro de ruta que representa el identificador de la carrera.
router.get('/careers/:id', getCareerById);

// Ruta para crear una nueva carrera.
// Mapea la solicitud POST en '/careers' al controlador 'createCareer'.
router.post('/careers', createCareer);

// Ruta para actualizar una carrera existente por ID.
// Mapea la solicitud PUT en '/careers/:id' al controlador 'updateCareer'.
// ':id' es un parámetro de ruta que representa el identificador de la carrera a actualizar.
router.put('/careers/:id', updateCareer);

// Ruta para eliminar una carrera existente por ID.
// Mapea la solicitud DELETE en '/careers/:id' al controlador 'deleteCareer'.
// ':id' es un parámetro de ruta que representa el identificador de la carrera a eliminar.
router.delete('/careers/:id', deleteCareer);

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación.
export default router;
