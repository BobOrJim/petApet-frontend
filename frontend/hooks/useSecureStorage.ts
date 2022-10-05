import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export default function useSecureStorage<T>(key: string, initialState?: T) {
  const [value, setValue] = useState<T>();
  useEffect(() => {
    initilizeState();
  }, []);

  async function initilizeState() {
    const result = await SecureStore.getItemAsync(key);
    if (result) {
      setValue(JSON.parse(result));
    } else if (initialState) {
      setValue(initialState);
    }
  }

  useEffect(() => {
    if (value !== undefined) {
      SecureStore.setItemAsync(key, JSON.stringify(value)).catch((err) => console.log(err));
    }
  }, [value]);

  return [value, setValue] as const;
}
