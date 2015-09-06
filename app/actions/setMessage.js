function setMessage (input, state) {
  state.set('currentMessage', input.message);
  state.set('messageError', null);
}

export default setMessage;
