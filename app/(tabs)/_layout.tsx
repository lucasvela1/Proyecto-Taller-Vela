import {Ionicons} from "@expo/vector-icons";
import {Tabs} from "expo-router";

//Este layout se encarga de renderizar las pestañas 
//de navegación en la parte inferior de la aplicación. 
//Cada pestaña representa una sección diferente de la aplicación, 
//como "Inicio", "Favoritos" y "Clases". 
//Se utilizan iconos de Ionicons para representar 
//visualmente cada pestaña, y el color del icono 
//cambia según si la pestaña está activa o no. Además,
//se oculta el encabezado para cada pantalla dentro de las pestañas

export default function RootLayout() {
  return  (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Inicio",
          headerTitle: "Inicio",
          title: "Inicio",
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{
          title: "Favoritos",
          tabBarLabel: "Favoritos",
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name="buscar"
        options={{
          title: "Buscar",
          tabBarLabel: "Buscar",
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={size}
              color={color}
            />
          )
        }}
      />
    </Tabs>
  )
}