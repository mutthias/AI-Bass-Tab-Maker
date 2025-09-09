import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function authToken(req, res, next) {
  const header = req.headers("authorization");
  const token = header && header.split(" ")[1]; // because header = "Bearer <token>"

  if (!token) {
    return res.status(401).json({
      error: "You are not authorized to access this application."
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        error: "Invalid/Expired token."
      })
    }
    req.user = user
    next();
  }) 
}
