import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function DashboardPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", page],
    queryFn: () => api.get(`/api/v1/products/?page=${page}`).then(res => res.data),
  });

  if (isLoading) return <p className="text-center mt-10">Carregando produtos...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Erro ao carregar os produtos.</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Produtos</h1>
      <button
        onClick={() => navigate("/products/new")}
        className="mb-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Novo Produto
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.results.map((product: Product) => (
          <div 
            key={product.id} 
            className="border p-4 rounded shadow hover:shadow-lg transition cursor-pointer flex flex-col h-full"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover rounded mb-4" />
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 flex-grow overflow-hidden text-ellipsis line-clamp-3">
              {product.description}
            </p>
            <p className="font-bold mt-4">R$ {Number(product.price).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={!data.next}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;
