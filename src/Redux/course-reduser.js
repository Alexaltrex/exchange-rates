const SET_NEW_BASE = 'SET-NEW-BASE';
const SET_NEW_RATES = 'SET-NEW-RATES';
const SET_NEW_RATES_BEFORE = 'SET-NEW-RATES-BEFORE';
const SET_DATE = 'SET-DATE';
const SET_DATE_BEFORE = 'SET-DATE-BEFORE';
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
    retesBefore: [],
    base: 'EUR',
    dateNow: '2010-06-06', // дата на данный момент времени
    date: '2010-06-06',     // изменяемая дата
    dateBefore: '2010-06-06',
    isloading: false
};

const courseReduser = (state = initialState, action) => {

    switch (action.type) {

        case SET_NEW_BASE: {
            return {
                ...state,
                base: action.base
            }
        }

        case SET_DATE: {// первоначальная установка текущей даты и даты на данный момент времени
            return {
                ...state,
                dateNow: action.date,
                date: action.date
            }
        }

        case SET_DATE_BEFORE: {// установка предыдущей даты
            return {
                ...state,
                dateBefore: action.dateBefore
            }
        }

        case CHANGE_DATE: {
            // перевод даты из state в объект Date
            let year = state.date.match(/\d+/g)[0];
            let month = state.date.match(/\d+/g)[1] - 1;
            let day = state.date.match(/\d+/g)[2];
            let dateJS = new Date(year, month, day);
            // получение предыдущей/следующей даты
            let dateNewJS;
            if (action.change === 'minus') {
                dateNewJS = new Date(dateJS.getTime() - 24 * 60 * 60 * 1000);
            } else if (action.change === 'plus' && state.date !== state.dateNow) {
                dateNewJS = new Date(dateJS.getTime() + 24 * 60 * 60 * 1000);
            }
            // перевод предыдущей/следующей даты из объекта Date в формат state
            let yearNew = dateNewJS.getFullYear();
            let monthNew = dateNewJS.getMonth() + 1;
            if (monthNew < 10) {
                monthNew = '0' + monthNew;
            }
            let dayNew = dateNewJS.getDate();
            if (dayNew < 10) {
                dayNew = '0' + dayNew;
            }
            let dateNew = `${yearNew}-${monthNew}-${dayNew}`;
            return {
                ...state,
                date: dateNew
            }
        }

        case SET_NEW_RATES: {
            let ratesArr = [];
            for (let key in action.rates) {
                ratesArr.push({
                    designationOfCurrency: key,
                    rateOfCurrency: (+action.rates[key]).toPrecision(4)
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
                rates: ratesArr
            }

        }

        case SET_NEW_RATES_BEFORE: {
            let ratesArr = [];
            for (let key in action.ratesBefore) {
                ratesArr.push({
                    designationOfCurrency: key,
                    rateOfCurrency: (+action.ratesBefore[key]).toPrecision(4)
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
            return {
                ...state,
                isLoading: action.isLoading
            }
        }

        default:
            return state;
    }
};

export const setNewBase = (base) => (
    {
        type: SET_NEW_BASE,
        base: base
    }
);

export const setRates = (rates) => (
    {
        type: SET_NEW_RATES,
        rates: rates
    }
);

export const setRatesBefore = (ratesBefore) => (
    {
        type: SET_NEW_RATES_BEFORE,
        ratesBefore: ratesBefore
    }
);

export const setDate = (date) => (
    {
        type: SET_DATE,
        date: date
    }
);

export const setDateBefore = (dateBefore) => (
    {
        type: SET_DATE_BEFORE,
        dateBefore: dateBefore
    }
);

export const changeDate = (change) => (
    {
        type: CHANGE_DATE,
        change: change,
    }
);

export const toggleLoading = isLoading => (
    {
        type: TOGGLE_LOADING,
        isLoading: isLoading
    }
);

export default courseReduser;

