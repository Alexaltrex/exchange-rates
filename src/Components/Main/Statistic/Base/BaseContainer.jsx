import {connect} from "react-redux";
import React from "react";
import {API} from "../../../../DAL/api";
import {
    setNewBase,
    toggleLoading
} from "../../../../Redux/course-reducer";
import {DATE} from "../../../../DAL/date";
import Base from "../../../common/Base/Base";
import {getRatesForPeriod, setDate} from "../../../../Redux/statistic-reducer";

class BaseContainerAJAX extends React.Component {
    // componentDidMount() {
    //     // получение из запроса - даты на данный момент
    //     this.props.toggleLoading(true);
    //     API.getInitial()
    //         .then(data => {
    //             this.props.toggleLoading(false);
    //             this.props.setDate(data.date);
    //             this.props.getRatesForPeriod(DATE.getStartPeriodDate(data.date, this.props.period), data.date, this.props.currency, this.props.base);
    //             this.props.toggleLoading(false);
    //         })
    //
    // }

    // componentDidUpdate(prevProps) {
    //     console.log(this.props)
    //     if (prevProps.startPeriodDate !== this.props.startPeriodDate
    //         || prevProps.dateNow !== this.props.dateNow
    //         || prevProps.currency !== this.props.currency
    //         || prevProps.base !== this.props.base) {
    //         this.props.getRatesForPeriod(this.props.startPeriodDate, this.props.dateNow, this.props.currency, this.props.base);
    //     }
    // }

    render() {
        return <Base
            setNewBase={this.props.setNewBase}
            baseName={this.props.baseName}
            base={this.props.base}
        />
    }
}

let mapStateToProps = (state) => {
    return {
        baseName: state.course.baseName,
        base: state.course.base,
        period: state.statistic.period,
        currency: state.statistic.currency,
        startPeriodDate: state.statistic.startPeriodDate,
        dateNow: state.statistic.dateNow
    }
};

const BaseContainer = connect(mapStateToProps,
    {setNewBase, toggleLoading, setDate, getRatesForPeriod})(BaseContainerAJAX);

export default BaseContainer;