function hasLoadedMessages (input, state, output) {
  if (state.get('messages').length) {
    output.yes();
  } else {
    output.no();
  }
}

hasLoadedMessages.outputs = ['yes', 'no'];

export default hasLoadedMessages;
