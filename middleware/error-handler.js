export default function errorHandler(error, _req, res, _next) {
  const status = error.status || 500;
  res.status(status).json({
    status,
    message: error.message || 'Internal Server Error',
  });
}
