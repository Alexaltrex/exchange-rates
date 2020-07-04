import {setNewBase} from "../../../../../Redux/course-reducer";
import {connect} from "react-redux";
import Base from "../../../../common/Base/Base";

let mapStateToProps = (state) => {
    return {
        baseName: state.course.baseName,
        base: state.course.base,
        }
};

const BaseContainer = connect(mapStateToProps,
    {setNewBase})(Base);

export default BaseContainer;