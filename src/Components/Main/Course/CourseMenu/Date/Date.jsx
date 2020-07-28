import React from 'react';
import style from './Date.module.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardSharpIcon from '@material-ui/icons/ArrowForwardSharp';
import IconButton from "@material-ui/core/IconButton";

const Date = (props) => {

    let onLeftArrowClick = () => {
        props.changeDate('minus', props.date);
    };

    let onRightArrowClick = () => {
        if (props.date !== props.dateNow) {
            props.changeDate('plus', props.date)
        }
    };

    // let arrowStyle = (props.date === props.dateNow)
    //     ? `${style.arrow} ${style.disable}`
    //     :`${style.arrow}`;

    return (
        <div className={style.courseMenuDate}>
            <IconButton onClick={onLeftArrowClick}>
                <ArrowBackIcon/>
            </IconButton>
            {/*<div className={style.arrow} onClick={onLeftArrowClick}>{'<'}</div>*/}
            <div className={style.date}>{props.date}</div>
            {/*<div className={arrowStyle} onClick={onRightArrowClick}>{'>'}</div>*/}
            <IconButton onClick={onRightArrowClick} color="primary" disabled={props.date === props.dateNow}>
                <ArrowForwardSharpIcon/>
            </IconButton>
        </div>
    )
};

export default Date;