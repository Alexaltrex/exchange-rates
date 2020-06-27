import React from 'react';
import style from './Base.module.css';

const Base = (props) => {

    let onBaseChange = (event) => {
        props.setNewBase(event.target.value);
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

export default Base;