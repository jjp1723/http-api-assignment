const fs = require('fs');

// References to client.html and style.css in the local directory
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// getIndex Method - Returns any requests to client.html
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// getCSS Method - Returns any requests to style.css
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// Exporting Methods
module.exports = { getIndex, getCSS };
