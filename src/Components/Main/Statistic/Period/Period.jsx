import React from 'react';
import style from './Period.module.css';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

const Period = (props) => {

    let onPeriodChange = (event) => {
        props.setNewPeriod(event.target.value);
    };

    return (
        <div className={style.period}>
            <FormControl variant={'outlined'}>
                <Select onChange={onPeriodChange}
                        value={props.period}>
                    <MenuItem value={3}>3 дня</MenuItem>
                    <MenuItem value={7}>7 дней</MenuItem>
                    <MenuItem value={14}>14 дней</MenuItem>
                    <MenuItem value={30}>30 дней</MenuItem>
                </Select>
            </FormControl>
        </div>

    )
};

export default Period;
