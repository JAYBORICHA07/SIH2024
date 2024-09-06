export interface UserToken {
  iat?: string;
  exp?: string;
}

export interface UserInfo {
  iat: number;
  user: {
    id: string;
    email: string;
    name: string;
    profilePicture?: string;
    isVerified: boolean;
  };
}
