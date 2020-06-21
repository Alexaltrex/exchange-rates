import React from 'react';
import style from './Main.module.css'
import {Route, Switch} from "react-router-dom";
import Statistic from "./Statistic/Statistic";
import Converter from "./Converter/Converter";
import Course from "./Course/Course";

const Main = () => {
    return (
        <main className={style.main}>
            <Switch>
                <Route
                    exact path='/'
                    render={() => <Course/>}
                />

                <Route
                    exact path='/statistic'
                    render={() => <Statistic/>}
                />

                <Route
                    exact path='/converter'
                    render={() => <Converter/>}
                />

            </Switch>


        </main>
    )
};

export default Main;