export const isAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return res.json({
      status: 403,
      message: "forbidden",
    });
  } else {
    next();
  }
};
