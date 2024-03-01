import Jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json("authorization is required");
  }
  const token = authHeader.split(" ")[1];
  try {
    const currentUser = Jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = currentUser;
    console.log(currentUser);
    next();
  } catch (err) {
    res.status(401).json("invalid Token");
  }
};
