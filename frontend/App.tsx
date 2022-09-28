import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AdvertProvider from "./contexts/AdvertContext";
import UserProvider from "./contexts/UserContext";
import MainScreen from "./screens/MainScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import UserScreen from "./screens/UserScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AdvertDetailsScreen from "./screens/AdvertDetailsScreen";
import AddAdvertScreen from "./screens/AddAdvertScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

export type RootStackParamList = {
  Main: undefined;
  User: undefined;
  SignIn: undefined;
  SignUp: undefined;
  AddAdvert: undefined;
  Settings: undefined;
  AdvertDetails: { advertId: string };
};

const NativeStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <UserProvider>
      <AdvertProvider>
        <SafeAreaProvider>
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
              <NativeStack.Screen name='AddAdvert' component={AddAdvertScreen} />
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
        </SafeAreaProvider>
      </AdvertProvider>
    </UserProvider>
  );
}
