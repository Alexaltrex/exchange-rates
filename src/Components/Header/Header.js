import React from 'react';
import style from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header className={style.header}>
            <div className={style.headerLogo}>
                Курсы валют
            </div>
            <nav className={style.nav}>
                <NavLink to='/' className={style.item} activeClassName={style.active}>Курсы</NavLink>
                <NavLink to='/statistic' className={style.item} activeClassName={style.active}>Статистика</NavLink>
                <NavLink to='/converter' className={style.item} activeClassName={style.active}>Конвертер</NavLink>
            </nav>
        </header>
    )
};

export default Header;