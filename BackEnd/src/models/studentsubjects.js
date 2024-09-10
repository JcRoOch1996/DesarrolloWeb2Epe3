// Importación de los tipos de datos desde Sequelize.
import { DataTypes } from 'sequelize';
// Importación de la instancia de conexión a la base de datos desde dbController.js.
import { sequelize } from "../database/dbController.js";
// Importación de los modelos 'Student' y 'Subject' para establecer relaciones.
import { Student } from './studentEntity.js';
import { Subject } from './subjectEntity.js';

// Definición del modelo 'StudentSubjects' que representa la tabla de relación 
// entre estudiantes y asignaturas, indicando las asignaturas en las que están inscritos los estudiantes.
export const StudentSubjects = sequelize.define(
  // Nombre de la tabla en la base de datos: 'StudentSubjects'.
  'StudentSubjects', 

  // Definición de los campos/atributos de la tabla 'StudentSubjects'.
  {
    // Campo 'studentId' que actúa como una clave foránea referenciando al modelo 'Student'.
    // Este campo almacena el identificador del estudiante.
    studentId: {
      type: DataTypes.STRING,
      references: {
        model: Student, // Relaciona con el modelo 'Student'.
        key: 'id'       // La clave foránea 'studentId' hace referencia al campo 'id' del modelo 'Student'.
      }
    },
    // Campo 'subjectId' que actúa como una clave foránea referenciando al modelo 'Subject'.
    // Este campo almacena el identificador de la asignatura.
    subjectId: {
      type: DataTypes.INTEGER,
      references: {
        model: Subject, // Relaciona con el modelo 'Subject'.
        key: 'id'       // La clave foránea 'subjectId' hace referencia al campo 'id' del modelo 'Subject'.
      }
    }
  }, 

  // Configuración adicional del modelo.
  {
    // Desactiva la creación automática de los campos de marca de tiempo 'createdAt' y 'updatedAt'.
    timestamps: false
  }
);
