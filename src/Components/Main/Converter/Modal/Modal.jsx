import React from 'react';
import style from './Modal.module.css'
import ModalItem from "./ModalItem/ModalItem";
import {
    setLeftCurrency,
    setLeftCurrencyAdd,
    setRightCurrency,
    setRightCurrencyAdd, toggleLeftModal, toggleRightModal
} from "../../../../Redux/converter-reducer";
import {connect} from "react-redux";

let Modal = (props) => {

    let modalItems = props.baseName.map((el, index) => {
        if (el[0] !== 'RUB' && el[0] !== 'USD' && el[0] !== 'EUR')
            return <ModalItem data-code={el[1]}
                              name={el[1]}
                              code={el[0]}
                              leftModalIsActive={props.leftModalIsActive}
                              rightModalIsActive={props.rightModalIsActive}
                              setLeftCurrency={props.setLeftCurrency}
                              setRightCurrency={props.setRightCurrency}
                              setLeftCurrencyAdd={props.setLeftCurrencyAdd}
                              setRightCurrencyAdd={props.setRightCurrencyAdd}
                              toggleLeftModal={props.toggleLeftModal}
                              toggleRightModal={props.toggleRightModal}
            />
    });

    let onClick = () => {
        props.toggleLeftModal(false);
        props.toggleRightModal(false);
    };

    if (props.leftModalIsActive || props.rightModalIsActive) {
        return (
            <div onClick={onClick} className={style.wrapper}>
                <div className={style.modal}>
                    {modalItems}
                </div>
            </div>
        )
    } else {
        return null;
    }

};

let mapStateToProps = (state) => ({
    baseName: state.course.baseName,
    leftModalIsActive: state.converter.leftModalIsActive,
    rightModalIsActive: state.converter.rightModalIsActive
});


let ModalContainer = connect(mapStateToProps,
    {setLeftCurrency, setRightCurrency, setLeftCurrencyAdd,
        setRightCurrencyAdd, toggleLeftModal, toggleRightModal})(Modal)

export default ModalContainer;
