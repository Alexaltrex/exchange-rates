import {applyMiddleware, combineReducers, createStore} from "redux";

import thunkMiddleware from 'redux-thunk';
import courseReducer from "./course-reducer";
import statisticReducer from "./statistic-reducer";
import converterReducer from "./converter-reducer";

let reducers = combineReducers({
    course: courseReducer,
    statistic: statisticReducer,
    converter: converterReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;