import { categorias } from "@/src/data/categorias";
import { etiquetas } from "@/src/data/etiquetas";
import { marcas } from "@/src/data/marcas";
import { AppRoute, buildRoute, ROUTES } from "@/src/navigation/routes";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import "react-native-reanimated";

type ListItem = {
  id: string;
  nombre: string;
};

export default function IndexScreen() {
  const router = useRouter();
  const [brokenLogos, setBrokenLogos] = useState<Record<string, boolean>>({});

  const navigateTo = (route: AppRoute, item: ListItem) => {
    router.push(buildRoute(route, { nombre: item.id }));
  };

  const obtenerInicialesMarca = (name: string) =>
    name
      .split(/\s+|-/) //Esto divide el nombre por espacios o guiones
      .filter(Boolean) //Borrar espacios (vacío)
      .slice(0, 2) //Tomar las primeras dos partes
      .map((part) => part[0]?.toUpperCase() ?? "") //Tomar la primera letra de cada parte y convertirla a mayúscula
      .join("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.sectionBlock}>
        <Text style={styles.listTitle}>Categorías</Text>
        <View style={styles.gridContainer}>
          {categorias.map((categoria) => (
            <Pressable
              key={categoria.id}
              onPress={() => navigateTo(ROUTES.CATEGORIA, categoria)}
              style={styles.squareCard}
            >
              <LinearGradient
                colors={categoria.colors}
                style={styles.gradientCard}
              >
                <Text style={styles.emoji}>{categoria.emoji}</Text>
                <Text style={styles.squareText}>{categoria.nombre}</Text>
              </LinearGradient>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.sectionBlock}>
        <Text style={styles.listTitle}>Marcas</Text>
        <View style={styles.gridContainer}>
          {marcas.map((marca) => (
            <Pressable
              key={marca.id}
              onPress={() => navigateTo(ROUTES.MARCA, marca)}
              style={styles.squareCard}
            >
              <LinearGradient colors={marca.colors} style={styles.gradientCard}>
                <View style={styles.logoCircle}>
                  {brokenLogos[marca.id] ? (
                    <Text style={styles.brandFallbackText}>
                      {obtenerInicialesMarca(marca.nombre)}
                    </Text>
                  ) : (
                    <Image
                      source={{ uri: marca.logo }}
                      style={styles.brandLogo}
                      contentFit="contain"
                      onError={() =>
                        setBrokenLogos((prev) => ({
                          ...prev,
                          [marca.id]: true,
                        }))
                      }
                    />
                  )}
                </View>
                <Text style={styles.squareText}>{marca.nombre}</Text>
              </LinearGradient>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.sectionBlock}>
        <Text style={styles.listTitle}>Etiquetas</Text>
        <View style={styles.itemsContainer}>
          {etiquetas.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => navigateTo(ROUTES.ETIQUETA, item)}
              style={styles.itemButton}
            >
              <Text style={styles.itemText}>{item.nombre}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 26,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  sectionBlock: {
    width: "100%",
    maxWidth: 420,
    gap: 12,
    alignSelf: "center",
  },
  listTitle: {
    fontSize: 26,
    fontWeight: "700",
  },
  gridContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  squareCard: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 18,
    overflow: "hidden",
  },
  gradientCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    gap: 10,
  },
  emoji: {
    fontSize: 36,
  },
  squareText: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  brandLogo: {
    width: "100%",
    height: "100%",
  },
  brandFallbackText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#334155",
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  itemButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#dbeafe",
    borderWidth: 1,
    borderColor: "#60a5fa",
    borderRadius: 999,
  },
  itemText: {
    fontSize: 16,
    color: "#1e3a8a",
  },
});
