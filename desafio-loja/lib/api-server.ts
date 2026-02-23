"use server";

import { buscarCookies } from "@/utils/Cookies";

export async function serverFetch(
  path: string,
  options: RequestInit = {},
) {

  return fetch(`${process.env.BACKEND_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${await buscarCookies(`${process.env.Auth_cookie_name}`)}`,
    },
    ...options.headers,
  });
}