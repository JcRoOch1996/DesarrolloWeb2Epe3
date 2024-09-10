// Importación del módulo Express para la gestión de rutas.
import express from 'express';

// Importación de los controladores que manejan la lógica de negocio para las rutas de 'careerHead'.
import {
    getAllCareerHeads,   // Controlador para obtener todos los jefes de carrera.
    getCareerHeadById,   // Controlador para obtener un jefe de carrera específico por ID.
    createCareerHead,    // Controlador para crear un nuevo jefe de carrera.
    updateCareerHead,    // Controlador para actualizar un jefe de carrera existente por ID.
    deleteCareerHead,    // Controlador para eliminar un jefe de carrera existente por ID.
    CareerHeadlogin      // Controlador para el inicio de sesión de un jefe de carrera.
} from '../controllers/careerHeadController.js';

// Creación de un enrutador Express para definir las rutas específicas para los jefes de carrera.
const router = express.Router();

// Ruta para obtener todos los jefes de carrera.
// Mapea la solicitud GET en '/career-heads' al controlador 'getAllCareerHeads'.
router.get('/career-heads', getAllCareerHeads);

// Ruta para obtener un jefe de carrera específico por ID.
// Mapea la solicitud GET en '/career-heads/:id' al controlador 'getCareerHeadById'.
// ':id' es un parámetro de ruta que representa el identificador del jefe de carrera.
router.get('/career-heads/:id', getCareerHeadById);

// Ruta para crear un nuevo jefe de carrera.
// Mapea la solicitud POST en '/career-heads' al controlador 'createCareerHead'.
router.post('/career-heads', createCareerHead);

// Ruta para el inicio de sesión de un jefe de carrera.
// Mapea la solicitud POST en '/career-heads/login' al controlador 'CareerHeadlogin'.
router.post('/career-heads/login', CareerHeadlogin);

// Ruta para actualizar un jefe de carrera existente por ID.
// Mapea la solicitud PUT en '/career-heads/:id' al controlador 'updateCareerHead'.
// ':id' es un parámetro de ruta que representa el identificador del jefe de carrera a actualizar.
router.put('/career-heads/:id', updateCareerHead);

// Ruta para eliminar un jefe de carrera existente por ID.
// Mapea la solicitud DELETE en '/career-heads/:id' al controlador 'deleteCareerHead'.
// ':id' es un parámetro de ruta que representa el identificador del jefe de carrera a eliminar.
router.delete('/career-heads/:id', deleteCareerHead);

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación.
export default router;
