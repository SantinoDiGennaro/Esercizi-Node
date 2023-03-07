import {createServer} from "node:http";

const server = createServer((req, res)=>{
    console.log("request received");

    res.statusCode = 200;

    res.setHeader("Content-Type", "text/html");

    res.end("<html><body><h1>Node Server</h1></body></html>")
})

server.listen(3000, ()=>{
    const id = crypto.randomUUID();
    console.log(id);
});