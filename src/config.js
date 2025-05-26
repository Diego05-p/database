
require('dotenv').config();  

module.exports = {
  port: process.env.PORT || 3000,

  
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'tu_usuario',
    password: process.env.DB_PASSWORD || 'tu_contraseña',
    database: process.env.DB_NAME || 'tu_basedatos',
  },

  jwtSecret: process.env.JWT_SECRET || 'secretito_super_seguro',
};