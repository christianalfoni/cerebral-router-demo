import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';

@Cerebral({
  isLoadingMessages: ['isLoadingMessages'],
  isLoadingMessage: ['isLoadingMessage'],
  messages: ['messages'],
  currentMessage: ['currentMessage'],
  messageError: ['messageError']
})
class App extends React.Component {
  renderMessage() {

    if (this.props.isLoadingMessage) {
      return <h5>Loading message!</h5>;
    }

    if (this.props.messageError) {
      return 'This message does not seem to exist'
    }

    if (!this.props.currentMessage) {
      return 'Click a message to load it...';
    }

    return (
      <div>
        <h4>{this.props.currentMessage.title}</h4>
        <div>{this.props.currentMessage.content}</div>
      </div>
    );
  }
  renderMessageItem(message, index) {
    const isActive = this.props.currentMessage && this.props.currentMessage.id === message.id;
    const MessageItemStyle = {
      height: 25,
      lineHeight: '25px',
      backgroundColor: isActive ? '#EAEAEA' : 'transparent',
      cursor: 'pointer',
      color: 'blue'
    };
    return (
      <li
        key={index}
        onClick={() => this.props.signals.messageOpened({id: message.id})}
        style={MessageItemStyle}>
        {message.title}
      </li>
    );
  }
  render() {
    return (
      <div>
        <div style={{display: 'inline-block', width: 200}}>
          {
            this.props.isLoadingMessages ?
              'Loading messages...'
            :
              this.props.messages.map((item, index) => this.renderMessageItem(item, index))
          }
          <ul>

          </ul>
        </div>
        <div style={{display: 'inline-block', width: 300, verticalAlign: 'top', padding: 15}}>
          {this.renderMessage()}
        </div>
      </div>
    );
  }
}

export default App;
