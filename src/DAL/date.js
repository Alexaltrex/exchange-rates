//объект с методами получения и изменения дат
export const DATE = {
    // перевод даты из формата REST-API 'YYYY-MM-DD' в формат вывода 'DAY MONTH YEAR'
    dateTranslate(date) {
        let year = date.match(/\d+/g)[0];
        let month = date.match(/\d+/g)[1];
        let day = date.match(/\d+/g)[2];
        let monthWord;
        switch (+month) {
            case 1: {
                monthWord = 'января';
                break;
            }
            case 2: {
                monthWord = 'февраля';
                break;
            }
            case 3: {
                monthWord = 'марта';
                break;
            }
            case 4: {
                monthWord = 'апреля';
                break;
            }
            case 5: {
                monthWord = 'мая';
                break;
            }
            case 6: {
                monthWord = 'июня';
                break;
            }
            case 7: {
                monthWord = 'июля';
                break;
            }
            case 8: {
                monthWord = 'августа';
                break;
            }
            case 9: {
                monthWord = 'сентября';
                break;
            }
            case 10: {
                monthWord = 'октября';
                break;
            }
            case 11: {
                monthWord = 'ноября';
                break;
            }
            case 12: {
                monthWord = 'декабря';
                break;
            }
        }
        return `${day} ${monthWord} ${year}`;
    },

    // перевод даты из формата 'YYYY-MM-DD' в объект JS Date()
    dateToJS(date) {
        let year = date.match(/\d+/g)[0];
        let month = date.match(/\d+/g)[1] - 1;
        let day = date.match(/\d+/g)[2];
        return new Date(year, month, day);
    },

    // перевод даты из формата объекта JS Date() в 'YYYY-MM-DD'
    dateToStr(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        let day = date.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        return `${year}-${month}-${day}`;
    },

    // получение следующей/предыдущей даты
    getDateNew(change, date) {
        // change = 'plus', 'minus'
        // date, return = 'YYYY-MM-DD'
        // перевод даты из формата 'YYYY-MM-DD' в объект Date JS
        let dateJS = this.dateToJS(date);
        // получение предыдущей/следующей даты
        let dateNewJS;
        if (change === 'minus') {
            dateNewJS = new Date(dateJS.getTime() - 24 * 60 * 60 * 1000);
        } else if (change === 'plus') {
            dateNewJS = new Date(dateJS.getTime() + 24 * 60 * 60 * 1000);
        }
        // перевод предыдущей/следующей даты из объекта Date в формат state
        return this.dateToStr(dateNewJS);
    },

    // получение даты начала периода
    getStartPeriodDate(date, period) {
        // date = 'YYYY-MM-DD'
        // period = 3, 7, 14, 30
        let dateJS = this.dateToJS(date);
        let startPeriodDateJS = new Date(dateJS.getTime() - period * 24 * 60 * 60 * 1000);
        return this.dateToStr(startPeriodDateJS);
    }
}