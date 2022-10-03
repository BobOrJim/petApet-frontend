// @ts-nocheck
import { createContext, Dispatch, ReactNode, useContext, useEffect, useState } from "react";
import { MD3LightTheme as PaperDefaultTheme, MD3DarkTheme as PaperDarkTheme} from "react-native-paper"
import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme, Theme } from "@react-navigation/native"
import merge from "deepmerge";
import useSecureStorage from "../hooks/useSecureStorage";

interface ContextValue {
    currentTheme: Theme;
    darkmode: boolean;
    setDarkmode: Dispatch<React.SetStateAction<boolean>>
    usingCustomTheme: boolean;
    setUsingCustomTheme: Dispatch<React.SetStateAction<boolean>>
    customColors: CustomColors;
    setCustomColors: Dispatch<React.SetStateAction<CustomColors>>
}

const ThemeContext = createContext<ContextValue>({} as ContextValue);

interface CustomColors {
  card: string;
  background: string;
  surface: string;
}

interface Props {
  children: ReactNode;
}

export default function ThemeProvider({ children }: Props) {
    const [darkmode, setDarkmode] = useSecureStorage<boolean>("darkmode", false);
    const [currentTheme, setCurrentTheme] = useState<Theme>(darkmode ? StandardDarkTheme : StandardLightTheme);
    const [usingCustomTheme, setUsingCustomTheme] = useSecureStorage("usingCustomTheme", false);
    const [customColors, setCustomColors] = useSecureStorage<CustomColors>("customColors", {
      card: "#fff",
      background: "#fff",
      surface: "#fff"
    });
    
    useEffect(() => {
        if(!usingCustomTheme){
          setCurrentTheme(darkmode ? StandardDarkTheme : StandardLightTheme)
      }
    }, [darkmode, usingCustomTheme])

    useEffect(() => {
      if(customColors !== undefined) {
        setCurrentTheme(prevState => ({
              ...prevState,
              colors: {
                  ...prevState.colors,
                  background: customColors.background !== undefined ? customColors.background : prevState.colors.background,
                  surface: customColors.surface !== undefined ? customColors.surface : prevState.colors.surface,
                  card: customColors.card !== undefined ? customColors.card : prevState.colors.card
              }
        }))
      }
    }, [customColors])

  return (
    <ThemeContext.Provider
      value={{ currentTheme, darkmode, setDarkmode, customColors, setCustomColors, usingCustomTheme, setUsingCustomTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

const StandardDarkTheme: Theme = merge(PaperDarkTheme, NavigationDarkTheme);

const StandardLightTheme: Theme = merge(PaperDefaultTheme, NavigationDefaultTheme);
