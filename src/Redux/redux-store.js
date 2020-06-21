import {combineReducers, createStore} from "redux";
import courseReduser from "./course-reduser";


let redusers = combineReducers({
    course: courseReduser
});

let store = createStore(redusers);

window.store = store;

export default store;