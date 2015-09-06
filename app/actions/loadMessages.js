function loadMessages (input, state, output, {request}) {
  request('/API/messages', function (err, response) {

    if (err || !response.ok) {
      output.error({
        error: err
      });
    } else {
      output.success({
        messages: JSON.parse(response.text)
      });
    }

  });
}

export default loadMessages;
