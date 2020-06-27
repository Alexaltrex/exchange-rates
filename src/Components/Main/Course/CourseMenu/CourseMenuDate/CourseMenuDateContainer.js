import {
    changeDate,
    setDate,
    setRates,
    setRatesBefore,
    toggleLoading
} from "../../../../../Redux/course-reduser";
import {connect} from "react-redux";
import CourseMenuDate from "./CourseMenuDate";

let mapStateToProps = (state) => {
    return {
        date: state.course.date,
        dateBefore: state.course.dateBefore,
        dateNow: state.course.dateNow,
        base: state.course.base,
        isLoading: state.course.isLoading
    }
};

const CourseMenuDateContainer = connect(mapStateToProps,
    {setRates, setRatesBefore, changeDate, setDate, toggleLoading})(CourseMenuDate);

export default CourseMenuDateContainer;