import { Href } from "expo-router";

export const ROUTES = {
  HOME: "/", // /(tabs)/index esto quiere decir que la ruta de inicio es la pestaña "Inicio" dentro de las pestañas de navegación
  TABS_FAVS: "/favortitos", //se puede poner sin (tabs)
  TABS_SEARCH: "/buscar",
  ALIMENTO: "/alimento",
  CATEGORIA: "/categorias/[nombre]",
  MARCA: "/marcas/[nombre]",
  ETIQUETA: "/etiquetas/[nombre]",
  FICHA: "/ficha/[id]",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]; //Aqui se define el tipo AppRoute como una unión de los valores de las rutas definidas en el objeto ROUTES. Esto permite que cualquier variable del tipo AppRoute solo pueda contener uno de los valores definidos en ROUTES, lo que ayuda a garantizar la seguridad de tipos en la navegación de la aplicación.
type RouteParams = Record<string, string | number | boolean | undefined>; // se puede poner undefined porque no todas las rutas van a tener parámetros, y esto permite que el tipo RouteParams sea flexible y pueda representar tanto rutas con parámetros como rutas sin parámetros.

export const buildRoute = (route: AppRoute, params?: RouteParams): Href => {
  if (!params) {
    return route as Href; // Si no se proporcionan parámetros, simplemente devuelve la ruta sin modificaciones.
  }

  return {
    pathname: route, // La ruta base a la que se desea navegar.
    params,
  } as Href; // El objeto Href que se construye con la ruta y los parámetros proporcionados.
};

export function fichaShowRoute(id: number) {
  return buildRoute(ROUTES.FICHA, { id: id.toString() }); // Construye la ruta para mostrar la ficha de un alimento específico, utilizando el ID del alimento como parámetro.
}
