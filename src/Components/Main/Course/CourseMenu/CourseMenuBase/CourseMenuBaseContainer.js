import { setNewBase, setRates, toggleLoading } from "../../../../../Redux/course-reduser";
import CourseMenuBase from "./CourseMenuBase";
import {connect} from "react-redux";
import React from "react";

class CourseMenuBaseContainerAJAX extends React.Component {

    componentDidUpdate(prevProps) {
        let date = this.props.date;
        let base = this.props.base;
        if (prevProps.base !== base) {
            this.props.toggleLoading(true);
            const axios = require('axios');
            axios.get(`https://api.exchangeratesapi.io/history?start_at=${date}&end_at=${date}&base=${base}`)
                .then(response => {
                    this.props.setRates(response.data.rates[date]);
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
        isLoading: state.course.isLoading
    }
};

// let mapDispatchToProps = (dispatch) => {
//     return {
//         setNewBase: (base) => {
//             let action = setNewBaseAC(base);
//             dispatch(action)
//         },
//         setRates: (rates) => {
//             dispatch(setRatesAC(rates))
//         },
//         toggleLoading: isLoading => {
//             dispatch(toggleLoadingAC(isLoading))
//         }
//     }
// };

const CourseMenuBaseContainer = connect(mapStateToProps,
    {setNewBase, setRates, toggleLoading})(CourseMenuBaseContainerAJAX);

export default CourseMenuBaseContainer;