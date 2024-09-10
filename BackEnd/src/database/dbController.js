// Importación del módulo Sequelize, que es un ORM (Object-Relational Mapping) 
// para interactuar con bases de datos relacionales como MySQL, PostgreSQL, etc.
import Sequelize from 'sequelize';

// Creación de una instancia de Sequelize, que establece la conexión con la base de datos.
// Parámetros:
// 1. 'db_epe3' - nombre de la base de datos.
// 2. 'Jc' - nombre de usuario de la base de datos.
// 3. 'Jc@260596' - contraseña para acceder a la base de datos.
// El objeto adicional define la configuración de la conexión.
export const sequelize = new Sequelize('db_epe3', 'Jc', 'Jc@260596', {
    // Host donde se encuentra el servidor de base de datos, en este caso, la máquina local (localhost).
    host: '127.0.0.1',
    
    // Especificación del tipo de base de datos que se está utilizando, en este caso, MySQL.
    dialect: 'mysql',
    
    // Configuración adicional para Sequelize.
    define: {
        // freezeTableName: true evita que Sequelize modifique los nombres de las tablas.
        // Esto significa que Sequelize no pluralizará los nombres de las tablas automáticamente.
        freezeTableName: true
    }
});
