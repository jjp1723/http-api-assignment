// respond Method - writes a response based on server status, input content, and content type
const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

// success Method
const success = (request, response, acceptedTypes) => {
  const responseMessage = 'This is a successful response.';
  if (acceptedTypes[0] === 'text/xml') {
    const xmlResponse = `<response><message>${responseMessage}</message></response>`;
    return respond(request, response, 200, xmlResponse, acceptedTypes[0]);
  }

  const jsonResponse = { message: responseMessage };

  return respond(request, response, 200, JSON.stringify(jsonResponse), acceptedTypes[0]);
};

// badRequest Method
const badRequest = (request, response, acceptedTypes, parameters) => {
  if (acceptedTypes[0] === 'text/xml') {
    if (!parameters.valid || parameters.valid !== 'true') {
      const xmlResponse = '<response><message>Missing valid query parameter set to true.</message><id>badRequest</id></response>';
      return respond(request, response, 400, xmlResponse, acceptedTypes[0]);
    }

    const xmlResponse = '<response><message>This request has the required parameters.</message></response>';
    return respond(request, response, 200, xmlResponse, acceptedTypes[0]);
  }

  const jsonResponse = { message: 'This request has the required parameters.' };

  if (!parameters.valid || parameters.valid !== 'true') {
    jsonResponse.message = 'Missing valid query parameter set to true';
    jsonResponse.id = 'badRequest';
    return respond(request, response, 400, JSON.stringify(jsonResponse), acceptedTypes[0]);
  }

  return respond(request, response, 200, JSON.stringify(jsonResponse), acceptedTypes[0]);
};

// unauthorized Method
const unauthorized = (request, response, acceptedTypes, parameters) => {
  if (acceptedTypes[0] === 'text/xml') {
    if (!parameters.loggedIn || parameters.loggedIn !== 'yes') {
      const xmlResponse = '<response><message>Missing loggedIn query parameter set to yes.</message><id>unauthorized</id></response>';
      return respond(request, response, 401, xmlResponse, acceptedTypes[0]);
    }

    const xmlResponse = '<response><message>You have successfully viewed the content.</message></response>';
    return respond(request, response, 200, xmlResponse, acceptedTypes[0]);
  }

  const jsonResponse = { message: 'You have successfully viewed the content.' };

  if (!parameters.loggedIn || parameters.loggedIn !== 'yes') {
    jsonResponse.message = 'Missing loggedIn query parameter set to yes.';
    jsonResponse.id = 'unauthorized';
    return respond(request, response, 401, JSON.stringify(jsonResponse), acceptedTypes[0]);
  }

  return respond(request, response, 200, JSON.stringify(jsonResponse), acceptedTypes[0]);
};

// forbidden Method
const forbidden = (request, response, acceptedTypes) => {
  const responseMessage = 'You do not have access to this content.';
  const responseID = 'forbidden';

  if (acceptedTypes[0] === 'text/xml') {
    const xmlResponse = `<response><message>${responseMessage}</message><id>${responseID}</id></response>`;
    return respond(request, response, 403, xmlResponse, acceptedTypes[0]);
  }

  const jsonResponse = {
    message: responseMessage,
    id: responseID,
  };

  return respond(request, response, 403, JSON.stringify(jsonResponse), acceptedTypes[0]);
};

// internal Method
const internal = (request, response, acceptedTypes) => {
  const responseMessage = 'Internal Server Error. Something went wrong.';
  const responseID = 'internalError';

  if (acceptedTypes[0] === 'text/xml') {
    const xmlResponse = `<response><message>${responseMessage}</message><id>${responseID}</id></response>`;
    return respond(request, response, 500, xmlResponse, acceptedTypes[0]);
  }

  const jsonResponse = {
    message: responseMessage,
    id: responseID,
  };

  return respond(request, response, 500, JSON.stringify(jsonResponse), acceptedTypes[0]);
};

// notImplemented Method
const notImplemented = (request, response, acceptedTypes) => {
  const responseMessage = 'A get request for this page has not been implemented yet. Check again later for updated content.';
  const responseID = 'notImplemented';

  if (acceptedTypes[0] === 'text/xml') {
    const xmlResponse = `<response><message>${responseMessage}</message><id>${responseID}</id></response>`;
    return respond(request, response, 501, xmlResponse, acceptedTypes[0]);
  }

  const jsonResponse = {
    message: responseMessage,
    id: responseID,
  };

  return respond(request, response, 501, JSON.stringify(jsonResponse), acceptedTypes[0]);
};

// notFound Method
const notFound = (request, response, acceptedTypes) => {
  const responseMessage = 'The page you are looking for was not found.';
  const responseID = 'notFound';

  if (acceptedTypes[0] === 'text/xml') {
    const xmlResponse = `<response><message>${responseMessage}</message><id>${responseID}</id></response>`;
    return respond(request, response, 404, xmlResponse, acceptedTypes[0]);
  }

  const jsonResponse = {
    message: responseMessage,
    id: responseID,
  };

  return respond(request, response, 404, JSON.stringify(jsonResponse), acceptedTypes[0]);
};

// Exporting Methods
module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
