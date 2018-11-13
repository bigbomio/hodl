import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ProgramContainer from './layouts/program/programContainer'
import Join from            './layouts/join/join'
import Introduce from     './layouts/introduce/introduce'
import Navigation from "./navigations";

import { history } from './store'
console.log(process.env.PUBLIC_URL);
export default () => (
	<BrowserRouter  history={history} basename={process.env.PUBLIC_URL || '/hodl'} >
        <React.Fragment>
        <Navigation />
        <Switch>
    <Route exact path="/" component={Introduce} />  
    <Route exact path="/join" component={Join} />
    <Route exact path="/metamask" component={ProgramContainer} />
    <Route exact path="/program" component={ProgramContainer} />
    <Route path='/pages/:page' component={Introduce}/>
    </Switch>
        </React.Fragment>
    </BrowserRouter>
)