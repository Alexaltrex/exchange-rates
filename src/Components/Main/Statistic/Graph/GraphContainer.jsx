import Graph from "./Graph";
import {connect} from "react-redux";
import React from 'react';
import {statisticAPI} from "../../../../DAL/api";
import {DATE} from "../../../../DAL/date";
import {toggleLoading} from "../../../../Redux/course-reducer";
import {getDateInitial, getRatesForPeriod, getRatesInitial, setDate} from "../../../../Redux/statistic-reducer";

class GraphContainerAJAX extends React.Component {
    componentDidMount() {
        this.props.getRatesInitial(this.props.period, this.props.currency, this.props.base);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.startPeriodDate !== this.props.startPeriodDate
            || prevProps.dateNow !== this.props.dateNow
            || prevProps.currency !== this.props.currency
            || prevProps.base !== this.props.base) {
            this.props.getRatesForPeriod(this.props.startPeriodDate, this.props.dateNow, this.props.currency, this.props.base);
        }
    }

    render() {
        return (
            <Graph rates={this.props.rates}
                   isLoading={this.props.isLoading}
            />
        )
    }
}

let mapStateToProps = state => {
    return {
        rates: state.statistic.ratesForPeriod,
        isLoading: state.course.isLoading,
        baseName: state.course.baseName,
        base: state.course.base,
        period: state.statistic.period,
        currency: state.statistic.currency,
        startPeriodDate: state.statistic.startPeriodDate,
        dateNow: state.statistic.dateNow
    }
};

const GraphContainer = connect(mapStateToProps,
    {toggleLoading, setDate, getRatesForPeriod, getRatesInitial})(GraphContainerAJAX);

export default GraphContainer;

