import {connect} from "react-redux";
import {setNewPeriod, setRatesForPeriod} from "../../../../Redux/course-reduser";
import Period from "./Period";

let mapStateToProps = state => {
    return {
        period: state.course.period,
        startPeriodDate: state.course.startPeriodDate,
        dateNow: state.course.dateNow,
        currency: state.course.currency,
        base: state.course.base
    }
};

const PeriodContainer = connect(mapStateToProps,
    {setNewPeriod, setRatesForPeriod})(Period);

export default PeriodContainer;