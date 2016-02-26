'use strict';

const http = require('http');
const express = require('express');
const app = express();
const url = require('url');

app.use(express.static("."));

app.all(/\/cf\/.*/, function (client_req, client_res) {
  const match = client_req.url.match(/^\/cf\/([^\/]+)(\/.*)$/);

  if (match == null) {
    client_res.status(404).send('Not Found');
    return;
  }

  const hostname = decodeURIComponent(match[1]);
  const requestLine = match[2];
  let requestHeaders = { };

  console.log(hostname + requestLine);

  if (client_req.headers['authorization'] != null)
    requestHeaders['authorization'] = client_req.headers['authorization'];
  if (client_req.headers['content-type'] != null)
    requestHeaders['content-type'] = client_req.headers['content-type'];
  if (client_req.headers['accept'] != null)
    requestHeaders['accept'] = client_req.headers['accept'];

  const options = {
    protocol: 'http:',
    hostname: hostname,
    port: 80,
    path: requestLine,
    method: client_req.method,
    headers: requestHeaders
  };

  const proxy = http.request(options, function (res) {
    res.pipe(client_res, {
      end: true
    });
  });

  client_req.pipe(proxy, {
    end: true
  });
});

app.listen(8080, function () {
});
