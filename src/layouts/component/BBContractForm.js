import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
 * Create component.
 */

class BBContractForm extends Component {
  constructor(props, context) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.contracts = context.drizzle.contracts;

    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi;

    this.inputs = [];
    var initialState = {};

    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
        if (abi[i].name === this.props.method) {
            this.inputs = abi[i].inputs;

            for (var i = 0; i < this.inputs.length; i++) {
                initialState[this.inputs[i].name] = props.defaultValues[this.inputs[i].name] || '';
            }

            break;
        }
    }

    this.state = initialState;
  }

  componentDidMount() {
    const inputElement = document.querySelector('input[name="_spender"]');
    this.setState({ [inputElement.name]: inputElement.value });
    console.log({ [inputElement.name]: inputElement.value });
  };

  handleSubmit() {
    console.log('handleSubmit');

    if (this.props.sendArgs) {
      return this.contracts[this.props.contract].methods[this.props.method].cacheSend(...Object.values(this.state), this.props.sendArgs);
    }

    this.contracts[this.props.contract].methods[this.props.method].cacheSend(...Object.values(this.state));
  }

  handleInputChange(event) {
    console.log('handleInputChange', { [event.target.name]: event.target.value });
    this.setState({ [event.target.name]: event.target.value });
  }

  translateType(type) {
    switch(true) {
        case /^uint/.test(type):
            return 'number'
            break
        case /^string/.test(type) || /^bytes/.test(type):
            return 'text'
            break
        case /^bool/.test(type):
            return 'checkbox'
            break
        default:
            return 'text'
    }
  }

  render() {
    return (
      <form className="pure-form pure-form-stacked">
        {this.inputs.map((input, index) => {            
            var inputType = this.translateType(input.type)
            var inputLabel = this.props.labels ? this.props.labels[index] : input.name
            var inputValue = this.state[input.name] || '';
            // console.log(input);
            // check if input type is struct and if so loop out struct fields as well
            return (<input className = 'input-bbo' key={input.name} type={inputType} name={input.name} value={inputValue} placeholder={inputLabel} onChange={this.handleInputChange} />)
        })}
        <button key="submit" className="pure-button" type="button" onClick={this.handleSubmit}>Approve</button>
      </form>
    )
  }
}

BBContractForm.contextTypes = {
  drizzle: PropTypes.object
}

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(BBContractForm, mapStateToProps)