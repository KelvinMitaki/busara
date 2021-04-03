import { AnyAction } from "redux";

export interface AuthState {
  token: string | null;
}

type Action = AnyAction;

const INITIAL_STATE: AuthState = {
  token: null
};

const authReducer = (state = INITIAL_STATE, action: Action): AuthState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default authReducer;
