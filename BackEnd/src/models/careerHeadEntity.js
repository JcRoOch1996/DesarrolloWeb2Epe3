// Importación de los tipos de datos desde Sequelize.
import { DataTypes } from "sequelize";
// Importación de la instancia de conexión a la base de datos desde dbController.js.
import { sequelize } from "../database/dbController.js";

// Definición del modelo 'CareerHead' que representa la tabla 'careerHead' en la base de datos.
export const CareerHead = sequelize.define(
  // Nombre de la tabla en la base de datos: 'careerHead'.
  "careerHead",

  // Definición de los campos/atributos de la tabla 'careerHead'.
  {
    // Campo 'rut', que es la clave primaria y debe ser único.
    rut: {
      type: DataTypes.STRING,
      primaryKey: true, // Indica que es la clave primaria del registro.
      unique: true,     // Garantiza que no haya duplicados.
    },
    // Campo 'names' para almacenar el nombre(s) del jefe de carrera.
    names: {
      type: DataTypes.STRING,
    },
    // Campo 'lastnames' para almacenar los apellidos del jefe de carrera.
    lastnames: {
      type: DataTypes.STRING,
    },
    // Campo 'birthdate' para almacenar la fecha de nacimiento como una cadena.
    birthdate: {
      type: DataTypes.STRING,
    },
    // Campo 'gender' para almacenar el género del jefe de carrera.
    gender: {
      type: DataTypes.STRING,
    },
    // Campo 'email' para almacenar la dirección de correo electrónico, debe ser único.
    email: {
      type: DataTypes.STRING,
      unique: true,     // Garantiza que no haya duplicados de correo electrónico.
    },
    // Campo 'password' para almacenar la contraseña, debe ser única.
    password: {
      type: DataTypes.STRING,
      unique: true,     // Cada contraseña debe ser única por razones de seguridad.
    },
    // Campo 'role' para almacenar el rol del jefe de carrera (ej: administrador, usuario).
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
