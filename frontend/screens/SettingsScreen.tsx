import { Text } from "react-native";
export default function MainScreen() {
  return (
    <>
      <Text style={{ color: "#6a8a35", fontSize: 20 }}>// Settings här</Text>
      <Text style={{ color: "#6a8a35", fontSize: 20 }}>
        // Typ darkmode/lightmode eller mer custom{" "}
      </Text>
      <Text style={{ color: "#6a8a35", fontSize: 20 }}>
        // att man får välja egna primary/secondary&tertiary colors
      </Text>
      <Text style={{ color: "#6a8a35", fontSize: 20 }}>
        // antingen om denna bara är app inställningar eller om man{" "}
      </Text>
      <Text style={{ color: "#6a8a35", fontSize: 20 }}>
        // även ska ändra ens konto saker här med, typ mail och telefonnummer osv
      </Text>
    </>
  );
}
