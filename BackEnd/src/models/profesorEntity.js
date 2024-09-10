// Importación de los tipos de datos desde Sequelize.
import { DataTypes } from "sequelize";
// Importación de la instancia de conexión a la base de datos desde dbController.js.
import { sequelize } from "../database/dbController.js";

// Definición del modelo 'Profesor' que representa la tabla 'profesor' en la base de datos.
export const Profesor = sequelize.define(
  // Nombre de la tabla en la base de datos: 'profesor'.
  "profesor",

  // Definición de los campos/atributos de la tabla 'profesor'.
  {
    // Campo 'rut' que es la clave primaria y debe ser único.
    rut: {
      type: DataTypes.STRING,
      primaryKey: true,  // Define 'rut' como la clave primaria del registro.
      unique: true,      // Garantiza que no haya duplicados de RUT.
    },
    // Campo 'names' para almacenar el nombre(s) del profesor.
    names: {
      type: DataTypes.STRING,
    },
    // Campo 'lastnames' para almacenar los apellidos del profesor.
    lastnames: {
      type: DataTypes.STRING,
    },
    // Campo 'birthdate' para almacenar la fecha de nacimiento del profesor como cadena.
    birthdate: {
      type: DataTypes.STRING,
    },
    // Campo 'gender' para almacenar el género del profesor.
    gender: {
      type: DataTypes.STRING,
    },
    // Campo 'email' que debe ser único para evitar duplicados.
    email: {
      type: DataTypes.STRING,
      unique: true,     // El correo electrónico debe ser único por profesor.
    },
    // Campo 'password' que debe ser único para cada profesor.
    password: {
      type: DataTypes.STRING,
      unique: true,     // Garantiza que no haya duplicados de contraseñas.
    },
    // Campo 'role' para almacenar el rol del profesor (ej: docente, administrador).
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
