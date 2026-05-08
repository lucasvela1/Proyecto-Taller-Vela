import { categorias } from "@/src/data/categorias";
import { etiquetas } from "@/src/data/etiquetas";
import { marcas } from "@/src/data/marcas";
import { buildRoute, AppRoute, ROUTES } from "@/src/navigation/routes";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import "react-native-reanimated";

export default function IndexScreen(){
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SeccionList
        title="Categorías"
        items={categorias}
        route={ROUTES.CATEGORIA}
      />
      <SeccionList title="Marcas" items={marcas} route={ROUTES.MARCA} />
      <SeccionList 
        title="Etiquetas"
        items={etiquetas}
        route={ROUTES.ETIQUETA}
      />
    </ScrollView>
  );
}


type ListItem = {
  id: string;
  nombre: string;
};

type SectionListProps = {
  title: string;
  items: ListItem[];
  route: AppRoute;
}

const SeccionList = ({ title, items, route}: SectionListProps) => {
  const router = useRouter();

  const navToListItem = (item: ListItem) => {
    router.push(buildRoute(route, { nombre: item.id}));
  };

  return (
    <View style={styles.listBlock}>
      <Text style= {styles.listTitle}>{title}</Text>
      <View style={styles.itemsContainer}>
        {items.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => navToListItem(item)}
            style={styles.itemButton}
          >
            <Text style={styles.itemText}>{item.nombre}</Text> 
          </Pressable>
         ))}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  listBlock: {
    width: "100%",
    maxWidth: 420,
    gap: 12,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  itemButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "lightblue",
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 999,
  },
  itemText: {
    fontSize: 16,
  }
});
