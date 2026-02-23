import argon2 from "argon2";
import { configDotenv } from "dotenv";
configDotenv();


export async function criptografarDados(data) {
  return await argon2.hash(data, {
    type: argon2.argon2id, 
    memoryCost: 2 ** 16, 
    timeCost: 5, 
    parallelism: 1,
  });
}

export async function verificarSenhaHash(hash, senha) {
  return await argon2.verify(hash, senha);
}

