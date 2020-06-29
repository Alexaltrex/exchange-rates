import React from 'react';
import style from './Converter.module.css'
import LeftSelect from "./LeftSelect/LeftSelect";

const Converter = (props) => {
    return (
        <div className={style.converter}>
            <LeftSelect {...props}/>
        </div>
    )
};

export default Converter;