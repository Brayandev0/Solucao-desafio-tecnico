"use server";
import api from "@/lib/api";
import { serverFetch } from "@/lib/api-server";
import { buscarCookies, salvarCookies } from "@/utils/Cookies";
import { cacheLife } from "next/cache";
interface registerResponse {
  token: string;
  msg: string;
  code: number;
}
export async function realizarLogin(email: string, senha: string) {
  try {
    const data = await serverFetch(`/users/login`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: senha,
      }),
    });
    const responseData: registerResponse = await data.json();
    if (responseData.token) {
      await salvarCookies(
        process.env.Auth_cookie_name || "AuthToken",
        responseData.token,
        {
          maxAge: 60 * 60 * 24 * 7, // 7 dias
          httpOnly: true,
        },
      );
    }
    return responseData;
  } catch (error: any) {
    return error.response?.data;
  }
}

export async function realizarCadastro(
  email: string,
  senha: string,
  nome: string,
) {
  try {
    const data = await serverFetch(`/users/register`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: senha,
        name: nome,
      }),
    });
    const responseData = await data.json();

    if (responseData.token) {
      await salvarCookies(
        process.env.Auth_cookie_name || "AuthToken",
        responseData.token,
        {
          maxAge: 60 * 60 * 24 * 7, // 7 dias
          httpOnly: true,
        },
      );
    }
    return responseData;
  } catch (error: any) {
    console.log("Erro na requisição:", error);
    return error.response?.data;
  }
}

export async function BuscarPerfil() {
  try {
    const data = await serverFetch(
      `/users/`,
      {
        method: "GET",

      },
    );
    return await data.json();
  } catch (error: any) {
    return error.response?.data;
  }
}

export async function BuscarPedidoPorUuid(uuid: string) {
  "use cache: private";
  cacheLife("hours")
  try {
    const data = await serverFetch(
      `/users/orders/${uuid}`,
      {
        method: "GET",

      },
    );
    return await data.json();
  } catch (error: any) {
    return error.response?.data;
  }
}

export async function RealizarPedido(endereco: string, pagamento: string, produtos: { id: number; quantidade: number }[]) {
  try {
    const data = await serverFetch(
      `/users/orders`,
      {
        method: "POST",
        body: JSON.stringify({
          endereco: endereco,
          pagamento: pagamento,
          produtos: produtos,
        }),
      },
    );
    return await data.json();
  } catch (error: any) {
    return error.response?.data;
  }
}


