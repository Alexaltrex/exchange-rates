import React from 'react';
import style from './Course.module.css'
import CourseMenu from "./CourseMenu/CourseMenu";
import CourseItemsContainer from "./CourseItems/CourseItemsContainer";

const Course = () => {
    return (
        <div className={style.course}>
            <CourseMenu/>
            <div className={style.courseHeader}>
                <div className={style.courseHeaderName}>
                    Наименование валюты
                </div>
                <div className={style.courseHeaderCode}>
                    Код
                </div>
                <div className={style.courseHeaderRate}>
                    Курс
                </div>
                <div className={style.change}>
                    Изменение
                </div>

            </div>
            <CourseItemsContainer/>
        </div>
    )
};

export default Course;