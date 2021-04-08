import { SetSurveySubmitted } from "../../components/layout/Success";

export interface surveyState {
  surveySubmitted: "success" | "error" | null;
}

type Action = SetSurveySubmitted;

const INITIAL_STATE: surveyState = {
  surveySubmitted: null
};

const surveyReducer = (state = INITIAL_STATE, action: Action): surveyState => {
  switch (action.type) {
    case "setSurveySubmitted":
      return { ...state, surveySubmitted: action.payload };
    default:
      return state;
  }
};

export default surveyReducer;
