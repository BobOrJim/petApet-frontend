import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, Text } from "react-native";
import AdvertProvider from "./contexts/AdvertContext";
import MainScreen from "./screens/MainScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import UserScreen from "./screens/UserScreen";

export type RootStackParamList = {
  Main: undefined;
  User: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

const NativeStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
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
                  <Text>👩</Text>
                </Pressable>
              ),
            })}
          />
          <NativeStack.Screen name='User' component={UserScreen} />
          <NativeStack.Screen name='SignIn' component={SignInScreen} />
          <NativeStack.Screen name='SignUp' component={SignUpScreen} />
        </NativeStack.Navigator>
      </NavigationContainer>
    </AdvertProvider>
  );
}
