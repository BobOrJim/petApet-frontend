import { Advert } from "./Advert";

export interface User {
  id: string; //from puppyDb Table User
  alias: string; //from puppyDb Table User
  phoneNr: string; //from puppyDb Table User
  //adverts: Advert[]; //from puppyDb Table Advert (is build in UserContext using the PK-FK relation in backend)
  isLoggedIn: boolean; //from puppyDb Table User. Streachgoal ish
  profilePictureUrl: string; //from puppyDb Table User
  authId: string; //from identityDb
  username: string; //from identityDb
  email: string; //from identityDb
  password: string; //from identityDb
  token: string; //generated in backend
  expiration: Date; //generated in backend
}

//export interface UserDto extends Omit<User, "id" | "authId" | "username" | "email" | "password"> {}
export interface SignInDto extends Pick<User, "username" | "password"> {}
export interface SignUpDto extends Pick<User, "username" | "password" | "email"> {}

//SignInResponse
export type TokenType = {
  token: string;
  expiration: Date;
  authUserId: string;
  userId: string;
};

export type SignUpResponse = {
  status: string;
  message: string;
};
