import {changeDate} from "../../../../../Redux/course-reducer";
import {connect} from "react-redux";
import Date from "./Date";

let mapStateToProps = (state) => {
    return {
        date: state.course.date,
        dateNow: state.course.dateNow,
    }
};

const DateContainer = connect(mapStateToProps,
    {changeDate})(Date);

export default DateContainer;