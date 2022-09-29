import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useAdverts } from "../contexts/AdvertContext";
import { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import AdvertListItem from "../components/AdvertComponents/AdvertListItem";
import AdvertSearchfilters from "../components/AdvertComponents/AdvertSearchfilters";

export type SearchParams = {
  searchAll: string;
};

type Props = NativeStackScreenProps<RootStackParamList, "Main">;

export default function MainScreen({ navigation }: Props) {
  const [refreshing] = useState(false);
  const [searchFilters, setSearchfilters] = useState<SearchParams>({ searchAll: "" });
  const { adverts, getAllAdverts } = useAdverts();
  return (
    <FlashList
      ListHeaderComponent={
        <AdvertSearchfilters
          navigation={navigation}
          searchFilters={searchFilters}
          setSearchfilters={setSearchfilters}
        />
      }
      contentContainerStyle={{ paddingTop: 10 }}
      onRefresh={getAllAdverts}
      refreshing={refreshing}
      data={adverts.filter((advert) => {
        for (const value of Object.values(advert)) {
          if (
            (typeof value === "string" &&
              value.toLowerCase().includes(searchFilters.searchAll.toLowerCase())) ||
            (typeof value === "number" && value === Number(searchFilters.searchAll))
          ) {
            return true;
          }
        }
      })}
      estimatedItemSize={100}
      renderItem={({ item }) => <AdvertListItem advert={item} navigation={navigation} />}
    />
  );
}
