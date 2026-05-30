import { marcas } from "@/src/data/marcas";
import { productos } from "@/src/data/productos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
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
  const [isFav, setIsFav] = useState(false);
  const productId = typeof id === "string" ? id : "";
  const producto = productos.find((item) => item.id === productId);
  const [isFavorito, setIsFavorito] = useState(false); //Inicializamos los productos como falso favorito
  const queryClient = useQueryClient();
  type ProductoFavorito = {
    id: string;
    nombre: string;
  };

  const guardarFavorito = async (productId: string) => {
    const favoritos = await obtenerFavoritos();
    let favoritosArray: ProductoFavorito[] = favoritos ? favoritos : [];
    favoritosArray.push({ id: productId, nombre: producto?.nombre ?? "" });
    await AsyncStorage.setItem(
      "productosFavoritos",
      JSON.stringify(favoritosArray),
    );
    console.log("Producto guardado en favoritos:", productId);
    return true;
  };

  const eliminarFavorito = async (productId: string) => {
    const favoritos = await obtenerFavoritos();
    let favoritosArray: ProductoFavorito[] = favoritos ? favoritos : [];
    favoritosArray = favoritosArray.filter((item) => item.id !== productId);
    await AsyncStorage.setItem(
      "productosFavoritos",
      JSON.stringify(favoritosArray),
    );
    console.log("Producto eliminado de favoritos:", productId);
    return true;
  };

  const obtenerFavoritos = async (): Promise<ProductoFavorito[]> => {
    const favoritos = await AsyncStorage.getItem("productosFavoritos");
    return favoritos ? JSON.parse(favoritos) : [];
  };

  const recuperarFavorito = async () => {
    const favoritos = await obtenerFavoritos();
    let favoritosArray: ProductoFavorito[] = favoritos ? favoritos : [];
    return favoritosArray.find((item) => item.id === productId)?.id || null; //Buscamos el producto en favoritos, si lo encontramos retornamos su id, sino retornamos null
  }; //Find solo devuelve el primer elemento que encuentra, no todos los concidentes
  //Ponemos que devuelva null si no encuentra nada para evitar el undefined

  useEffect(() => {
    recuperarFavorito().then((favorito) => {
      if (favorito === productId) {
        setIsFavorito(true); //Si el producto es igual al producto   guardado en favoritos, se marca como favorito
      }
    });
  }, [productId]); //No le estoy pasando ninguna refencia, pero podría pasarle el id
  //Le puse el productId para que cada vez que cambie el producto, se vuelva a verificar si es favorito o no

  function toogleFavorito() {
    if (isFavorito) {
      eliminarFavorito(productId).then(() => setIsFavorito(false)); //Si el producto ya es favorito, se elimina de favoritos y se actualiza el estado
    } else {
      guardarFavorito(productId).then(() => setIsFavorito(true)); //Si el producto no es favorito, se guarda en favoritos y se actualiza el estado
    }
    queryClient.invalidateQueries("FAVORITOS_HOOK_KEY"); //Invalidamos la query de favoritos para que se vuelva a cargar la lista de favoritos actualizada
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

          <Pressable
            onPress={async () => {
              if (isFav) {
                await eliminarFavorito(productId);
                setIsFav(false);
              } else {
                await guardarFavorito(productId);
                setIsFav(true);
              }
            }}
            style={styles.heartButton}
          >
            <Text
              style={[
                styles.heartIcon,
                isFav ? styles.heartOn : styles.heartOff,
              ]}
            >
              {isFav ? "❤" : "♡"}
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
