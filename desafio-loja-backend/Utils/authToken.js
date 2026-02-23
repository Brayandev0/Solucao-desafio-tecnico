import jsonwebtoken from "jsonwebtoken";
import { config } from "dotenv";
config();

export async function gerarToken(uuid, ) {
  return await jsonwebtoken.sign(
    {
      uuid: uuid,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d", algorithm: "HS256" },
  );
}

export async function verificarToken(token) {
  try {
    return await jsonwebtoken.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return false;
  }
}