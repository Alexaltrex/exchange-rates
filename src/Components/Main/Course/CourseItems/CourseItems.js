import React from 'react';
import style from './CourseItems.module.css'
import CourseItem from "./CourseItem/CourseItem";

const CourseItems = (props) => {
        let CourseItemElements = (props.rates.length !== 1) ?
        props.rates.map(
            (rate, index) => {
                let nameOfCurrency = props.baseName.find(el => el[0] === rate.designationOfCurrency)[1];

                return (
                    <CourseItem
                        key={index}
                        designationOfCurrency={rate.designationOfCurrency}
                        nameOfCurrency={nameOfCurrency}
                        rateOfCurrency={rate.rateOfCurrency}
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