import { AnyAction } from "redux";
import { User } from "../../pages/profile";

export interface AuthState {
  currentUser: User | null;
}

type Action = AnyAction;

const INITIAL_STATE: AuthState = {
  currentUser: null
};

const authReducer = (state = INITIAL_STATE, action: Action): AuthState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default authReducer;
