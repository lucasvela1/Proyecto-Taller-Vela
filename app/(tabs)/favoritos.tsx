import { FAVORITOS_HOOK_KEY } from "@/hooks/use-favoritos";
import { useRefreshOnFocus } from "@/hooks/use-refresh-on-focus";
import { buildRoute, ROUTES } from "@/src/navigation/routes";
import { eliminarFavorito, guardarFavorito, obtenerFavoritos, type ProductoFavorito } from "@/src/services/favoritos";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState, useCallback } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function FavoritosScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isFocused = useIsFocused();

  useRefreshOnFocus(FAVORITOS_HOOK_KEY);
  const [favorites, setFavorites] = useState<ProductoFavorito[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set());

  const loadFavorites = useCallback(async () => {
    const data = await obtenerFavoritos();
    setFavorites(data);
    setRemovedIds(new Set());
  }, []);

  // Reset state and refresh data from storage when screen is focused (navigation change)
  useEffect(() => {
    if (isFocused) {
      loadFavorites();
      queryClient.invalidateQueries({ queryKey: FAVORITOS_HOOK_KEY });
    }
  }, [isFocused, queryClient, loadFavorites]);

  // Reset state and refresh list from storage when search term changes
  useEffect(() => {
    loadFavorites();
    queryClient.invalidateQueries({ queryKey: FAVORITOS_HOOK_KEY });
  }, [searchTerm, queryClient, loadFavorites]);

  const handleToggleHeart = async (item: ProductoFavorito) => {
    const newRemoved = new Set(removedIds);
    if (newRemoved.has(item.id)) {
      // Re-add to favorites
      await guardarFavorito(item);
      newRemoved.delete(item.id);
    } else {
      // Remove from favorites
      await eliminarFavorito(item.id);
      newRemoved.add(item.id);
    }
    setRemovedIds(newRemoved);
    
    // Invalidate React Query cache so other screens (like detail screen) get the updated state immediately
    queryClient.invalidateQueries({ queryKey: FAVORITOS_HOOK_KEY });
  };

  const filteredFavoritos = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    if (query === "") return favorites;
    return favorites.filter((item) => item.nombre.toLowerCase().includes(query));
  }, [favorites, searchTerm]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Mis Favoritos</Text>
      <Text style={styles.description}>
        Productos guardados para consulta rápida.
      </Text>

      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#64748b" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Buscar entre mis favoritos..."
          placeholderTextColor="#94a3b8"
        />
        {searchTerm.length > 0 && (
          <Pressable onPress={() => setSearchTerm("")} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#94a3b8" />
          </Pressable>
        )}
      </View>

      <FlatList
        data={filteredFavoritos}
        keyExtractor={(item) => item.id}
        style={{ width: "100%" }}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const isRemoved = removedIds.has(item.id);
          return (
            <View style={styles.productCard}>
              <Pressable
                onPress={() => router.push(buildRoute(ROUTES.FICHA, { id: item.id }))}
                style={styles.detailsPressable}
              >
                <View style={styles.textWrapper}>
                  <Text style={styles.productName} numberOfLines={2}>{item.nombre}</Text>
                  <Text style={styles.productBarcode}>Código: {item.id}</Text>
                </View>
              </Pressable>

              <Pressable
                onPress={() => handleToggleHeart(item)}
                style={[
                  styles.iconWrapper,
                  { backgroundColor: isRemoved ? "#f1f5f9" : "#fee2e2" }
                ]}
              >
                <Ionicons
                  name="heart"
                  size={24}
                  color={isRemoved ? "#94a3b8" : "#dc2626"}
                />
              </Pressable>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.infoContainer}>
            <Ionicons name="heart-dislike-outline" size={64} color="#94a3b8" />
            <Text style={styles.infoText}>
              {searchTerm.length > 0
                ? `No se encontraron favoritos coincidentes con "${searchTerm}".`
                : "Aún no tienes productos guardados en favoritos."}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingTop: 50,
    paddingHorizontal: 20,
    gap: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
  },
  description: {
    fontSize: 15,
    color: "#64748b",
    marginBottom: 6,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#0f172a",
    height: "100%",
  },
  clearButton: {
    padding: 4,
  },
  listContent: {
    gap: 10,
    paddingBottom: 24,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    padding: 14,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
    gap: 12,
  },
  detailsPressable: {
    flex: 1,
    justifyContent: "center",
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    flex: 1,
    gap: 2,
  },
  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
  },
  productBarcode: {
    fontSize: 12,
    color: "#64748b",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 32,
    paddingTop: 80,
  },
  infoText: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
  },
});
