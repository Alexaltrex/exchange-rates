import React from 'react';
import style from './CourseItems.module.css'
import CourseItems from "./CourseItems";
import {connect} from "react-redux";
import {setDate, setRates, setRatesBefore, toggleLoading} from "../../../../Redux/course-reduser";
import Preloader from "../../../Preloader/Preloader";

class CourseItemsContainerAJAX extends React.Component {
    // вычисление предыдущей даты
    getDateBefore(date){
        // перевод даты из формата REST API в объект Date
        let year = date.match(/\d+/g)[0];
        let month = date.match(/\d+/g)[1] - 1;
        let day = date.match(/\d+/g)[2];
        let dateJS = new Date(year, month, day);
        // получение предыдущей даты
        let dateBeforeJS = new Date(dateJS.getTime() - 24 * 60 * 60 * 1000);
        // перевод предыдущей даты из объекта Date в формат state
        let yearBefore = dateBeforeJS.getFullYear();
        let monthBefore = dateBeforeJS.getMonth() + 1;
        if (monthBefore < 10) {
            monthBefore = '0' + monthBefore;
        }
        let dayBefore = dateBeforeJS.getDate();
        if (dayBefore < 10) {
            dayBefore = '0' + dayBefore;
        }
        return `${yearBefore}-${monthBefore}-${dayBefore}`;
    }

    componentDidMount() {
        const axios = require('axios');
        let base = this.props.base;
        this.props.toggleLoading(true);
        // получение из запроса - даты, курсов и вычисление предыдущей даты
        // передача даты, предыдущей даты и курсов в хранилище
        axios.get(`https://api.exchangeratesapi.io/latest?base=${base}`)
            .then(response => {
                let date = response.data.date;
                let dateBefore = this.getDateBefore(response.data.date);
                this.props.setRates(response.data.rates);
                this.props.setDate(date);
                // второй запрос на основании результатов первого (предыдущей даты)
                // получение курсов предыдущей даты и передача их в хранилище
                axios.get(`https://api.exchangeratesapi.io/history?start_at=${dateBefore}&end_at=${dateBefore}&base=${this.props.base}`)
                    .then(response => {
                        this.props.setRatesBefore(response.data.rates[dateBefore]);
                        this.props.toggleLoading(false);
                    });

            });

    }

    render() {
        return (
            <>
                {this.props.isLoading ? <Preloader/> : null}
                <CourseItems {...this.props}
                    // course={this.props.course}
                    // baseName={this.props.baseName}
                    // rates={this.props.rates}
                    // ratesBefore={this}
                />
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        course: state.course,
        base: state.course.base,
        baseName: state.course.baseName,
        rates: state.course.rates,
        ratesBefore: state.course.ratesBefore,
        isLoading: state.course.isLoading
    }
};

let CourseItemsContainer = connect(mapStateToProps,
    {setRates, setDate, toggleLoading, setRatesBefore})(CourseItemsContainerAJAX);

export default CourseItemsContainer;