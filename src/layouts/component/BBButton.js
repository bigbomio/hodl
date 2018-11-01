import React, { Component } from 'react'
import  './BBButton.css'

class BBButton extends Component {

    render() {
      const { 
        variant,
        content,
        ...others
      } = this.props;
      
      return (
        <button className={variant} {...others}>
          {content}
        </button>
      )
    }
  }

  export default BBButton

  
