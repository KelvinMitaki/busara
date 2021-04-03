import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as formReducer } from "redux-form";
import authReducer from "./reducers/authReducer";
import styleReducer from "./reducers/styleReducer";

const combinedReducer = combineReducers({
  style: styleReducer,
  form: formReducer,
  auth: authReducer
});

const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload
    };
    if (state.form) nextState.form = state.form;
    if (state.auth) nextState.auth = state.auth;
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const initStore = (): Store => createStore(reducer, composeWithDevTools());

export const wrapper = createWrapper(initStore);
