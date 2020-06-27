import React from 'react';
import style from './Currency.module.css';

const Currency = (props) => {

    let onCurrencyChange = (event) => {
        let currency = event.target.value;
        props.setNewCurrency(currency);
    };

    let optionElements = props.baseName.map(
        (item, index) => <option key={index} value={item[0]}>{`${item[0]} - ${item[1]}`}</option>
    );

    return (
        <div className={style.currency}>
            <select onChange={onCurrencyChange} value={props.currency}>
                {optionElements}
            </select>
        </div>
    )
};

export default Currency;