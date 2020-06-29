import {DATE as date, DATE} from "../DAL/date";
import {API} from "../DAL/api";

// const SET_NEW_BASE = 'SET-NEW-BASE';
// const SET_NEW_RATES = 'SET-NEW-RATES';
// const SET_NEW_RATES_BEFORE = 'SET-NEW-RATES-BEFORE';
// const SET_DATE = 'SET-DATE';
// const CHANGE_DATE = 'CHANGE_DATE';
// const TOGGLE_LOADING = 'TOGGLE-LOADING';
// const SET_NEW_CURRENCY = 'SET-NEW-CURRENCY';
// const SET_NEW_PERIOD = 'SET-NEW-PERIOD';
// const SET_RATES_FOR_PERIOD = 'SET-RATES-FOR-PERIOD';
const SET_LEFT_CURRENCY = 'SET_LEFT_CURRENCY';

let initialState = {
    // baseName: [
    //     ['AUD', 'Австралийский доллар'],
    //     ['BGN', 'Болгарский лев'],
    //     ['BRL', 'Бразильский реал'],
    //     ['GBP', 'Британский фунт стерлингов'],
    //     ['HUF', 'Венгерский форинт'],
    //     ['HKD', 'Гонконгский доллар'],
    //     ['DKK', 'Датская крона'],
    //     ['USD', 'Доллар США'],
    //     ['EUR', 'Евро'],
    //     ['INR', 'Индийская рупия'],
    //     ['IDR', 'Индонезийская рупия'],
    //     ['ISK', 'Исландская крона'],
    //     ['CAD', 'Канадский доллар'],
    //     ['MYR', 'Малайский ринггит'],
    //     ['MXN', 'Мексиканское песо'],
    //     ['TRY', 'Новая турецкая лира'],
    //     ['NZD', 'Новозеландский доллар'],
    //     ['ILS', 'Новый израильский шекель'],
    //     ['NOK', 'Норвежская крона'],
    //     ['PLN', 'Польский злотый'],
    //     ['RUB', 'Российский рубль'],
    //     ['RON', 'Румынский лей'],
    //     ['ZAR', 'Рэнд'],
    //     ['SGD', 'Сингапурский доллар'],
    //     ['THB', 'Тайский бат'],
    //     ['PHP', 'Филиппинское песо'],
    //     ['HRK', 'Хорватская куна'],
    //     ['CZK', 'Чешская крона'],
    //     ['SEK', 'Шведская крона'],
    //     ['CHF', 'Швейцарский франк'],
    //     ['CNY', 'Юань'],
    //     ['KRW', 'Южнокорейская вона'],
    //     ['JPY', 'Японская иена']
    // ],
    // rates: [],
    // ratesBefore: [],
    // base: 'RUB',
    // dateNow: '2010-06-06', // дата на данный момент времени
    // date: '2010-06-06',     // изменяемая дата
    // dateBefore: '2010-06-06',
    // isloading: false,
    // currency: 'EUR',// выбранная валюта для статистики
    // ratesForPeriod: [], // массив курсов за период
    // datesForPeriod: [], // массив дат за период
    // period: 14, // период
    // startPeriodDate: '' // начальная дата периода
    selectedLeftCurrency: 'RUB'

};


