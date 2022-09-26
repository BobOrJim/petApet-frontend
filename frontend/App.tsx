import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AdvertProvider from "./contexts/AdvertContext";
import MainScreen from "./screens/MainScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import UserScreen from "./screens/UserScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AdvertDetailsScreen from "./screens/AdvertDetailsScreen";

export type RootStackParamList = {
  Main: undefined;
  User: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Settings: undefined;
  AdvertDetails: { advertId: string };
};

const NativeStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  return (
    <AdvertProvider>
      <NavigationContainer>
        <NativeStack.Navigator initialRouteName='Main'>
          <NativeStack.Screen
            name='Main'
            component={MainScreen}
            options={({ navigation }) => ({
              headerLeft: () => (
                <Pressable onPress={() => navigation.navigate("SignIn")}>
                  <Text>SignIn</Text>
                </Pressable>
              ),
              headerRight: () => (
                <Pressable onPress={() => navigation.navigate("User")}>
                  <Ionicons name={"person"} size={17} />
                </Pressable>
              ),
            })}
          />
          <NativeStack.Screen
            name='User'
            component={UserScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <Pressable onPress={() => navigation.navigate("Settings")}>
                  <Ionicons name={"cog"} size={17} />
                </Pressable>
              ),
            })}
          />
          <NativeStack.Screen name='Settings' component={SettingsScreen} />
          <NativeStack.Screen name='SignIn' component={SignInScreen} />
          <NativeStack.Screen name='SignUp' component={SignUpScreen} />
          <NativeStack.Screen
            name='AdvertDetails'
            component={AdvertDetailsScreen}
            options={({ navigation }) => ({
              animation: "slide_from_right",
              headerTitle: () => (
                <Pressable onPress={() => navigation.navigate("Main")}>
                  <Text>Main</Text>
                </Pressable>
              ),
            })}
          />
        </NativeStack.Navigator>
      </NavigationContainer>
    </AdvertProvider>
  );
}
