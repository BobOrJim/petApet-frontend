import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Advert, AdvertDto } from "../models/Advert";

interface ContextValue {
  adverts: Advert[];
  getAllAdverts: () => void;
  getAdvertById:(id: string) => Promise<Advert>;
  addAdvert: (advert: AdvertDto) => void; // boolean på dessa? kommer dock bli ett promise
  removeAdvert: (id: string) => void; // boolean på dessa? kommer dock bli ett promise
  replaceAdvert: (id: string, product: AdvertDto) => void; // boolean på dessa? kommer dock bli ett promise
}

const AdvertContext = createContext<ContextValue>({} as ContextValue)

interface Props {
    children: ReactNode;
}

export default function AdvertProvider({ children }: Props) {
    const [adverts, setAdverts] = useState<Advert[]>([]);

    // Ska senare ligga i någon config fil
    const baseUrl = "https://puppy-backend.azurewebsites.net/api/V01/"; 

    useEffect(() => {
        getAllAdverts();
    }, [])

    function addAdvert(advert: AdvertDto) {
        if (advert.userId === undefined) {
            advert.userId = "9cfdf585-9021-4032-1402-08da9e5deb4b";
        } 
        fetch(baseUrl + "Advert/AddAdvert", {
            method: "POST",
            headers: { 
                "content-type": "application/json",
            },
            body: JSON.stringify(advert)
        })

    }

    function getAllAdverts() {
        fetch(baseUrl + "Advert/GetAllAdverts")
            .then(res => res.json())
            .then(data => setAdverts(data))
            .catch(err => console.error(err))
    
    }

    function getAdvertById(id: string): Promise<Advert> { 
        return fetch(baseUrl + "Advert/GetAdvertById/" + id)
            .then(res => res.json())
            .catch(err => console.error(err))
    }

    function removeAdvert(id: string) {
        fetch(baseUrl + "Advert/DeleteAdvertById/" + id, {
            method: "DELETE"
        })
    }

    function replaceAdvert(id: string, advert: AdvertDto) {
        fetch(baseUrl + "Advert/UpdateAdvertById/" + id, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(advert)
        });

    }



    return (
        <AdvertContext.Provider
            value={{ adverts, addAdvert, getAllAdverts, getAdvertById, removeAdvert, replaceAdvert }}
        >
            {children}
        </AdvertContext.Provider>
    )
} 

export function useAdverts() {
  return useContext(AdvertContext);
}
