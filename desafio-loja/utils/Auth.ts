"use server"
import { buscarCookies } from "./Cookies";

export async function verificarAutenticacao() {
    try {
        const token = await buscarCookies(`${process.env.Auth_cookie_name}`); // Substitua pelo nome do cookie que você usa para armazenar o token
        if(token && token.trim() !== "") {
            return true;
        }
        return false;

    } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        return false;
    }
}