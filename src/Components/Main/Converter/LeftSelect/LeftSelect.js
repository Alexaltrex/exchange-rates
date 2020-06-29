import React from 'react';
import style from './Select.module.css';

const LeftSelect = (props) => {
    let style1 = (props.selectedLeftCurrency === 'RUB')
        ? `${style.item} ${style.selected}`
        : style.item;
    let style2 = (props.selectedLeftCurrency === 'USD')
        ? `${style.item} ${style.selected}`
        : style.item;
    let style3 = (props.selectedLeftCurrency === 'EUR')
        ? `${style.item} ${style.selected}`
        : style.item;

    let onClick = (e) => {
        if (props.selectedLeftCurrency !== e.currentTarget.innerText) {
            props.setLeftCurrency(e.currentTarget.innerText);
        }
    }

    return (
        <div className={style.select}>
            <div onClick={onClick} className={style1}>RUB</div>
            <div onClick={onClick} className={style2}>USD</div>
            <div onClick={onClick} className={style3}>EUR</div>
        </div>
    )
};

export default LeftSelect;