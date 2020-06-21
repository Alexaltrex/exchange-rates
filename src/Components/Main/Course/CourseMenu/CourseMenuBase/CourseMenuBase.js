import React from 'react';
import style from './CourseMenuBase.module.css';

const CourseMenuBase = (props) => {

    let onBaseChange = (event) => {
        let base = event.target.value;

        props.setNewBase(base);
    };

    let optionElements = props.baseName.map(
        (item, index) => <option key={index} value={item[0]}>{`${item[0]} - ${item[1]}`}</option>
    );

    return (
        <div className={style.courseMenuBase}>
            <select onChange={onBaseChange} value={props.base}>
                {optionElements}
            </select>
        </div>
    )
};

export default CourseMenuBase;