import Graph from "./Graph";
import {connect} from "react-redux";

let mapStateToProps = state => {
    return{
        rates: state.course.ratesForPeriod,
        isLoading: state.course.isLoading
    }
};

const GraphContainer = connect(mapStateToProps, {})(Graph);

export default GraphContainer;

