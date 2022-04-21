
const url = require('url');
const {StringDecoder} = require('string_decoder');


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
    req.on('data',(buffer)=>{
        realData += decoder.write(buffer);
    })

    req.on('end',()=>{
        realData += decoder.end();
        console.log(realData);
    })
    //response handling
    res.end('Hello worlds! You are a shame now!');
}
module.exports = handler;