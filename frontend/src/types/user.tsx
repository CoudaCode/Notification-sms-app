export interface userType {
  _id: string;
  username?: string;
  phoneNumber?: number;
  __v: number;
}

export interface SignupFormInputs extends userType {
  username: string;
  password?: string;
  phoneNumber: number;
}

export interface LoginFormInputs {
  phoneNumber: number;
  password: string;
}

export interface LoginResponse {
  statut: boolean;
  message: userType | userType[] | string;
  token?: string;
}
