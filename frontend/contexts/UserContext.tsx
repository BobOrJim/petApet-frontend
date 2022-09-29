import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { SignInDto, SignUpDto, TokenType, SignUpResponse, User } from "../models/User";
import axios from "axios";
import { Advert } from "../models/Advert";

interface Props {
  children: ReactNode;
}

interface IUserContext {
  signIn: (signInDto: SignInDto) => void;
  signUp: (SignUpDto: SignUpDto) => void;
  getUser: () => User | undefined;
  updateUser: (userToUpdate: User) => Promise<void>;
}
const UserContext = createContext<IUserContext>({} as IUserContext);
export const useUserContext = (): IUserContext => useContext(UserContext);
const baseUrl = "https://puppy-backend.azurewebsites.net/api/V01/";

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User>({} as User);

  function signIn(signInDto: SignInDto) {
    (async () => {
      const data: any = await PostSignIn(signInDto);
      const token: TokenType = data;
      //Login sussessfull. Try to build User entity.
      if (token.token !== "") {
        try {
          //Step 1/4. Build props from the login data (User input)
          const tokenInstance: TokenType = JSON.parse(JSON.stringify(token));
          user.username = signInDto.username;
          user.password = signInDto.password;
          //Step 2/4. Build props from the token (generated in AuthController)
          user.token = tokenInstance.token;
          user.expiration = tokenInstance.expiration;
          user.authId = tokenInstance.authUserId;
          user.id = tokenInstance.userId;
          //Step 3/4. Build props from UserController (from puppyDb, User table)
          let [data, status] = await GetUserById(user.id, user.token);
          if (status == 200) {
            const userInstance: User = JSON.parse(JSON.stringify(data));
            user.alias = userInstance.alias;
            user.phoneNr = userInstance.phoneNr;
            user.isLoggedIn = true;
            user.profilePictureUrl = userInstance.profilePictureUrl;
          } else {
            throw new Error("GetUserById enpoint reply was not 200");
          }
          //Step 4/4. Build props from UserController (from puppyDb, Advert table)
          [data, status] = await GetAdvertsByUserId(user.id, user.token);
          if (status == 200) {
            const adverts = JSON.parse(JSON.stringify(data));
            user.adverts = adverts;
          } else {
            throw new Error("GetAdvertsByUserId enpoint reply was not 200");
          }
          //console.log(user);
          setUser(user);
        } catch (error) {
          console.log("Error in signIn: ", error);
        }
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

  function getUser(): User | undefined {
    if (user.isLoggedIn) return user;
    return undefined;
  }

  async function updateUser(userToUpdate: User) {
    if (userToUpdate.isLoggedIn) {
      try {
        //Behöver user uppdateras
        if (false) await PatchUser(userToUpdate, userToUpdate.token);
        userToUpdate.adverts.forEach(async (advert) => {
          //filtrera om advert skall till
          if (false) await PostAdvert(advert, userToUpdate.token);
          if (false) await PutAdvert(advert, userToUpdate.token);
          if (false) await DeleteAdvert(advert.id, userToUpdate.token);
        });
      } catch (error) {
        console.log("Error in updateUser: ", error);
      }
    }
  }

  return (
    <UserContext.Provider value={{ signIn, signUp, getUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

const PostSignIn = async (signInDto: SignInDto): Promise<any> => {
  try {
    const { data, status } = await axios.post(baseUrl + "Authenticate/login", signInDto, {
      headers: {
        Accept: "application/json",
      },
    });
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

const PostSignUp = async (signUpDto: SignUpDto): Promise<any> => {
  try {
    const { data, status } = await axios.post(baseUrl + "Authenticate/register", signUpDto, {
      headers: {
        Accept: "application/json",
      },
    });
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

const GetUserById = async (userId: string, token: string): Promise<any> => {
  try {
    const { data, status } = await axios.get(baseUrl + "User/GetUserById/" + userId, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return [data, status];
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

const GetAdvertsByUserId = async (userId: string, token: string): Promise<any> => {
  try {
    const { data, status } = await axios.get(baseUrl + "Advert/GetAdvertsByUserId/" + userId, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return [data, status];
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

const PatchUser = async (user: User, token: string): Promise<any> => {
  try {
    const { data, status } = await axios.patch(baseUrl + "User/UpdateUser/" + user.id, user, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return [data, status];
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

const PostAdvert = async (advert: Advert, token: string): Promise<any> => {
  try {
    const { data, status } = await axios.post(baseUrl + "AddAdvert", advert, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return [data, status];
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

const PutAdvert = async (advert: Advert, token: string): Promise<any> => {
  try {
    const { data, status } = await axios.put(baseUrl + "UpdateAdvert/" + advert.id, advert, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return [data, status];
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

const DeleteAdvert = async (advertId: string, token: string): Promise<any> => {
  try {
    const { data, status } = await axios.delete(baseUrl + "DeleteAdvert/" + advertId, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return [data, status];
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
