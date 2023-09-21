const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/':htmlHandler.getIndex,
    '/success':jsonHandler.success,
    '/badRequest:':jsonHandler.badRequest,
    '/unauthorized':jsonHandler.unauthorized,
    '/forbidden':jsonHandler.forbidden,
    '/internal':jsonHandler.internal,
    '/notImplemented':jsonHandler.notImplemented,
    notFound:jsonHandler.notFound,
}

const onRequest = (request, response) => {
    const parsedURL = url.parse(request.url);
    const parameters = query.parse(parsedURL.query);

    const handlerFunction = urlStruct[parsedURL.pathname];
    if(handlerFunction){
        handlerFunction(request, response, parameters);
    }else{
        urlStruct.notFound(request, response);
    }
};

http.createServer(onRequest).listen(port, () => {
    console.dir(`Listening on port 127.0.0.1:${port}`);
});