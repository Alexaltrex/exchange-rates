import {setNewBase, setRates, setRatesBefore, toggleLoading} from "../../../../../Redux/course-reduser";
import CourseMenuBase from "./CourseMenuBase";
import {connect} from "react-redux";
import React from "react";

class CourseMenuBaseContainerAJAX extends React.Component {
    componentDidUpdate(prevProps) {
        // получение параметров запроса из пропсов
        let date = this.props.date;
        let dateBefore = this.props.dateBefore;
        let base = this.props.base;
        if (prevProps.base !== base) {
            this.props.toggleLoading(true);
            const axios = require('axios');
            let getRates = () => axios.get(`https://api.exchangeratesapi.io/history?start_at=${date}&end_at=${date}&base=${base}`);
            let getRatesBefore = () => axios.get(`https://api.exchangeratesapi.io/history?start_at=${dateBefore}&end_at=${dateBefore}&base=${base}`);
            Promise.all([getRates(), getRatesBefore()])
                .then(results => {
                    this.props.setRates(results[0].data.rates[date]);
                    this.props.setRatesBefore(results[1].data.rates[dateBefore]);
                    this.props.toggleLoading(false);
                });
        }
    }

    setNewBase = (base) => {
        this.props.setNewBase(base);
    };

    render() {
        return <CourseMenuBase
            setNewBase={this.setNewBase}
            course={this.props.course}
            baseName={this.props.baseName}
            base={this.props.base}
        />
    }
}

let mapStateToProps = (state) => {
    return {
        baseName: state.course.baseName,
        base: state.course.base,
        date: state.course.date,
        dateBefore: state.course.dateBefore,
        isLoading: state.course.isLoading
    }
};

const CourseMenuBaseContainer = connect(mapStateToProps,
    {setNewBase, setRates, setRatesBefore, toggleLoading})(CourseMenuBaseContainerAJAX);

export default CourseMenuBaseContainer;