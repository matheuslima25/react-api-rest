import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => api.get(`/api/v1/products/${id}/`).then((res) => res.data),
    enabled: !!id,
  });

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await api.delete(`/api/v1/products/${id}/`);
        navigate("/");
      } catch (error) {
        alert(`Erro ao excluir produto: ${error}.`);
      }
    }
  };

  if (isLoading)
    return <p className="text-center mt-10">Carregando produto...</p>;

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Erro ao carregar o produto.
      </p>
    );

    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="w-full max-w-3xl bg-white shadow-md rounded p-8 space-y-6 text-center">
          <h1 className="text-3xl font-bold">Detalhes do Produto</h1>
          {product.image_url && (
            <div className="flex justify-center">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full max-w-lg h-auto object-contain rounded"
              />
            </div>
          )}
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-lg font-semibold">Preço: R$ {product.price}</p>
    
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
            <button
              onClick={() => navigate(`/products/${product.id}/edit/`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full md:w-auto"
            >
              Editar Produto
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full md:w-auto"
            >
              Excluir Produto
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded w-full md:w-auto"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
}

export default ProductDetailPage;
