import React, { Component } from 'react'
import {  LoadingContainer } from 'drizzle-react-components'
import PropTypes from 'prop-types'
import '../../App.css'
import ProgramInner from './programInner'

class Program extends Component {
  constructor(props, context) {
    super(props)   
  }
  
  render() {
    
    return (
      <LoadingContainer>
         <ProgramInner />
      </LoadingContainer>
    )
  }
}

Program.contextTypes = {
  drizzle: PropTypes.object
}

export default Program
