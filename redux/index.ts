import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as formReducer } from "redux-form";
import surveyReducer from "./reducers/surveyReducer";
import authReducer from "./reducers/authReducer";
import styleReducer from "./reducers/styleReducer";

const combinedReducer = combineReducers({
  form: formReducer,
  style: styleReducer,
  auth: authReducer,
  survey: surveyReducer
});
const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload
    };
    console.log({ state });
    console.log({ nextState });
    if (state.form) nextState.form = state.form;
    if (state.auth) nextState.auth = state.auth;
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const initStore = (): Store => createStore(reducer, composeWithDevTools());

export const wrapper = createWrapper(initStore);
