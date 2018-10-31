import React, { Component } from 'react';
import content from './content.md';
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
    return (<main className="container markdown-body">
  
      <Markdown source={content} escapeHtml={false} />
  
    </main>);
  }
}

export default Introduce
