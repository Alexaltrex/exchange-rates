import React from 'react';
import CourseMenuBaseContainer from "./CourseMenuBase/CourseMenuBaseContainer";
import style from './CourseMenu.module.css';
import CourseMenuDateContainer from "./CourseMenuDate/CourseMenuDateContainer";

const CourseMenu = () => {
    return (
        <div className={style.courseMenu}>
            <div className={style.courseMenuBase}>
                <div>Курс по отношению к</div>
                <CourseMenuBaseContainer/>
            </div>
            <div className={style.courseMenuDate}>
                <div>Дата</div>
                <CourseMenuDateContainer/>
            </div>
        </div>
    )
};

export default CourseMenu;