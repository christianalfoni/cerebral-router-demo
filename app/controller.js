import Controller from 'cerebral';
import Model from 'cerebral-baobab';

import request from 'superagent';

const model = Model({
  url: '/',
  title: 'Home',
  page: 'home',
  messages: [],
  isLoadingMessages: false,
  currentMessage: null,
  isLoadingMessage: null,
  messageError: null
});

const services = {
  request: request
};

export default Controller(model, services);
