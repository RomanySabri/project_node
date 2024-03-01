export const allowedTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      return res.json("error");
    }
    next();
  };
};
