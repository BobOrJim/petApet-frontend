export interface User {
  id: string;
  alias: string;
  phoneNr: string;
  isLoggedIn: boolean;
  profilePictureUrl: string;
  contactEmail: string;
  authId: string; 
  username: string;
  email: string;
  password: string;
  token: string;
  expiration: Date;
}

export interface SignInDto extends Pick<User, "username" | "password"> {}
export interface SignUpDto extends Pick<User, "username" | "password" | "email"> {}


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

export type ContactDetails = {
  contactEmail: string;
  phoneNr: string;
};
