import { AnyAction } from "redux";
import { SetCurrentUser } from "../../HOCs/withAuth";
import { User } from "../../pages/profile";

export interface AuthState {
  currentUser: User | null;
}

type Action = SetCurrentUser;

const INITIAL_STATE: AuthState = {
  currentUser: null
};

const authReducer = (state = INITIAL_STATE, action: Action): AuthState => {
  switch (action.type) {
    case "setCurrentUser":
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};

export default authReducer;
