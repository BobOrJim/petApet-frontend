// @ts-nocheck
import { createContext, Dispatch, ReactNode, useContext, useEffect, useState } from "react";
import { MD3LightTheme as PaperDefaultTheme, MD3DarkTheme as PaperDarkTheme} from "react-native-paper"
import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme, Theme } from "@react-navigation/native"
import merge from "deepmerge";

interface ContextValue {
    currentTheme: Theme;
    darkmode: boolean;
    setDarkMode: Dispatch<React.SetStateAction<boolean>>
    usingCustomTheme: boolean;
    setUsingCustomTheme: Dispatch<React.SetStateAction<boolean>>
    createCustomTheme: (card: string, background: string, surface: string) => void;
}

const ThemeContext = createContext<ContextValue>({} as ContextValue);

interface Props {
  children: ReactNode;
}

export default function ThemeProvider({ children }: Props) {
    const [darkmode, setDarkMode] = useState(false);
    const [usingCustomTheme, setUsingCustomTheme] = useState(false);
    const [currentTheme, setCurrentTheme] = useState<Theme>(StandardDarkTheme);

    useEffect(() => {
        setCurrentTheme(darkmode ? StandardDarkTheme : StandardLightTheme)
    }, [darkmode])

    function createCustomTheme(card: string, background: string, surface: string){     
      setCurrentTheme(prevState => ({
            ...prevState,
            background: background !== "" ? background : currentTheme.colors.background,
            surface: surface !== "" ? surface : currentTheme.colors.background,
            colors: {
                ...prevState.colors,
                background: background ? background : currentTheme.colors.background,
                surface: surface ? surface : currentTheme.colors.background,
                card: card ? card : currentTheme.colors.background
            }
      }))
    }

  return (
    <ThemeContext.Provider
      value={{ currentTheme, darkmode, setDarkMode, createCustomTheme, usingCustomTheme, setUsingCustomTheme}}
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
