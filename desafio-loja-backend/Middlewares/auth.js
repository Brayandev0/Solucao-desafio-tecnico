import { configDotenv } from "dotenv";
import { verificarToken } from "../Utils/authToken.js";
configDotenv();
export async function AuthMiddleware(req, res, next) {
  try {
    if (req.path === "/login" || req.path === "/login/" || req.path === "/register" || req.path === "/register/") {
      return next();
    }

    const token = req.headers["authorization"] 

    if (!token) {
      return res
        .status(401)
        .json({ msg: "Login inválido ou expirado", code: 401 });
    }

    const verify = await verificarToken(token.split(" ")[1]);
    if (!verify) {
      return res
        .status(401)
        .json({ msg: "Login inválido ou expirado", code: 401 });
    }

    if (!verify.uuid) {
      return res
        .status(401)
        .json({ msg: "Login inválido ou expirado", code: 401 });
    }
    
    req.uuid = verify.uuid;

    next();
  } catch (error) {
    console.error("Erro no AuthMiddleware:", error);
    return res.status(500).json({ msg: "Erro interno no servidor", code: 500 });
  }
}