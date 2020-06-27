import {setNewBase, setRates, setRatesBefore, toggleLoading} from "../../../../../Redux/course-reduser";

import {connect} from "react-redux";
import React from "react";
import {API} from "../../../../../DAL/api";
import Base from "../../../../common/Base/Base";

class CourseMenuBaseContainerAJAX extends React.Component {
    // componentDidUpdate(prevProps) {
    //
    //     // получение параметров запроса из пропсов
    //     let date = this.props.date;
    //     let dateBefore = this.props.dateBefore;
    //     let base = this.props.base;
    //     if (prevProps.base !== base || prevProps.date !== date) {
    //         console.log('BaseContainer DidUpdate');
    //     this.props.toggleLoading(true);
    //         let getRates = () => API.getByDate(date, base);
    //         let getRatesBefore = () => API.getByDate(dateBefore, base);
    //         Promise.all([getRates(), getRatesBefore()])
    //             .then(results => {
    //                 this.props.setRates(results[0].rates[date]);
    //                 this.props.setRatesBefore(results[1].rates[dateBefore]);
    //                 this.props.toggleLoading(false);
    //             });
    //     }
    // }

    render() {
        return <Base
            setNewBase={this.props.setNewBase}
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