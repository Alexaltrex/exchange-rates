import {changeDate, setDate, setRates, toggleLoading} from "../../../../../Redux/course-reduser";
import {connect} from "react-redux";
import React from "react";
import CourseMenuDate from "./CourseMenuDate";

class CourseMenuDateContainerAJAX extends React.Component {

    // перевод даты из формата REST API в формат вывода
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
    };

    componentDidUpdate(prevProps) {
        let date = this.props.date;
        let base = this.props.base;
        //console.log(base);
        if (prevProps.date !== date) {
            this.props.toggleLoading(true);
            const axios = require('axios');
            axios.get(`https://api.exchangeratesapi.io/history?start_at=${date}&end_at=${date}&base=${base}`)
                .then(response => {
                    this.props.setRates(response.data.rates[date]);
                    this.props.toggleLoading(false);
                });
        }
    }

    render() {
        return <CourseMenuDate
            base={this.props.base}
            date={this.dateTranslate(this.props.date)}
            dateNow={this.dateTranslate(this.props.dateNow)}
            leftArrowClick={this.props.changeDate}
            rightArrowClick={(this.props.date !== this.props.dateNow) ? this.props.changeDate : ()=>{}}
        />
    }
}

let mapStateToProps = (state) => {
    return {
        date: state.course.date,
        dateNow: state.course.dateNow,
        base: state.course.base,
        isLoading: state.course.isLoading
    }
};

const CourseMenuDateContainer = connect(mapStateToProps,
    {setRates, changeDate, setDate, toggleLoading})(CourseMenuDateContainerAJAX);

export default CourseMenuDateContainer;