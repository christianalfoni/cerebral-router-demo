function loadMessage (input, state, output, {request}) {
  request('/API/messages/' + input.id, function (err, response) {

    if (err || !response || !response.ok) {
      output.error({
        error: 'ERROR'
      });
    } else {
      output.success({
        message: JSON.parse(response.text)
      });
    }

  });
}

export default loadMessage;
