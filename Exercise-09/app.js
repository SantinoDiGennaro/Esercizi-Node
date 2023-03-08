
const {createServer} = require("node:http")

function createApp(){
    return createServer((request, response) => {
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/html");
        const jsonResponseBody = JSON.stringify({ location: "Welcome to the World Wide Web!" });
        const responseText = "Welcome to the World Wide Web!";
        response.end(responseText);
    });
}

module.exports = createApp;