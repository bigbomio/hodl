import React, { Component } from 'react';
//import content from './content.md';
import Markdown from 'react-markdown';
import  'github-markdown-css';

class Introduce extends Component {
  constructor() {
    super();
    this.state = {
      homeName: "Introduce"
    };
  }

  render() {
    const importAll = require =>
    require.keys().reduce((acc, next) => {
      acc[next.replace("./", "").replace('.md','')] = require(next);
      return acc;
    }, {});

    var page = this.props.match.params.page;
    console.log('page', page);
    const pageItem = importAll(require.context('./', false, /\.(md)$/));
    if(!page){
      page = 'content';
    }
    console.log(pageItem[page])
    if(!pageItem[page])
      page = 'content';
    return (<main className="container markdown-body">
  
      <Markdown source={pageItem[page]} escapeHtml={false} />
  
    </main>);
  }
}

export default Introduce
