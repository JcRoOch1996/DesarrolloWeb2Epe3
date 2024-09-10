// Importación de los tipos de datos desde Sequelize.
import { DataTypes } from "sequelize";
// Importación de la instancia de la conexión con la base de datos desde dbController.js.
import { sequelize } from "../database/dbController.js";

// Definición del modelo 'Admin' usando Sequelize para mapear la tabla 'Admin' en la base de datos.
export const Admin = sequelize.define(
  // Nombre de la tabla 'Admin'.
  'Admin',
  
  // Definición de los campos/atributos de la tabla 'Admin'.
  {
    // Campo 'rut' que será la clave primaria y debe ser único.
    rut: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    // Campo 'names' para almacenar el nombre del administrador.
    names: {
      type: DataTypes.STRING,
    },
    // Campo 'lastnames' para almacenar los apellidos del administrador.
    lastnames: {
      type: DataTypes.STRING,
    },
    // Campo 'birthdate' para almacenar la fecha de nacimiento como cadena.
    birthdate: {
      type: DataTypes.STRING,
    },
    // Campo 'gender' para almacenar el género del administrador.
    gender: {
      type: DataTypes.STRING,
    },
    // Campo 'email' que debe ser único para cada administrador.
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    // Campo 'password' para almacenar la contraseña, también único por seguridad.
    password: {
      type: DataTypes.STRING,
      unique: true,
    },
    // Campo 'role' para almacenar el rol del administrador (ej: superadmin, etc.).
    role: {
      type: DataTypes.STRING,
    },
  },
  
  // Configuración adicional del modelo.
  {
    // Desactiva la generación automática de los campos 'createdAt' y 'updatedAt'.
    timestamps: false,
  }
);
