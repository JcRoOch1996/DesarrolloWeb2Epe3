// Importación de la instancia de conexión a la base de datos desde dbController.js.
import { sequelize } from "./database/dbController.js";
// Importación de módulos y middleware necesarios para la aplicación.
import express from "express";
import cors from "cors";
import morgan from "morgan";
// Importación de los routers para diferentes rutas de la API.
import career_head_router from './routes/careerHeadRoutes.js';
import career_router from './routes/careerRoutes.js';
import course_router from './routes/courseRoutes.js';
import profesor_router from './routes/profesorRoutes.js';
import student_router from './routes/studentRoutes.js';
import subject_router from './routes/subjectRoutes.js';
import student_subjects_router from './routes/studentSubjectsRoutes.js';
import admin_router from './routes/adminRoutes.js';
import query_router from './routes/queryRoutes.js';

// Creación de una instancia de aplicación Express.
const app = express();

// Middleware para registrar solicitudes HTTP en la consola.
app.use(morgan("dev"));
// Middleware para analizar cuerpos de solicitudes JSON.
app.use(express.json());
// Middleware para permitir solicitudes CORS (Cross-Origin Resource Sharing).
app.use(cors());

// Configuración de las rutas de la API.
// Todas las rutas están prefijadas con '/api'.
app.use('/api', career_head_router);
app.use('/api', career_router);
app.use('/api', course_router);
app.use('/api', profesor_router);
app.use('/api', student_router);
app.use('/api', subject_router);
app.use('/api', student_subjects_router);
app.use('/api', admin_router);
app.use('/api', query_router);

// Importación de las asociaciones entre modelos (relaciones) definidas en el archivo 'associations.js'.
import './models/associations.js';

// Función principal para iniciar el servidor y sincronizar la base de datos.
async function main() {
  // Sincroniza los modelos con la base de datos.
  // 'force: false' significa que no se eliminarán las tablas existentes.
  await sequelize.sync({ force: false });
  // Inicia el servidor en el puerto 3000.
  app.listen(3000);
  // Imprime un mensaje en la consola indicando que el servidor está en funcionamiento.
  console.log("Server on port 3000");
}

// Llama a la función principal para iniciar la aplicación.
main();
