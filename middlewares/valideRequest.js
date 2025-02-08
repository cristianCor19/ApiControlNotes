
export const validateRequestBody = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        return res.status(400).json(error.errors.map(error => error.message))
    }
}




export const validateRequestQuery = (schema) => {
  return (req, res, next) => {
    try {
      // Validar query parameters
      const result = schema.parse(req.query);
      req.validatedQuery = result; // Guarda los datos validados en el request
      next();
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: "Error de validación",
        errors: error.errors.map((err) => err.message),
      });
    }
  };
};