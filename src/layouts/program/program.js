import React, { Component } from 'react'
import ProgramLoading from './programLoading'
import PropTypes from 'prop-types'
import '../../App.css'
import ProgramInner from './programInner'

class Program extends Component {
  constructor(props, context) {
    super(props)   
  }
  
  render() {
    
    return (
      <ProgramLoading>
         <ProgramInner />
      </ProgramLoading>
    )
  }
}

Program.contextTypes = {
  drizzle: PropTypes.object
}

export default Program
