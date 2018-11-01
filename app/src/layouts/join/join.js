import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
;import PropTypes from 'prop-types'
import '../../App.css'
import { Link } from 'react-router-dom'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing.unit,
    },
    cssRoot: {
      color: 'white',
      backgroundColor: purple[500],
      '&:hover': {
        backgroundColor: purple[700],
      },
    },
    bootstrapRoot: {
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 16,
      padding: '6px 12px',
      border: '1px solid',
      backgroundColor: '#007bff',
      borderColor: '#007bff',
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      },
    },
  });
  
  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
    typography: {
      useNextVariants: true,
    },
  });

class Join extends Component {

    constructor(props, context) {
        super(props);
        this.classes  = props;
        this.depositStartTime = 1540377259;
        this.depositStopTime = 1545561259;
        this.linkPostMyEtherWallet = 'https://hackernoon.com/wtf-is-the-blockchain-1da89ba19348';

        this.state = {
            remainTime: this.depositStopTime - Math.round(new Date().getTime()/1000),
        };

    }

    componentDidMount() {
        this.timer = setInterval(this.caculateRemainTime.bind(this), 1000);
    }

    componentWillUnmount() {
        if(this.timer) {
            clearInterval(this.timer);
        }
    }

    render() {
        
        return (
            <main className="container">
             <div className="pure-g">
             <div className="pure-u-1-1 header">
             <h1 className = "newstype">Midas Foundation Long-term HODLING program for BBO Hodlers</h1>
            <h2>Program Status</h2>
            <strong>Deposit end in :  </strong>
            <div>
               {this.state.remainTime}
               
            </div>

            <div className = 'list-btn'>
            <MuiThemeProvider theme={theme} className = "btn-switch" >
                <Button   variant="contained" color="primary" className={this.classes.margin} component={Link} to="/metamask">
                Using By Metamask
                </Button>
            </MuiThemeProvider>

            <MuiThemeProvider theme={theme} className = "btn-switch" >
                <Button  variant="contained" color="primary" className={this.classes.margin} onClick={ ()=> {let newWindow = window && window.open(this.linkPostMyEtherWallet);}}>
                Using By MyEtherWallet
                </Button>
            </MuiThemeProvider>
        
    
        </div>
            </div>
            </div>
            </main>

        );
    }

    covertDayTime () {

        var timeStamp = this.depositStopTime - Math.round(new Date().getTime()/1000);
        var days = Math.round(timeStamp / (3600 * 24));
        var hours =Math.floor((timeStamp - days * 3600 * 24)/ 3600);
        var minutes = Math.floor((timeStamp - days * 3600 * 24 - hours * 3600) / 60);
        var seconds = timeStamp - days * 3600 * 24 - hours * 3600 - minutes *  60;
        
        return days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, ' + seconds + ' seconds.';

    }

    caculateRemainTime () {
        this.setState({
            remainTime: this.covertDayTime(),
        });
    }
};
Join.contextTypes = {
    drizzle: PropTypes.object
  }

export default Join
