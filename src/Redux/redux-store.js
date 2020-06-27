import {applyMiddleware, combineReducers, createStore} from "redux";
import courseReduser from "./course-reduser";
import thunkMiddleware from 'redux-thunk';

let redusers = combineReducers({
    course: courseReduser
});

let store = createStore(redusers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;