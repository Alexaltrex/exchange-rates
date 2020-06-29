import React from 'react';
import style from './CourseItem.module.css'

const CourseItem = (props) => {
    let styleColor;
    if (+props.change>0) {
        styleColor = style.green
    } else {styleColor = style.red}

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
            <div className={`${style.change} ${styleColor}`}>
                {props.change}
            </div>
        </div>
    )
};

export default CourseItem;