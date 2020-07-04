import React from 'react';
import style from './Main.module.css'
import {Route, Switch} from "react-router-dom";
import Statistic from "./Statistic/Statistic";
import Course from "./Course/Course";

import Home from "./Home/Home";
import ConverterContainer from "./Converter/ConverterContainer";

const Main = () => {
    return (
        <main className={style.main}>
            <Switch>
                <Route exact path='/exchange-rates' render={() => <Home/>}/>
                <Route exact path='/' render={() => <Home/>}/>
                <Route path='/course' render={() => <Course/>}/>
                <Route path='/statistic' render={() => <Statistic/>}/>
                <Route path='/converter' render={() => <ConverterContainer/>}/>
            </Switch>
        </main>
    )
};

export default Main;