import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../src/services/productos.service";
import { transformSearchProductsResponse } from "../src/transformers/search-products.transformer";

export function useProductos(categoria: string) {
  const response = useQuery({
    queryKey: ["products", categoria],
    staleTime: 2_000, // 5 segundos
    queryFn: async () => {
      const response = await searchProducts(categoria);
      return transformSearchProductsResponse(response);
    },
  });

  return response;
}
