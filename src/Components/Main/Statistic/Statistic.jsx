import React from 'react';
import style from './Statistic.module.css'
import CurrencyContainer from "./Currency/CurrencyContainer";
import GraphContainer from "./Graph/GraphContainer";
import PeriodContainer from "./Period/PeriodContainer";
import BaseContainer from "../Course/CourseMenu/Base/BaseContainer";

const Statistic = () => {
    return (
        <div className={style.statistic}>
            <div className={style.currency}>
                <div className={style.text}>Курс</div>
                <CurrencyContainer/>
                <div className={style.text}>за</div>
                <BaseContainer/>
            </div>
            <div className={style.period}>
                <div>Период за</div>
                <PeriodContainer/>
            </div>
            <div className={style.graph}>
                <GraphContainer/>
            </div>
        </div>
    )
};

export default Statistic;