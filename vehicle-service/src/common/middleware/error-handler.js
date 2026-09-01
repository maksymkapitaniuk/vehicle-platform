const errorHandler = (err, req, res, _next) => {
  if (err instanceof SyntaxError && err.type === 'entity.parse.failed') {
    res.status(400);
    return res.json({
      message: 'JSON parsing error: Invalid JSON body',
      errorCode: 'body_parsing_error',
      cause: err,
    });
  }

  res.status(500);
  res.json({
    message: 'Unknon internal server error',
    errorCode: 'internal_server_error',
    cause: err,
  });
};

export default errorHandler;
