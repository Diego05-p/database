 express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const roleRoutes = require("./routes/role.routes");

const errorHandler = require("./middleware/error");

const app = express();

app.use(helmet());             
app.use(cors());              
app.use(morgan("dev"));        
app.use(express.json());       
app.use(express.urlencoded({ extended: true })); 

// Archivos públicos (ej: imágenes subidas)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Rutas API
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/roles", roleRoutes);

// Ruta no encontrada
app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

// Manejo centralizado de errores
app.use(errorHandler);

module.exports = app;
