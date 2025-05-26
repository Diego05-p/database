function success(req, res, data, status = 200) {
  res.status(status).json({
    success: true,
    data,
  });
}

function error(req, res, message = "Internal Server Error", status = 500) {
  res.status(status).json({
    success: false,
    error: message,
  });
}

module.exports = {
  success,
  error,
};
