import { useQuery } from "@tanstack/react-query";
import type { ProductoFavorito } from "../src/services/favoritos";
import { obtenerFavoritos } from "../src/services/favoritos";

export const FAVORITOS_HOOK_KEY = ["favoritos"];

export function useFavoritos() {
  const response = useQuery<ProductoFavorito[]>({
    queryKey: FAVORITOS_HOOK_KEY,
    queryFn: obtenerFavoritos,
  });
  return response;
}
