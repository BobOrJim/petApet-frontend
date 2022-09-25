import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Advert, AdvertDto } from "../models/Advert";
// import { useUser } from "./UserContext";

interface ContextValue {
  adverts: Advert[];
  getAdvertById:(id: string) => Promise<Advert>;
//   addAdvert: (advert: AdvertDto) => void; // boolean på dessa? kommer dock bli ett promise
//   removeAdvert: (id: string) => void; // boolean på dessa? kommer dock bli ett promise
//   replaceAdvert: (product: Advert) => void; // boolean på dessa? kommer dock bli ett promise
}

const AdvertContext = createContext<ContextValue>({} as ContextValue)

interface Props {
    children: ReactNode;
}

export default function AdvertProvider({ children }: Props) {
    const [adverts, setAdverts] = useState<Advert[]>([]);
    // const { user } = useUser();

    // Ska senare ligga i någon config fil
    const baseUrl = "https://puppy-backend.azurewebsites.net/api/V01/"; 

    useEffect(() => {
        getAllAdverts();
    }, [])

    // function addAdvert(advert: AdvertDto) {
    //     if(user) {
    //         fetch(baseUrl + "Advert/AddAdvert", {
    //             method: "POST",
    //             headers: { 
    //                 "authorization": "token " + user.token,
    //                 "content-type": "application/json",
    //             },
    //             body: JSON.stringify(advert)
    //         })
    //             .then(res => res.json())
    //             .then(data => setAdverts(prevState => ([...prevState, data])))
    //             .catch(err => console.error(err));
    // }

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

    // function removeAdvert(id: string) {
    //     if(user) {
    //         fetch(baseUrl + "Advert/DeleteAdvertByIdAsync/" + id)
    //     }
    // }

    // function replaceAdvert(advert: Advert) {
    //     if(user) {
    //         fetch(baseUrl + "Advert/UpdateAdvertById/" + advert.id, {
    //             method: "PATCH",
    //             headers: {
    //                 "content-type": "application/json"
    //             },
    //             body: JSON.stringify(advert)
    //         });
    //     }
    // }



    return (
        <AdvertContext.Provider
            value={{ adverts, getAdvertById }}
        >
            {children}
        </AdvertContext.Provider>
    )
} 

export function useAdverts() {
  return useContext(AdvertContext);
}
