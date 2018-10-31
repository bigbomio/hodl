import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ProgramContainer from './layouts/program/programContainer'
import Dashboard from     './layouts/dashboard/Dashboard'
import Me from            './layouts/me/me'
import Introduce from     './layouts/introduce/introduce'


export default () => (
    <Switch>
    <Route exact path="/" component={Introduce} />  
    <Route exact path="/program" component={ProgramContainer} />
    <Route exact path="/git" component={Dashboard} />
    <Route exact path="/me" component={Me} />
  </Switch>
)