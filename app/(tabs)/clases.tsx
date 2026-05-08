import { buildRoute, fichaShowRoute, ROUTES } from "@/src/navigation/routes";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ClasesTabScreen() {
    const router = useRouter(); //Esto sirve para navegar entre pantallas dentro de la aplicación. El hook useRouter proporciona métodos para cambiar de pantalla, como router.push() para navegar a una nueva pantalla o router.back() para volver a la pantalla anterior.

    const navToAlimento = () => {
        router.push (buildRoute(ROUTES.ALIMENTO)); //Esto navega a la pantalla de alimento utilizando la función buildRoute para construir la ruta correspondiente.
    };

    return (
        <View style={styles.container}>
          <View style={styles.quickActions}>
            <Pressable 
                onPress = {navToAlimento}
                style={[styles.card, styles.greenCard]}
            >
                <Text style={styles.cardText}>Ruta no existe</Text>
            </Pressable>
            <Pressable
                onPress={() => router.push(fichaShowRoute(123))}
                style={[styles.card, styles.blueCard]}
            >
                <Text style={styles.cardText}>
                    <AntDesign name="file-done" size={24} color="black" /> 
                    {`Ficha de alimento con ID 123`}
                </Text>
            </Pressable>            
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        backgroundColor: "lightgray",
    },
    quickActions: {
        width: "100%",
        alignItems: "center",
        gap: 10,
    },
    card: {
        width: "100%",
        minHeight: 90,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
    },
    greenCard: {
        backgroundColor: "green",
    },
    blueCard: {
        backgroundColor: "blue",
    },
    cardText: {
        fontSize: 24,
        fontWeight: "700", //Font weight lo que hace es aumentar el grosor del texto, en este caso a 700, lo que lo hace más grueso y destacado.
    }
})