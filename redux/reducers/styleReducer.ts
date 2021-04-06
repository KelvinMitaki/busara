import { ToggleAuthenticate } from "../../pages/authenticate";

export interface StyleState {
  authenticate: "login" | "register";
}

type Action = ToggleAuthenticate;

const INITIAL_STATE: StyleState = {
  authenticate: "login"
};

const styleReducer = (state = INITIAL_STATE, action: Action): StyleState => {
  switch (action.type) {
    case "ToggleAuth":
      return { ...state, authenticate: action.payload };
    default:
      return state;
  }
};

export default styleReducer;
