const http  = require('http');

const server = http.createServer((req,res)=>{
    if(req.url === '/')
    {
        res.write('Hello world!');
        res.write('Hello from me!');
        res.end();
    }else if(req.url === '/home')
    {
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