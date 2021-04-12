import { createStore, applyMiddleware, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import {
  newsReducer,
  searchNewsReducer
} from "../features/news/reducers/news-reducer";

export default function configureStore() {
  const initialState = {};
  const middleware = applyMiddleware(ReduxThunk);

  const reducers = combineReducers({
    news: newsReducer,
    searchResults: searchNewsReducer
  });

  return createStore(reducers, initialState, middleware);
}
