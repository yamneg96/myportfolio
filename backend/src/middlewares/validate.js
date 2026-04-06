/**
 * Zod Validation Middleware Factory
 * Validates request body against a Zod schema.
 */
const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse(req.body);
    req.body = parsed; // Replace with parsed/cleaned data
    next();
  } catch (error) {
    // Pass Zod errors to errorHandler
    error.name = 'ZodError';
    next(error);
  }
};

module.exports = validate;
