import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';

import Home from './Home.js';
import Messages from './Messages.js';

const LinkStyle = {
  fontWeight: 'bold',
  color: 'blue',
  fontSize: 16,
  cursor: 'pointer'
};

@Cerebral({
  title: ['title'],
  page: ['page']
})
class App extends React.Component {
  renderPage() {
    switch (this.props.page) {
      case 'home':
        return <Home/>;
      case 'messages':
        return <Messages/>
      case 'invalid':
        return 'This is not a valid url!'
    }
  }
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>
          <a style={LinkStyle} onClick={() => this.props.signals.homeOpened()}>Home</a>
          -
          <a style={LinkStyle} href="/#/messages">Messages</a>
        </div>
        <div style={{padding: 15}}>
          {this.renderPage()}
        </div>
      </div>
    );
  }
}

export default App;
