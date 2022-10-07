import AdvertProvider from "./contexts/AdvertContext";
import ThemeProvider from "./contexts/ThemeContext";
import UserProvider from "./contexts/UserContext";
import NavigationContainerContainer from "./components/NavigationContainerContainer";

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AdvertProvider>
          <NavigationContainerContainer />
        </AdvertProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
