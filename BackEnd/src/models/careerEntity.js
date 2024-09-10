// Importación de los tipos de datos desde Sequelize.
import { DataTypes } from "sequelize";
// Importación de la instancia de conexión a la base de datos desde dbController.js.
import { sequelize } from "../database/dbController.js";

// Definición del modelo 'Career' que representa la tabla 'career' en la base de datos.
export const Career = sequelize.define(
  // Nombre de la tabla en la base de datos: 'career'.
  "career",

  // Definición de los campos/atributos de la tabla 'career'.
  {
    // Campo 'career_code' para almacenar el código de la carrera.
    // Debe ser único para cada carrera.
    career_code: {
      type: DataTypes.STRING,
      unique: true,
    },
    // Campo 'career_name' para almacenar el nombre de la carrera.
    // También debe ser único para evitar duplicados.
    career_name: {
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
