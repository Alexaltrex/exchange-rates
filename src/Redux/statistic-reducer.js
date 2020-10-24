import {DATE as date, DATE} from "../Helpers/date";
import {statisticAPI} from "../DAL/api";
import {toggleLoading} from "./course-reducer";

const SET_DATE = 'SET-DATE';
const SET_NEW_CURRENCY = 'SET-NEW-CURRENCY';
const SET_NEW_PERIOD = 'SET-NEW-PERIOD';
const SET_RATES_FOR_PERIOD = 'SET-RATES-FOR-PERIOD';

let initialState = {
    dateNow: '',
    currency: 'EUR',// выбранная валюта для статистики
    ratesForPeriod: [], // массив курсов за период
    period: 14, // период
    startPeriodDate: '' // начальная дата периода
};

const statisticReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_DATE: {// первоначальная установка текущей даты и даты на данный момент времени и предыдущей дата
            return {
                ...state,
                dateNow: action.date,
                startPeriodDate: DATE.getStartPeriodDate(action.date, state.period)
            }
        }

        case SET_NEW_CURRENCY: {
            return {
                ...state,
                currency: action.currency
            }
        }

        case SET_NEW_PERIOD: {
            // определение новой startPeriodDate
            return {
                ...state,
                period: action.period,
                startPeriodDate: DATE.getStartPeriodDate(state.dateNow, action.period)
            }
        }

        case SET_RATES_FOR_PERIOD: {
            let ratesArr = [];
            for (let key in action.rates) {
                let rate;
                for (let k in action.rates[key]) {
                    rate = action.rates[key][k].toFixed(6);//
                }
                ratesArr.push([key, rate]);
            }
            // валидация на пропушенные дни
            let ratesArrValid = [];
            let dateCurr = state.startPeriodDate;
            for (let i = 0; i < state.period; i++) {
                // поиск в массиве ratesArr элемента el такого, что el[0]=dateCurr
                // если он есть добавляем в его ratesArrValid
                // если его нет добавляем пустую строку
                let el = ratesArr.find(el => el[0] === dateCurr);
                if (el) {
                    ratesArrValid.push(el)
                } else {
                    ratesArrValid.push([dateCurr, null])
                }
                dateCurr = date.getDateNew('plus', dateCurr);
            }

            return {...state, ratesForPeriod: ratesArrValid}
        }

        default:
            return state;
    }
};

export const setDate = date => ({type: SET_DATE, date});
export const setNewCurrency = currency => ({type: SET_NEW_CURRENCY, currency});
export const setNewPeriod = period => ({type: SET_NEW_PERIOD, period});
export const setRatesForPeriod = rates => ({type: SET_RATES_FOR_PERIOD, rates});

export const getRatesInitial = (period, currency, base) => dispatch => {
    dispatch(toggleLoading(true));
    statisticAPI.getInitial()
        .then(data => {
            dispatch(setDate(data.date));
            return statisticAPI.getByPeriod(DATE.getStartPeriodDate(data.date, period), data.date, currency, base);
        })
        .then(data => {
            dispatch(setRatesForPeriod(data.rates));
            dispatch(toggleLoading(false));
        });
};

export const getRatesForPeriod = (startPeriodDate, dateNow, currency, base) => dispatch => {
    dispatch(toggleLoading(true));
    statisticAPI.getByPeriod(startPeriodDate, dateNow, currency, base)
        .then(data => {
            dispatch(setRatesForPeriod(data.rates));
            dispatch(toggleLoading(false));
        });
};

export default statisticReducer;

