import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, Text } from "react-native";
import AdvertProvider from "./contexts/AdvertContext";
import MainScreen from "./screens/MainScreen";
import UserScreen from "./screens/UserScreen";

export type RootStackParamList = {
  Main: undefined;
  User: undefined;
};

const NativeStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AdvertProvider>
      <NavigationContainer>
        <NativeStack.Navigator
          initialRouteName='Main'
        >
          <NativeStack.Screen
              name="Main"
              component={MainScreen}
              options={({ navigation }) => ({
                headerRight: () => (
                  <Pressable
                    onPress={() => navigation.navigate("User")}
                  ><Text>👩</Text></Pressable>
                )
              })}
            />
          <NativeStack.Screen name='User' component={UserScreen} />
        </NativeStack.Navigator>
      </NavigationContainer>
    </AdvertProvider>
  );
}
