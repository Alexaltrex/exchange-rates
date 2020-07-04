import {connect} from "react-redux";
import Currency from "./Currency";
import {setNewCurrency} from "../../../../Redux/statistic-reducer";

let mapStateToProps = (state) => {
    return {
        baseName: state.course.baseName,
        currency: state.statistic.currency
    }
};

const CurrencyContainer = connect(mapStateToProps,
    {setNewCurrency})(Currency);

export default CurrencyContainer;