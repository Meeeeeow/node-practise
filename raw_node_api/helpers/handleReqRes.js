
const url = require('url');
const {StringDecoder} = require('string_decoder');
const {notFoundHandler} = require('../routehandlers/notFoundRouter');
const routes =require('../routes');
const handler ={};

handler.handleReqRes = (req,res) =>{
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

    const decoder = new StringDecoder();
    let realData = '';
    const requestProps = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryObjStr,
        headers
    }
    console.log(routes['sample']);
    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;
    console.log(chosenHandler);
   
    req.on('data',(buffer)=>{
        realData += decoder.write(buffer);
    })

    req.on('end',()=>{
        realData += decoder.end();
        console.log("I am " + realData);
        chosenHandler(requestProps,realData,(statusCode,payload)=>{
            
            statusCode = typeof(statusCode) === "number" ? statusCode : 500;
            payload = typeof(payload) === "object" ? payload : {};
    
            const payloadStr  = JSON.stringify(payload);
     
            res.writeHead(statusCode);
            res.end(payloadStr );
        });
    })
    //response handling
    // res.end('Hello worlds! You are a shame now!');
}
module.exports = handler;