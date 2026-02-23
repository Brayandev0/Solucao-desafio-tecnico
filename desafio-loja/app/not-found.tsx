export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Página Não Encontrada</h1>
      <p className="text-lg text-gray-600 mb-8">
        A página que você está procurando não existe.
      </p>
      <a
        href="/"
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Voltar para a Home
      </a>
    </div>
  );
}