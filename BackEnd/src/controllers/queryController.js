import { sequelize } from '../database/dbController.js';

// Obtener todos los estudiantes de un curso específico
export const getStudentsByCourse = async (req, res) => {
  const { courseCode } = req.params;

  try {
    // Realiza una consulta SQL para obtener los estudiantes inscritos en un curso específico
    const rows = await sequelize.query(
      `SELECT 
        s.rut,
        s.names,
        s.lastnames,
        s.birthdate,
        s.gender,
        s.email,
        s.role
       FROM 
        student s
       JOIN 
        course c ON s.courseId = c.id
       WHERE 
        c.course_code = ?`,
      {
        replacements: [courseCode],
        type: sequelize.QueryTypes.SELECT
      }
    );

    // Devuelve la lista de estudiantes en formato JSON
    res.json(rows);
  } catch (err) {
    console.error(err);
    // Devuelve un estado 500 y un mensaje de error en caso de fallo
    res.status(500).json({ error: 'Error al obtener estudiantes por curso' });
  }
};

// Obtener todos los estudiantes de una asignatura específica
export const getStudentsBySubject = async (req, res) => {
  const { subjectCode } = req.params;

  try {
    // Realiza una consulta SQL para obtener los estudiantes inscritos en una asignatura específica
    const rows = await sequelize.query(
      `SELECT 
        s.rut,
        s.names,
        s.lastnames,
        s.birthdate,
        s.gender,
        s.email,
        s.role
       FROM 
        student s
       JOIN 
        studentsubjects ss ON s.rut = ss.studentId
       JOIN 
        subject sub ON ss.subjectId = sub.id
       WHERE 
        sub.subject_code = ?`,
      {
        replacements: [subjectCode],
        type: sequelize.QueryTypes.SELECT
      }
    );

    // Devuelve la lista de estudiantes en formato JSON
    res.json(rows);
  } catch (err) {
    console.error(err);
    // Devuelve un estado 500 y un mensaje de error en caso de fallo
    res.status(500).json({ error: 'Error al obtener estudiantes por asignatura' });
  }
};

// Obtener todos los estudiantes de una carrera específica
export const getStudentsByCareer = async (req, res) => {
  const { careerCode } = req.params;

  try {
    // Realiza una consulta SQL para obtener los estudiantes inscritos en una carrera específica
    const rows = await sequelize.query(
      `SELECT 
        s.rut,
        s.names,
        s.lastnames,
        s.birthdate,
        s.gender,
        s.email,
        s.role
       FROM 
        student s
       JOIN 
        course c ON s.courseId = c.id
       JOIN 
        career cr ON c.careerId = cr.id
       WHERE 
        cr.career_code = ?`,
      {
        replacements: [careerCode],
        type: sequelize.QueryTypes.SELECT
      }
    );

    // Devuelve la lista de estudiantes en formato JSON
    res.json(rows);
  } catch (err) {
    console.error(err);
    // Devuelve un estado 500 y un mensaje de error en caso de fallo
    res.status(500).json({ error: 'Error al obtener estudiantes por carrera' });
  }
};

// Obtener todos los alumnos de un profesor
export const getStudentsByProfessor = async (req, res) => {
  const { professorRut } = req.params;

  try {
    // Realiza una consulta SQL para obtener los estudiantes inscritos en las asignaturas de un profesor específico
    const rows = await sequelize.query(
      `SELECT 
        st.rut, 
        st.names, 
        st.lastnames
       FROM 
        profesor p
       JOIN 
        subject sub ON p.rut = sub.profesorId
       JOIN 
        studentsubjects ss ON sub.id = ss.subjectId
       JOIN 
        student st ON ss.studentId = st.rut
       WHERE 
        p.rut = ?`,
      {
        replacements: [professorRut],
        type: sequelize.QueryTypes.SELECT
      }
    );

    // Devuelve la lista de estudiantes en formato JSON
    res.json(rows);
  } catch (err) {
    console.error(err);
    // Devuelve un estado 500 y un mensaje de error en caso de fallo
    res.status(500).json({ error: 'Error al obtener estudiantes por profesor' });
  }
};

// Obtener todos los alumnos de un jefe de carrera específico
export const getStudentsByCareerHead = async (req, res) => {
  const { careerHeadRut } = req.params;

  try {
    // Realiza una consulta SQL para obtener los estudiantes inscritos en los cursos de una carrera gestionada por un jefe de carrera específico
    const rows = await sequelize.query(
      `SELECT 
        st.rut, 
        st.names, 
        st.lastnames
       FROM 
        careerhead ch
       JOIN 
        career c ON ch.careerId = c.id
       JOIN 
        course co ON c.id = co.careerId
       JOIN 
        student st ON co.id = st.courseId
       WHERE 
        ch.rut = ?`,
      {
        replacements: [careerHeadRut],
        type: sequelize.QueryTypes.SELECT
      }
    );

    // Devuelve la lista de estudiantes en formato JSON
    res.json(rows);
  } catch (err) {
    console.error(err);
    // Devuelve un estado 500 y un mensaje de error en caso de fallo
    res.status(500).json({ error: 'Error al obtener estudiantes por jefe de carrera' });
  }
};

// Obtener la carrera de un jefe de carrera específico
export const getCareerOfCareerHead = async (req, res) => {
  const { careerHeadRut } = req.params;

  try {
    // Realiza una consulta SQL para obtener los detalles de la carrera gestionada por un jefe de carrera específico
    const rows = await sequelize.query(
      `SELECT 
        ch.rut AS careerHeadRut,
        ch.names AS careerHeadNames,
        ch.lastnames AS careerHeadLastnames,
        c.id AS careerId,
        c.career_code AS careerCode,
        c.career_name AS careerName
       FROM 
        careerhead ch
       JOIN 
        career c ON ch.careerId = c.id
       WHERE 
        ch.rut = ?`,
      {
        replacements: [careerHeadRut],
        type: sequelize.QueryTypes.SELECT
      }
    );

    // Devuelve los detalles de la carrera en formato JSON
    res.json(rows);
  } catch (err) {
    console.error(err);
    // Devuelve un estado 500 y un mensaje de error en caso de fallo
    res.status(500).json({ error: 'Error al obtener la carrera del jefe de carrera' });
  }
};
