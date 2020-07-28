import {connect} from "react-redux";
import {setNewCurrency} from "../../../../Redux/statistic-reducer";
import Base from "../../../common/Base/Base";

const mapStateToProps = (state) => {
    return {
        baseName: state.course.baseName,
        value: state.statistic.currency
    }
};

const mapDispatchToProps = (dispatch) => ({
    setNewValue: (value) => {
        dispatch(setNewCurrency(value));
    }
});

const CurrencyContainer = connect(mapStateToProps, mapDispatchToProps)(Base);

export default CurrencyContainer;