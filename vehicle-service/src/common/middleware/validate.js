import { ZodError } from 'zod';

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync(req.body);
    return next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(422).json({
        message: 'Invalid request body',
        errorCode: 'validation_error',
        errors: JSON.parse(err.message).map((e) =>
          e.code === 'unrecognized_keys'
            ? {
                keys: e.keys,
                message: e.message,
              }
            : {
                field: e.path.join('.'),
                message: e.message,
              },
        ),
        reason: err,
      });
    }
    return next(err);
  }
};

export default validate;
