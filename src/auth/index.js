const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const { assignToken, checkToken } = require("./auth/token");
const error = require("./middleware/error");

const app = express();
const port = config.api.port || 3000;

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

// Ruta pública de ejemplo (login)
app.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  // ⚠️ Simulación: normalmente verificarías con una base de datos
  if (username === "admin" && password === "1234") {
    const user = {
      id: "user-123",
      username,
      role_id: "90a0f9f4-d670-486a-8cd4-f56cdcbf9cb0", // admin role
    };
    const token = assignToken(user);
    res.json({ token });
  } else {
    next(error("Invalid credentials", 401));
  }
});

// Ruta protegida
app.get("/private/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    checkToken.confirmToken(req, id, 0); // 0 para verificar que es dueño o admin
    res.json({ message: "Access granted", user: req.user });
  } catch (err) {
    next(err);
  }
});

// Middleware de errores
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    error: true,
    message: err.message,
  });
});

// Arrancar servidor
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
