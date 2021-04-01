import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import styleReducer from "./reducers/styleReducer";

const combinedReducer = combineReducers({
  style: styleReducer
});

const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload
    };
    if (state.form) nextState.form = state.form;
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const initStore = (): Store => createStore(reducer, composeWithDevTools());

export const wrapper = createWrapper(initStore);
