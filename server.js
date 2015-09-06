var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var http = require('http');
var proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  ws: true
});
var app = express();
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, 'public');
var fs = require('fs')

app.use(express.static(publicPath));

app.get('/message*', function (req, res) {
  res.type('html');
  res.send(fs.readFileSync(path.resolve(__dirname, 'public', 'index.html')).toString());
});

var messages = [{
  id: 0,
  title: 'Some message'
}, {
  id: 1,
  title: 'Some other message'
}, {
  id: 2,
  title: 'A third message'
}];

app.get('/API/messages', function (req, res) {
  setTimeout(function () {
    res.type('json');
    res.send(messages);
  }, 200);
});

app.get('/API/messages/:id', function (req, res) {
  setTimeout(function () {
    var id = Number(req.params.id);
    var message = messages.filter(function (message) {
      return message.id === id;
    })[0];
    res.type('json');
    if (message) {
      res.send({
        id: message.id,
        title: message.title,
        content: 'Just some content for the message'
      });
    } else {
      res.status(404),
      res.send({});
    }
  }, 200);
});

app.all('/db/*', function (req, res) {
  proxy.web(req, res, {
    target: 'https://glowing-carpet-4534.firebaseio.com/'
  });
});

if (!isProduction) {

  var bundle = require('./server/bundle.js');
  bundle();
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://127.0.0.1:3001'
    });
  });
  app.all('/socket.io*', function (req, res) {
    proxy.web(req, res, {
      target: 'http://127.0.0.1:3001'
    });
  });


  proxy.on('error', function(e) {
    // Just catch it
  });

  // We need to use basic HTTP service to proxy
  // websocket requests from webpack
  var server = http.createServer(app);

  server.on('upgrade', function (req, socket, head) {
    proxy.ws(req, socket, head);
  });

  server.listen(port, function () {
    console.log('Server running on port ' + port);
  });

} else {

  // And run the server
  app.listen(port, function () {
    console.log('Server running on port ' + port);
  });

}
