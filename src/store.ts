import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "reducers";
import rootMiddleware from "middlewares";

const middlewares = compose(applyMiddleware(...rootMiddleware));

export default () => createStore(rootReducer, middlewares);
