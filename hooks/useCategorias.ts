import { useQuery } from "@tanstack/react-query";
import { getCategoriasV3 } from "../src/services/categorias";

export function useCategorias() {
  const response = useQuery({
    queryKey: ["categories"],
    staleTime: 2_000, // 5 segundos
    queryFn: function () {
      return getCategoriasV3("Bebidas");
    },
  });

  return response;
}
