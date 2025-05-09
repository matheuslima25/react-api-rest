import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import type { ProductFormData } from "../lib/types/types";
import api from "../services/api";

// Schema de validação com Yup
const schema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  description: yup.string().required("Descrição obrigatória"),
  price: yup
    .number()
    .typeError("Preço deve ser um número")
    .positive("Preço deve ser positivo")
    .required("Preço obrigatório"),
  image_url: yup.string().url("URL inválida").required("Imagem obrigatória"),
});

function ProductFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: yupResolver(schema),
  });

  // Se houver ID, está em modo de edição, busca o produto para preencher o formulário
  useEffect(() => {
    if (id) {
      api.get(`/api/v1/products/${id}/`).then((res) => {
        const product = res.data;
        setValue("name", product.name);
        setValue("description", product.description);
        setValue("price", Number(product.price)); // Garantindo tipo numérico
        setValue("image_url", product.image_url);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (id) {
        await api.put(`/api/v1/products/${id}/`, data);
      } else {
        await api.post("/api/v1/products/", data);
      }
      navigate("/");
    } catch (error) {
      alert(`Erro ao salvar produto: ${error}.`);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {id ? "Editar Produto" : "Novo Produto"}
        </h1>

        <input
          {...register("name")}
          placeholder="Nome do Produto"
          className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm mb-2">{errors.name?.message}</p>

        <textarea
          {...register("description")}
          placeholder="Descrição"
          className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm mb-2">{errors.description?.message}</p>

        <input
          {...register("price")}
          type="number"
          step="0.01"
          placeholder="Preço"
          className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm mb-2">{errors.price?.message}</p>

        <input
          {...register("image_url")}
          placeholder="URL da Imagem"
          className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm mb-4">{errors.image_url?.message}</p>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200"
        >
          {id ? "Atualizar Produto" : "Cadastrar Produto"}
        </button>
      </form>
    </div>
  );
}

export default ProductFormPage;
