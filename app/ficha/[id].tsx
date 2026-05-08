import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import "react-native-reanimated";

type FichaScreenParams = {
  id: string;
};

export default function FichaScreen() {
  const { id } = useLocalSearchParams<FichaScreenParams>(); //esto obtiene el parametro id de la ruta, que se define en el archivo de rutas. En este caso, el id se obtiene de la ruta /ficha/[id], donde [id] es un parametro dinamico que se puede usar para mostrar diferentes fichas dependiendo del valor del id.
  //Lo anterior básicamente toma el id y muestra la ficha de ese producto especifico.

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: id, //esto es para que el titulo del header sea el id de la ficha, lo que hace que sea mas facil identificar la ficha que se esta mostrando. El header es la barra superior de la pantalla, donde se muestra el titulo y otros elementos como botones de navegación. En este caso, el titulo del header se establece en el valor del id, lo que hace que sea mas facil identificar la ficha que se esta mostrando.
        }}
      />
      <Text style={{ fontSize: 30 }}>FICHA {id} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
});
