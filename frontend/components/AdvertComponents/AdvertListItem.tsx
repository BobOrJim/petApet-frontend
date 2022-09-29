import { StyleSheet } from "react-native";
import { Card, Title, Paragraph, IconButton } from "react-native-paper";
import { Advert } from "../../models/Advert";
import { useState } from "react";
import StarRating from "./StarRating";

interface Props {
  advert: Advert;
  navigation: any;
}
export default function AdvertListItem({ advert, navigation }: Props) {
  const [liked, setLiked] = useState(false);

  return (
    <Card
      elevation={5}
      style={styles.centered}
      onPress={() => navigation.navigate("AdvertDetails", { advertId: advert.id })}
    >
      <Card.Title
        title=''
        left={(props) => <StarRating {...props} grade={advert.grade} />}
        right={(props) => (
          <IconButton
            {...props}
            iconColor={liked ? "red" : "#49454f"}
            icon={liked ? "heart" : "heart-outline"}
            onPress={() => setLiked((prevState) => !prevState)}
          />
        )}
      />
      <Card.Cover source={{ uri: advert.imageUrls }} />
      <Card.Content>
        <Title>{advert.name}</Title>
        <Paragraph>{advert.personallity}</Paragraph>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  centered: {
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
  },
});
