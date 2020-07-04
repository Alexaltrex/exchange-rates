import React from 'react';
import style from './Input.module.css';
import {leftInputAddSymbol, leftInputChange} from "../../../../Redux/converter-reducer";
import {connect} from "react-redux";


const LeftInput = (props) => {
    let onChange = (e) => {
        props.leftInputChange(e.currentTarget.value);
    };

    let onKeyPress = (e) => {
        props.leftInputAddSymbol(e.key);

    };

    let label = `1 ${props.leftCurrency} = ${(1 / props.rate).toFixed(4)} ${props.rightCurrency}`

    return (
        <div className={style.input}>
            <input onChange={onChange}
                   onKeyPress={onKeyPress}
                   value={props.inputLeft}/>
            <div className={style.label}>
                {label}
            </div>

        </div>
    )
};

let mapStateToProps = (state) => ({
    inputLeft: state.converter.inputLeft,
    leftCurrency: state.converter.leftCurrency,
    rightCurrency: state.converter.rightCurrency,
    rate: state.converter.rate
  });

let LeftInputContainer = connect(mapStateToProps,
    {leftInputChange, leftInputAddSymbol})(LeftInput);

export default LeftInputContainer;