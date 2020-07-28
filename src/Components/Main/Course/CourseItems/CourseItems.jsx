import React from 'react';
import style from './CourseItems.module.css'
import CourseItem from "./CourseItem/CourseItem";

const CourseItems = (props) => {

    let CourseItemElements = (props.rates.length !== 0) ?
        props.rates.map(
            (rate, index) => {
                let nameOfCurrency = props.baseName.find(el => el[0] === rate.designationOfCurrency)[1];

                let change;
                if (props.rates.length > 1 && props.ratesBefore.length > 1) {
                    let rateOfCurrencyBefore = props.ratesBefore[index].rateOfCurrency;
                    change = ((+rate.rateOfCurrency) - (+rateOfCurrencyBefore)).toFixed(6);
                } else change = 'нет данных';

                if (change > 0) {
                    change = `+${change}`
                };

                return (
                    <CourseItem
                        key={index}
                        designationOfCurrency={rate.designationOfCurrency}
                        nameOfCurrency={nameOfCurrency}
                        rateOfCurrency={rate.rateOfCurrency}
                        change={change}
                        setNewCurrency={props.setNewCurrency}
                    />
                )
            }
        ) : <div className={style.noData}>Нет данных</div>;

    return (
        <div className={style.courseItems}>
            {CourseItemElements}
        </div>
    )
};

export default CourseItems;