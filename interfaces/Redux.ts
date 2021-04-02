import { FormReducer } from "redux-form";
import { StyleState } from "../redux/reducers/styleReducer";

export interface Redux {
  style: StyleState;
  form: FormReducer;
}
