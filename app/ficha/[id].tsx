import { FAVORITOS_HOOK_KEY, useFavoritos } from "@/hooks/use-favoritos";
import { marcas } from "@/src/data/marcas";
import { productos } from "@/src/data/productos";
import { eliminarFavorito, guardarFavorito } from "@/src/services/favoritos";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import "react-native-reanimated";

type FichaScreenParams = {
  id: string;
};

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

const novaPalette: Record<
  number,
  { backgroundColor: string; textColor: string }
> = {
  1: { backgroundColor: "#15803d", textColor: "#dcfce7" },
  2: { backgroundColor: "#65a30d", textColor: "#f7fee7" },
  3: { backgroundColor: "#f59e0b", textColor: "#451a03" },
  4: { backgroundColor: "#dc2626", textColor: "#fef2f2" },
};

export default function FichaScreen() {
  const { id } = useLocalSearchParams<FichaScreenParams>();
  const productId = typeof id === "string" ? id : "";
  const producto = productos.find((item) => item.id === productId);
  const { data: favoritos = [] } = useFavoritos();
  const queryClient = useQueryClient();
  const isFavorito = useMemo(() => {
    return favoritos.some((item) => item.id === productId);
  }, [favoritos, productId]);

  async function toggleFavorito() {
    if (isFavorito) {
      await eliminarFavorito(productId);
    } else {
      await guardarFavorito({
        id: productId,
        nombre: producto?.nombre ?? "",
      });
    }
    queryClient.invalidateQueries({
      queryKey: FAVORITOS_HOOK_KEY,
    }); //Invalidamos la query de favoritos para que se vuelva a cargar la lista de favoritos actualizada
  }

  if (!producto) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Stack.Screen
          options={{
            headerTitle: "Producto",
          }}
        />
        <Text style={styles.notFoundText}>No se encontro el producto.</Text>
      </View>
    );
  }

  const marcaNombre =
    marcas.find((marca) => marca.id === producto.marcaId)?.nombre ??
    "Sin marca";
  const nutriColors = scorePalette[producto.nutriScore] ?? scorePalette.C;
  const ecoColors = scorePalette[producto.ecoScore] ?? scorePalette.C;
  const novaColors = novaPalette[producto.novaGroup] ?? novaPalette[3];

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: producto.nombre,
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroWrap}>
          <Image
            source={{ uri: producto.imageUrl }}
            style={styles.heroImage}
            contentFit="cover"
          />

          <Pressable onPress={toggleFavorito} style={styles.heartButton}>
            <Text
              style={[
                styles.heartIcon,
                isFavorito ? styles.heartOn : styles.heartOff,
              ]}
            >
              {isFavorito ? "❤" : "♡"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.mainCard}>
          <Text style={styles.brandSmall}>{marcaNombre}</Text>
          <Text style={styles.productTitle}>{producto.nombre}</Text>

          <View style={styles.scoreGrid}>
            <View
              style={[
                styles.squareBadge,
                { backgroundColor: nutriColors.backgroundColor },
              ]}
            >
              <Text
                style={[
                  styles.squareBadgeTitle,
                  { color: nutriColors.textColor },
                ]}
              >
                Nutri-Score
              </Text>
              <Text
                style={[
                  styles.squareBadgeValue,
                  { color: nutriColors.textColor },
                ]}
              >
                {producto.nutriScore}
              </Text>
            </View>

            <View
              style={[
                styles.squareBadge,
                { backgroundColor: novaColors.backgroundColor },
              ]}
            >
              <Text
                style={[
                  styles.squareBadgeTitle,
                  { color: novaColors.textColor },
                ]}
              >
                Nova-Group
              </Text>
              <Text
                style={[
                  styles.squareBadgeValue,
                  { color: novaColors.textColor },
                ]}
              >
                {producto.novaGroup}
              </Text>
            </View>

            <View
              style={[
                styles.squareBadge,
                { backgroundColor: ecoColors.backgroundColor },
              ]}
            >
              <Text
                style={[
                  styles.squareBadgeTitle,
                  { color: ecoColors.textColor },
                ]}
              >
                Eco-Score
              </Text>
              <Text
                style={[
                  styles.squareBadgeValue,
                  { color: ecoColors.textColor },
                ]}
              >
                {producto.ecoScore}
              </Text>
            </View>
          </View>

          <View style={styles.nutrientsColumn}>
            <NutrientRow
              label="Energia"
              value={producto.resumenNutrientes.energia}
            />
            <NutrientRow
              label="Grasa"
              value={producto.resumenNutrientes.grasa}
            />
            <NutrientRow
              label="Proteina"
              value={producto.resumenNutrientes.proteina}
            />
            <NutrientRow
              label="Sales"
              value={producto.resumenNutrientes.sales}
            />
            <NutrientRow
              label="Carbohidratos"
              value={producto.resumenNutrientes.carbohidratos}
            />
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Ingredientes</Text>
          <Text style={styles.sectionBody}>{producto.ingredientes}</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Valor nutricional (por 100ml)</Text>
          <NutrientRow
            label="Energia"
            value={producto.valorNutricional100ml.energia}
          />
          <NutrientRow
            label="Grasa"
            value={producto.valorNutricional100ml.grasa}
          />
          <NutrientRow
            label="Grasas saturadas"
            value={producto.valorNutricional100ml.grasasSaturadas}
          />
          <NutrientRow
            label="Carbohidratos"
            value={producto.valorNutricional100ml.carbohidratos}
          />
          <NutrientRow
            label="Azucares"
            value={producto.valorNutricional100ml.azucares}
          />
          <NutrientRow
            label="Fibra"
            value={producto.valorNutricional100ml.fibra}
          />
          <NutrientRow
            label="Proteina"
            value={producto.valorNutricional100ml.proteina}
          />
          <NutrientRow label="Sal" value={producto.valorNutricional100ml.sal} />
        </View>
      </ScrollView>
    </View>
  );
}

function NutrientRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.nutrientRow}>
      <Text style={styles.nutrientLabel}>{label}</Text>
      <Text style={styles.nutrientValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  notFoundText: {
    fontSize: 18,
    color: "#475569",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  heroWrap: {
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: 320,
    backgroundColor: "#e2e8f0",
  },
  heartButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  heartIcon: {
    fontSize: 24,
    lineHeight: 24,
  },
  heartOn: {
    color: "#dc2626",
  },
  heartOff: {
    color: "#94a3b8",
  },
  mainCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    marginHorizontal: 16,
    marginTop: -36,
    padding: 16,
    gap: 12,
    shadowColor: "#000000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  brandSmall: {
    fontSize: 13,
    color: "#64748b",
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f172a",
  },
  scoreGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  squareBadge: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  squareBadgeTitle: {
    fontSize: 12,
    fontWeight: "700",
  },
  squareBadgeValue: {
    marginTop: 4,
    fontSize: 26,
    fontWeight: "800",
  },
  nutrientsColumn: {
    gap: 8,
    marginTop: 6,
  },
  sectionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 14,
    padding: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 4,
  },
  sectionBody: {
    fontSize: 15,
    lineHeight: 22,
    color: "#334155",
  },
  nutrientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingVertical: 8,
  },
  nutrientLabel: {
    fontSize: 15,
    color: "#334155",
  },
  nutrientValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0f172a",
  },
});
