const errorHandler = (err, req, res, _next) => {
  res.status(500);
  res.json(err);
};

export default errorHandler;
