import { useRefreshOnFocus } from "@/hooks/use-refresh-on-focus";
import { FAVORITOS_HOOK_KEY } from "@/src/hooks/use-favoritos";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

//El _sitemap es un archivo generado automaticamente por Expor Router y se usa para
//depurar y ver el mapa de rutas de la app

export default function FavoritosScreen() {
  const router = useRouter();
  useRefreshOnFocus(FAVORITOS_HOOK_KEY);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      {favoritos.map((favorito) => (
        <Text key={favorito.id} style={styles.description}>
          {favorito.nombre}
        </Text>
      ))}
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
