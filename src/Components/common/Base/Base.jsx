import React from 'react';
import style from './Base.module.css';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

const Base = (props) => {

    let onBaseChange = (event) => {
        props.setNewValue(event.target.value);
    };

    let optionElements = props.baseName.map(
        (item, index) => <MenuItem key={index} value={item[0]}>{`${item[0]} - ${item[1]}`}</MenuItem>
    );

    return (
        <div className={style.courseMenuBase}>
            <FormControl variant={'outlined'}>
                <Select onChange={onBaseChange}
                        value={props.value}>
                    {optionElements}
                </Select>
            </FormControl>
        </div>
    )

};

export default Base;