const converterReduser = (state = initialState, action) => {

    switch (action.type) {
        case SET_LEFT_CURRENCY: {
            return {...state, selectedLeftCurrency: action.currency}
        }

        // case SET_NEW_BASE: {
        //     return {
        //         ...state,
        //         base: action.base
        //     }
        // }
        //
        // case SET_NEW_CURRENCY: {
        //     return {
        //         ...state,
        //         currency: action.currency
        //     }
        // }
        //
        // case SET_DATE: {// первоначальная установка текущей даты и даты на данный момент времени и предыдущей дата
        //     return {
        //         ...state,
        //         dateNow: action.date,
        //         date: action.date,
        //         dateBefore: DATE.getDateNew('minus', action.date),
        //         startPeriodDate: DATE.getStartPeriodDate(action.date, state.period)
        //     }
        // }
        //
        // case CHANGE_DATE: {
        //     let dateNew = DATE.getDateNew(action.change, state.date);
        //     let dateBeforeNew = DATE.getDateNew('minus', dateNew);
        //     return {
        //         ...state,
        //         date: dateNew,
        //         dateBefore: dateBeforeNew
        //     }
        // }
        //
        // case SET_NEW_RATES: {
        //     let ratesArr = [];
        //     for (let key in action.rates) {
        //         ratesArr.push({
        //             designationOfCurrency: key,
        //             rateOfCurrency: (1 / (+action.rates[key])).toFixed(6)
        //         });
        //     }
        //
        //     // если base = EUR, добавить строку (API не добавляет)
        //     if (state.base === 'EUR') {
        //         ratesArr.push({
        //             designationOfCurrency: 'EUR',
        //             rateOfCurrency: '1.0000'
        //         });
        //     }
        //
        //     // получить из кода название
        //     let nameForCode = (code) => state.baseName.find(el => el[0] === code)[1];
        //
        //     // сортировка по названию валюты
        //     ratesArr.sort(function (a0, b0) {
        //         let a = nameForCode(a0.designationOfCurrency);
        //         let b = nameForCode(b0.designationOfCurrency);
        //
        //         if (a > b) {
        //             return 1;
        //         }
        //         if (a < b) {
        //             return -1;
        //         }
        //         return 0;
        //     });
        //
        //     return {
        //         ...state,
        //         rates: ratesArr
        //     }
        //
        // }
        //
        // case SET_NEW_RATES_BEFORE: {
        //     let ratesArr = [];
        //     for (let key in action.ratesBefore) {
        //         ratesArr.push({
        //             designationOfCurrency: key,
        //             rateOfCurrency: (1 / (+action.ratesBefore[key])).toFixed(6)
        //         });
        //     }
        //
        //     // если base = EUR, добавить строку (API не добавляет)
        //     if (state.base === 'EUR') {
        //         ratesArr.push({
        //             designationOfCurrency: 'EUR',
        //             rateOfCurrency: '1'
        //         });
        //     }
        //
        //     // получить из кода название
        //     let nameForCode = (code) => state.baseName.find(el => el[0] === code)[1];
        //
        //     // сортировка по названию валюты
        //     ratesArr.sort(function (a0, b0) {
        //         let a = nameForCode(a0.designationOfCurrency);
        //         let b = nameForCode(b0.designationOfCurrency);
        //
        //         if (a > b) {
        //             return 1;
        //         }
        //         if (a < b) {
        //             return -1;
        //         }
        //         return 0;
        //     });
        //
        //     return {
        //         ...state,
        //         ratesBefore: ratesArr
        //     }
        // }
        //
        // case TOGGLE_LOADING: {
        //     return {...state, isLoading: action.isLoading}
        // }
        //
        // case SET_NEW_PERIOD: {
        //     // определение новой startPeriodDate
        //     return {
        //         ...state,
        //         period: action.period,
        //         startPeriodDate: DATE.getStartPeriodDate(state.dateNow, action.period)
        //     }
        // }
        //
        // case SET_RATES_FOR_PERIOD: {
        //     let ratesArr = [];
        //     for (let key in action.rates) {
        //         let rate = action.rates[key][state.base];//.toFixed(8)
        //         ratesArr.push([key, rate]);
        //     }
        //     // валидация на пропушенные дни
        //     let ratesArrValid = [];
        //     let dateCurr = state.startPeriodDate;
        //     for (let i = 0; i < state.period; i++) {
        //         // поиск в массиве ratesArr элемента el такого, что el[0]=dateCurr
        //         // если он есть добавляем в его ratesArrValid
        //         // если его нет добавляем пустую строку
        //         let el = ratesArr.find(el => el[0] === dateCurr);
        //         if (el) {
        //             ratesArrValid.push(el)
        //         } else {
        //             ratesArrValid.push([dateCurr, null])
        //         }
        //         dateCurr = date.getDateNew('plus', dateCurr);
        //     }
        //
        //     return {...state, ratesForPeriod: ratesArrValid}
        // }

        default:
            return state;
    }
};

export const setLeftCurrency = currency => ({type: SET_LEFT_CURRENCY, currency});
// export const setNewBase = base => ({type: SET_NEW_BASE, base});
// export const setNewCurrency = currency => ({type: SET_NEW_CURRENCY, currency});
// export const setRates = rates => ({type: SET_NEW_RATES, rates});
// export const setRatesBefore = ratesBefore => ({type: SET_NEW_RATES_BEFORE, ratesBefore});
// export const setDate = date => ({type: SET_DATE, date});
// export const changeDate = change => ({type: CHANGE_DATE, change});
// export const toggleLoading = isLoading => ({type: TOGGLE_LOADING, isLoading});
// export const setNewPeriod = period => ({type: SET_NEW_PERIOD, period});
// export const setRatesForPeriod = rates => ({type: SET_RATES_FOR_PERIOD, rates});
// export const getRatesForPeriod = (startPeriodDate, dateNow, currency, base) => dispatch => {
//     dispatch(toggleLoading(true));
//     API.getByPeriod(startPeriodDate, dateNow, currency, base)
//         .then(data => {
//             dispatch(setRatesForPeriod(data.rates));
//             dispatch(toggleLoading(false));
//         });
// };

export default converterReduser;

