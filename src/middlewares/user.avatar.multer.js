const multer = require("multer");
const path = require("path");

// Configuración del almacenamiento con multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/avatars/"); // carpeta donde se guardan las imágenes
  },
  filename: function (req, file, cb) {
    // Nombre único: timestamp + nombre original con extensión
    const ext = path.extname(file.originalname);
    const filename = file.fieldname + "-" + Date.now() + ext;
    cb(null, filename);
  },
});

// Filtro para permitir solo imágenes
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

// Exportar multer configurado
const uploadAvatar = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // límite: 2MB
  fileFilter: fileFilter,
});

module.exports = uploadAvatar;
