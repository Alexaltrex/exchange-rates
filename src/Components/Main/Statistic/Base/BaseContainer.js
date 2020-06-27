import {connect} from "react-redux";
import React from "react";
import {API} from "../../../../DAL/api";
import {
    getRatesForPeriod,
    setDate,
    setNewBase,
    toggleLoading
} from "../../../../Redux/course-reduser";
import {DATE} from "../../../../DAL/date";
import Base from "./Base";


class BaseContainerAJAX extends React.Component {
    componentDidMount() {
        // получение из запроса - даты на данный момент
        this.props.toggleLoading(true);
        console.log('BaseContainer DidMount')
        API.getInitial()
            .then(data => {
                this.props.toggleLoading(false);
                this.props.setDate(data.date);
                this.props.getRatesForPeriod(DATE.getStartPeriodDate(data.date, this.props.period), data.date, this.props.currency, this.props.base);
                this.props.toggleLoading(false);
            })

    }

    componentDidUpdate(prevProps) {
        console.log('BaseContainer DidUpdate')
        if (prevProps.startPeriodDate !== this.props.startPeriodDate
            || prevProps.dateNow !== this.props.dateNow
            || prevProps.currency !== this.props.currency
            || prevProps.base !== this.props.base) {
            console.log('BaseContainer DidUpdate')
            this.props.getRatesForPeriod(this.props.startPeriodDate, this.props.dateNow, this.props.currency, this.props.base);
        }
    }

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
        period: state.course.period,
        currency: state.course.currency,
        startPeriodDate: state.course.startPeriodDate,
        dateNow: state.course.dateNow
    }
};

const BaseContainer = connect(mapStateToProps,
    {setNewBase, toggleLoading, setDate, getRatesForPeriod})(BaseContainerAJAX);

export default BaseContainer;