import React from 'react';
import style from './Select.module.css';
import SelectItem from "./SelectItem/SelectItem";
import {connect} from "react-redux";
import {setRightCurrency, toggleRightModal} from "../../../../Redux/converter-reducer";

const RightSelect = (props) => {
    let rightCurr = props.rightCurrency;
    let style1 = (rightCurr === 'RUB')
        ? `${style.item} ${style.selected}`
        : style.item;
    let style2 = (rightCurr === 'USD')
        ? `${style.item} ${style.selected}`
        : style.item;
    let style3 = (rightCurr === 'EUR')
        ? `${style.item} ${style.selected}`
        : style.item;
    let style4 = (rightCurr !== 'RUB' && rightCurr !== 'USD' && rightCurr !== 'EUR')
        ? `${style.item} ${style.selected}`
        : style.item;
    let style5 = (props.rightModalIsActive)
        ? `${style.modalActivator} ${style.select}`
        : style.modalActivator;

    let toggleModal = () => {
        props.toggleRightModal(true);
    };

    return (
        <div>
            <div  className={style.title}>Хочу приобрести</div>
        <div className={style.select}>

            <SelectItem currency={props.rightCurrency} setCurrency={props.setRightCurrency} className={style1}
                        text='RUB'/>
            <SelectItem currency={props.rightCurrency} setCurrency={props.setRightCurrency} className={style2}
                        text='USD'/>
            <SelectItem currency={props.rightCurrency} setCurrency={props.setRightCurrency} className={style3}
                        text='EUR'/>
            <SelectItem currency={props.rightCurrency} setCurrency={props.setRightCurrency} className={style4}
                        text={props.rightCurrencyAdd}/>
            <div onClick={toggleModal} className={style5}></div>
        </div>
        </div>
    )
};

let mapStateToProps = (state) => ({
    rightCurrency: state.converter.rightCurrency,
    rightModalIsActive: state.converter.rightModalIsActive,
    rightCurrencyAdd: state.converter.rightCurrencyAdd,
})

let RightSelectContainer = connect(mapStateToProps, {setRightCurrency, toggleRightModal})(RightSelect)



export default RightSelectContainer;