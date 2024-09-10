// Importación de los tipos de datos desde Sequelize.
import { DataTypes } from "sequelize";
// Importación de la instancia de conexión a la base de datos desde dbController.js.
import { sequelize } from "../database/dbController.js";

// Definición del modelo 'Course' que representa la tabla 'course' en la base de datos.
export const Course = sequelize.define(
  // Nombre de la tabla en la base de datos: 'course'.
  "course",

  // Definición de los campos/atributos de la tabla 'course'.
  {
    // Campo 'course_code' para almacenar el código del curso.
    // Debe ser único para evitar duplicados de códigos de cursos.
    course_code: {
      type: DataTypes.STRING,
      unique: true,
    },
    // Campo 'course_name' para almacenar el nombre del curso.
    // También debe ser único para evitar duplicados de nombres de cursos.
    course_name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },

  // Configuración adicional del modelo.
  {
    // Desactiva la creación automática de los campos de marca de tiempo 'createdAt' y 'updatedAt'.
    timestamps: false,
  }
);
