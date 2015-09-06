import setLoadingMessage from './../actions/setLoadingMessage.js';
import loadMessage from './../actions/loadMessage.js';
import setMessage from './../actions/setMessage.js';
import setMessageError from './../actions/setMessageError.js';
import unsetLoadingMessage from './../actions/unsetLoadingMessage.js';

export default [
  setLoadingMessage,
  [
    loadMessage, {
      success: [setMessage],
      error: [setMessageError]
    }
  ],
  unsetLoadingMessage
];
