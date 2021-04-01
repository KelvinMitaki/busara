import { AnyAction } from "redux";

export interface StyleState {
  authenticate: "login" | "register";
}

type Action = AnyAction;

const INITIAL_STATE: StyleState = {
  authenticate: "register"
};

const styleReducer = (state = INITIAL_STATE, action: Action): StyleState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default styleReducer;
