import jwt from "jsonwebtoken";

//VERIFIE SI L UTILISATEUR EST CONNECTÉ AVEC UN TOKEN JWT

export const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.json({
      auth: false,
      message: "no token",
    });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          status: 401,
          auth: false,
          message: "auth failed",
        });
      } else {
        req.userid = decoded.id;
        req.role = decoded.role;
        next();
      }
    });
  }
};
