// Importación de los modelos de entidades necesarias para establecer relaciones.
import { Career } from './careerEntity.js';
import { CareerHead } from './careerHeadEntity.js';
import { Course } from './courseEntity.js';
import { Profesor } from './profesorEntity.js';
import { Student } from './studentEntity.js';
import { Subject } from './subjectEntity.js';
import { StudentSubjects } from './studentsubjects.js';

// Relaciones entre las entidades:

// Relación 1 a 1 entre Career (Carrera) y CareerHead (Jefe de Carrera).
// Una carrera tiene un jefe de carrera, con la clave foránea 'careerId'.
Career.hasOne(CareerHead, { foreignKey: 'careerId', as: 'head' });

// Relación 1 a muchos entre Career (Carrera) y Course (Curso).
// Una carrera puede tener varios cursos, con la clave foránea 'careerId'.
Career.hasMany(Course, { foreignKey: 'careerId', as: 'courses' });

// Relación inversa: un curso pertenece a una carrera.
// Se especifica la clave foránea 'careerId' en Course.
Course.belongsTo(Career, { foreignKey: 'careerId', as: 'career' });

// Relación inversa: un jefe de carrera pertenece a una carrera.
// Se especifica la clave foránea 'careerId' en CareerHead.
CareerHead.belongsTo(Career, { foreignKey: 'careerId', as: 'career' });

// Relación 1 a muchos entre Course (Curso) y Student (Estudiante).
// Un curso puede tener varios estudiantes, con la clave foránea 'courseId'.
Course.hasMany(Student, { foreignKey: 'courseId', as: 'students' });

// Relación inversa: un estudiante pertenece a un curso.
// Se especifica la clave foránea 'courseId' en Student.
Student.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

// Relación 1 a muchos entre Profesor (Profesor) y Subject (Asignatura).
// Un profesor puede tener varias asignaturas, con la clave foránea 'profesorId'.
Profesor.hasMany(Subject, { foreignKey: 'profesorId', as: 'subjects' });

// Relación inversa: una asignatura pertenece a un profesor.
// Se especifica la clave foránea 'profesorId' en Subject.
Subject.belongsTo(Profesor, { foreignKey: 'profesorId', as: 'profesor' });

// Relación muchos a muchos entre Student (Estudiante) y Subject (Asignatura)
// a través de la tabla intermedia StudentSubjects.
// Un estudiante puede estar inscrito en varias asignaturas y una asignatura puede tener varios estudiantes.
Student.belongsToMany(Subject, { through: StudentSubjects, foreignKey: 'studentId', as: 'subjects' });
Subject.belongsToMany(Student, { through: StudentSubjects, foreignKey: 'subjectId', as: 'students' });
