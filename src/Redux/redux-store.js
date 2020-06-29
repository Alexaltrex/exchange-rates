import {applyMiddleware, combineReducers, createStore} from "redux";
import courseReduser from "./course-reduser";
import thunkMiddleware from 'redux-thunk';
import converterReduser from "./converter-reduser";

let redusers = combineReducers({
    course: courseReduser,
    converter: converterReduser
});

let store = createStore(redusers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;