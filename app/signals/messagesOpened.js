import setTitle from './../factories/setTitle.js';
import setPage from './../factories/setPage.js';

import hasLoadedMessages from './../actions/hasLoadedMessages.js';
import setLoadingMessages from './../actions/setLoadingMessages.js';
import loadMessages from './../actions/loadMessages.js';
import setMessages from './../actions/setMessages.js';
import unsetLoadingMessages from './../actions/unsetLoadingMessages.js';

export default [
  setTitle('Messages'),
  setPage('messages'),
  hasLoadedMessages, {
    yes: [],
    no: [
      setLoadingMessages,
      [
        loadMessages, {
          success: [setMessages],
          error: []
        }
      ],
      unsetLoadingMessages
    ]
  }
];
