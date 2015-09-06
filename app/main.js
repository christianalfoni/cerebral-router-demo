import React from 'react';
import {Container} from 'cerebral-react';
import controller from './controller.js';
import Router from 'cerebral-router';

import App from './components/App.js';

import homeOpened from './signals/homeOpened.js';
import messagesOpened from './signals/messagesOpened.js';
import messageOpened from './signals/messageOpened.js';
import invalidUrlRouted from './signals/invalidUrlRouted.js';

controller.signal('homeOpened', ...homeOpened);
controller.signal('messagesOpened', ...messagesOpened);
controller.signal('messageOpened', ...messagesOpened, ...messageOpened);
controller.signal('invalidUrlRouted', ...invalidUrlRouted);

Router(controller, {
  '/': 'homeOpened',
  '/messages': 'messagesOpened',
  '/messages/:id': 'messageOpened',
  '*': 'invalidUrlRouted'
}).start();

React.render(<Container controller={controller} app={App}/>, document.body);
