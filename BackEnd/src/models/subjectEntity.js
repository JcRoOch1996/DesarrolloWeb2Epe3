// Importación de los tipos de datos desde Sequelize.
import { DataTypes } from "sequelize";
// Importación de la instancia de conexión a la base de datos desde dbController.js.
import { sequelize } from "../database/dbController.js";

// Definición del modelo 'Subject' que representa la tabla 'subject' en la base de datos.
export const Subject = sequelize.define(
  // Nombre de la tabla en la base de datos: 'subject'.
  "subject",

  // Definición de los campos/atributos de la tabla 'subject'.
  {
    // Campo 'subject_code' para almacenar el código de la asignatura.
    // Debe ser único para evitar duplicados de códigos de asignaturas.
    subject_code: {
      type: DataTypes.STRING,
      unique: true,
    },
    // Campo 'subject_name' para almacenar el nombre de la asignatura.
    // También debe ser único para evitar duplicados de nombres de asignaturas.
    subject_name: {
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
