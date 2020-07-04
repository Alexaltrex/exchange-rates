import React from 'react';
import style from './Statistic.module.css'
import CurrencyContainer from "./Currency/CurrencyContainer";
import BaseContainer from "./Base/BaseContainer";
import GraphContainer from "./Graph/GraphContainer";
import PeriodContainer from "./Period/PeriodContainer";

const Statistic = () => {
    return (
        <div className={style.statistic}>
            <div className={style.currency}>
                <div>Курс </div>
                <CurrencyContainer/>
                <div>за </div>
                <BaseContainer/>
            </div>
            <div className={style.period}>
                <div>период за</div>
                <PeriodContainer/>
            </div>
            <div className={style.graph}>
                <GraphContainer/>
            </div>

        </div>
    )
};

export default Statistic;