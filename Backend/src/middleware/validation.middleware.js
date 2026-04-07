export const validate = (schema) => (req, res, next) => {
  try {
    // parse() checks req.body against the schema
    schema.parse(req.body);
    next();
  } catch (error) {
    // error.errors contains the specific messages we wrote above
    return res.status(400).json({
      message: "Validation failed",
      errors: error.errors.map(err => err.message)
    });
  }
};