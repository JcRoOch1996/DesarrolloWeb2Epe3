// Importación del módulo Express para la gestión de rutas.
import express from 'express';

// Importación de los controladores que manejan la lógica de negocio para las rutas de 'admin'.
import {
    getAllAdmins,    // Controlador para obtener todos los administradores.
    getAdminById,    // Controlador para obtener un administrador específico por ID.
    createAdmin,     // Controlador para crear un nuevo administrador.
    updateAdmin,     // Controlador para actualizar un administrador existente por ID.
    deleteAdmin,     // Controlador para eliminar un administrador existente por ID.
    Adminlogin       // Controlador para el inicio de sesión de un administrador.
} from '../controllers/adminController.js';

// Creación de un enrutador Express para definir las rutas específicas para los administradores.
const router = express.Router();

// Ruta para el inicio de sesión de un administrador.
// Mapea la solicitud POST en '/admin/login' al controlador 'Adminlogin'.
router.post('/admin/login', Adminlogin);

// Ruta para obtener todos los administradores.
// Mapea la solicitud GET en '/admin' al controlador 'getAllAdmins'.
router.get('/admin', getAllAdmins);

// Ruta para obtener un administrador específico por ID.
// Mapea la solicitud GET en '/admin/:id' al controlador 'getAdminById'.
// ':id' es un parámetro de ruta que representa el identificador del administrador.
router.get('/admin/:id', getAdminById);

// Ruta para crear un nuevo administrador.
// Mapea la solicitud POST en '/admin' al controlador 'createAdmin'.
router.post('/admin', createAdmin);

// Ruta para actualizar un administrador existente por ID.
// Mapea la solicitud PUT en '/admin/:id' al controlador 'updateAdmin'.
// ':id' es un parámetro de ruta que representa el identificador del administrador a actualizar.
router.put('/admin/:id', updateAdmin);

// Ruta para eliminar un administrador existente por ID.
// Mapea la solicitud DELETE en '/admin/:id' al controlador 'deleteAdmin'.
// ':id' es un parámetro de ruta que representa el identificador del administrador a eliminar.
router.delete('/admin/:id', deleteAdmin);

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación.
export default router;
