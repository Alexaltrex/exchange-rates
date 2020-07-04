import React from 'react';
import style from './GraphItem.module.css'

const GraphItem = (props) => {
    return (
        <div className={style.item} style={props.styleItem}>
            <div className={style.rate} style={props.rateStyle}>{props.rate}</div>
            <div className={style.date}>{props.date}</div>
        </div>
        )
};

export default GraphItem;
