import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

// Appliquez le middleware redux-thunk pour gérer les actions asynchrones
const middleware = [thunk];

// Créez le store Redux
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)) // Utilisez composeWithDevTools pour intégrer avec Redux DevTools
);

export default store;
