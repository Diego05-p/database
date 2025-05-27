
const express = require('express');
const cors = require('cors');
const config = require('./config');

const authRoutes = require('./routes/auth/routes');
const userRoutes = require('./routes/user/routes');
const roleRoutes = require('./routes/role/routes');
const userRoleRoutes = require('./routes/userRole/routes');

const app = express();

app.use(cors());
app.use(express.json());  

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/user-roles', userRoleRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error en el servidor' });
});


app.listen(config.port, () => {
  console.log(`Servidor iniciado en el puerto ${config.port}`);
});
