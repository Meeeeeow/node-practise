//dependencies
const http = require('http');
const url = require('url');
//app object - module scaffolding
const app = {};

//configuration
app.config={
    port:5000,
}

//create server
app.createServer = () =>{
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, ()=>{
        console.log(`listening to port number ${app.config.port}`);
    })
}

//handle request response
app.handleReqRes = (req,res) =>{
    //request handling
    const parsedUrl = url.parse(req.url,true);
    console.log(parsedUrl);
    const path = parsedUrl.pathname;
    console.log(path);
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
    console.log(trimmedPath);
    const method = req.method.toLowerCase();
    console.log(method);
    const queryObjStr = parsedUrl.query;
    console.log(queryObjStr);
    const headers = req.headers;
    console.log(headers);
    //response handling
    res.end('Hello worlds! You are a shame now!');
}

//start the server
app.createServer();