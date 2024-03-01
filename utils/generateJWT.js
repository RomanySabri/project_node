import Jwt from "jsonwebtoken";

export const generateJWT = async (payload) => {
  const token = await Jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1m",
  });
  return token;
};
