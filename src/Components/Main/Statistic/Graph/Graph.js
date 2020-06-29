import React from 'react';
import style from './Graph.module.css'
import GraphItem from "./GraphItem/GraphItem";
import Preloader from "../../../common/Preloader/Preloader";


const Graph = (props) => {
    let rates = props.rates.map(el => el[1]).filter(el => el);
    let rateMax = Math.max.apply(null, rates);
    let rateMin = Math.min.apply(null, rates);

    let items = props.rates.map((el) => {
        let rate, dateGraph, width, colorRed, colorGreen, backgroundColor;

        let month = el[0].match(/\d+/g)[1];
        let day = el[0].match(/\d+/g)[2];
        dateGraph = `${day}.${month}`;

        if (el[1]) {

            if(rateMax !==rateMin){
                width = Math.floor(100 * (50 + 250 * (el[1] - rateMin) / (rateMax - rateMin)) / 300) + '%';
                colorRed = Math.floor(255 * (el[1] - rateMin) / (rateMax - rateMin));
                colorGreen = Math.floor(255 * (rateMax - el[1]) / (rateMax - rateMin));
                rate = el[1];
                backgroundColor = `rgb(${colorRed},${colorGreen},0`;
                if (+el[1] === rateMax) {
                    rate = `${el[1]} = maximum`;
                }
                if (+el[1] === rateMin) {
                    rate = `${el[1]} = minimum`;
                }
            } else {
                colorRed = 254/2;
                colorGreen = 254/2;
                width='100%';
                rate = el[1];
                backgroundColor = `#aaa`;
            }

        } else {
            width = 0;
            rate = 'нет данных';
        }
        let style = {
            width: width,
            backgroundColor: backgroundColor
        };
        return (<GraphItem
            styleItem={style}
            rate={rate}
            date={dateGraph}
            //key={el[0]}
        />)
    });

    return (
        <div className={style.graph}>
            {props.isLoading ? <Preloader/> : null}
            {items}
        </div>

    )
};


export default Graph;
