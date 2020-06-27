import React from 'react';
import style from './CourseMenuDate.module.css';

const CourseMenuDate = (props) => {

    let onLeftArrowClick = () => {
        props.changeDate('minus');
    };

    let onRightArrowClick = () => {
        if (props.date !== props.dateNow) {
            props.changeDate('plus')
        }
    };

    return (
        <div className={style.courseMenuDate}>
            <div className={style.arrow} onClick={onLeftArrowClick}>{'<'}</div>
            <div className={style.date}>{props.date}</div>
            <div className={style.arrow} onClick={onRightArrowClick}>{'>'}</div>
        </div>
    )
};

export default CourseMenuDate;