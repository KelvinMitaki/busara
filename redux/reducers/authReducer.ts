import { AnyAction } from "redux";
import { SetToken } from "../../components/auth/Login";

export interface AuthState {
  token: string | null;
}

type Action = SetToken;

const INITIAL_STATE: AuthState = {
  token: null
};

const authReducer = (state = INITIAL_STATE, action: Action): AuthState => {
  switch (action.type) {
    case "setToken":
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

export default authReducer;
