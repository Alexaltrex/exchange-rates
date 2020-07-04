import React from 'react';
import style from './Input.module.css';
import {connect} from "react-redux";
import {rightInputAddSymbol, rightInputChange} from "../../../../Redux/converter-reducer";

const RightInput = (props) => {
    let onChange = (e) => {
        props.rightInputChange(e.currentTarget.value);
    };

    let onKeyPress = (e) => {
        props.rightInputAddSymbol(e.key);
    };

    let label = `1 ${props.rightCurrency} = ${props.rate.toFixed(4)} ${props.leftCurrency}`;
    return (
        <div className={style.input}>
            <input onChange={onChange}
                   onKeyPress={onKeyPress}
                   value={props.inputRight}/>
            <div className={style.label}>
                {label}
            </div>
        </div>
    )
};

let mapStateToProps = (state) => ({
    inputRight: state.converter.inputRight,
    leftCurrency: state.converter.leftCurrency,
    rightCurrency: state.converter.rightCurrency,
    rate: state.converter.rate
});

let RightInputContainer = connect(mapStateToProps,
    {rightInputChange, rightInputAddSymbol})(RightInput);

export default RightInputContainer;