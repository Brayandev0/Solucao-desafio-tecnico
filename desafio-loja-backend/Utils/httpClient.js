// fetch com timeout por padrao, reutilizando o AbortController
export async function httpFetchTimeout(url, options = {}) {

  const controller = new AbortController();

  const timeout = options.timeout || 5000;

  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(id);

    if (!response.ok) {
      console.error(`Erro na API externa: ${response.status} ${response.statusText}`);
      throw {
        type: "http_error",
        status: response.status,
        message: "Erro na API externa",
      };
    }

    return await response.json();
  } catch (error) {
    clearTimeout(id);

    if (error.name === "AbortError") {
      throw {
        type: "timeout",
        message: "Timeout na requisição externa",
      };
    }

    throw error;
  }
}