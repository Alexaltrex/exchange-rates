import {setNewBase} from "../../../../../Redux/course-reducer";
import {connect} from "react-redux";
import Base from "../../../../common/Base/Base";

let mapStateToProps = (state) => {
    return {
        baseName: state.course.baseName,
        value: state.course.base,
        }
};

const mapDispatchToProps = (dispatch) => ({
    setNewValue: (value) => {
        dispatch(setNewBase(value));
    }
});

const BaseContainer = connect(mapStateToProps, mapDispatchToProps)(Base);

export default BaseContainer;