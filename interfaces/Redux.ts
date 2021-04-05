import { FormReducer } from "redux-form";
import { AuthState } from "../redux/reducers/authReducer";
import { StyleState } from "../redux/reducers/styleReducer";

export interface Redux {
  style: StyleState;
  auth: AuthState;
  form: FormReducer;
}
