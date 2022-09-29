import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";

interface Props {
  grade: number;
  size: number;
}
export default function StarRating({ grade, size }: Props) {
  return (
    <View style={{ flexDirection: "row" }}>
      {[...Array(5)].map((_, count) => {
        count++;
        return (
          <Ionicons
            key={count}
            name={count > grade ? "star-outline" : "star"}
            size={Math.floor(size / 2.5)}
            color='gold'
          />
        );
      })}
    </View>
  );
}
