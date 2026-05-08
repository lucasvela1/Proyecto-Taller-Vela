import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

type EtiquetaParams = {
  nombre: string;
};

//El useLocalSearchParams es un hook que se usa para obtener
// los parametros de la ruta actual. En este caso,
//se obtiene el parametro nombre de la ruta
// /etiquetas/[nombre], donde [nombre] es un parametro
//dinamico que se puede usar para mostrar diferentes
//etiquetas dependiendo del valor del nombre.

export default function EtiquetaScreen() {
  const { nombre } = useLocalSearchParams<EtiquetaParams>();

  return (
    <View style={style.container}>
      <Stack.Screen
        options={{
          title: nombre, //esto es para que el titulo del header sea el nombre de la etiqueta, lo que hace que sea mas facil identificar la etiqueta que se esta mostrando. El header es la barra superior de la pantalla, donde se muestra el titulo y otros elementos como botones de navegación. En este caso, el titulo del header se establece en el valor del nombre, lo que hace que sea mas facil identificar la etiqueta que se esta mostrando.
        }}
      />
      <Text style={style.title}>ETIQUETA</Text>
      <Text style={style.value}>{nombre}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  value: {
    fontSize: 20,
  },
});
