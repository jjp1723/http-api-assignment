const respondJSON = (request, response, status, object) => {
    response.writeHead(status, {'Content-Type':'application/json'});
    response.write(JSON.stringify(object));
    response.end();
};

const success = (request, response) => {
    const jsonResponse = {message:'This is a successful response',};

    return respondJSON(request, response, 200, respondJSON);
};

const badRequest = (request, response, parameters) => {
    const jsonResponse = {message:'This request has the required parameters',};

    if(!parameters.valid || parameters.valid != true){
        jsonResponse.message = 'Missing valid query parameter set to true';
        jsonResponse.id = 'badRequest';
        return respondJSON(request, response, 400, jsonResponse);
    }

    return respondJSON(request, response, 200, jsonResponse);
};

const unauthorized = (request, response) => {
    const jsonResponse = {message:'This request has been authorized',};

    if(!parameters.loggedIn || parameters.loggedIn != 'yes'){
        jsonResponse.message = 'Missing loggedIn query parameter set to yes.';
        jsonResponse.id = 'unauthorized';
        return respondJSON(request, response, 401, jsonResponse);
    }

    return respondJSON(request, response, 200, jsonResponse);
};

const forbidden = (request, response) => {
    const jsonResponse = {
        message:'You do not have access to this content.',
        id:'forbidden',
    };

    return respondJSON(request, response, 403, jsonResponse);
};

const internal = (request, response) => {
    const jsonResponse = {
        message:'Internal Server Error. Something went wrong.',
        id:'internalError',
    };

    return respondJSON(request, response, 500, jsonResponse);
};

const notImplemented = (request, response) => {
    const jsonResponse = {
        message:'This get request for this page has not been implemented yet. Check again later for updated content.',
        id:'notImplemented',
    };

    return respondJSON(request, response, 501, jsonResponse);
};

const notFound = (request, response) => {
    const jsonResponse = {
        message:'The page you are looking for was not found.',
        id:'notFound',
    }
};

module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplemented,
    notFound,
};