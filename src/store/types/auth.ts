import { IUserProfile } from "@constants/auth";

export interface AuthState {
  isAuth: boolean;
  user: IUserProfile | null;
  isLoading: boolean;
}

export enum AuthTypes {
  USER_LOGIN = "auth/LOGIN",
  USER_LOGOUT = "auth/LOGOUT",
}

interface LoginUserAction {
  type: AuthTypes.USER_LOGIN;
  payload: IUserProfile;
}

interface LogoutUserAction {
  type: AuthTypes.USER_LOGOUT;
}

export type AuthAction = LoginUserAction | LogoutUserAction;
