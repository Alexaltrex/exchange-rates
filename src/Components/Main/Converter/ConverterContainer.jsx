import React from "react";
import Converter from "./Converter";
import {connect} from "react-redux";
import {getRate} from "../../../Redux/converter-reducer";

class ConverterAJAX extends React.Component {
    componentDidMount() {
        this.props.getRate(this.props.leftCurrency, this.props.rightCurrency, this.props.inputLeft);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.leftCurrency !== this.props.leftCurrency || prevProps.rightCurrency !== this.props.rightCurrency) {
            this.props.getRate(this.props.leftCurrency, this.props.rightCurrency, this.props.inputLeft);
        }
          }

    render() {
        return (
            <Converter/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        leftCurrency: state.converter.leftCurrency,
        rightCurrency: state.converter.rightCurrency,
        inputLeft: state.converter.inputLeft
    }
};

let ConverterContainer = connect(mapStateToProps,{getRate})(ConverterAJAX);

export default ConverterContainer;