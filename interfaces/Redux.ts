import { FormReducer } from "redux-form";
import { AuthState } from "../redux/reducers/authReducer";
import { StyleState } from "../redux/reducers/styleReducer";
import { surveyState } from "../redux/reducers/surveyReducer";

export interface Redux {
  form: FormReducer;
  style: StyleState;
  auth: AuthState;
  survey: surveyState;
}
