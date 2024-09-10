// Importación de los tipos de datos desde Sequelize.
import { DataTypes } from "sequelize";
// Importación de la instancia de conexión a la base de datos desde dbController.js.
import { sequelize } from "../database/dbController.js";

// Definición del modelo 'Student' que representa la tabla 'student' en la base de datos.
export const Student = sequelize.define(
  // Nombre de la tabla en la base de datos: 'student'.
  "student",

  // Definición de los campos/atributos de la tabla 'student'.
  {
    // Campo 'rut' que actúa como clave primaria y debe ser único.
    rut: {
      type: DataTypes.STRING,
      primaryKey: true,  // Define 'rut' como la clave primaria del estudiante.
      unique: true,      // Garantiza que no haya duplicados de RUT.
    },
    // Campo 'names' para almacenar el nombre(s) del estudiante.
    names: {
      type: DataTypes.STRING,
    },
    // Campo 'lastnames' para almacenar los apellidos del estudiante.
    lastnames: {
      type: DataTypes.STRING,
    },
    // Campo 'birthdate' para almacenar la fecha de nacimiento como una cadena.
    birthdate: {
      type: DataTypes.STRING,
    },
    // Campo 'gender' para almacenar el género del estudiante.
    gender: {
      type: DataTypes.STRING,
    },
    // Campo 'email' que debe ser único para cada estudiante.
    email: {
      type: DataTypes.STRING,
      unique: true,     // Garantiza que no haya duplicados de correo electrónico.
    },
    // Campo 'password' que debe ser único para cada estudiante.
    password: {
      type: DataTypes.STRING,
      unique: true,     // Garantiza que no haya duplicados de contraseñas.
    },
    // Campo 'role' para almacenar el rol del estudiante (ej: estudiante, usuario).
    role: {
      type: DataTypes.STRING,
    },
  },

  // Configuración adicional del modelo.
  {
    // Desactiva la creación automática de los campos de marca de tiempo 'createdAt' y 'updatedAt'.
    timestamps: false,
  }
);
