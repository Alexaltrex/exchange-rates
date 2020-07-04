import {connect} from "react-redux";
import {} from "../../../../Redux/course-reducer";
import Period from "./Period";
import {setNewPeriod, setRatesForPeriod} from "../../../../Redux/statistic-reducer";

let mapStateToProps = state => {
    return {
        period: state.statistic.period,
        startPeriodDate: state.statistic.startPeriodDate,
        dateNow: state.course.dateNow,
        currency: state.statistic.currency,
        base: state.course.base
    }
};

const PeriodContainer = connect(mapStateToProps,
    {setNewPeriod})(Period);

export default PeriodContainer;