import { categorias } from "@/src/data/categorias";
import { marcas } from "@/src/data/marcas";
import { productos } from "@/src/data/productos";
import { buildRoute, ROUTES } from "@/src/navigation/routes";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type CategoriaSParams = {
  nombre: string;
};

const scorePalette: Record<
  string,
  { backgroundColor: string; textColor: string }
> = {
  A: { backgroundColor: "#16a34a", textColor: "#f0fdf4" }, //Asignamos cada valor a un color
  B: { backgroundColor: "#65a30d", textColor: "#f7fee7" },
  C: { backgroundColor: "#eab308", textColor: "#422006" },
  D: { backgroundColor: "#f97316", textColor: "#fff7ed" },
  E: { backgroundColor: "#dc2626", textColor: "#fef2f2" },
};

function getScoreColors(score: string) {
  return scorePalette[score] ?? scorePalette.C;
}

export default function CategoriaScreen() {
  const router = useRouter();
  const { nombre } = useLocalSearchParams<CategoriaSParams>();
  const categoriaId = typeof nombre === "string" ? nombre : "";
  const [filtro, setFiltro] = useState("");

  const categoriaActual = categorias.find((cat) => cat.id === categoriaId);

  const productosFiltrados = useMemo(
    () =>
      productos
        .filter((producto) => producto.categoriaId === categoriaId)
        .filter((producto) =>
          producto.nombre.toLowerCase().includes(filtro.toLowerCase()),
        ),
    [categoriaId, filtro],
  );

  const marcaById = useMemo(
    () => Object.fromEntries(marcas.map((marca) => [marca.id, marca.nombre])),
    [],
  );

  const categoriaTitle = categoriaActual?.nombre ?? categoriaId;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: categoriaTitle,
        }}
      />

      <Text style={styles.title}>Productos de {categoriaTitle}</Text>

      <TextInput
        style={styles.searchInput}
        value={filtro}
        onChangeText={setFiltro}
        placeholder="Buscar producto..."
        returnKeyType="search"
      />

      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        style={styles.list}
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
                <Text style={styles.productName}>{item.nombre}</Text>
                <Text style={styles.brandText}>{marcaById[item.marcaId]}</Text>

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
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No se encontraron productos para esta categoria.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    gap: 12,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  searchInput: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#f8fafc",
    paddingHorizontal: 14,
  },
  list: {
    flex: 1,
  },
  listContent: {
    gap: 10,
    paddingBottom: 18,
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#dbeafe",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#eff6ff",
  },
  productImage: {
    width: 74,
    height: 74,
    borderRadius: 10,
    backgroundColor: "#cbd5e1",
  },
  productInfo: {
    flex: 1,
    gap: 4,
  },
  productName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0f172a",
  },
  brandText: {
    fontSize: 14,
    color: "#475569",
  },
  scoreRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  scoreBadge: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  scoreBadgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#64748b",
    fontSize: 16,
  },
});
