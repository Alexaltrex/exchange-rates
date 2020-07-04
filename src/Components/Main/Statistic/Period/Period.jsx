import React from 'react';
import style from './Period.module.css';

const Period = (props) => {
    let onPeriodChange = (event) => {
        let period = event.target.value;
        props.setNewPeriod(period);
    };
    return (
        <div className={style.period}>
            <select onChange={onPeriodChange} value={props.period}>
                <option value={3}>3 дня</option>
                <option value={7}>7 дней</option>
                <option value={14}>14 дней</option>
                <option value={30}>30 дней</option>
            </select>
        </div>
    )
};

export default Period;