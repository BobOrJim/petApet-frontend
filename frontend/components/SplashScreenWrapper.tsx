import { ReactNode, useEffect, useState } from "react";
import { useAdverts } from "../contexts/AdvertContext";
import { View, Image } from "react-native";
import { MD3Colors, ProgressBar } from "react-native-paper";

interface Props {
    children: ReactNode;
}

export default function SplashScreenWrapper({ children }: Props) {
  const [appIsReady, setAppIsReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0)
  const { getAllAdverts } = useAdverts();

  useEffect(() => {
    (async function prepare() {
      try {
        getAllAdverts();

        for(let i = 0; i < 10; i++) {
          await new Promise(resolve => setTimeout(resolve, 50))
            .then(() => setLoadingProgress(prevState => prevState + 0.1));
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    })();
  }, []);

  if (!appIsReady) {
    return (
      <View style={{justifyContent: "center", alignItems: "center", height: "100%"}}>
        <Image 
          source={{ uri: "http://clipart-library.com/images_k/dog-png-transparent/dog-png-transparent-4.png"}} 
          style={{ width: "100%", height: 200 }} 
        />
        <ProgressBar 
          style={{height: 10, width: 370, marginTop: 10, borderRadius: 10 }} 
          progress={loadingProgress} 
          color={MD3Colors.error50} 
        />
      </View>
    )
  }

  return (
    <>
        {children}
    </>
  );
}
