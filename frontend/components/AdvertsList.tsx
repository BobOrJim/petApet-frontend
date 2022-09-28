import { ScrollView, StyleSheet, Image, View, Pressable, RefreshControl } from "react-native";
import { Surface, Text } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAdverts } from "../contexts/AdvertContext";
import { useState } from "react";

export default function AdvertList({ navigation }: any) {
  const [refreshing] = useState(false);
  const { adverts, getAllAdverts } = useAdverts();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getAllAdverts} />}
    >
      {adverts.map((advert) => (
        <Surface key={advert.id} style={styles.surface} elevation={2}>
          <Pressable
            style={styles.maxedWidth}
            onPress={() => navigation.navigate("AdvertDetails", { advertId: advert.id })}
          >
            <Surface style={styles.imageContainer} elevation={5}>
              <Image style={styles.image} source={{ uri: advert.imageUrls }} />
            </Surface>
            <View>
              <Text variant='titleMedium'>
                <Text style={styles.textFaded} variant='titleMedium'>
                  Name:
                </Text>
                {advert.name}
              </Text>
              <Text variant='titleSmall'>
                <Text style={styles.textFaded} variant='titleSmall'>
                  Rating:
                </Text>
                {[...Array(5)].map((_, count) => {
                  count++;
                  return (
                    <Ionicons
                      key={count}
                      name={count > advert.grade ? "star-outline" : "star"}
                      size={10}
                      color='gold'
                    />
                  );
                })}
              </Text>
              <Text variant='bodySmall'>
                <Text style={styles.textFaded} variant='bodySmall'>
                  Age:
                </Text>
                {advert.age}
              </Text>
            </View>
          </Pressable>
        </Surface>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  surface: {
    width: "95%",
    height: 120,
    borderRadius: 5,
    marginTop: 10,
  },
  imageContainer: {
    width: 100,
    height: "100%",
    borderRadius: 5,
    marginVertical: "auto",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  textFaded: {
    color: "#a0a0a0",
  },
  maxedWidth: {
    flexDirection: "row",
  },
});
