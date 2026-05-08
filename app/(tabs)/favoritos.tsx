import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

//El _sitemap es un archivo generado automaticamente por Expor Router y se usa para
//depurar y ver el mapa de rutas de la app

export default function FavoritosScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <Text style={styles.description}>Segundo tab de navegación básica</Text>
      <Button title="SITEMAP" onPress={() => router.push("/_sitemap")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
    gap: 12,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "blue",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "black",
  },
});
