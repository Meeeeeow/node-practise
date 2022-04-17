const http  = require('http');

const server = http.createServer((req,res)=>{
    if(req.url === '/')
    {
        res.write(`
        <html>
            <head>
                <title>Request stream</title>
            </head>
        `);
        res.write(`<body><form method="post" action="/home"><input type="text" name="message"/></form></body>`);
        res.end();
    }else if(req.url === '/home' && req.method=== 'POST')
    {
        const body = [];
        req.on('data',(chunk)=>{
            // console.log(chunk.toString());
            body.push(chunk);
        })

        req.on('end',()=>{
            console.log('stream finished');
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
        })
        res.write('This is home');
        res.end();
    }else{
        res.write('not found');
        res.end();
    }
}); // creaters the server

// server.on('connection',()=>{        no use in real life
//     console.log('new connection...');
// }) 
server.listen(3000); // server is kind of an emitter

console.log('listening on port 3000'); 