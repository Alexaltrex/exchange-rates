import {connect} from "react-redux";
import {setNewCurrency, setRatesBefore} from "../../../../Redux/course-reduser";
import Currency from "./Currency";

let mapStateToProps = (state) => {
    return {
        baseName: state.course.baseName,
        currency: state.course.currency
    }
};

const CurrencyContainer = connect(mapStateToProps,
    {setNewCurrency, setRatesBefore})(Currency);

export default CurrencyContainer;