import React from 'react';
import style from './Select.module.css';
import SelectItem from "./SelectItem/SelectItem";
import {connect} from "react-redux";
import {setLeftCurrency, toggleLeftModal} from "../../../../Redux/converter-reducer";

//const Buttons = (props)

const LeftSelect = (props) => {
    let leftCurr = props.leftCurrency;
    let style1 = (leftCurr === 'RUB')
        ? `${style.item} ${style.selected}`
        : style.item;
    let style2 = (leftCurr === 'USD')
        ? `${style.item} ${style.selected}`
        : style.item;
    let style3 = (leftCurr === 'EUR')
        ? `${style.item} ${style.selected}`
        : style.item;
    let style4 = (leftCurr !== 'RUB' && leftCurr !== 'USD' && leftCurr !== 'EUR')
        ? `${style.item} ${style.selected}`
        : style.item;
    let style5 = (props.leftModalIsActive)
        ? `${style.modalActivator} ${style.select}`
        : style.modalActivator;
    let toggleModal = () => {
        props.toggleLeftModal(true);
    };

    return (
        <div>
            <div className={style.title}>У меня есть</div>
            <div className={style.select}>
                <SelectItem currency={props.leftCurrency} setCurrency={props.setLeftCurrency} className={style1}
                            text='RUB'/>
                <SelectItem currency={props.leftCurrency} setCurrency={props.setLeftCurrency} className={style2}
                            text='USD'/>
                <SelectItem currency={props.leftCurrency} setCurrency={props.setLeftCurrency} className={style3}
                            text='EUR'/>
                <SelectItem currency={props.leftCurrency} setCurrency={props.setLeftCurrency} className={style4}
                            text={props.leftCurrencyAdd}/>
                <div onClick={toggleModal} className={style5}></div>
            </div>
        </div>
    )
};

let mapStateToProps = (state) => ({
    leftCurrency: state.converter.leftCurrency,
    leftModalIsActive: state.converter.leftModalIsActive,
    leftCurrencyAdd: state.converter.leftCurrencyAdd,
})

let LeftSelectContainer = connect(mapStateToProps, {setLeftCurrency, toggleLeftModal})(LeftSelect)

export default LeftSelectContainer;