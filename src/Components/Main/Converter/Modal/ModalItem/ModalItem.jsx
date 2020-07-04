import React from 'react';
import style from './ModalItem.module.css';

let ModalItem = (props) => {
    let onClick = (e) => {
        if (props.leftModalIsActive) {
            props.setLeftCurrency(e.currentTarget.dataset.code);
            props.setLeftCurrencyAdd(e.currentTarget.dataset.code);
            props.toggleLeftModal(false);
        }
        if (props.rightModalIsActive) {
            props.setRightCurrency(e.currentTarget.dataset.code);
            props.setRightCurrencyAdd(e.currentTarget.dataset.code);
            props.toggleRightModal(false);
        }
    };
    return (
        <div data-code={props.code} onClick={onClick} className={style.item}>
            <div>{props.name}</div>
            <div>{props.code}</div>
        </div>
    )
};
export default ModalItem;