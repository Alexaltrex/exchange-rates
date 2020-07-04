import React from "react";
import style from "./SelectItem.module.css";

const SelectItem = (props) => {
    let onClick = (e) => {
        if (props.currency !== e.currentTarget.innerText) {
            props.setCurrency(e.currentTarget.innerText);
        }
    };
    return (
        <div onClick={onClick} className={props.className}>
            {props.text}
        </div>)
};

export default SelectItem;
