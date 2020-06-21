import React from 'react';
import style from './CourseItems.module.css'
import CourseItems from "./CourseItems";
import {connect} from "react-redux";
import {setDate, setDateBefore, setRates, setRatesBefore, toggleLoading} from "../../../../Redux/course-reduser";
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
        axios.get(`https://api.exchangeratesapi.io/latest?base=${base}`)
            .then(response => {
                let date = response.data.date;
                console.log(date);
                let dateBefore = this.getDateBefore(response.data.date);
                console.log(dateBefore);
                this.props.setRates(response.data.rates);
                this.props.setDate(date);
                this.props.setDateBefore(dateBefore);
                //this.props.toggleLoading(false);

                axios.get(`https://api.exchangeratesapi.io/history?start_at=${dateBefore}&end_at=${dateBefore}&base=${this.props.base}`)
                    .then(response => {
                        this.props.setRatesBefore(response.data.rates[dateBefore]);
                        debugger
                        //this.props.setDate(response.data.date);
                        //this.props.setDateBefore(this.getDateBefore(response.data.date));
                        this.props.toggleLoading(false);
                    });

            });

    }

    render() {
        return (
            <>
                {this.props.isLoading ? <Preloader/> : null}
                <CourseItems
                    course={this.props.course}
                    baseName={this.props.baseName}
                    rates={this.props.rates}
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
        isLoading: state.course.isLoading
    }
};

let CourseItemsContainer = connect(mapStateToProps, {
    setRates, setDate, toggleLoading, setDateBefore, setRatesBefore})(CourseItemsContainerAJAX);

export default CourseItemsContainer;