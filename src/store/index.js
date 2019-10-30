import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import profileReducer from "../reducers/profile";
import errorReducer from "../reducers/error";
import experienceReducer from "../reducers/experience";
import postlistReducer from "../reducers/post";
import selectedProfileReducer from "../reducers/selectedProfile";
import loggedUserReducer from "../reducers/loggedUser";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  profiles: [],
  loggedUser: {},
  selectedProfile: {},
  error: {
    fetchError: false,
    message: "",
    statusCode: null
  },
  experience: [],
  postlist: []
};

const bigReducer = combineReducers({
  profiles: profileReducer,
  error: errorReducer,
  experience: experienceReducer,
  postlist: postlistReducer,
  selectedProfile: selectedProfileReducer,
  loggedUser: loggedUserReducer
});

export default function configureStore() {
  return createStore(
    bigReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
}
