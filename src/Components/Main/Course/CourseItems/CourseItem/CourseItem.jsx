import React from 'react';
import style from './CourseItem.module.css'

const CourseItem = (props) => {
    let styleColor, styleIcon;
    if (+props.change > 0) {
        styleColor = style.green
        styleIcon = style.green

    } else if (+props.change < 0 ) {
        styleColor = style.red
        styleIcon = style.red
    }
    let iconStyle, changeStyle;
    if (props.change === 'нет данных'){
        iconStyle = {display: 'none'}
        changeStyle = {justifyContent: 'flex-end'}
    }


    return (
        <div className={style.courseItems}>
            <div className={style.nameOfCurrency}>
                {props.nameOfCurrency}
            </div>
            <div className={style.designationOfCurrency}>
                {props.designationOfCurrency}
            </div>
            <div className={style.rateOfCurrency}>
                {props.rateOfCurrency}
            </div>
            <div className={`${style.change} ${styleColor}`} style={changeStyle}>
                <div className={`${style.icon} ${styleIcon}`} style={iconStyle}></div>
                <div className={`${style.number} ${styleColor}`}>{props.change}</div>
            </div>
        </div>
    )
};

export default CourseItem;