import { AppDispatch } from "..";
import { AuthTypes, AuthAction } from "../types/auth";
import { GOOGLE_OAUTH_URL, IUserProfile } from "@constants/auth";

export const userLogin = (accsessToken: string) => {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`${GOOGLE_OAUTH_URL + accsessToken}`, {
      headers: {
        Authorization: `Bearer ${accsessToken}`,
        Accept: "application/json",
      },
    });
    const user: IUserProfile = await response.json();

    if (!response.ok) {
      return Promise.reject();
    } else {
      dispatch({ type: AuthTypes.USER_LOGIN, payload: user });
    }
  };
};

export const userLogOut = (): AuthAction => ({
  type: AuthTypes.USER_LOGOUT,
});
