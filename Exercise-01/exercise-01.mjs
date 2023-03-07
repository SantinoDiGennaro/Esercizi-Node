import {createServer} from "node:http";

const server = createServer((req, res)=>{
    console.log("request received");

    res.statusCode = 200;

    res.setHeader("Content-Type", "text/html");

    res.end("<html><body><h1>Node Server</h1></body></html>")
})

const sum = (a,b) => console.log(`The sum is ${a+b}`)

server.listen(3000, sum(5,6));