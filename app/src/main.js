import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ProgramContainer from './layouts/program/programContainer'
import Join from            './layouts/join/join'
import Introduce from     './layouts/introduce/introduce'


export default () => (
    <Switch>
    <Route exact path="/" component={Introduce} />  
    <Route exact path="/join" component={Join} />
    <Route exact path="/metamask" component={ProgramContainer} />
    <Route exact path="/program" component={ProgramContainer} />
    <Route path='/pages/:page' component={Introduce}/>
    </Switch>
)