import {connect} from "react-redux";
import {setNewBase, toggleLoading} from "../../../../Redux/course-reducer";
import Base from "../../../common/Base/Base";

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