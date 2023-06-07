import { AuthState, AuthTypes, AuthAction } from "../types/auth";

const initialState: AuthState = {
  isAuth: false,
  user: null,
  isLoading: false,
};

export default function productsReducer(
  state = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case AuthTypes.USER_LOGIN:
      return { ...state, isAuth: true, user: action.payload };
    case AuthTypes.USER_LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}
