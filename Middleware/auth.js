import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (err) {
    res.send({ error: err.message });
  }
};
