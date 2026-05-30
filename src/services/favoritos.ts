import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const [isFav, setIsFav] = useState(false);
const [isFavorito, setIsFavorito] = useState(false); //Inicializamos los productos como falso favorito

export type ProductoFavorito = {
  id: string;
  nombre: string;
};

export const guardarFavorito = async (productId: string) => {
  const favoritos = await obtenerFavoritos();
  let favoritosArray: ProductoFavorito[] = favoritos ? favoritos : [];
  favoritosArray.push({ id: productId, nombre: producto?.nombre ?? "" });
  await AsyncStorage.setItem(
    "productosFavoritos",
    JSON.stringify(favoritosArray),
  );
  console.log("Producto guardado en favoritos:", productId);
  return true;
};

export const eliminarFavorito = async (productId: string) => {
  const favoritos = await obtenerFavoritos();
  let favoritosArray: ProductoFavorito[] = favoritos ? favoritos : [];
  favoritosArray = favoritosArray.filter((item) => item.id !== productId);
  await AsyncStorage.setItem(
    "productosFavoritos",
    JSON.stringify(favoritosArray),
  );
  console.log("Producto eliminado de favoritos:", productId);
  return true;
};

export const obtenerFavoritos = async (): Promise<ProductoFavorito[]> => {
  const favoritos = await AsyncStorage.getItem("productosFavoritos");
  return favoritos ? JSON.parse(favoritos) : [];
};

export const recuperarFavorito = async () => {
  const favoritos = await obtenerFavoritos();
  let favoritosArray: ProductoFavorito[] = favoritos ? favoritos : [];
  return favoritosArray.find((item) => item.id === productId)?.id || null; //Buscamos el producto en favoritos, si lo encontramos retornamos su id, sino retornamos null
}; //Find solo devuelve el primer elemento que encuentra, no todos los concidentes
//Ponemos que devuelva null si no encuentra nada para evitar el undefined

useEffect(() => {
  recuperarFavorito().then((favorito) => {
    if (favorito === productId) {
      setIsFavorito(true); //Si el producto es igual al producto   guardado en favoritos, se marca como favorito
    }
  });
}, [productId]); //No le estoy pasando ninguna refencia, pero podría pasarle el id
//Le puse el productId para que cada vez que cambie el producto, se vuelva a verificar si es favorito o no
