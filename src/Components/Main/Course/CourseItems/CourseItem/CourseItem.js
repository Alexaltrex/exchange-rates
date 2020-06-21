import React from 'react';
import style from './CourseItem.module.css'

const CourseItem = (props) => {
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

        </div>
    )
};

export default CourseItem;