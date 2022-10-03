import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";
import {Provider as PaperProvider, useTheme as getColors, Text}  from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import MainScreen from "./screens/MainScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import UserScreen from "./screens/UserScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AdvertDetailsScreen from "./screens/AdvertDetailsScreen";
import AddAdvertScreen from "./screens/AddAdvertScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "./contexts/ThemeContext";
import { useUserContext } from "./contexts/UserContext";

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
export default function NavigationContainerContainer() {
      const { currentTheme, darkmode } = useTheme();
      const { user } = useUserContext();
    return (
        <PaperProvider theme={currentTheme}>
              <SafeAreaProvider>
                <NavigationContainer theme={currentTheme}>
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
                        headerRight: (props) => (
                          <Ionicons {...props} name={"person"} onPress={() => navigation.navigate(user ? "User" : "SignIn")} color={darkmode ? "white" : "black"}/>
                          ),
                        })}
                        />
                    <NativeStack.Screen
                      name='User'
                      component={UserScreen}
                      options={({ navigation }) => ({
                        headerRight: (props) => (
                          <Ionicons {...props} name={"cog"} onPress={() => navigation.navigate("Settings")} color={darkmode ? "white" : "black"}/>
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
                  <StatusBar style={darkmode ? "light" : "dark"} />
                </NavigationContainer>
              </SafeAreaProvider>
            </PaperProvider>
    )
}