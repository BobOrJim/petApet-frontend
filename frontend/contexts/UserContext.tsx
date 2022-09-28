/*

1: Skapa två nya lokala db (IdentityDb + puppyDb)
2: Gör ny endpoint getAdvertsByUserId. Uppdatera båda *.rest filer
3: I backend skall Adverts bort i User
4: Lägg till AuthId:String i User i backend
5: AuthRegister+AuthLogin endpointen, skall skapa en ny User (om user saknas).
6: Lägg in UserId tillsammans med AuthId i token, och snygga till namnen i token.
7: Använd GetUserById för att bygga klart en User entitet. Bygg klart getUser i UserContext
8: Gör klart updateUser i UserContext
9: Ändra connection string för nya db, seeda med snygg data och deploya.

*/

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { UserDto, SignInDto, SignUpDto, TokenType, SignUpResponse } from "../models/User";
import axios from "axios";

interface Props {
  children: ReactNode;
}

interface IUserContext {
  signIn: (signInDto: SignInDto) => void; //ändra till signInDto med import
  signUp: (SignUpDto: SignUpDto) => void; //ädnra till signUpDto
  getUser: () => void;
  updateUser: () => void;
}
const UserContext = createContext<IUserContext>({} as IUserContext);
export const useUserContext = (): IUserContext => useContext(UserContext);
const baseUrl = "https://puppy-backend.azurewebsites.net/api/V01/";

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<UserDto | null>(null);

  function signIn(signInDto: SignInDto) {
    (async () => {
      const token = await PostSignIn(signInDto);
      if (token) {
        const tokenInstance: TokenType = JSON.parse(JSON.stringify(token));
        console.log("tokenInstance.text= " + tokenInstance.token);
        console.log("tokenInstance.expiration= " + tokenInstance.expiration);
        console.log("tokenInstance.user= " + tokenInstance.user);
      }
    })();
  }

  function signUp(signUpDto: SignUpDto) {
    (async () => {
      const response = await PostSignUp(signUpDto);
      if (response) {
        const signUpResponse: SignUpResponse = JSON.parse(JSON.stringify(response));
        console.log("signUpResponse.status= " + signUpResponse.status);
        console.log("signUpResponse.status= " + signUpResponse.message);
      }
    })();
  }

  function getUser() {
    //Not implemented yet
    //Will use atleast 2 endpoints.
    console.log("getUser");
  }

  function updateUser() {
    //Not implemented yet
    console.log("updateUser");
  }

  return (
    <UserContext.Provider value={{ signIn, signUp, getUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

const PostSignIn = async (signInDto: SignInDto): Promise<null | SignInDto> => {
  try {
    const { data, status } = await axios.post<SignInDto>(
      baseUrl + "Authenticate/login",
      signInDto,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
    console.log("PostSignIn status is: ", status);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error : ", error.message);
      return null;
    } else {
      console.log("unexpected error: ", error);
      return null;
    }
  }
};

const PostSignUp = async (signUpDto: SignUpDto): Promise<null | SignUpDto> => {
  try {
    const { data, status } = await axios.post<SignUpDto>(
      baseUrl + "Authenticate/register",
      signUpDto,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
    console.log("PostSignUp status is: ", status);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error : ", error.message);
      return null;
    } else {
      console.log("unexpected error: ", error);
      return null;
    }
  }
};
