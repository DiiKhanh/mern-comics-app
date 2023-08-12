import { validationResult } from 'express-validator';

const validate = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) return res.status(400).json({
    message: error.array()[0].msg
  });

  next();
};

export default { validate };