import {DATE as date, DATE} from "../DAL/date";
import {courseAPI, statisticAPI} from "../DAL/api";
const SET_NEW_BASE = 'SET-NEW-BASE';
const SET_NEW_RATES = 'SET-NEW-RATES';
const SET_NEW_RATES_BEFORE = 'SET-NEW-RATES-BEFORE';
const SET_DATE = 'SET-DATE';
const CHANGE_DATE = 'CHANGE_DATE';
const TOGGLE_LOADING = 'TOGGLE-LOADING';


let initialState = {
    baseName: [
        ['AUD', 'Австралийский доллар'],
        ['BGN', 'Болгарский лев'],
        ['BRL', 'Бразильский реал'],
        ['GBP', 'Британский фунт стерлингов'],
        ['HUF', 'Венгерский форинт'],
        ['HKD', 'Гонконгский доллар'],
        ['DKK', 'Датская крона'],
        ['USD', 'Доллар США'],
        ['EUR', 'Евро'],
        ['INR', 'Индийская рупия'],
        ['IDR', 'Индонезийская рупия'],
        ['ISK', 'Исландская крона'],
        ['CAD', 'Канадский доллар'],
        ['MYR', 'Малайский ринггит'],
        ['MXN', 'Мексиканское песо'],
        ['TRY', 'Новая турецкая лира'],
        ['NZD', 'Новозеландский доллар'],
        ['ILS', 'Новый израильский шекель'],
        ['NOK', 'Норвежская крона'],
        ['PLN', 'Польский злотый'],
        ['RUB', 'Российский рубль'],
        ['RON', 'Румынский лей'],
        ['ZAR', 'Рэнд'],
        ['SGD', 'Сингапурский доллар'],
        ['THB', 'Тайский бат'],
        ['PHP', 'Филиппинское песо'],
        ['HRK', 'Хорватская куна'],
        ['CZK', 'Чешская крона'],
        ['SEK', 'Шведская крона'],
        ['CHF', 'Швейцарский франк'],
        ['CNY', 'Юань'],
        ['KRW', 'Южнокорейская вона'],
        ['JPY', 'Японская иена']
    ],
    rates: [],
    ratesBefore: [],
    base: 'RUB',
    dateNow: '2010-06-06', // дата на данный момент времени
    date: '2010-06-06',     // изменяемая дата
    dateBefore: '2010-06-06',
    isloading: false,
    //currency: 'EUR',// выбранная валюта для статистики
    //ratesForPeriod: [], // массив курсов за период
    //period: 14, // период
    //startPeriodDate: '' // начальная дата периода
};


const courseReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_NEW_BASE: {
            return {
                ...state,
                base: action.base
            }
        }

        case SET_DATE: {// первоначальная установка текущей даты и даты на данный момент времени и предыдущей дата
            return {
                ...state,
                dateNow: action.date,
                date: action.date,
                dateBefore: DATE.getDateNew('minus', action.date),
            }
        }

        case CHANGE_DATE: {
            let dateNew = DATE.getDateNew(action.change, state.date);
            let dateBeforeNew = DATE.getDateNew('minus', dateNew);
            return {
                ...state,
                date: dateNew,
                dateBefore: dateBeforeNew
            }
        }

        case SET_NEW_RATES: {
            let ratesArr = [];
            for (let key in action.rates) {
                ratesArr.push({
                    designationOfCurrency: key,
                    rateOfCurrency: (1 / (+action.rates[key])).toFixed(6)
                });
            }

            // если base = EUR, добавить строку (API не добавляет)
            if (state.base === 'EUR') {
                ratesArr.push({
                    designationOfCurrency: 'EUR',
                    rateOfCurrency: '1.0000'
                });
            }

            // получить из кода название
            let nameForCode = (code) => state.baseName.find(el => el[0] === code)[1];

            // сортировка по названию валюты
            ratesArr.sort(function (a0, b0) {
                let a = nameForCode(a0.designationOfCurrency);
                let b = nameForCode(b0.designationOfCurrency);

                if (a > b) {
                    return 1;
                }
                if (a < b) {
                    return -1;
                }
                return 0;
            });

            return {
                ...state,
                rates: ratesArr
            }

        }

        case SET_NEW_RATES_BEFORE: {
            let ratesArr = [];
            for (let key in action.ratesBefore) {
                ratesArr.push({
                    designationOfCurrency: key,
                    rateOfCurrency: (1 / (+action.ratesBefore[key])).toFixed(6)
                });
            }

            // если base = EUR, добавить строку (API не добавляет)
            if (state.base === 'EUR') {
                ratesArr.push({
                    designationOfCurrency: 'EUR',
                    rateOfCurrency: '1'
                });
            }

            // получить из кода название
            let nameForCode = (code) => state.baseName.find(el => el[0] === code)[1];

            // сортировка по названию валюты
            ratesArr.sort(function (a0, b0) {
                let a = nameForCode(a0.designationOfCurrency);
                let b = nameForCode(b0.designationOfCurrency);

                if (a > b) {
                    return 1;
                }
                if (a < b) {
                    return -1;
                }
                return 0;
            });

            return {
                ...state,
                ratesBefore: ratesArr
            }
        }

        case TOGGLE_LOADING: {
            return {...state, isLoading: action.isLoading}
        }

        default:
            return state;
    }
};

export const setNewBase = base => ({type: SET_NEW_BASE, base});
export const setRates = rates => ({type: SET_NEW_RATES, rates});
export const setRatesBefore = ratesBefore => ({type: SET_NEW_RATES_BEFORE, ratesBefore});
export const setDate = date => ({type: SET_DATE, date});
export const changeDate = change => ({type: CHANGE_DATE, change});
export const toggleLoading = isLoading => ({type: TOGGLE_LOADING, isLoading});

export const setAfterMount = (base) => dispatch => {
    dispatch(toggleLoading(true));
    let dateBefore;
    courseAPI.getLatest(base)
        .then(data => {
            dateBefore = date.getDateNew('minus', data.date);
            dispatch(setRates(data.rates));
            dispatch(setDate(data.date));
            return courseAPI.getByDate(dateBefore, base)
        })
        .then(data => {
            dispatch(setRatesBefore(data.rates[dateBefore]));
            dispatch(toggleLoading(false));
        })
};

export const setAfterUpdate = (date, dateBefore, base) => dispatch => {

    dispatch(toggleLoading(true));
    let getRates = () => courseAPI.getByDate(date, base);
    let getRatesBefore = () => courseAPI.getByDate(dateBefore, base);
    Promise.all([getRates(), getRatesBefore()])
        .then(results => {
            dispatch(setRates(results[0].rates[date]));
            dispatch(setRatesBefore(results[1].rates[dateBefore]));
            dispatch(toggleLoading(false));
        });
};

export default courseReducer;

