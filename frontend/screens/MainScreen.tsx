import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../NavigationContainerContainer";
import { useAdverts } from "../contexts/AdvertContext";
import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import AdvertListItem from "../components/AdvertComponents/AdvertListItem";
import AdvertSearchfilters from "../components/AdvertComponents/AdvertSearchfilters";
import { FAB } from "react-native-paper";
import { useUserContext } from "../contexts/UserContext";

export type SearchParams = {
  searchAll: string;
};

type Props = NativeStackScreenProps<RootStackParamList, "Main">;

export default function MainScreen({ navigation }: Props) {
  const [refreshing] = useState(false);
  const [searchFilters, setSearchfilters] = useState<SearchParams>({ searchAll: "" });
  const { adverts, getAllAdverts } = useAdverts();
  const { user } = useUserContext();

  useEffect(() => {
    getAllAdverts();
  }, [adverts]);

  return (
    <>
      <FlashList
        ListHeaderComponent={
          <AdvertSearchfilters searchFilters={searchFilters} setSearchfilters={setSearchfilters} />
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
      {user && (
        <FAB
          size='small'
          icon='plus'
          style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
          onPress={() => navigation.navigate("AddAdvert")}
        />
      )}
    </>
  );
}
