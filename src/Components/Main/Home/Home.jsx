import React from 'react';
import style from './Home.module.css';

const Home = () => {
    return (
        <div className={style.home}>
            <div>Интерфейс разработан на базе API: https://exchangeratesapi.io</div>
            <div>с использованием <span>React</span> + <span>Redux</span></div>
            <div>Использованы модули: 'react-router-dom', 'redux', 'react-redux', 'redux-thunk', 'axios'</div>
        </div>
    )
};
export default Home;