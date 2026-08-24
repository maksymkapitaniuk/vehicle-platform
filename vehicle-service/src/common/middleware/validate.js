import { ZodError } from 'zod';

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync(req.body);
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        status: 'Bad Request',
        errors: JSON.parse(error.message).map((e) =>
          e.code === 'unrecognized_keys'
            ? {
                key: e.keys.join('.'),
                message: e.message,
              }
            : {
                field: e.path.join('.'),
                message: e.message,
              },
        ),
      });
    }
    return next(error);
  }
};

export default validate;
