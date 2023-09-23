// Built off of accept-header demo and status-codes demo

const http = require('http');
const url = require('url');
const query = require('querystring');

// Initializing handlers to import response methods
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// urlStruct code assigns different response methods to different urls
const urlStruct = {
  '/': htmlHandler.getIndex,
  '/success': responseHandler.success,
  '/badRequest': responseHandler.badRequest,
  '/unauthorized': responseHandler.unauthorized,
  '/forbidden': responseHandler.forbidden,
  '/internal': responseHandler.internal,
  '/notImplemented': responseHandler.notImplemented,
  '/style.css': htmlHandler.getCSS,
  notFound: responseHandler.notFound,
};

// onRequest receives requests from the client and determines the 
//  response based on the requested url and the accepted header from the request
const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');
  const parameters = query.parse(parsedURL.query);

  const handlerFunction = urlStruct[parsedURL.pathname];
  if (handlerFunction) {
    handlerFunction(request, response, acceptedTypes, parameters);
  } else {
    urlStruct.notFound(request, response, acceptedTypes);
  }
};

// Creating the server
http.createServer(onRequest).listen(port, () => {
  console.dir(`Listening on port 127.0.0.1:${port}`);
});
