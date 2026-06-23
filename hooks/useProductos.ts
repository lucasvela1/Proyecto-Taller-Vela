import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  getProductsByCategory,
  getProductsByBrand,
  getProductByBarcode,
  searchProductsByQuery,
  searchProducts,
} from "../src/services/productos.service";
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

export function useProductosPorCategoria(categoriaId: string) {
  return useQuery({
    queryKey: ["productos", "categoria", categoriaId],
    queryFn: () => getProductsByCategory(categoriaId),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

export function useProductosPorMarca(marcaId: string) {
  return useQuery({
    queryKey: ["productos", "marca", marcaId],
    queryFn: () => getProductsByBrand(marcaId),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

export function useProductoDetalle(id: string) {
  return useQuery({
    queryKey: ["producto", id],
    queryFn: () => getProductByBarcode(id),
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
}

export function useBuscarProductos(query: string) {
  return useInfiniteQuery({
    queryKey: ["productos", "buscar", query],
    queryFn: ({ pageParam }) => searchProductsByQuery(query, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
    enabled: query.trim().length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
}
