import createHttpError from 'http-errors';

export default function validate(schema, fieldName) {
  return (req, _res, next) => {
    const { error, value } = schema.validate(req[fieldName], {
      abortEarly: false,
    });
    if (error) {
      return next(createHttpError(400, error));
    } else {
      Object.assign(req[fieldName], value);
    }
    next();
  };
}
