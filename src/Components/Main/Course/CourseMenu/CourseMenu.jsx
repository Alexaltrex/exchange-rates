import React from 'react';
import style from './CourseMenu.module.css';
import DateContainer from "./Date/DateContainer";
import BaseContainer from "./Base/BaseContainer";

const CourseMenu = () => {
    return (
        <div className={style.menu}>
            <div className={style.base}>
                <div>Курс по отношению к</div>
                <BaseContainer/>
            </div>
            <div className={style.date}>
                <div>Дата</div>
                <DateContainer/>
            </div>
        </div>
    )
};

export default CourseMenu;