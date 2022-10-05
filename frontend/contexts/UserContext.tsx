import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  SignInDto,
  SignUpDto,
  TokenType,
  SignUpResponse,
  User,
  ContactDetails,
} from "../models/User";
import axios from "axios";
import { HttpRespons } from "../models/HttpTypes";

interface Props {
  children: ReactNode;
}

interface IUserContext {
  signIn: (signInDto: SignInDto) => Promise<boolean>;
  signUp: (SignUpDto: SignUpDto) => Promise<boolean>;
  updateUser: (userToUpdate: User) => Promise<boolean>;
  GetContactDetailsByUserId: (id: string) => Promise<ContactDetails>;
  DeleteLoggedInUser: () => Promise<boolean>;
  LogOutUser: () => Promise<boolean>;
  user: User | undefined;
}
const UserContext = createContext<IUserContext>({} as IUserContext);
export const useUserContext = (): IUserContext => useContext(UserContext);
const baseUrl = "https://puppy-backend.azurewebsites.net/api/V01/";

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | undefined>(undefined);

  async function signIn(signInDto: SignInDto) {
    const httpRespons_PostSignIn: HttpRespons | null = await PostSignIn(signInDto);
    try {
      if (httpRespons_PostSignIn == null || httpRespons_PostSignIn.status != 200) {
        throw new Error("Httprequest to get token failed");
      }

      //Login sussessfull. Try to build User entity.
      const userBuild: User = {} as User;
      //Step 1/3. Build props from the login data (User input)
      const tokenInstance: TokenType = JSON.parse(JSON.stringify(httpRespons_PostSignIn.data));
      userBuild.username = signInDto.username;
      userBuild.password = signInDto.password;
      //Step 2/3. Build props from the token (generated in AuthController)
      userBuild.token = tokenInstance.token;
      userBuild.expiration = tokenInstance.expiration;
      userBuild.authId = tokenInstance.authUserId;
      userBuild.id = tokenInstance.userId;
      //Step 3/3. Build props from UserController (from puppyDb, User table)
      const httpRespons_GetUserById: HttpRespons | null = await GetUserById(
        userBuild.id,
        userBuild.token,
      );
      if (httpRespons_GetUserById == null || httpRespons_GetUserById.status != 200) {
        throw new Error("Httprequest to GetUserById failed");
      }
      const userInstance: User = JSON.parse(JSON.stringify(httpRespons_GetUserById.data));
      userBuild.alias = userInstance.alias;
      userBuild.phoneNr = userInstance.phoneNr;
      userBuild.isLoggedIn = true;
      userBuild.profilePictureUrl = userInstance.profilePictureUrl;
      userBuild.email = userInstance.email;
      userBuild.contactEmail = userInstance.contactEmail;

      setUser(userBuild);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function signUp(signUpDto: SignUpDto) {
    {
      const httpRespons: HttpRespons | null = await PostSignUp(signUpDto);
      try {
        if (httpRespons == null || httpRespons.status != 200) {
          throw new Error("Httprequest to get token failed");
        }
        const signUpResponse: SignUpResponse = JSON.parse(JSON.stringify(httpRespons.data));
        console.log("signUpResponse.status= " + signUpResponse.status);
        console.log("signUpResponse.status= " + signUpResponse.message);
        return true;
      } catch (error) {
        console.log("Error in signUp: ", error);
        return false;
      }
    }
  }

  async function updateUser(userToUpdate: User): Promise<boolean> {
    if (userToUpdate) {
      try {
        const response = await PatchUser(userToUpdate, userToUpdate.token);
        if (response) {
          setUser(response);
          return true;
        }
      } catch (error) {
        console.log("Error in updateUser: ", error);
      }
    }
    return false;
  }

  async function GetContactDetailsByUserId(userId: string): Promise<ContactDetails> {
    if (user) {
      try {
        const response = await fetch(baseUrl + "User/GetUserById/" + userId, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + user.token,
          },
        });
        if (response.ok) {
          const userDetails: User = await response.json();
          return userDetails as ContactDetails;
        } else {
          throw new Error(response.statusText);
        }
      } catch (err) {
        return {} as ContactDetails;
      }
    }
    return {} as ContactDetails;
  }

  async function DeleteLoggedInUser(): Promise<boolean> {
    if (user) {
      try {
        const response = await fetch(baseUrl + "User/DeleteUserById/" + user.id, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + user.token,
          },
        });
        if (response.ok) {
          setUser(undefined);
          return true;
        } else {
          throw new Error(response.statusText);
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    }
    return false;
  }

  async function LogOutUser(): Promise<boolean> {
    if (user) {
      const response = await updateUser({ ...user, isLoggedIn: false });
      if (response) {
        setUser(undefined);
        return true;
      }
    }
    return false;
  }

  return (
    <UserContext.Provider
      value={{
        signIn,
        signUp,
        updateUser,
        user,
        GetContactDetailsByUserId,
        DeleteLoggedInUser,
        LogOutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

const PostSignIn = async (signInDto: SignInDto): Promise<HttpRespons | null> => {
  try {
    const httpRespons: HttpRespons = await axios.post(baseUrl + "Authenticate/login", signInDto, {
      headers: {
        Accept: "application/json",
      },
    });
    return httpRespons;
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

const PostSignUp = async (signUpDto: SignUpDto): Promise<HttpRespons | null> => {
  try {
    const httpRespons: HttpRespons = await axios.post(
      baseUrl + "Authenticate/register",
      signUpDto,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
    return httpRespons;
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

const GetUserById = async (userId: string, token: string): Promise<HttpRespons | null> => {
  try {
    const httpRespons: HttpRespons = await axios.get(baseUrl + "User/GetUserById/" + userId, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return httpRespons;
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

const PatchUser = async (user: User, token: string): Promise<User> => {
  try {
    const response = await axios.patch(baseUrl + "User/UpdateUser/" + user.id, user, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (response.status > 199 && response.status < 300) {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error : ", error.message);
    } else {
      console.log("unexpected error: ", error);
    }
  }
  return {} as User;
};

/*
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
*/
