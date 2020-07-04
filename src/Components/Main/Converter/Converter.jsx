import React from 'react';
import style from './Converter.module.css'
import LeftInputContainer from "./Input/LeftInput";
import ModalContainer from "./Modal/Modal";
import RightInputContainer from "./Input/RightInput";
import LeftSelectContainer from "./LeftSelect/LeftSelect";
import RightSelectContainer from "./LeftSelect/RightSelect";

const Converter = (props) => {
    return (
        <div className={style.converter}>
            <div className={style.select}>
                <LeftSelectContainer/>
                <RightSelectContainer/>
                <ModalContainer/>
            </div>
            <div className={style.input}>
                <LeftInputContainer/>
                <RightInputContainer/>
            </div>
        </div>
    )
};

export default Converter;