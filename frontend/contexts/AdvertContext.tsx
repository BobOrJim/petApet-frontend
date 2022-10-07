import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Advert, AdvertDto } from "../models/Advert";
import { useUserContext } from "./UserContext";

interface ContextValue {
  adverts: Advert[];
  getAllAdverts: () => Promise<boolean>;
  getAdvertById: (id: string) => Promise<Advert>;
  addAdvert: (advert: AdvertDto) => Promise<boolean>; // boolean på dessa? kommer dock bli ett promise
  removeAdvert: (id: string) => Promise<boolean>; // boolean på dessa? kommer dock bli ett promise
  replaceAdvert: (advert: Advert) => Promise<boolean>; // boolean på dessa? kommer dock bli ett promise
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

  async function addAdvert(advert: AdvertDto): Promise<boolean> {
    if (user) {
      try {
        const response = await fetch(baseUrl + "Advert/AddAdvert", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "Bearer " + user.token,
          },
          body: JSON.stringify({ ...advert, userId: user.id }),
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        } else {
          return true;
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    }
    return false;
  }

  async function getAllAdverts(): Promise<boolean> {
    try {
      const response = await fetch(baseUrl + "Advert/GetAllAdverts");
      if(response.ok) {
        setAdverts(await response.json())
        return true
      } else {
        throw new Error(response.statusText);
      }
    } catch(err) {
      console.log(err);
      return false;
    }
  }

  function getAdvertById(id: string): Promise<Advert> {
    return fetch(baseUrl + "Advert/GetAdvertById/" + id)
      .then((res) => res.json())
      .catch((err) => console.error(err));
  }

  async function removeAdvert(id: string): Promise<boolean> {
    if (user) {
      try {
        const response = await fetch(baseUrl + "Advert/DeleteAdvertById/" + id, {
          method: "DELETE",
          headers: {
            authorization: "Bearer " + user.token,
          },
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        } else {
          return true;
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    }
    return false;
  }

  async function replaceAdvert(advert: Advert): Promise<boolean> {
    if (user) {
      try {
        const response = await fetch(baseUrl + "Advert/UpdateAdvert/" + advert.id, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: "Bearer " + user.token,
          },
          body: JSON.stringify(advert),
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        } else {
          return true;
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    }
    return false;
  }

  function getNextAdvert(id: string): string {
    const index = adverts.findIndex((a) => a.id === id);
    if (adverts[index - 1]) {
      return adverts[index - 1].id;
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
