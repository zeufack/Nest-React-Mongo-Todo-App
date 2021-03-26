import { applyMiddleware, compose, createStore } from "redux"
import thunk from "redux-thunk";
import rootReducer from './reducers';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {}
export default createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
