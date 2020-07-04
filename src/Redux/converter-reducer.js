import {converterAPI} from "../DAL/api";

const SET_LEFT_CURRENCY = 'SET-LEFT-CURRENCY';
const SET_LEFT_CURRENCY_ADD = 'SET-LEFT-CURRENCY-ADD';
const TOGGLE_LEFT_MODAL = 'TOGGLE-LEFT-MODAL';
const SET_RIGHT_CURRENCY = 'SET-RIGHT-CURRENCY';
const SET_RIGHT_CURRENCY_ADD = 'SET-RIGHT-CURRENCY-ADD';
const TOGGLE_RIGHT_MODAL = 'TOGGLE-RIGHT-MODAL';
const LEFT_INPUT_CHANGE = 'LEFT-INPUT-CHANGE';
const LEFT_INPUT_ADD_SYMBOL = 'RIGHT-INPUT-ADD-SYMBOL';
const RIGHT_INPUT_CHANGE = 'RIGHT-INPUT-CHANGE';
const RIGHT_INPUT_ADD_SYMBOL = 'LEFT-INPUT-ADD-SYMBOL';
const SET_RATE = 'SET-RATE';
const SET_RIGHT_INPUT = 'SET-RIGHT-INPUT';


let initialState = {
    leftCurrency: 'RUB',// выбранная валюта слево
    leftCurrencyAdd: 'DKK', //выбранная валюта слево - добаыочная, из модального окна
    leftModalIsActive: false,// модальное окно выбора валют активно
    rightCurrency: 'USD',// выбранная валюта слево
    rightCurrencyAdd: 'JPY', //выбранная валюта слево - добаыочная, из модального окна
    rightModalIsActive: false,// модальное окно выбора валют активно
    inputLeft: '5000',
    inputRight: '0',
    inputSymbolLeft: '',
    inputSymbolRight: '',
    rate: 1
};

const converterReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_LEFT_CURRENCY: {
            return {...state, leftCurrency: action.currency}
        }
        case SET_RIGHT_CURRENCY: {
            return {...state, rightCurrency: action.currency}
        }
        case SET_LEFT_CURRENCY_ADD: {
            return {...state, leftCurrencyAdd: action.currency}
        }
        case SET_RIGHT_CURRENCY_ADD: {
            return {...state, rightCurrencyAdd: action.currency}
        }
        case SET_RATE: {
            return {...state, rate: action.rate}
        }
        case TOGGLE_LEFT_MODAL: {
            return {...state, leftModalIsActive: action.value}
        }
        case TOGGLE_RIGHT_MODAL: {
            return {...state, rightModalIsActive: action.value}
        }
        case LEFT_INPUT_CHANGE: {
            let newValue;
            // в input удалили символ
            if (action.value.length < state.inputLeft.length) {
                newValue = action.value;
            } else if (action.value.length <= 10) {// в input добавили символ, это state.inputSymbolLeft
                if (state.inputSymbolLeft.match(/\d/)) {// если введенный символ - цифра
                    newValue = action.value;
                }
                if (state.inputSymbolLeft.match(/\.|\,/) && !state.inputLeft.match(/\./)) {// новый символ точка или запятая и их еще нет
                    if (state.inputSymbolLeft === '.') {
                        newValue = action.value;
                    }
                    if (state.inputSymbolLeft === ',') {// если запятая, замена на точку
                        let index = action.value.indexOf(',');
                        newValue = action.value.slice(0, index) + '.' + action.value.slice(index + 1);
                    }
                }
            }
            if (newValue) {
                let inputRightNew = ((+newValue) / state.rate).toFixed(4) + '';
                return {...state, inputLeft: newValue, inputRight: inputRightNew}
            } else { //во всех остальных случаях изменений нет
                return {...state}
            }
        }

        case RIGHT_INPUT_CHANGE: {
            let newValue;
            // в input удалили символ
            if (action.value.length < state.inputRight.length) {
                newValue = action.value;
            } else if (action.value.length <= 10) {// в input добавили символ, это state.inputSymbolLeft
                if (state.inputSymbolRight.match(/\d/)) {// если введенный символ - цифра
                    newValue = action.value;
                }
                if (state.inputSymbolRight.match(/\.|\,/) && !state.inputRight.match(/\./)) {// новый символ точка или запятая и их еще нет
                    if (state.inputSymbolRight === '.') {
                        newValue = action.value;
                    }
                    if (state.inputSymbolRight === ',') {// если запятая, замена на точку
                        let index = action.value.indexOf(',');
                        newValue = action.value.slice(0, index) + '.' + action.value.slice(index + 1);
                    }
                }
            }
            if (newValue) {
                let inputLeftNew = ((+newValue) * state.rate).toFixed(4) + '';//
                return {...state, inputRight: newValue, inputLeft: inputLeftNew}
            } else { //во всех остальных случаях изменений нет
                return {...state}
            }

        }

        case SET_RIGHT_INPUT: {
            return {...state, inputRight: action.value}
        }

        case LEFT_INPUT_ADD_SYMBOL: {
            return {...state, inputSymbolLeft: action.symbol}
        }
        case RIGHT_INPUT_ADD_SYMBOL: {
            return {...state, inputSymbolRight: action.symbol}
        }
        default:
            return state;
    }
};

export const setLeftCurrency = currency => ({type: SET_LEFT_CURRENCY, currency});
export const setLeftCurrencyAdd = currency => ({type: SET_LEFT_CURRENCY_ADD, currency});
export const toggleLeftModal = (value) => ({type: TOGGLE_LEFT_MODAL, value});
export const setRightCurrency = currency => ({type: SET_RIGHT_CURRENCY, currency});
export const setRightCurrencyAdd = currency => ({type: SET_RIGHT_CURRENCY_ADD, currency});
export const toggleRightModal = (value) => ({type: TOGGLE_RIGHT_MODAL, value});
export const leftInputChange = (value) => ({type: LEFT_INPUT_CHANGE, value});
export const leftInputAddSymbol = (symbol) => ({type: LEFT_INPUT_ADD_SYMBOL, symbol});
export const rightInputChange = (value) => ({type: RIGHT_INPUT_CHANGE, value});
export const rightInputAddSymbol = (symbol) => ({type: RIGHT_INPUT_ADD_SYMBOL, symbol});
export const setRate = (rate) => ({type: SET_RATE, rate});
export const setRightInput = (value) => ({type: SET_RIGHT_INPUT, value});

export const getRate = (currency, base, inputLeft) => dispatch => {
    //dispatch(toggleLoading(true));
    if (currency === 'EUR' && base === 'EUR') {
        dispatch(setRate(1));
        dispatch(setRightInput(inputLeft));
    } else {
        converterAPI.getRate(currency, base)
            .then(data => {
                dispatch(setRate(data.rates[currency]));
                dispatch(setRightInput(((+inputLeft) / data.rates[currency]).toFixed(4) + ''))
                //dispatch(toggleLoading(false));
            });
    }

};

export default converterReducer;

