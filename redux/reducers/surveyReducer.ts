import { AnyAction } from "redux";

export interface surveyState {}

type Action = AnyAction;

const INITIAL_STATE: surveyState = {};

const surveyReducer = (state = INITIAL_STATE, action: Action): surveyState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default surveyReducer;
