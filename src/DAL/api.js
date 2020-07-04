import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.exchangeratesapi.io/'
});

export const courseAPI = {
    // получаем курсы по установленной базе за последнее число
    getLatest(base) {
        return instance.get(`latest?base=${base}`)
            .then(responce => responce.data)
    },
    // получить курсы за заданную дату по заданной базе
    getByDate(date, base) {
        return instance.get(`history?start_at=${date}&end_at=${date}&base=${base}`)
            .then(responce => responce.data)
    }
};

export const statisticAPI = {
    // запрос без параметров, получаем только дату
    getInitial() {
        return instance.get(`latest`)
            .then(responce => responce.data)
    },
    // получить курсы за период по заданной базе и валюте
    // валюту и базу в запросе надо поменять местами, т.к. в api перерасчет не к базе, а от базы
    getByPeriod(dateStart, dateEnd, currency, base) {
        return instance.get(`history?start_at=${dateStart}&end_at=${dateEnd}&symbols=${base}&base=${currency}`)
            .then(responce => responce.data)
    }
};

export const converterAPI = {
    getRate(leftCurrency, rightCurrency){
        return instance.get(`latest?base=${rightCurrency}&symbols=${leftCurrency}`)
            // latest?base=${rightCurrency}&symbols=${leftCurrency}
            .then(responce => responce.data)
    }
}