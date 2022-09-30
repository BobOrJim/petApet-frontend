import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Advert, AdvertDto } from "../models/Advert";
import { HttpRespons } from "../models/HttpTypes";
import { useUserContext } from "./UserContext";

interface ContextValue {
  adverts: Advert[];
  getAllAdverts: () => void;
  getAdvertById: (id: string) => Promise<Advert>;
  addAdvert: (advert: AdvertDto) => void; // boolean på dessa? kommer dock bli ett promise
  removeAdvert: (id: string) => void; // boolean på dessa? kommer dock bli ett promise
  replaceAdvert: (id: string, product: AdvertDto) => void; // boolean på dessa? kommer dock bli ett promise
  getNextAdvert: (id: string) => string;
}

const AdvertContext = createContext<ContextValue>({} as ContextValue);

interface Props {
  children: ReactNode;
}

export default function AdvertProvider({ children }: Props) {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const { user } = useUserContext();
  // Ska senare ligga i någon config fil
  const baseUrl = "https://puppy-backend.azurewebsites.net/api/V01/";

  useEffect(() => {
    getAllAdverts();
  }, []);

  async function addAdvert(advert: AdvertDto) {
    if(user) {
      const response = await fetch(baseUrl + "Advert/AddAdvert", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "authorization": "Bearer " + user.token
        },
        body: JSON.stringify({...advert, userId: user.id}),
      });
  
      return response.ok;
      
    }
  }

  function getAllAdverts() {
    fetch(baseUrl + "Advert/GetAllAdverts")
      .then((res) => res.json())
      .then((data) => setAdverts(data))
      .catch((err) => console.error(err));
  }

  function getAdvertById(id: string): Promise<Advert> {
    return fetch(baseUrl + "Advert/GetAdvertById/" + id)
      .then((res) => res.json())
      .catch((err) => console.error(err));
  }

  async function removeAdvert(id: string) {
    let response;
    if(user) {
      response = await fetch(baseUrl + "Advert/DeleteAdvertById/" + id, {
        method: "DELETE",
        headers: {
          "authorization": "Bearer " + user.token
        }
      });
    }

    return response?.ok ? true : false;
  }

  async function replaceAdvert(id: string, advert: AdvertDto) {
    let response;
    if(user) {
      response = await fetch(baseUrl + "Advert/UpdateAdvertById/" + id, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "authorization": "Bearer " + user.token
        },
        body: JSON.stringify(advert),
      });

    }

    return response?.ok ? true : false;
  }

  function getNextAdvert(id: string): string {
    const index = adverts.findIndex((a) => a.id === id);
    if (adverts[index + 1]) {
      return adverts[index + 1].id;
    }

    return "";
  }

  return (
    <AdvertContext.Provider
      value={{
        adverts,
        addAdvert,
        getAllAdverts,
        getAdvertById,
        removeAdvert,
        replaceAdvert,
        getNextAdvert,
      }}
    >
      {children}
    </AdvertContext.Provider>
  );
}

export function useAdverts() {
  return useContext(AdvertContext);
}
