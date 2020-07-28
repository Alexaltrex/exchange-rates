import React from 'react';
import CourseItems from "./CourseItems";
import {connect} from "react-redux";
import {
    setAfterMount,
    setAfterUpdate,
    setDate,
    setRates,
    setRatesBefore,
    toggleLoading
} from "../../../../Redux/course-reducer";
import Preloader from "../../../common/Preloader/Preloader";
import {setNewCurrency} from "../../../../Redux/statistic-reducer";

class CourseItemsContainerAJAX extends React.Component {
    componentDidMount() {
        this.props.setAfterMount(this.props.base);
    }

    componentDidUpdate(prevProps) {

        if (prevProps.base !== this.props.base || prevProps.date !== this.props.date) {
            this.props.setAfterUpdate(this.props.date, this.props.dateBefore, this.props.base);
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
        date: state.course.date,
        dateBefore: state.course.dateBefore,
        base: state.course.base,
        baseName: state.course.baseName,
        rates: state.course.rates,
        ratesBefore: state.course.ratesBefore,
        isLoading: state.course.isLoading
    }
};

let CourseItemsContainer = connect(mapStateToProps,
    {setRates, setDate, toggleLoading, setRatesBefore, setAfterMount, setAfterUpdate, setNewCurrency})(CourseItemsContainerAJAX);

export default CourseItemsContainer;