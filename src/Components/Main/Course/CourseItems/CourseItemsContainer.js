import React from 'react';

import CourseItems from "./CourseItems";
import {connect} from "react-redux";
import {setDate, setRates, setRatesBefore, toggleLoading} from "../../../../Redux/course-reduser";
import Preloader from "../../../common/Preloader/Preloader";
import {API} from "../../../../DAL/api";
import {DATE as date} from "../../../../DAL/date";

class CourseItemsContainerAJAX extends React.Component {
    componentDidMount() {
        //this.props.toggleLoading(true);
        // получение из запроса - даты, курсов и вычисление предыдущей даты
        // передача даты, предыдущей даты и курсов в хранилище
        console.log('ItemsContainer DidMount');
        API.getLatest(this.props.base)
            .then(data => {
                let dateBefore = date.getDateNew('minus', data.date);
                this.props.setRates(data.rates);
                this.props.setDate(data.date);
                //второй запрос на основании результатов первого (предыдущей даты)
                //получение курсов предыдущей даты и передача их в хранилище
                API.getByDate(dateBefore, this.props.base)
                    .then(data => {
                        this.props.setRatesBefore(data.rates[dateBefore]);
                        this.props.toggleLoading(false);
                    });
            });
    }

    componentDidUpdate(prevProps) {
        // получение параметров запроса из пропсов

        if (prevProps.base !== this.props.base || prevProps.date !== this.props.date) {
            console.log('ItemsContainer DidUpdate');
            this.props.toggleLoading(true);
            let getRates = () => API.getByDate(this.props.date, this.props.base);
            let getRatesBefore = () => API.getByDate(this.props.dateBefore, this.props.base);
            Promise.all([getRates(), getRatesBefore()])
                .then(results => {
                    this.props.setRates(results[0].rates[this.props.date]);
                    this.props.setRatesBefore(results[1].rates[this.props.dateBefore]);
                    this.props.toggleLoading(false);
                });
        }
    }

    render() {
        return (
            <>
                {this.props.isLoading ? <Preloader/> : null}
                <CourseItems {...this.props}/>
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        course: state.course,
        date: state.date,
        dateBefore: state.dateBefore,
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