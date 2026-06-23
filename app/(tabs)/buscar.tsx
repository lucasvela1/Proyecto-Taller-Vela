import { useBuscarProductos } from "@/hooks/useProductos";
import { marcas } from "@/src/data/marcas";
import { buildRoute, ROUTES } from "@/src/navigation/routes";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const scorePalette: Record<
  string,
  { backgroundColor: string; textColor: string }
> = {
  A: { backgroundColor: "#16a34a", textColor: "#f0fdf4" },
  B: { backgroundColor: "#65a30d", textColor: "#f7fee7" },
  C: { backgroundColor: "#eab308", textColor: "#422006" },
  D: { backgroundColor: "#f97316", textColor: "#fff7ed" },
  E: { backgroundColor: "#dc2626", textColor: "#fef2f2" },
};

function getScoreColors(score: string) {
  return scorePalette[score] ?? scorePalette.C;
}

export default function BuscarScreen() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // Debounce logic (500ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm.trim());
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBuscarProductos(debouncedTerm);

  const marcaById = useMemo(
    () => Object.fromEntries(marcas.map((marca) => [marca.id, marca.nombre])),
    [],
  );

  const allProducts = useMemo(() => {
    const rawList = data?.pages.flat() || [];
    if (debouncedTerm.length === 0) return [];

    const query = debouncedTerm.toLowerCase();
    //Filtramos para que aparezcan los que coincidan con el termino buscado
    return rawList.filter(item =>
      item.nombre.toLowerCase().includes(query) ||
      item.marcaId.toLowerCase().includes(query)
    );
  }, [data, debouncedTerm]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Buscador de Alimentos</Text>

      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#64748b" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Escribe el nombre de un producto..."
          placeholderTextColor="#94a3b8"
          returnKeyType="search"
        />
        {searchTerm.length > 0 && (
          <Pressable onPress={() => setSearchTerm("")} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#94a3b8" />
          </Pressable>
        )}
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.statusText}>Buscando en Open Food Facts...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color="#dc2626" />
          <Text style={[styles.statusText, { color: "#dc2626" }]}>
            Error al consultar el servidor.
          </Text>
        </View>
      ) : debouncedTerm.length === 0 ? (
        <View style={styles.infoContainer}>
          <Ionicons name="search-outline" size={64} color="#94a3b8" />
          <Text style={styles.infoText}>
            Escribe arriba para buscar cualquier alimento en la base de datos de Open Food Facts.
          </Text>
        </View>
      ) : allProducts.length === 0 && !isFetchingNextPage ? (
        <View style={styles.infoContainer}>
          <Ionicons name="basket-outline" size={64} color="#94a3b8" />
          <Text style={styles.infoText}>
            No se encontraron productos coincidentes para "{debouncedTerm}".
          </Text>
        </View>
      ) : (
        <FlatList
          data={allProducts}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          contentContainerStyle={styles.listContent}
          style={styles.list}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => {
            if (isFetchingNextPage) {
              return (
                <View style={styles.footerLoader}>
                  <ActivityIndicator size="small" color="#2563eb" />
                </View>
              );
            }
            return null;
          }}
          renderItem={({ item }) => {
            const nutriColors = getScoreColors(item.nutriScore);
            const ecoColors = getScoreColors(item.ecoScore);

            return (
              <Pressable
                style={styles.productRow}
                onPress={() =>
                  router.push(buildRoute(ROUTES.FICHA, { id: item.id }))
                }
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.productImage}
                  contentFit="cover"
                />

                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>{item.nombre}</Text>
                  <Text style={styles.brandText}>
                    {marcaById[item.marcaId] || item.marcaId || "Sin marca"}
                  </Text>

                  <View style={styles.scoreRow}>
                    <View
                      style={[
                        styles.scoreBadge,
                        { backgroundColor: nutriColors.backgroundColor },
                      ]}
                    >
                      <Text
                        style={[
                          styles.scoreBadgeText,
                          { color: nutriColors.textColor },
                        ]}
                      >
                        Nutri-Score {item.nutriScore}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.scoreBadge,
                        { backgroundColor: ecoColors.backgroundColor },
                      ]}
                    >
                      <Text
                        style={[
                          styles.scoreBadgeText,
                          { color: ecoColors.textColor },
                        ]}
                      >
                        Eco-Score {item.ecoScore}
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingTop: 50,
    paddingHorizontal: 20,
    gap: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 4,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 52,
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
  list: {
    flex: 1,
  },
  listContent: {
    gap: 10,
    paddingBottom: 24,
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    padding: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  productImage: {
    width: 76,
    height: 76,
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
  },
  productInfo: {
    flex: 1,
    gap: 3,
  },
  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },
  brandText: {
    fontSize: 13,
    color: "#64748b",
  },
  scoreRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 4,
  },
  scoreBadge: {
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  scoreBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 32,
  },
  statusText: {
    fontSize: 16,
    color: "#64748b",
    fontWeight: "500",
    textAlign: "center",
  },
  infoText: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
