import Converter from "./Converter";
import {connect} from "react-redux";
import {setLeftCurrency} from "../../../Redux/converter-reduser";

let mapStateToProps = (state) => {
    return {
        selectedLeftCurrency: state.converter.selectedLeftCurrency
        // course: state.course,
        // date: state.course.date,
        // dateBefore: state.course.dateBefore,
        // base: state.course.base,
        // baseName: state.course.baseName,
        // rates: state.course.rates,
        // ratesBefore: state.course.ratesBefore,
        // isLoading: state.course.isLoading
    }
};

let ConverterContainer = connect(mapStateToProps, {setLeftCurrency})(Converter);

export default ConverterContainer;