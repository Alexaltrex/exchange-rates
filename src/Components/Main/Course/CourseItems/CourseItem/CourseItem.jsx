import React, {useState} from 'react';
import style from './CourseItem.module.css'
import {NavLink} from "react-router-dom";

const CourseItem = (props) => {
    let styleColor, styleIcon;
    if (+props.change > 0) {
        styleColor = style.green
        styleIcon = style.green

    } else if (+props.change < 0) {
        styleColor = style.red
        styleIcon = style.red
    }
    let iconStyle, changeStyle;
    if (props.change === 'нет данных') {
        iconStyle = {display: 'none'}
        changeStyle = {justifyContent: 'flex-end'}
    }

    const [buttonIsShow, setButtonIsShow] = useState(false);

    const onMouseEnter = () => {
        setButtonIsShow(true);
    };

    const onMouseLeave = () => {
        setButtonIsShow(false);
    };

    const onClick = (e) => {
        props.setNewCurrency(e.target.dataset.currency);
    };

    return (
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={style.courseItems}>
            <div className={style.nameOfCurrency}>
                <div>
                    {props.nameOfCurrency}
                </div>
                {buttonIsShow && <div className={style.nameOfCurrencyButton}>
                    <NavLink data-currency={props.designationOfCurrency}
                             onClick={onClick}
                             to='/statistic'>
                        {'STAT'}
                    </NavLink>
                </div>}
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