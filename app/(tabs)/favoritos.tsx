import { FAVORITOS_HOOK_KEY, useFavoritos } from "@/hooks/use-favoritos";
import { useRefreshOnFocus } from "@/hooks/use-refresh-on-focus";
import { useRouter } from "expo-router";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

export default function FavoritosScreen() {
  const router = useRouter();
  useRefreshOnFocus(FAVORITOS_HOOK_KEY);
  const { data } = useFavoritos();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <Text style={styles.description}>
        Aquí puedes ver tus productos favoritos guardados.
      </Text>
      <Button title="SITEMAP" onPress={() => router.push("/_sitemap")} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 12,
              backgroundColor: "white",
              borderRadius: 8,
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 18 }}>{item.nombre}</Text>
          </View>
        )}
      />
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
